import path from 'path'
import Promise from 'bluebird'
import gulp from 'gulp'
import webpackStream from 'webpack-stream'
import del from 'del'
import gulpUglify from 'gulp-uglify'
import gulpStreamify from 'gulp-streamify'
import gulpPlumber from 'gulp-plumber'
import gulpStylus from 'gulp-stylus'
import gulpRename from 'gulp-rename'
import gulpDebug from 'gulp-debug'
import LiveReload from 'webpack-livereload-plugin'
import { merge, clone, typeOf } from 'lutils'

export default class Tasks {
    /**
     *    Tasks
     *
     *    @param     {Object}    config = {}
     */
    constructor(config = {}) {
        this.config = merge(
            clone( require('./config') ),
            config
        )
    }

    /**
     *    Bundles js to dist
     *
     *    @return    {Promise}
     */
    webpack(options) {
        options.babel   = options.babel || {}
        options.webpack = options.webpack || {}

        merge.black(options.babel, this.config.babel)

        options.babel.presets = [
            ...this.config.babel.presets,
            ...options.babel.presets
        ]

        options.babel.plugins = [
            ...this.config.babel.plugins,
            ...options.babel.plugins
        ]

        const loaders = [
            {
                test    : /\.jsx?$/i,
                exclude : /node_modules/,
                loader  : 'babel-loader',
                query   : options.babel || {}
            },
            ...this.config.webpack.loaders
        ]

        const plugins = [
            ...this.config.webpack.plugins,
            ...(options.webpack.plugins ? options.webpack.plugins : [])
        ]

        if ( options.liveReload ) {
            let liveOptions = typeOf.Object(options.liveReload)
                ? options.liveReload
                : null

            plugins.push(new LiveReload(liveOptions))
        }

        const eslint = options.webpack.eslint
            ? options.webpack.eslint
            : this.config.webpack.eslint

        let config = {
            watch   : options.watch,
            entry   : [ 'babel-polyfill', options.source ],
            devtool : 'source-map',
            module  : {
                preLoaders: this.config.webpack.preLoaders,
                loaders
            },
            output: {
                filename          : path.basename(options.source),
                sourceMapFilename : `${path.basename(options.source)}.map`,
                publicPath        : options.resolve || this.config.resolve,
            },

            eslint, plugins
        }

        merge.black(config, options.webpack)

        let g = gulp.src(options.source)
            .pipe( gulpPlumber() )
            .pipe( gulpDebug({ title: 'webpack' }) )
            .pipe( webpackStream(config) )

        // TODO: utlize webpacks built in uglify plugin?
        if ( options.compress ) g = g.pipe( gulpStreamify( gulpUglify() ) )

        return g.pipe(gulp.dest(options.dist))
    }

    /**
     *    Builds scripts and styles
     *
     *    @param     {Object}    overrides    Options to overwrite for each entry
     *
     *    @return    {Promise}
     */
    build(overrides) {
        return Promise.all([
            ...this.scripts(overrides),
            ...this.styles(overrides),
        ])
    }


    /**
     *    Builds configured scripts entries and optionally watches for changes
     *
     *    @param     {Object}    overrides    =    { watch: true }
     *
     *    @return    {Array of Promise}
     */
    scripts(overrides = {}) {
        if ( ! typeOf.Array(this.config.scripts) ) return []

        return this.config.scripts.map((options) =>
            this.webpack({
                ...merge(options, overrides),
                source   : path.resolve(this.config.source, options.source),
                dist     : path.resolve(this.config.dist, options.dist),
                watch    : options.watch,
            })
        )
    }

    /**
     *    Builds configured styles entries and optionally watches for changes
     *
     *    @param     {Object}    overrides    =    { watch: true }
     *
     *    @return    {Array of Promise}
     */
    styles(overrides = {}) {
        if ( ! typeOf.Array(this.config.styles) ) return []

        return this.config.styles.map((options) =>
            this.stylus({
                ...merge(options, overrides),
                source    : path.resolve(this.config.source, options.source),
                dist      : path.resolve(this.config.dist, options.dist),
                watchGlob : path.resolve(this.config.source, options.watchGlob || ''),
            })
        )
    }


    /**
     *    Renders stylus to css to dist
     *
     *    @return    {Promise}
     */
    stylus(options) {
        const run = () =>
            gulp.src(options.source)
                .pipe( gulpPlumber() )
                .pipe( gulpDebug({ title: 'stylus' }) )
                .pipe( gulpStylus({
                    'include css' : true,
                    'compress'    : Boolean(options.compress),
                }) )
                .pipe( gulpRename({ extname: options.extension || '.css' }) )
                .pipe( gulp.dest(options.dist) )


        if ( options.watch )
            return Promise.all([ run(), gulp.watch(options.watchGlob, run)])
        else
            return run()
    }


    /**
     *    Purges dist folder
     *
     */
    clean() {
        return del( path.join(this.config.dist, './*') )
    }

}

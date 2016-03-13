import path from 'path'
import Promise from 'bluebird'
import gulp from 'gulp'
import webpackStream from 'webpack-stream'
import del from 'del'
import gulpUglify from 'gulp-uglify'
import gulpStreamify from 'gulp-streamify'
import gulpDebug from 'gulp-debug'
import gulpPlumber from 'gulp-plumber'
import gulpStylus from 'gulp-stylus'
import gulpRename from 'gulp-rename'
import gutil from 'gulp-util'
import { merge, clone, typeOf } from 'lutils'

export default class Tasks {
    /**
     *    Tasks
     *
     *    @param     {Object}    config = {}
     */
    constructor(config = {}) {
        this.config = merge(
            {
                source : '',
                dist   : path.resolve(__dirname, '../dist'),
            },
            clone( require('./config') ),
            config
        )
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
     *    Purges dist folder
     *
     */
    clean() {
        return del( path.join(this.config.dist, './*') )
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
     *    Renders stylus to css to dist
     *
     *    @return    {Promise}
     */
    stylus(options) {
        const run = () =>
            gulp.src(options.source)
                .pipe(gulpPlumber())
                .pipe(gulpDebug({title: 'stylus'}))
                .pipe(gulpStylus({
                    'include css' : true,
                    'compress'    : Boolean(options.compress),
                }))
                .pipe(gulpRename({ extname: options.extension || '.css' }))
                .pipe(gulp.dest(options.dist))


        if ( options.watch )
            return Promise.all([ run(), gulp.watch(options.watchGlob, run)])
        else
            return run()
    }

    /**
     *    Bundles js to dist
     *
     *    @return    {Promise}
     */
    webpack(options) {
        options.babel = options.babel || {}

        options.babel.presets = [
            ...this.config.webpack.presets,
            ...options.babel.presets
        ]

        options.babel.plugins = [
            ...this.config.webpack.plugins,
            ...options.babel.plugins
        ]

        const loaders = [
            {
                test    : /\.jsx?$/i,
                exclude : /node_modules/,
                loaders : [ 'babel-loader', 'eslint-loader' ],
                query   : options.babel || {}
            },
            ...this.config.webpack.loaders
        ]

        const config = {
            watch   : options.watch,
            entry   : [ 'babel-polyfill', options.source ],
            devtool : 'source-map',
            module  : { loaders },
            output: {
                filename          : path.basename(options.source),
                sourceMapFilename : `${path.basename(options.source)}.map`,
            },
        }

        if ( options.webpack ) merge(config, options.webpack)

        let g = gulp.src(options.source)
            .pipe( gulpPlumber() )
            .pipe( gulpDebug({title: 'Webpack'}) )
            .pipe( webpackStream(config) )
            //.on('error', gutil.log.bind(gutil, 'Webpack Error'))
            // TODO: handle error better. check out .old/cfg for the webpack-errors module used etc.

        // TODO: configure uglify
        if ( options.compress ) g = g.pipe( gulpStreamify( gulpUglify() ) )

        return g.pipe(gulp.dest(options.dist))

    }
}

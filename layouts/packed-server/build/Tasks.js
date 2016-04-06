import path from 'path'
import Promise from 'bluebird'
import gulp from 'gulp'
import gulpWebpack from 'webpack-stream'
import gulpPlumber from 'gulp-plumber'
import gulpDebug from 'gulp-debug'
import webpack from 'webpack'
import del from 'del'

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

        let config = {
            watch     : options.watch,
            entry     : [ 'babel-polyfill', options.source ],
            devtool   : '#eval-source-map',
            externals : require('../package.json').externalDependencies || [],
            target    : "node",
            module    : {
                preLoaders: this.config.webpack.preLoaders,
                loaders
            },
            output: {
                filename          : path.basename(options.source),
                sourceMapFilename : `${path.basename(options.source)}.map`,
                publicPath        : options.resolve || this.config.resolve,
            },

            plugins
        }

        merge.black(config, options.webpack)

        return new Promise((resolve, reject) => {
            let g = gulp.src(options.source)
            .pipe( gulpPlumber() )
            .pipe( gulpDebug({ title: 'webpack' }) )
            .pipe(
                gulpWebpack(config, webpack, (err, stats) => {
                    if ( err ) return reject(err)
                    resolve()
                })
            )

            return g.pipe( gulp.dest(options.dist) )

        })
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
     *    Purges dist folder
     *
     */
    clean() {
        return del( path.join(this.config.dist, './*') )
    }

}

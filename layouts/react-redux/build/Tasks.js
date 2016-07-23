import path from 'path'
import Promise from 'bluebird'
import gulp from 'gulp'
import del from 'del'
import webpack from 'webpack'
import gulpWebpack from 'webpack-stream'
import gulpPlumber from 'gulp-plumber'
import gulpDebug from 'gulp-debug'
import LiveReload from 'webpack-livereload-plugin'

import { merge, clone, typeOf } from 'lutils'

export default class Tasks {
    constructor(config = {}) {
        this.config = merge(
            clone( require('./config') ),
            config
        )
    }

    /**
     *    Bundles webpack to dist
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

        if ( options.compress )
            plugins.push(
                ...[
                    new webpack.optimize.DedupePlugin(),
                    new webpack.optimize.UglifyJsPlugin({
                        compress: {
                            unused        : true,
                            dead_code     : true,
                            warnings      : false,
                            drop_debugger : true,
                            screw_ie8     : true,
                        }
                    }),
                ]
            )

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
            devtool : options.compress
                ? false
                : options.webpack.devtool || 'source-map',
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

        // Control flow to handle stream states between watching and building
        return new Promise((resolve, reject) => {
            function done(err) {
                if ( err ) return reject(err)
                return resolve(g)
            }

            let g = gulp.src(options.source)
                .pipe( gulpPlumber() )
                .pipe( gulpDebug({ title: 'webpack' }) )
                .pipe( gulpWebpack(config, webpack, options.watch ? done : null) )
                .pipe( gulp.dest(options.dist) )

            if ( ! options.watch )
                g = g.on('end', () => done())

            return g
        })
    }

    build(overrides) {
        return Promise.all( this.scripts(overrides) )
    }


    /**
     *    Builds configured scripts entries and optionally watches for changes
     *
     *    @param     {Object}               overrides = { watch: true }
     *    @return    {Array of Promise}
     */
    scripts(overrides = {}) {
        if ( ! typeOf.Array(this.config.scripts) ) return []

        return this.config.scripts.map((options) =>
            this.webpack({
                ...merge(options, overrides),
                source   : path.resolve(this.config.source, options.source || ''),
                dist     : path.resolve(this.config.dist, options.dist || ''),
                watch    : options.watch,
            })
        )
    }

    /**
     *    Purges dist folder
     */
    clean() {
        return del( path.join(this.config.dist, './*') )
    }

}

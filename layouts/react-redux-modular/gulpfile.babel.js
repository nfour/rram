/**
 *  This gulpfile is configured to handle
 *  - Multiple clients
 *  - Seperate server & client babel configurations
 */

import Promise from 'bluebird'
import path from 'path'
import gulp from 'gulp'
import gulpNodemon from 'gulp-nodemon'
import fs from 'fs'
import Build from './build/Build'

Promise.promisifyAll(fs)

//
// Task configurations
//

const PATHS = {
    server : './build/server',
    dist   : './dist'
}

const COMPRESS = !! ( process.env.COMPRESS === 'true' || process.env.NODE_ENV === 'production' )

const BABELRC = JSON.parse( fs.readFileSync('./.babelrc', 'UTF8') )

// Use a the full preset for the clients
BABELRC.presets.forEach((preset, i) => {
    if ( /es2015/.test(preset) )
        BABELRC.presets[i] = 'es2015'
})

// Add transforms to clientside
BABELRC.plugins.push([
    "transform-runtime",
    { "polyfill": true, "regenerator": true }
])

// NOTE: May want to regex replace the client source within the dev servers index.js, or use webpack dev server.
const NODEMON = {
    ignore : [ 'node_modules' ],
    exec   : `node -r babel-register ${PATHS.server}`, // Will be appended to below
    ext    : 'js json',
    env    : { 'NODE_ENV': 'development' },
    watch  : false,
}

const LIVE_RELOAD = {
    port            : 35729,
    appendScriptTag : true,
    ignore          : null,
}


//
// Exposed tasks
//

const clients = {
    // Only one client in this app
    client: new Build({
        dist   : path.resolve(__dirname, PATHS.dist, './client'),
        source : path.resolve(__dirname, './client'),

        scripts: [{
            source   : './index.js',
            babel    : BABELRC,
            compress : COMPRESS,
            webpack  : { progress : true }
        }]
    })
}


for ( let key in clients ) {
    const CLIENT = clients[key]
    const name   = key.toLowerCase()

    const viewPath = path.resolve(CLIENT.config.source, './index.html')

    gulp.task(`clean:${name}`, async () => {
        return CLIENT.clean()
    })

    gulp.task(`build:${name}`, [`clean:${name}`], async () => {
        await CLIENT.build()

        let viewFile = await fs.readFileAsync(viewPath)
        await fs.writeFileAsync( path.resolve(CLIENT.config.dist, `./index.html`), viewFile )
    })

    gulp.task(`watch:${name}`, [`clean:${name}`], async () => {
        return CLIENT.build({ watch: true, liveReload: LIVE_RELOAD })
    })

    gulp.task(`start:${name}`, [`clean:${name}`, `watch:${name}`], async () => {
        return gulpNodemon({
            ...NODEMON,
            exec: `${NODEMON.exec} --dist=${CLIENT.config.dist} --view=${viewPath}`
        })
    })
}

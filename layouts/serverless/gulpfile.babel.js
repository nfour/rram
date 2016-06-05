import 'babel-polyfill' // Because of es2015 preset!

import Promise from 'bluebird'
import path from 'path'
import gulp from 'gulp'
import gulpNodemon from 'gulp-nodemon'
import Tasks from './build/Tasks'
import fs from 'fs'
import sh from 'shelljs'
import yargs from 'yargs'

Promise.promisifyAll(fs)

//
// Exposed tasks
//


gulp.task(`deploy`, ['build'], async () => {
    sh.set('-e')
    sh.exec(`cd serverless && sls client deploy`)
    sh.exec(`cd serverless && sls function deploy ${yargs.argv.function || ''}`)
})

gulp.task(`build`, async () => {
    await CLIENT.clean()
    await CLIENT.build()

    // Copy over the view file
    let view = await fs.readFileAsync( path.resolve(CLIENT.config.source, `./views/index.html`) )
    await fs.writeFileAsync( path.resolve(CLIENT.config.dist, `./index.html`), view )
})

gulp.task(`start`, async () => {
    await CLIENT.clean()
    await CLIENT.build({ watch: true, liveReload: LIVE_RELOAD })
    return gulpNodemon(NODEMON)
})


//
// Task configurations
//


const COMPRESS = !! ( process.env.COMPRESS || process.env.NODE_ENV === 'production' )

const BABELRC = JSON.parse( fs.readFileSync('./.babelrc', 'UTF8') )

// Use a the full preset for the clients
BABELRC.presets.forEach((preset, i) => {
    if ( preset === 'es2015-node4' )
        BABELRC.presets[i] = 'es2015'
})

const NODEMON = {
    ignore : [ 'node_modules' ],
    exec   : 'node -r babel-register ./build/server',
    ext    : 'js json',
    env    : { 'NODE_ENV': 'development' },
}

const LIVE_RELOAD = {
    port            : 35729,
    appendScriptTag : true,
    ignore          : null,
}

const CLIENT = new Tasks({
    resolve : "", // This could be the aws bucket
    source : path.resolve('./client'),
    dist   : path.resolve('./serverless/client/dist'),

    scripts: [{
        source  : './index.js',
        babel   : BABELRC,
        compress: COMPRESS
    }],
})

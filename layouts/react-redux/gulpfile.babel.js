import path from 'path'
import gulp from 'gulp'
import gulpNodemon from 'gulp-nodemon'
import Promise from 'bluebird'
import Tasks from './build/Tasks'
import fs from 'fs'

Promise.promisifyAll(fs)


//
// Task configurations
//

const BABELRC = JSON.parse( fs.readFileSync('./.babelrc', 'UTF8') )

// Use a lighter preset for the server
BABELRC.presets.forEach((preset, i) => {
    if ( preset === 'es2015-node5' )
        BABELRC.presets[i] = 'es2015'
})


const NODEMON = {
    watch  : [ 'server/' ],
    ignore : [ 'node_modules' ],
    exec   : 'cd ./server && npm start',
    ext    : 'js json',
    env    : { 'NODE_ENV': 'development' },
}

const LIVE_RELOAD = {
    port            : 35729,
    appendScriptTag : true,
    ignore          : null,
}

const COMPRESS = !! ( process.env.COMPRESS || process.env.NODE_ENV === 'production' )

const CLIENT = new Tasks({
    resolve : "/static/",
    source  : path.resolve('./client'),
    dist    : path.resolve('./dist/client'),

    scripts: [{
        source  : './index.js',
        babel   : BABELRC,
        compress: COMPRESS
    }],
})


//
// Exposed tasks
//

gulp.task(`build`, async () => {
    await CLIENT.clean()
    return CLIENT.build()
})

gulp.task(`watch`, async () => {
    await CLIENT.clean()
    return CLIENT.build({ watch: true, liveReload: LIVE_RELOAD })
})

gulp.task(`start`, async () => {
    await CLIENT.clean()
    await CLIENT.build({ watch: true, liveReload: LIVE_RELOAD })
    return gulpNodemon(NODEMON)
})

gulp.task(`bundle`, ['build'], async () => {
    let view = await fs.readFileAsync( path.resolve(`./client/views/index.html`) )
    await fs.writeFileAsync( path.resolve(`./dist/client/index.html`), view )
})

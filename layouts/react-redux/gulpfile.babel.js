import path from 'path'
import fs from 'fs'
import gulp from 'gulp'
import gulpNodemon from 'gulp-nodemon'
import Tasks from './build/Tasks'


//
// Task configurations
//

const BABELRC = JSON.parse( fs.readFileSync('./.babelrc', 'UTF8') )

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

const CLIENT = new Tasks({
    resolve : "/static/",

    scripts: [{
        source  : path.resolve('./client/index.js'),
        dist    : path.resolve('./dist/client'),
        babel   : BABELRC,
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

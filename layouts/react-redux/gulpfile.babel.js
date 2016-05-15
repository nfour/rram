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

gulp.task(`bundle`, async () => {
    await CLIENT.clean()
    await CLIENT.build()

    let view = await fs.readFileAsync( path.resolve(`./client/views/index.html`) )
    await fs.writeFileAsync( path.resolve(`./dist/client/index.html`), view )
})

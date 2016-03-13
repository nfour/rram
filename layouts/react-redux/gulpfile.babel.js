import path from 'path'
import gulp from 'gulp'
import gulpNodemon from 'gulp-nodemon'
import Tasks from './build/Tasks'


//
// Task configurations
//


const WEB_SERVER = {
    watch  : [ 'server/' ],
    ignore : [ 'node_modules' ],
    exec   : 'cd ./server && npm start',
    ext    : 'js json',
    env    : { 'NODE_ENV': 'development' },
}

const CLIENT = new Tasks({
    resolve : "/static/",

    scripts: [{
        source  : path.resolve('./client/index.js'),
        dist    : path.resolve('./dist/client'),
        babel   : require('./client/babelrc.json'),
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
    return CLIENT.build({ watch: true })
})

gulp.task(`start`, async () => {
    await CLIENT.clean()
    await CLIENT.build({ watch: true })
    return gulpNodemon(WEB_SERVER)
})

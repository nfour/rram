import path from 'path'
import gulp from 'gulp'
import gulpNodemon from 'gulp-nodemon'
import Tasks from './build/Tasks'


//
// Task configurations
//


const WEB_SERVER = {
    watch  : [ './server/*' ],
    ignore : [ 'node_modules' ],
    script : './server',
    ext    : 'js jsx ejs',
    env    : { 'NODE_ENV': 'development' }
}

const CLIENT = new Tasks({
    scripts: [{
        source  : path.resolve('./client/index.js'),
        dist    : path.resolve('./dist/client'),
        babel   : require('./client/babelrc.json'),
        //webpack : {},
    }],
})


//
// Exposed tasks
//


const clients = {
    client: CLIENT
}

for ( let key in clients ) {
    const CLIENT = clients[key]

    gulp.task(`build:${key}`, async () => {
        await CLIENT.clean()
        return CLIENT.build()
    })

    gulp.task(`watch:${key}`, async () => {
        await CLIENT.clean()
        return CLIENT.build({ watch: true })
    })

    gulp.task(`start:${key}`, async () => {
        await CLIENT.clean()
        await CLIENT.build({ watch: true })
        return gulpNodemon(WEB_SERVER)
    })
}

import path from 'path'
import gulp from 'gulp'
import gulpNodemon from 'gulp-nodemon'
import fs from 'fs-extra'
import Tasks from './build/Tasks'


//
// Task configurations
//


const NODEMON = require('./nodemon.json')

const SERVER = new Tasks({
    scripts: [{
        source  : path.resolve('./src/index.js'),
        dist    : path.resolve('./dist'),
        babel   : JSON.parse( fs.readFileSync('./.babelrc', "UTF8") ),
    }],
})


//
// Exposed tasks
//

gulp.task(`build`, async () => {
    await SERVER.clean()
    return SERVER.build()
})

gulp.task(`watch`, async () => {
    await SERVER.clean()
    return SERVER.build({ watch: true })
})

gulp.task(`start`, async () => {
    await SERVER.clean()
    await SERVER.build({ watch: true })
    return gulpNodemon(NODEMON)
})

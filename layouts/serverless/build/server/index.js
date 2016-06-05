import express from 'express'
import path from 'path'

const CONFIG = {
    paths: {
        views : __dirname,
        dist  : path.join(__dirname, '../../serverless/client/dist'),
    },
    port   : 1337,
    host   : '0.0.0.0',
}

export const APP = express()

APP.engine('html', require('ejs').renderFile)
APP.set('view engine', 'ejs')
APP.set('views', CONFIG.paths.views)

APP.use('/', express.static(CONFIG.paths.dist) )

APP.get('/*', async function(req, res) {
    res.render('index.html', CONFIG)
})

export const SERVER = APP.listen(CONFIG.port, CONFIG.host, function() {
    console.log(`Listening on ${SERVER.address().address}:${SERVER.address().port}`)
})

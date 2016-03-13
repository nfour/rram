import express from 'express'

export const CONFIG = require('./config')

export const APP = express()

APP.set('view engine', 'ejs')
APP.set('views', CONFIG.paths.views)

APP.use('/static', express.static(CONFIG.paths.dist) )

APP.get('/', async function(req, res) {
    res.render('index', CONFIG)
})

export const SERVER = APP.listen(CONFIG.port, CONFIG.host, function() {
    console.log(`Listening on ${SERVER.address().address}:${SERVER.address().port}`)
})

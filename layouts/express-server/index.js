import express from 'express'
import ejs from 'ejs'
import CONFIG from './config'

export const APP = express()

APP.engine('html', ejs.renderFile)
APP.set('view engine', 'ejs')
APP.set('views', CONFIG.paths.views)
APP.use('/static', express.static(CONFIG.paths.dist) )

APP.get('/*', (req, res) => res.render('index.html', CONFIG) )

export const SERVER = APP.listen(CONFIG.port, CONFIG.host, function() {
    console.log(`Listening on ${SERVER.address().address}:${SERVER.address().port}`)
})

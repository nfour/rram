import jsDom from 'jsdom'
import path from 'path'
import fs from 'fs'
import React from 'react'
import ReactDOM from 'react-dom'
import { expect } from 'chai'
import 'isomorphic-fetch'

const body = fs.readFileSync( path.resolve(__dirname, '../views/index.html') )

global.Promise = require('bluebird')
global.document = jsDom.jsdom(body)
global.window   = document.defaultView
global.expect   = expect
global.React    = React
global.ReactDOM = ReactDOM

// Adds window stuff to the global
for ( let k in global.window ) if ( ! ( k in global ) ) global[k] = document.defaultView[k]

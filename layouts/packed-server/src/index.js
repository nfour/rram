// Polyfills
global.Promise = require('bluebird')

export const APP = { test: true }

require('./lib/test')

console.log('-- DONE')

const App = require('./electron')
const url = process.argv[2]

module.exports = App(url)

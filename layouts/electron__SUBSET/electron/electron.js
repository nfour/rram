const Promise           = require('bluebird')
const electron          = require('electron')
const devToolsInstaller = require('electron-devtools-installer')

electron.windows = []

class Window {
    constructor() {
        this.browser = new electron.BrowserWindow({ width: 800, height: 600 })

        electron.windows.push(this)
        this.browser.on('closed', () => this.destroy())
    }

    destroy() {
        electron.windows.splice( electron.windows.indexOf(this), 1 ) // Delete self
    }

    load(url) {
        this.browser.loadURL(url)

        if ( process.env.NODE_ENV !== 'production' )
            this.browser.webContents.openDevTools()
    }
}

module.exports = function App(url) {
    electron.app
        .on('ready', () => {
            // Adds these devtools, ignoring errors
            Promise.map(['REDUX_DEVTOOLS', 'REACT_DEVELOPER_TOOLS'], (key) =>
                devToolsInstaller.default(key, !! process.env.UPGRADE_EXTENSIONS).catch(() => {})
            ).then(() => {
                new Window().load(url)
            })
        })
        .on('activate', () => {
            if ( ! electron.windows.length )
                new Window().load(url)
        })
        .on('window-all-closed', () => {
            if ( process.platform !== 'darwin' )
                electron.app.quit()
        })

    return electron
}

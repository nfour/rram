# ELECTRON SUBSET
This serves as an electron subset app, to be dropped into any other layouts, turning them into desktop apps.

## USAGE
- Drop `./electron` into any app
- `npm install`

Then run it as described below:

#### CLI

- Using the packaged electron:
    - `cd ./electron && npm start ${url_here}`
- Using your own:
    - `electron ./electron ${url_here}`


#### CLI via Node

```js
const child = require('child_process')
    .exec(`cd ./electron && npm start file://${__dirname}/index.html`)

child.stdout.on('data', console.log)
child.stderr.on('data', console.error)
```

#### Node, programmatically

**MUST** be run via `electron` instead of `node`

```js
import ElectronApp from './electron/electron'

const electron = new ElectronApp(`file://${__dirname}/index.html`)

/**
 *  - `electron` is the electron singleton, with attached:
 *  - `electron.windows` {Array} All open windows
 *
 *  See ./electron.js for functionalty.
 */
```

## REFERENCE
https://github.com/electron/electron-quick-start

## TODO
- [ ] Add necessary addons found under [awesome-react](https://github.com/sindresorhus/awesome-electron#boilerplates)
    - [ ] Add packaging
        - [ ] Add `electron-builder`/`electron-release`/`electron-updater`, to allow for auto-updates
    - [x] Add redux devtools
    - [x] Add react devtools
    - [x] Add `devtron` devtools

# LAYOUT - REACT REDUX

A layout for a `react`, `redux` client with dev server.

## Installation
```bash
git clone https://github.com/nfour/js-structures _temp-js-structures
cp -R ./_temp-js-structures/layouts/react-redux .
rm -rf _temp-js-structures
cd react-redux
npm run install:all
npm start
```

## Features
- [x] Build
    - [x] Webpack
    - [x] File watching
    - [x] Livereload
    - [x] Preconfigured gulp tasks & sane defaults
    - [x] Stylus & CSS packaging and url resolution
    - [x] File resolving & packaging
    - [x] React/Redux structure
    - [x] ES Linting checks
    - [x] `process.env.NODE_ENV` on client
    - [x] Minified (Uglified) builds
    - [x] Webpack 2.0

- [x] Configured react router
- [x] Consistant, optimized babel featureset on client & server
- [x] EJS templating
- [x] Isomorphic structure
- [x] Minimal express server
- [x] Mocha test infrastructure, isomorphic
- [x] Coverage testing via `nyc` when using `npm test`
- [ ] Example mocha tests

## Configs
Configs should exist throughout the app as necessary and follow a basic structure:
- `default.js` the defaults which are built on top of
- `production.js` a complete production config
- `development.js` a complete development config
- `index.js` is the current env
- `lutils` package for cloning & merging recursively.

The rest of the config structure is up to the data.
Ensure that any development/machine/local specific configs are in a `.gitignore`, with an accompanying `*.template.js` to ensure reproducability.

When configs need to be shared in both client and server, create a root config which only includes that data, as a client sharing a server config could be a security issue.


## Tests
Tests should be inlined within each app. Consider this structure:

```html
./client
    ./__tests__
        setup.js
        index.spec.js

    ./actions
        ./__tests__
            doSomething.spec.js
            somethingElse.spec.js

        doSomething.js
        somethingElse.js

```

Tests are then run using a glob with mocha.

# LAYOUT - REACT REDUX

A layout for a `react`, `redux` client with basic `express` server.

## TODO
- [x] Add livereload to build watch process
- [x] Add url `resolve` prefix for static assets
- [ ] Write some tests

## Installation
- Clone this repo
- `cd layouts/react-redux`
- `npm install`, `npm run install_client`, `npm run install_server`
- `npm run start` will build client, watch server for changes & `npm start` it

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

## NPM
`package.json` should exist in these places:
- `./package.json` build, deployment etc.
- `./server/package.json` server only packages
- `./client/package.json` client only packages

`scripts` in the root `package.json` should exist to install, test, build, start etc.

## Optionals
- `./deploy` as necessary
- `./docs` as necessary
- `./client/`
	- `./stores -> store.js` if the app will only have one store
	- `./sources` as necessary

## Tests
Tests should be inlined within each app. Consider this structure:

```html
./client
	./__test
		index.spec.js

	./actions
		./__test
			doSomething.spec.js
			somethingElse.spec.js

		doSomething.js
		somethingElse.js

	index.js
```

Tests are then run using a glob `/**/*.spec.js` with mocha.

## Variants
- `MULTI APP`
	- Rename `client` with `clients`, add client nesting
	- Rename `server` with `servers`, add server nesting

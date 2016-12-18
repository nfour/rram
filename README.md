![RRAM](http://i.imgur.com/3XyJbkW.png)

**_630 kb_** of RRAM ought to be enough for anyone *(as of 2016-10-20)*.

- **React** & **Redux**
- **Airbnb** linted
- **Modular** by design

## INSTALL

It's recommended to use `yarn`.

```bash
git clone https://github.com/nfour/rram && cd rram
yarn
```

## USAGE

---
- `yarn start`
  - Starts up a `webpack-dev-server` on `http://localhost:8080/webpack-dev-server/`
- `yarn run dash`
  - Just like `yarn start`, but uses `webpack-dashboard`. This shows useful build info.
- `yarn run build`
  - Build to `./dist`
- `NODE_ENV=production yarn run build`
  - Production build to `./dist`

---

- `yarn test`
  - Uses `jest`, runs unit tests
- `yarn run test:unit`
  - Same as `yarn test`
  - `yarn run test:unit -- --watch` to watch
- `yarn run test:integration`
  - Only runs `*.int.test.jsx?` files
  - `yarn run test:integration -- --watch` to watch
---
## BUILD SYSTEM

The build system leverages `webpack` and `webpack-dev-server` exclusively
and all usage is done through the npm scripts above.

There are 3 build related files:
- `webpack.config.js` The base config, used by `webpack` directly
- `webpack.config.dev.js` Development related options
- `webpack.config.prod.js` Production related options

Edit these files to customize the build process to your needs.

## DIRECTORY STRUCTURE
```
___/ index.jsx
     - Routing, initialization & store creation
     |
     |___/ components
     |     - JSX views
     |
     |___/ containers
     |     - State assignment
     |
     |___/ store
           - Redux store management
           |
           |___/ ${storeItemName}
                 |
                 |___/ actions.js
                 |___/ reducer.js
                 |___/ sources.js
```

## FLOW

Where the route is `/`, a render occurs as such:
```
___/ index.jsx
     + State is reduced
     |
     |___/ store/index.js
     |     + Resolve reducers to state
     |     |
     |     |___/ store/Example/reducer.js
     |
     + Route matched
     + State passed down
     |
     |___/ components/Root/Root.jsx
     |     + All routes pass through this component
     |
     |___/ containers/Page.js
     |     + Any route which should inherit a "page" layout passes through this
     |     |
     |     |___/ components/Page/Page.jsx
     |           + Wraps children in a page layout component
     |
     |___/ containers/Example.js
           + Assign state to props
           + Retrieve actions
           |
           |___/ store/Example/actions.js
           |
           + Bind dispatch to actions & assign to props
           |
           |___/ components/Example/Example.jsx
                 + Renders
```

![RRAM](http://i.imgur.com/3XyJbkW.png)

**_630 kb_** of RRAM ought to be enough for anyone *(as of 2016-12-18)*.

This is a boilerplate base-project, intended to standardize on:

- **React** & **Redux**
- **Airbnb** linted
- **Modular** by design

## INSTALL

```bash
git clone https://github.com/nfour/rram && cd rram && yarn
```

## USAGE

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


## BUILD SYSTEM

The build system leverages `webpack` and `webpack-dev-server` exclusively
and all build steps should be done through the npm scripts.

There are 3 build related files:
- `webpack.config.js` The base config, used by `webpack` directly
- `webpack.config.dev.js` Development related options
- `webpack.config.prod.js` Production related options

For a custom build process:
- Edit these files or create variants
- Wire them up with `npm` scripts
- Invoke `bash` scripts from a `./scripts/` folder

There is currently only one entry point, `./client/index.jsx`. A bit of tweaking
to the `webpack.config.js` can yield multiple entries.

## LAYOUT
```
___/ index.jsx
     - Routing, initialization & store creation
     |
     |___/ components
     |     - View related logic ONLY
     |     |
     |     |___/ ${Component}
     |           |
     |           |___/ ${Component}.jsx
     |           |___/ ${Component}.scss
     |           |___/ ${Component}.test.jsx
     |           |___/ SomeSubComponent.jsx
     |
     |___/ containers
     |     - State assignment logic ONLY
     |
     |___/ store(s)
           - Redux store management
           |
           |___/ ${storeName}
                 |
                 |___/ actions
                       - Actions go here
                 |___/ reducer
                       - Reducer logic goes here
                 |___/ sources (Optional)
                       - This is where you pull in data
```

## LAYOUT CONVENTION
- Components:
    - Should be entirely contained within its respective folder
    - Should have all data passed in as props
    - Should always be a stateless component
        - Unless `class` features are needed, such as `state` and `componentDidMount`
        - Should be wrapped in `pure` from `recompose`
            - This will change as react matures to support this by default (also _fiber_)
- Component naming:
    - Use PascalCase
    - If exporting `MyComponent`, the file would be `MyComponent.jsx`
    - The component folder would be `MyComponent` as well
    - For collections, use lowercase:
        - ✓ `/components/pages/MyPage/MyPage.jsx`
        - ✓ `/components/pages/index.js`
- Do not abuse `index` files to make collection imports pretty
    - This can induce race conditions when components rely on each other
    - ✗ `/components/index.js` would be bad, as components can rely on each other
    - ✓ `/components/pages/index.js` may be fine, as pages may be exclusive of each other
    - ✓ `/components/errors.jsx` would be fine

## RENDER FLOW

Where the route is `/`, a render occurs as such:
```
___/ index.jsx
     |
     |___/ store/index.js
           + Resolve reducers to state
           |
           |___/ store/Example/reducer.js
           |
      ____/
     /
     + Route matched
     + State passed down
     |
     |___/ components/Root/Root.jsx
           + All routes pass through this component
           |
           |___/ containers/Page.js
           |     + Any route which should inherit a "page" layout passes through this
           |
           |___/ components/Page/Page.jsx
                 + Wraps children in a page layout component
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

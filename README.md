<img src="https://travis-ci.org/nfour/rram.svg?branch=master" />
&nbsp;
<a href="https://codeclimate.com/github/nfour/rram"><img src="https://codeclimate.com/github/nfour/rram/badges/gpa.svg" /></a>
<a href="https://codeclimate.com/github/nfour/rram"><img src="https://codeclimate.com/github/nfour/rram/badges/issue_count.svg" /></a>

<img src="http://i.imgur.com/3XyJbkW.png" />


**_~630 kb_** of RRAM ought to be enough for anyone *(as of 2016-12-18)*.

A project boilerplate \
 **React**, **Redux**, **Airbnb** linted, **Modular** by design

---

- [Install](#install)
- [Usage](#usage)
- [Layout](#layout)
- [Layout Convention](#layout-convention)
- [Render Flow](#render-flow)
- [Build System](#build-system)

---

## Install

```bash
git clone https://github.com/nfour/rram && cd rram && yarn
```

## Usage

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
    - Only runs `*.test.jsx?` files, not integration tests
    - `yarn run test:unit -- --watch` to watch
- `yarn run test:integration`
    - Only runs `*.int.test.jsx?` files
    - `yarn run test:integration -- --watch` to watch

## Layout

```js
  `/index.jsx` // Routing, initialization & store creation
  `/components/` // View related logic ONLY
      `/${Component}/`
          `/${Component}.jsx`
          `/${Component}.scss`
          `/${Component}.test.jsx`
          `/SomeSubComponent.jsx`
  `/containers/`
      `/${Container}.js` // State assignment logic ONLY
  `/store/` // Redux store management
      `/${storeName}/` // This should map to store[storeName]
          `/actions` // Redux actions
          `/reducer` // Redux Reducers
          `/sources` // (Optional) This is where you would pull in external data
```

## Layout Convention

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

## Render Flow

The example below describes the flow of a typical render.

```md
| /index.jsx
|___
    | /store/index.js
    |___
        | /store/Example/reducer.js
        |___
            |
            | - Resolve reducers to state
     _______|
    |
    | - Routes matched
    |
    | /components/Root/Root.jsx
    |___
        |
        | /containers/Page.js
        |___
            |
            | /components/Page/Page.jsx
            |___
                |
                | - Wraps children in a page layout component
                |
                | /containers/Example.js
                |___
                    |
                    | - Assign state to props
                    |
                    | - Retrieve actions
                    |___
                        |
                        | /store/Example/actions.js
                     ___|
                    |
                    | - Bind dispatch to actions & assign to props
                    |
                    | /components/Example/Example.jsx
                    |___
                        |
                        | - Renders
                        |
                        +
```

## Build System

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

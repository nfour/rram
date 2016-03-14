# NodeJS Structures & Conventions

Contains battlehardened systems for:
- Isomorphic project layouts
- Build systems, `gulp`, `webpack`, `babel`
- Testing, linting, unit & integration, `mocha`, `eslint`, `karma`
- Client architectures: `react`, `redux`
- Server architectures: `hapi`, `express`
- Deployment: `flightplan`

**PROTIP**: To view; Use [octotree](https://chrome.google.com/webstore/detail/octotree/bkhaagjahfmjljalopjnoealnfndnagc) or [atom.io](http://atom.io).

## Babel
Babel has been configured to:

- Ensure server & client Babel feature sets are **identical**
- Support all of es2015
- Support `react`, `jsx` in client & server
- Support ES6-7 features:
    - `object-rest-spread`
        - ES2016
        - Example: `{ ...obj }`
    - `class-properties`
        - ES2017
        - Example: `class Test { static prop = {}; }`
    - `add-module-exports`
        - Ensures commonjs & ES6 exports behave the same
    - `async-to-module-method`
        - `ES2016`
        - Example: `async function() { await fetch('http://stuff.com') }`
        - Causes all `async` functions to become `bluebird` `coroutine`'s. Exact same syntax as the async await poised to be integrated into ES7, but ensures the promise involved an instance of `bluebird`.


## ESLint
Eslint has been configured to:
- Conform to the style guide, roughly
- Trigger on some anti-patterns
- Detect unused variables, and undefined variables in use
- Will run on build & tests including the editor
- Detects instances where semicolons are needed for you

To configure eslint for `atom`:
- Install the `linter-eslint` atom package
- `npm install` within the project directory to ensure `babel-eslint` is avaliable to the editor.


## Style Guide

See the style guide [here](./style-guide.md)

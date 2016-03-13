# NodeJS Structures & Conventions

Will contain & maintain battlehardened systems for:
- Isomorphic project & file structures
- Build systems, `gulp`, `webpack`, `babel`
- Testing, `mocha`, `eslint`
- Linting `eslint`
- Client architectures `react`, `redux`
- Server architectures `hapi`
- Deployment `flightplan`

**PROTIP**: Use [octotree](https://chrome.google.com/webstore/detail/octotree/bkhaagjahfmjljalopjnoealnfndnagc) or view `LAYOUTS` in editor.

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
    - `decorators`
        - ES2017
        - Currently unused, but may fit in when clear
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

To configure eslint for `atom`:
- Install the `linter-eslint` atom package
- `npm install` within the project directory to ensure `babel-eslint` is avaliable to the editor.


## Style Guide

See the style guide [here](./style-guide.md)

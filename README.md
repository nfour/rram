# JS STRUCTURES
Javascript convention and standardization.

## Guides
- [Guides](./guides/README.md)
    - [Style Guide](./guides/style-guid.md)
    - [React Anti Patterns](./guides/react-anti-patterns.md)

## BABEL
Babel has been configured to:
- Ensure feature sets are **identical** on server & client
- Support `es2015` and `stage-1`
- Additional plugins:
    - `add-module-exports`
        - Ensures commonjs & ES6 exports behave the same
    - `async-to-module-method`
        - Ensures all `async` functions retunr `bluebird` promises

## LINTING
Eslint has been configured to:
- Conform to the style guide, roughly
- Autofix various aspects
- Trigger on some anti-patterns
- Detect unused variables, and undefined variables in use
- To be used in the editor only as to not effect build times

To configure eslint for `atom`:
- Install the `linter-eslint` atom package (and `linter`)
- `npm install` within each project directory, ensuring `babel-eslint` is avaliable to the editor.


## LICENSE

See [license](./LICENSE.md)

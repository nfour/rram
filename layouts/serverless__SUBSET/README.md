# LAYOUT - SERVERLESS SUBSET

A serverless subset layout, intended to be contained enough to be dropped into any existing layout; [layouts/react-redux](../react-redux) or simply [layouts/base](../base).

### FEATURES
- Fully featured babel for lambda compatibility
- Configured webpack.config for lambda compatibility

### LAYOUT MERGING
In, for example, the [layouts/react-redux](../react-redux) layout, there are several places where integration is usually required.

- Copy in `./backend`
- Change the `gulpfile.babel.js` dist folder to `./backend/client/dist`
- Add `cd ./backend && npm i` to the `install:all` npm script

### USAGE
- `cd ./backend`
- `npm i`
- `sls init` to init
- `sls function test run` to test a function compiles
- `sls dash deploy` to use a deploy ui
- `sls client deploy` to deploy `./backend/client/dist` to S3
- It may also be necessary to set up `sls meta sync`

### FOLDER STRUCTURE
```
./backend
    ./functions
        ./<functionName>
            handler.js
            s-function.js
    ./lib
        - Should contain functionality for the lambda handlers.

```

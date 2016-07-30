# LAYOUT - SERVERLESS SUBSET

This layout is a subset layout, specifically of `react-redux` (or any project) and should be copied straight into a `react-redux` structure in order to supply a serverless backend and S3 client asset upload.

## LAYOUT MERGE INSTRUCTIONS
- Copy `./backend` into a `react-redux` application
- Ensure the `gulpfile.babel.js` has its `dist` folder configured to `./backend/client/dist`
- Add `cd ./backend && npm i` to any npm `install:all` script
- Modify the `s-project.json` with a new name
- Remember that as this a subset, it will inherit all babel configurations from the root project.
    - You may need to add `json-loader` to the `webpack.config.js` for example.

## USAGE
- `cd ./backend`
- `npm i`
- `sls init` to init
- `sls function test run` to test a function compiles
- `sls dash deploy` to use a deploy ui
- `sls client deploy` to deploy `./backend/client/dist` to S3
- It may also be necessary to set up `sls meta sync`

## FOLDER STRUCTURE
```
./backend
    ./functions
        ./<functionName>
            handler.js
            s-function.js
    ./lib
        - Should contain functionality for the functions

```

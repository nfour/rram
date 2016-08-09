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
- `sls client deploy` to deploy `./backend/client/dist` to S3
- It may also be necessary to set up `sls meta sync`
- Consider adding npm or gulp scripts to automate some of this.

### HINTS

#### CLOUD FORMATION
- DYANMODB - `"Type": "AWS::DynamoDB::Table"`
    - When `"DeletionPolicy": "Retain"` is set, removing the stage/resources will fail. Remove this in development or set a meta variable.

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

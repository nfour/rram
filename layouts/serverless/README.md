## Serverless structure

## TODO
- [x] Add an S3 bucket to make `client deploy` work
- [x] Test full deployment
- [ ] Test full rendering of client assets from S3 via API Gateway & utilizing a fetch to a lambda
- [ ] Strip out useless stuff from `build` tasks, maybe opt for a webpack.config.js for convention

## Installation
- Edit `serverless/s-project.json` and `s-resources-cf` as necessary
    - Change the name

- Install and init
```
npm i -g serverless gulp
npm run i:all
sls project init
```
If it still doesn't work, run `sls project create`, which should build a nested directory, and copy the missing files back into `./serverless`


## Usage
- `gulp start`
    This will build and start the development `./build/server` server

- `gulp deploy`
    Builds and deploys client assets and deploys lambdas
    - `--function=<fnName>` (Optional) specify a lambda function

- `gulp build`
    Builds to `./serverless/client/dist`

## Project structure
```

- ./build
    Build for the client, used by the gulpfile

      - ./server
        A development server for rapid client development

- ./client
    The client app

- ./server (Arbitrary name)
    In this example, contains code lambdas will target from within ./serverless/functions/
    This is only an example and the structure would be dictated by each app.

- ./serverless
    The serverless setup, in its own folder in order to use it more like a build system.

    ./functions
    To contain lambdas. These lambdas should only be connective, to include from the root project directory.

```

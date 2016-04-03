# LAYOUT - PACKED SERVER

A layout for packing a server up, transpiling it to ES5. For use in AWS Lambda and other server environments with locked down node versions.

### TODO

- [ ] Use Webpack 2.0
    - [ ] Use uglify built-in plugin
- [ ] Ensure support for `serverless-webpack-plugin`
- [ ] Add deploy processes
    - [ ] Build on correct AWS AMI via flightplan
    - [ ] Shrinkwrap npm dependencies

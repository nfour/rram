# LAYOUT - PACKED SERVER

A layout for packing a server up, transpiling it to ES5.

## TODO
- [ ] Unbloat the build system further
- [ ] Create variant just for babel (for npm libraries)

## Installation
```bash
git clone https://github.com/nfour/js-structures _temp-js-structures
cp -R ./_temp-js-structures/layouts/packed-server .
rm -rf _temp-js-structures
cd packed-server
npm install
npm start
```

### Features
- [x] Fully featured Babel compatible with `node@0.10.x`
- [x] Unit & Coverage test support
- [x] Nodemon for development
- [x] Webpack build system with minification
- [x] Serverless plugin support
- [ ] Webpack 2.0 support & optimization
- [ ] Deploy process
    - [ ] Build on remote AWS AMI
    - [ ] Package into zip

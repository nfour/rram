# LAYOUT - BASE

This layout is the skeleton for a babel app.

- See [react-redux](/layouts/react-redux) for a superset.

## Installation
```bash
git clone https://github.com/nfour/js-structures _temp-js-structures
cp -R ./_temp-js-structures/layouts/base .
rm -rf _temp-js-structures
cd base
npm i
```

## Configuration

- Substitute preset `es2015-node5` with the appropriate configuration for your target environment.
    - `es2015` for browsers
        - Note: May need to include `babel-polyfill` for old browsers
    - `es2015-node4` for node@4.x.x
    - `es2015-node5` for node@5.x.x
    - `node6` for node@6.x.x
    - To have the same `.babelrc` for both server and client you will still want different presets:
        - Create your `.babelrc` with you server config, then substitute that preset with `es2015` for browser targets in your gulpfile

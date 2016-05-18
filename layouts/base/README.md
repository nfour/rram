# LAYOUT - BASE

This layout is the skeleton for a babel jsjs app.

- See [react-redux](/layouts/react-redux) for an expanded app.

## Installation
```bash
git clone https://github.com/nfour/js-structures _temp-js-structures
cp -R ./_temp-js-structures/layouts/base .
rm -rf _temp-js-structures
cd base
npm run install_all
```

## Babel

Substitude presets `es2015-node5` with the appropriate configuration for your target environment.
- `es2015` for everything
- `es2015-node5` or `node6` for node
- Substitute in `es2015` only for browser targets 

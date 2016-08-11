# LAYOUT - SERVERLESS V1.0 SUBSET

A serverless subset layout, intended to be contained enough to be dropped into any existing layout; [layouts/react-redux](../react-redux) or simply [layouts/base](../base).

### USAGE

- Configure `~/.aws/credentials`

Currently, serverless@1.0.0-beta.1.1 does not support configuring the credentials profile.

Instead choose one of the following methods:
- Set a `[default]` credential in the ini
- In your shell, do this once: `export AWS_PROFILE=myProfileName`

To deploy:
```
sls deploy
```

If you encounter issues, remove first:
```
sls remove && sls deploy
```

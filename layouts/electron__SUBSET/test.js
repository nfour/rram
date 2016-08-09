const child = require('child_process')
    .exec(`cd ./electron && npm start file://${__dirname}/test.html`)

child.stdout.on('data', console.log)
child.stderr.on('data', console.error)

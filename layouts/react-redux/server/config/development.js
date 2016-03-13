import { merge, clone } from 'lutils'

// Optional require
try { var local = require('./local') } catch (e) {}

export default merge(
    clone( require('./default') ),
    {
        port: 1337,
    },
    local || {}
)

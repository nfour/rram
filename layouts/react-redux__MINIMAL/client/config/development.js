import { merge, clone } from 'lutils'

export default merge(
    clone( require('./default') ),
    {
        // ...

        test: 'development'
    }
)

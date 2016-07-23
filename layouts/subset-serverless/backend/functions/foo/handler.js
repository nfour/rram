import 'babel-polyfill'
import { FOO } from '../../lib/foo'

export function handler(event, context, done) {
    done = done || context.done

    return done(null, {
        message: JSON.stringify(FOO)
    })
}

import 'babel-polyfill'
import { TEST } from '../../../server/test'

export function handler(event, context, done) {
    done = done || context.done

    return done(null, {
        message: JSON.stringify(TEST)
    })
}

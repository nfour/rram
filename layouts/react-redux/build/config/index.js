import path from 'path'

export default {
    source  : path.resolve(__dirname, '../../'),
    dist    : path.resolve(__dirname, '../../dist'),

    webpack : require('./webpack')
}

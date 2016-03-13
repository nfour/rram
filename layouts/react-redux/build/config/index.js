import path from 'path'

export default {
    source  : path.resolve(__dirname, '../../'),
    dist    : path.resolve(__dirname, '../../dist'),

    resolve  : '', // Prepended to resolved urls, eg. {/customPrefixUrlHere/}662d7d.jpg

    webpack : require('./webpack')
}

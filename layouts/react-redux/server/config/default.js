import path from 'path'

export default {
    name  : "App",
    host  : "0.0.0.0",
    paths : {
        views : path.resolve(__dirname, '../../client/views'),
        dist  : path.resolve(__dirname, '../../dist/client'),
    }
}

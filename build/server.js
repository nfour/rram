import express from 'express';
import path from 'path';
import { argv } from 'yargs';
import fs from 'fs';

const { view, dist, port, host } = argv;

['view', 'dist'].forEach((key) => {
  if (!argv[key]) throw new Error(`Invalid args, need a valid --${key}`);
});


const CONFIG = {
  paths: {
    view: path.resolve(__dirname, '../../', `${view || ''}`),
    dist: path.resolve(__dirname, '../../', `${dist || ''}`),
  },
  port: port || 1337,
  host: host || '0.0.0.0',
};

export const APP = express();

APP.use('/', express.static(CONFIG.paths.dist));
APP.get('/*', (req, res) => {
  res.setHeader('content-type', 'text/html');
  fs.createReadStream(CONFIG.paths.view).pipe(res);
});

export const SERVER = APP.listen(CONFIG.port, CONFIG.host, () => {
  console.log(`Listening on ${SERVER.address().address}:${SERVER.address().port}`);
});

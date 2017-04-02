import jsDom from 'jsdom';
import path from 'path';
import fs from 'fs';
import React from 'react';
import ReactDOM from 'react-dom';

import '../lib/polyfill';

const body = fs.readFileSync(path.resolve(__dirname, '../index.html'));

global.document = jsDom.jsdom(body);
global.window = document.defaultView;

global.React = React;
global.ReactDOM = ReactDOM;

// Adds window stuff to the global
Object.keys(global.window).forEach((k) => {
  if (!(k in global)) global[k] = document.defaultView[k];
});

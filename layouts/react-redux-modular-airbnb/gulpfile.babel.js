import path from 'path';
import gulp from 'gulp';
import gulpNodemon from 'gulp-nodemon';
import fs from 'fs';
import del from 'del';
import Build from './build/Build';

//
// CONFIGURATIONS
//

const PATHS = {
  server : './build/server',
  dist   : './dist',
};

const COMPRESS = !!process.env.COMPRESS || process.env.NODE_ENV === 'production';

const BABELRC = JSON.parse(fs.readFileSync('./.babelrc', 'UTF8'));

// Use a the full preset for the clients
BABELRC.presets.forEach((preset, i) => {
  if (/es2015/.test(preset)) BABELRC.presets[i] = 'es2015';
});

// Add transforms to clientside
BABELRC.plugins.push([
  'transform-runtime', { polyfill: true, regenerator: true },
]);

const NODEMON = {
  ignore : ['node_modules'],
  exec   : `node -r babel-register ${PATHS.server}`, // Will be appended to below
  ext    : 'js json',
  env    : { NODE_ENV: 'development' },
  watch  : false,
};

const LIVE_RELOAD = {
  port: 35729,
  appendScriptTag: true,
  ignore: null,
};


//
// EXPOSED TASKS
//


// There is currently only one client in this app
// but there can be many
const clients = {
  client: new Build({
    dist   : path.resolve(__dirname, PATHS.dist, './client'),
    source : path.resolve(__dirname, './client'),

    builds: [{
      source   : './index.jsx',
      babel    : BABELRC,
      compress : COMPRESS,
      webpack  : { progress: true },
    }],
  }),
};


for (const key in clients) {
  const CLIENT = clients[key];

  const viewPath = path.resolve(CLIENT.config.source, './index.html');


  /**
   *  START DEVELOPMENT SERVER & WATCH
   */
  gulp.task(`start:${key}`, [`clean:${key}`, `watch:${key}`], async () => {
    return gulpNodemon({
      ...NODEMON,
      exec: `${NODEMON.exec} --dist=${CLIENT.config.dist} --view=${viewPath}`,
    });
  });

  /**
   *  BUILD DIST
   *  - For prod, set NODE_ENV=production first.
   */
  gulp.task(`build:${key}`, [`clean:${key}`, `copy-assets:${key}`], async () => {
    return CLIENT.build();
  });

  /**
   *  WATCH & BUILD, LIVERELOAD
   */
  gulp.task(`watch:${key}`, [`clean:${key}`, `copy-assets:${key}`], async () => {
    return CLIENT.build({ watch: true, liveReload: LIVE_RELOAD });
  });

  gulp.task(`copy-assets:${key}`, async () => {
    const viewFile = fs.readFileSync(viewPath);
    fs.writeFileSync(path.resolve(CLIENT.config.dist, './index.html'), viewFile);
  });

  gulp.task(`clean:${key}`, async () => {
    return del(`${CLIENT.config.dist}/*`);
  });
}

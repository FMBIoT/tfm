global.__basedir = __dirname;
require('app-module-path').addPath(__dirname + '/../');

const app = require('server/config/app');

const port = process.env.PORT || 5000;

app.listen(port, () => {
  /* eslint-disable no-console */
  // console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});


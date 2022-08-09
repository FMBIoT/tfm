const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      $ENV: {
        IP_HOST: JSON.stringify(process.env.IP_HOST)
      }
    })
  ]
};
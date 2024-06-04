'use strict';

const webpack = require('webpack'); // eslint-disable-line no-unused-vars

module.exports = {
  entry: './browser/index.js',
  output: {
    path: __dirname,
    filename: './public/js/bundle.js',
  },
  context: __dirname,
  devtool: 'source-map',
  mode: 'development', // or 'production'
  module: {
    rules: [
      {
        test: /jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          }
        }
      }
    ]
  }
};

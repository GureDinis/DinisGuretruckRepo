const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
dotenv.config();

const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

const port = process.env.PORT || 3000;
const url = process.env.PUBLIC_URL || '';
const API_URL = process.env.API_URL || '';
const webApiVersion = process.env.webApiVersion || '';
const ver = process.env.REACT_APP_VERSION || '';

module.exports = ({ mode } = { mode: 'production' }, argv) => {
  const isProduction = argv.mode === 'production' || process.env.NODE_ENV === 'production';
  const filename = isProduction ? `bundle.${ver}.[contenthash].js` : 'bundle.js';
  return {
    mode: isProduction ? 'production' : 'development',
    entry: './src/index.js',
    output: {
      publicPath: '/',
      path: path.resolve(__dirname, 'build'),
      filename: filename,
    },
    resolve: {
      extensions: ['.js', '.jsx'], // Add this section
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'public/index.html',
        favicon: 'public/favicon.ico',
      }),
      new webpack.DefinePlugin({
        'process.env.PUBLIC_URL': JSON.stringify(url),
        'process.env.REACT_APP_VERSION': JSON.stringify(ver),
        'process.env.API_URL': JSON.stringify(API_URL),
        'process.env.webApiVersion': JSON.stringify(webApiVersion),
      }),
      mode === 'production' &&
        new WorkboxWebpackPlugin.GenerateSW({
          clientsClaim: true,
          skipWaiting: true,
          // Define runtime caching rules.
          runtimeCaching: [
            {
              // Match any request that ends with .png, .jpg, .jpeg or .svg.
              urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
              // Apply a cache-first strategy.
              handler: 'CacheFirst',
              options: {
                // Use a custom cache name.
                cacheName: 'images',
                expiration: {
                  maxEntries: 10,
                },
              },
            },
          ],
        }),
    ],
    devServer: {
      host: 'localhost',
      port: port,
      historyApiFallback: true,
      hot: true,
      open: true,
    },
  };
};

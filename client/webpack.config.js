const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // Add HtmlWebpackPlugin to generate HTML files
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        chunks: ['main'],
      }),
      new HtmlWebpackPlugin({
        template: './src/install.html',
        filename: 'install.html',
        chunks: ['install'],
      }),
      // Add WebpackPwaManifest to generate the manifest file
      new WebpackPwaManifest({
        name: 'Your App Name',
        short_name: 'App Name',
        description: 'Your app description',
        background_color: '#ffffff',
        theme_color: '#2196F3',
        icons: [
          {
            src: path.resolve('src/icon.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
      // Add InjectManifest to include the service worker
      new InjectManifest({
        swSrc: './src/sw.js', // path to your service worker file
        swDest: 'service-worker.js',
      }),
    ],
    module: {
      rules: [
        // Add CSS loader to handle CSS files
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        // Add Babel loader to transpile JavaScript files
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};

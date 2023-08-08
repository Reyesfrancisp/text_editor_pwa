const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

const is_prod = process.env.NODE_ENV === 'production';

const plugins = [
  new InjectManifest({
    swSrc: './src-sw.js', // Path to your service worker file
    swDest: 'service-worker.js', // Output service worker filename
  }),
  new HtmlWebpackPlugin({
    title: 'Webpack Example',
    template: './index.html'
  }),
  
];

if (is_prod) {
  plugins.push(new WebpackPwaManifest({
    name: 'Notes PWA App',
    short_name: 'NPWAApp',
    description: 'Amazing note taking application!',
    background_color: '#555',
    theme_color: '#35ae9b',
    display: 'standalone',
    inject: true,
    publicPath: '/',
    // crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
    icons: [
      {
        src: path.resolve('src/images/logo.png'),
        sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
        ios: true
      },
      {
        src: path.resolve('src/assets/images/logo_192.png'),
        size: '192x192',
        purpose: 'maskable'
      }
    ]
  }))
}

module.exports = {
  entry: './src/js/index.js',
  mode: is_prod ? 'production' : 'development',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js',
    clean: true,
    environment: {
      arrowFunction: false,
      bigIntLiteral: false,
      const: false,
      destructuring: false,
      dynamicImport: false,
      forOf: false,
      module: false
    },
    // publicPath: './' // set assets path to relative
  },
  devServer: {
    compress: true,
    port: 8000,
    open: true,
    hot: true,
    watchFiles: ['./src/*.html']
  },
  plugins,
  module: {
    rules: [
      // Rule for processing Sass files
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      // Rule for processing CSS files
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      // Rule for processing image files
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      // Rule for transpiling JavaScript using Babel
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: 'ie 9' }]]
          }
        }
      }
    ],
  },  
  optimization: {
    minimize: true,
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      // `...`,
      new CssMinimizerPlugin(),
      new TerserPlugin()
    ],
  },
}
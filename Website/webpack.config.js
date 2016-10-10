const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const koutoSwiss = require('kouto-swiss');

// const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  context: path.resolve('src'),
  entry: {
    // 'babel-polyfill',
    index: "./js/index",
    account: "./js/account"
  },
  output: {
    publicPath: './',
    path: path.join(__dirname, "www"),
    filename: 'js/[name].js',
    chunkFilename: 'js/[id].chunk.js'
  },

  path: path.resolve('./www'),
  resolve: {
    modulesDirectories: [
      ".",
      "src",
      'node_modules',
      'bower_components'
    ],
    extensions: [
      '',
      '.js',
      '.min.js',
      '.es6',
      '.css',
      '.styl',
      '.pug',
      '.otf',
      '.svg',
      '.ttf',
      '.woff',
      '.woff2'
    ],
  },
  module: {
    loaders: [
      {
        test: /\.(es6|js)$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!stylus-loader', {publicPath: '/'})
      },
      {
        test: /\.pug$/,
        include: [
          path.resolve(__dirname, "src"),
        ],
        loader: 'pug-html-loader'
      },
      {
        test: /\.(svg|ttf|otf|eot|woff|woff2)$/,
        loader: 'file?name=[path][name].[ext]'
      },
      {
        test: /\.(png)$/,
        loader: 'file?name=[path][name].[ext]'
      }
    ]
  },
  stylus: {
    use: [koutoSwiss()],
    // define: {
    //   'inline-image': require('stylus-inline-webpack')({
    //     limit: 50000
    //   })
    // }
  },
  plugins: [
  new webpack.optimize.UglifyJsPlugin(),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: true,
    //   mangle: true,
    //   comments: false,
    //   sourceMap: true,
    //   compressor: { warnings: false }
    // }),

    // new webpack.optimize.UglifyJsPlugin({
    //     compress: {
    //         warnings: false,
    //     },
    //     output: {
    //         comments: false,
    //     },
    // }),
    new CleanWebpackPlugin(['www'], {
      root: __dirname,
      verbose: true, 
      dry: false,
      exclude: ['']
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve('src/media'),
        to: path.resolve('www/media')
      },
      {
        from: path.resolve('src/images'),
        to: path.resolve('www/images')
      },
      {
        from: path.resolve('src/downloads'),
        to: path.resolve('www/downloads')
      },
      {
        from: path.resolve('src/php'),
        to: path.resolve('www/php')
      },
    ]),
    new ExtractTextPlugin("css/[name].css"),
    // new ExtractTextPlugin({
    //   filename: 'css/[name].css'
    // }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'pug-html!src/pug/index.pug',
      inject: 'body',
      cache: true,
      // files: {
      //   css: [ 'styles.css' ]
      // },
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      filename: 'account.html',
      template: 'pug-html!src/pug/account.pug',
      inject: 'body',
      cache: true,
      // files: {
      //   css: [ 'account.css' ]
      // },
      chunks: ['account']
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   filename: 'js/commons.js',
    //   name: 'commons'
    // }),
  ],
  reslove: {
    modulesDirectorises: ['node_modules', 'src'],
    extensions: ['', '.js', '.es6', '.styl'],
  },
  resloveLoader: {
    modulesDirectorises: ['node_modules'],
    modulesTemplates: ['*-loader', '*'],
    extensions: ['', '.js'],
  },
  watch: true,
  watchOptions: {
    aggregateTimeout: 100
  },
  devtool: 'source-map',
  // devtool: 'cheap-inline-module-source-map',
  devServer: {
    proxy: {
      '*': 'http://localhost:8080'
    },
    contentBase: 'www',
    hot: true,
    colors: true,
    progress: true
  },
};

// if(NODE_ENV == 'production') {
//   module.exports.plugins.push(
//     new webpack.optimize.UglifyJsPlugin({
//       compress: {
//         warnings: false,
//         drop_console: true,
//         unsafe: true
//       }
//     })
//   )
// };
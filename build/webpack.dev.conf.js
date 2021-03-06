var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var utils = require('./utils')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    loaders: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // eval-source-map is faster for development
  devtool: '#eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      title: '睿云',
      filename: 'index.html',
      template: 'index.html',
      chunks: ['manifest', 'vendor',"app"],
      inject: true,
    }),
    new HtmlWebpackPlugin({
      filename: 'index_social.html',
      template: 'index.html',
      chunks: ['manifest', 'vendor',"app_social"],
      inject: true,
      title: '睿云pd'
    }),
    new HtmlWebpackPlugin({
      filename: 'index_doctor.html',
      template: 'index.html',
      title: "医生查询系统",
      chunks: ['manifest', 'vendor',"app_doctor"],
      inject: true,
      title: '睿云医生端'
    }),
  ]
})

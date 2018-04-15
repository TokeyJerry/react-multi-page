
/**
 * Created By Jianwen Tie
 * 
 * 编写配置文件，要有最基本的文件入口和输出文件配置信息等
 * 里面还可以加loader和各种插件配置使用
 */ 
 
'use strict';

const { resolve, join } = require('path');
const ROOT_PATH = resolve(__dirname);
const { plugins, entry } = require('./config/fileConfig');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

plugins.push(new ExtractTextPlugin({
    filename:  (getPath) => {
      return getPath('[name].css').replace('css/js', 'css');
    },
    allChunks: true
  }));

module.exports = {
  // 全局构建根目录
  context: resolve(__dirname, 'src'),
  // 项目入口文件
  // devtool: "source-map",
  entry: entry,
  // 编译之后的输出路径
  output: {
    path: join(ROOT_PATH, 'client/views'),
    publicPath: '/',
    filename: '[name].js'
  },  
  module: {
    rules: [
      {
        test: /\.jsx?$/, // 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx后缀名的文件
        use: [
          {
            loader: 'babel-loader',  // options 参数可通过配置文件 .babelrc 文件配置
            // query: {
            //   presets: ['es2015', 'react']
            // }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/, // Only .css files
        use: ExtractTextPlugin.extract({
          use: 'css-loader'
        })
      },
      {
        test: /\.(jpe?g|png|gif|ico)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'images/[hash:8][name].[ext]'
          }
        }]
      }
    ]
  },
  plugins: plugins
};

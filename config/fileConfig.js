
/**
 * @文件路径配置文件
 * 
 */

let isDev = process.env.NODE_ENV === 'development';

const webpack = require('webpack');
const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=10000&reload=true';
const HtmlWebpackPlugin = require('html-webpack-plugin');

const fs = require('fs');
const { join, resolve } = require('path');

let entryFile = {};
let pluginsHtml = [];
let filePath = resolve(__dirname, '../src/pages');

const readFileFn = function _readFileFn (fileRouts) {
	fs.readdirSync(fileRouts).forEach(file => {

		let stat = fs.lstatSync(join(fileRouts, file));

		if (stat.isDirectory()) {
			var fileNameRouts = join(fileRouts, file);

			fs.readdirSync(fileNameRouts).forEach((fileName) => {

			  let filestat = fs.lstatSync(join(fileNameRouts, fileName));

			  if (filestat.isFile() && fileName.endsWith('.js')) {
					let fileJsArr = join(fileNameRouts, fileName).match(/(?:pages\/)(.*)+(.js)$/);

					let keys = fileJsArr[1];
					let values = '';

					if (isDev) {
						values = ['./' + fileJsArr[0], hotMiddlewareScript]
					} else {
						values = './' + fileJsArr[0];
					}
					
					entryFile[keys] = values;
			  }

			  if (filestat.isFile() && fileName.endsWith('.html')) {
			  	let fileHtmlArr = join(fileNameRouts, fileName).match(/(?:pages\/)(.*)+(.html)$/);
			  	
			  	let htmlPlugin = new HtmlWebpackPlugin({
            filename: `${fileHtmlArr[1]}.html`,
            template: fileHtmlArr[0],
            chunks: ['vender', fileHtmlArr[1]],
            chunksSortMode: 'manual',
            inject: true,
				    hash: true,
				    xhtml: true,
        	});

			  	pluginsHtml.push(htmlPlugin);
			  }
			  
			});
		}

	});
}(filePath);

let devConfig = {
	isDev: isDev,
	entry: {
		"vender": ['./commons/our.js', './commons/common.js', 'webpack/hot/dev-server', hotMiddlewareScript] // 额外插件打包成vender
	},
	plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};

let proConfig = {
	isDev: isDev,
	entry: {
		vender: ['./commons/our.js', './commons/common.js']
	},
	plugins: []
};

Object.assign(isDev ? devConfig.entry : proConfig.entry, entryFile);
if (isDev) {
	devConfig.plugins = devConfig.plugins.concat(pluginsHtml);
} else {
	proConfig.plugins =  proConfig.plugins.concat(pluginsHtml)
}

module.exports = isDev ? devConfig : proConfig;


/* 
 * 项目入口文件 app.js
 * 
 * */

'use strict'

/*====== 引入核心模块 ======*/
const { resolve, join } = require('path');
const fs = require('fs');

/*====== 引入配置信息项【环境变量】 ======*/
const envConfig = require('./config/envConfig');
const fileRouterConfig = require('./server/router/fileRouterConfig');

/*====== 引入 express 模块 ======*/
const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');

if (envConfig.isDev) {
	/*====== 引入 webpack 配置文件 ======*/
	const webpack = require('webpack');
	const webpackDevMiddleware = require('webpack-dev-middleware');
	const webpackHotMiddleware = require('webpack-hot-middleware');
	const webpackConfig = require('./webpack.config.js');
	const compiler = webpack(webpackConfig);

	/*====== 配置 webpack ======*/
	app.use(webpackDevMiddleware(compiler, {
		hot: true,
	  publicPath: webpackConfig.output.publicPath,
	  stats: { colors: true }
	}));

	app.use(webpackHotMiddleware(compiler));

	for (let i in fileRouterConfig) {
		/*====== 该处由于 在 dev 环境下 html 存在于内存中，不能访问本地路径 ======*/
		app.get(i, (req, res, next) => {
			let filepath = join(compiler.outputPath, fileRouterConfig[i]);

	    compiler.outputFileSystem.readFile(filepath, function(err, result) {
        if (err) {
            // something error
            return next(err);
        }
        res.set('content-type', 'text/html');
        res.send(result);
        res.end();
	    });
		})
	}

}

/*====== 配置 模板 ======*/
const hbs = require('express-hbs');
app.engine('html', hbs.express4({
  // partialsDir: __dirname + '/views/partials'
}));
app.set('view engine', 'html');
app.set('views', __dirname + '/client/views');

/*====== 配置 cookie session url 解析 ======*/
/*====== url 解析 req.body req.query req.param ======*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'sessiontest',//与cookieParser中的一致
  resave: true,
  saveUninitialized: true,
  maxAge: 3600000
}));

/*====== 配置 静态资源文件 ======*/
app.use(express.static(join(__dirname, 'client/views')));

/*====== 配置 路由器 ======*/
const fileRouter = require('./server/router/fileRouter');
const apiRouter = require('./server/router/apiRouter');

app.use(fileRouter);
app.use(apiRouter);

/*====== 监听端口 ======*/
const server = app.listen(envConfig.port, envConfig.host, () => {
  let host = server.address().address;
  let port = server.address().port;
  console.log(`Server listening on http://%s:%s,    Ctrl+C to stop;    ${new Date()}`, host, port)
});






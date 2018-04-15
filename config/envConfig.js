
/**
 * @环境变量配置文件
 * 
 */

let isDev = process.env.NODE_ENV === 'development';

let devConfig = {
	isDev: isDev,
	host: "127.0.0.1",
	port: "3001"
};

let proConfig = {
	isDev: isDev,
	host: "127.0.0.1",
	port: "8080"
};

module.exports = isDev ? devConfig : proConfig;

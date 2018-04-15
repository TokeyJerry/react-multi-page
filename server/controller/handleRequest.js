
/**
 * @ 引入核心模块
 * @ 引入 request 配置信息
 * 
 */
const request = require('request');
const { requestOptions, domainName } = require('./reqestConfig');

/*====== cross-domain ======*/
let crossDomain = (req, res, next) => {

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
};

/*====== get request ======*/
let getRequestMethod = (req, res, next) => {

	request(Object.assign(requestOptions, {
		url: domainName + req.url,
		method: "GET"
	}), function(error, response, body) {
		if (error) {
			res.json(error);
		}

		res.json(body);
	});
};

/*====== post request ======*/
let postRequestMethod = (req, res, next) => {
	
	request(Object.assign(requestOptions, {
		url: domainName + req.url,
		method: "GET",
		body: req.body || null
	}), function(error, response, body) {
		if (error) {
			res.json(error);
		}

		res.json(body);
	});
};

module.exports = {
	crossDomain,
	getRequestMethod,
	postRequestMethod
};


/**
 * @文件访问
 * @ auth Jianwen Tie
 * 
 */

'use strict';

const express = require('express');
const router = express.Router();
const fileRouterConfig = require('./fileRouterConfig');

/*====== 以下为单纯的渲染页面 ======*/
for (let i in fileRouterConfig) {
	router.get(i, (req, res, next) => {
		res.render(fileRouterConfig[i]);
	});
}

/*====== 以下为带数据渲染页面 ======*/
/**
 * router.get('What you request url', (req, res, next) => {
 *   res.render('Whitch html you want to render', 'your data');
 * })
 */ 
 
module.exports = router;

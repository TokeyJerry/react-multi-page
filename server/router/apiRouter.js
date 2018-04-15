
/**
 * @ api 访问路径
 * @ auth Jianwen Tie
 * 
 */

const express = require('express');
const router = express.Router();
const request = require('request');

/*====== 获取请求处理方法 ======*/
const { crossDomain, getRequestMethod, postRequestMethod } = require('../controller/handleRequest');

/**
 * @param1 api 访问 都已 “/api/功能”开头[处理其他功能的 api ]
 * @param2 auth 访问 都已 “/auth/功能”开头[与用户有关的 api ]
 * @param3 路由部分对应 controller 部分 调取函数
 */

/*====== 以下为设置跨域请求 ======*/
router.all('*', crossDomain);

/**
 * @ 获取 api GET 路径
 * @ 设置 api GET
 * 
 */
/*====== 获取 api GET 路径 【即用及定义】 ======*/
const { ydBankGetMethod } = require('./apiRouterGetMethodConfig');

/*====== 以下为设置 GET 请求 ======*/
ydBankGetMethod.forEach((item, index) => {
	router.get(item, getRequestMethod);
});

/**
 * @ 获取 api POST 路径
 * @ 设置 api POST
 * 
 */
/*====== 获取 api POST 路径 【即用及定义】 ======*/
const { ydBankPostMethod } = require('./apiRouterPostMethodConfig');

/*====== 以下为设置 POST 请求 ======*/

ydBankPostMethod.forEach((item, index) => {
	router.post(item, postRequestMethod);
});

module.exports = router;

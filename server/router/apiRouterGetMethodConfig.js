
/**
 * @ api 访问路径配置信息表
 * @ auth Jianwen Tie
 * 		该文件输出为数组，请注释好各个大模块信息
 */

module.exports = {
  /*====== region 云豆银行 api ======*/
  "ydBankGetMethod": [
    /**
     * @ 首页
     * @ param: {"saleTarget":"b"}
     */
    '/api/v2/ydmall/listapphome',

    /**
     * @ 分类 banner
     * @ param: {"target":"b"}
     */
    '/api/v2/yd/getlatestbanner',

    /**
     * @ 我的 获取最新订单
     * @ param: {"saleTarget":"b","userType":"b"}
     */
    '/api/v2/yd/getlatetedorder',

    /**
     * @ 我的 可能喜欢
     * @ param: {"saleTarget":"b","limit":10}
     */
    '/api/v2/yd/listgoodslike',

    /**
     * @ 分类 产品
     * @ param: {"saleTarget":"b"}
     */
    '/api/v2/yd/listmallcategory',

    /**
     * @ 商品列表
     * @ param: {"method":"category","saleTarget":"b","categoryCode":"3001"}
     */
    '/api/v2/yd/listgoods',

    /**
     * @ 商品详情
     * @ param: {"goodsId":"f9f867e27e714b50bec0038aded5acc9","saleTarget":"b"}
     */
    '/api/v2/yd/getgoodsdetail',

    /**
     * @ 获取云豆数
     * @ param: {"goodsId":"f9f867e27e714b50bec0038aded5acc9","saleTarget":"b"}
     */
    '/api/v2/yd/getydaccount',
    
    /**
     * @ 获取订单信息
     * @ param: {"goodsId":"f9f867e27e714b50bec0038aded5acc9","saleTarget":"b"}
     */
    '/api/v2/yd/getydorderwrite',
  ]
  /*====== endregion 云豆银行 api ======*/
};

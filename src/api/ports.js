/*
 * 后台接口
 */
export default {
  //
  home: {
    index: '/mall/product/index',//首页
    cartNum: '/mall/cart/getCarNum',//购物车数量
  },
  goods: {
    index: '/mall/product/get_goods_detail',//商品详情
    // collection: '/api/v1/collection', //商品收藏
  },
  sort: {
    index: '/mall/product/get_goods_list',//首页
  },
  address: {
    index:'/mall/order/site_list',//获取地址列表
    add: '/mall/order/add_site',//添加地址
    default: '/mall/order/give_tacit',//默认地址
    delete: '/mall/order/site_del',//删除地址
    revise: '/mall/order/site_dochange',//修改地址
    detail:'/mall/order/site_detail '//详情
},
  cart: {
    index: '/mall/cart/index',//购物车列表
    addCart: '/mall/cart/doadd',//加入购物车
    delete: '/mall/cart/del',//购物车删除
  },
  order: {
    orders: '/mall/order/create',//确认商品列表
    docreate: '/mall/order/docreate',//下单
    createInfor: '/mall/order/create_info',//下单详情信息
    bcacPay: '/mall/pay/bcac_pay',//bcac支付
    payInfor: '/mall/order/pay_info',//支付订单详情
    orderInfo: '/mall/order/order_info',//订单详情
    cancel_order: '/mall/order/cancel_order',//取消订单
    confirm_order: '/mall/order/confirm_order ',//确认收货
    del_order: '/mall/order/del_order ',//删除订单
    orderList: '/mall/order/order_list',//订单列表 status( 0-待付款，1-待发货，2-待收货，3-以完成，4-已退款，-1-已失效，‘all’-全部订单)
// index: '/api/v1/order',//获取订单列表
    // create: '/api/v1/order/create',//提交订单
    // pay: '/api/v1/order/pay',//支付
    // orderstatus: '/api/v1/order/orderstatus',//订单状态
  },
  refund: {
    aftersave:'/api/v1/order/aftersave',//申请退货
    afterindex:'/api/v1/order/afterindex',//售后申请页
    afterlog: '/api/v1/order/afterlog',//申请记录
  },
  me: {
    index: '/api/v1/member',//个人中心首页
    address: '/api/v1/address',//我的地址
    team: '/api/v1/distribution/team',//我的团队
    distribution:'/api/v1/distribution',//成为分销商
    code:'/api/v1/qrcode/index',//我的推广码
  },
  integral: {
    index: '/api/v1/points',//积分首页
    loglist: '/api/v1/points/loglist',//积分明细
    sign: '/api/v1/points/sign',//签到
    goodsIndex: '/api/v1/points/goodsindex',//积分商城首页
    points: '/api/v1/points',//详情页
    create: '/api/v1/points/create',//兑换
    orderlist: '/api/v1/points/orderlist',//积分商城我的订单
  },
  search: {
    index: '/api/v1/search'
  },
}

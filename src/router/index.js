import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/reg/register',
      name: 'RgeRegister',
      component: resolve => require(['@/page/reg/register'], resolve) ,
      meta:{index: 0, title: '注册', requireAuth: false}
    },
    {
      path: '/reg/index',
      name: 'RgeIndex',
      component: resolve => require(['@/page/reg/index'], resolve) ,
      meta:{index: 0, title: '登录', requireAuth: false}
    },
    {
      path: '/reg/forgetPwd',
      name: 'RgeForgetPwd',
      component: resolve => require(['@/page/reg/forgetPwd'], resolve) ,
      meta:{index: 0, title: '忘记密码', requireAuth: false}
    },
    {
      path: '/',
      name: 'Home',
      component: resolve => require(['@/page/home/index'], resolve) ,
      meta:{index: 1, title: 'BCAC商城', requireAuth: false}
    },
    {
      path: '/sortGoods/index',
      name: 'SortGoods',
      component: resolve => require(['@/page/sortGoods/index'], resolve) ,
      meta:{index: 6, title: '', requireAuth: false}
    },
    {
      path: '/search/index',
      name: 'SearchIndex',
      component: resolve => require(['@/page/search/index'], resolve) ,
      meta:{index: 5, title: '搜索', requireAuth: false}
    },
    //一级分类
    {
      path: '/sort/index',
      name: 'SortIndex',
      component: resolve => require(['@/page/sort/index'], resolve) ,
      meta:{index: 1, title: '分类', requireAuth: false}
    },
    //二级分类
    {
      path: '/sort/list',
      name: 'SortList',
      component: resolve => require(['@/page/sort/list'], resolve) ,
      meta:{index: 6, title: '分类', requireAuth: false}
    },
    //测试
    {
      path: '/sort/mb',
      name: 'Sortmb',
      component: resolve => require(['@/page/sort/mb'], resolve) ,
      meta:{index: 2, title: '分类', requireAuth: false}
    },
    //商品详情
    {
      path: '/goods/index/:id',
      name: 'GoodsIndex',
      component: resolve => require(['@/page/goods/index'], resolve) ,
      meta:{index: 4, title: '商品详情', requireAuth: false}
    },
    //确认订单
    {
      path: '/order/orders',
      name: 'OrderOrders',
      component: resolve => require(['@/page/order/orders'], resolve) ,
      meta:{index: 5, title: '确认订单', requireAuth: false}
    },
    {
      path: '/order/address',
      name: 'OrderAddress',
      component: resolve => require(['@/page/order/address'], resolve) ,
      meta:{index: 4, title: '地址选择', requireAuth: false}
    },
    //订单新增地址
    {
      path: '/order/add',
      name: 'OrderAdd',
      component: resolve => require(['@/page/order/add'], resolve) ,
      meta:{index: 4, title: '新增地址', requireAuth: false}
    },
    //订单信息
    {
      path: '/order/index',
      name: 'OrderIndex',
      component: resolve => require(['@/page/order/index'], resolve) ,
      meta:{index: 4, title: '我的订单', requireAuth: false}
    },
    //订单信息
    {
      path: '/order/details',
      name: 'OrderDetails',
      component: resolve => require(['@/page/order/details'], resolve) ,
      meta:{index: 6, title: '订单详情', requireAuth: false}
    },
    //退款
    {
      path: '/refund/index',
      name: 'RefundIndex',
      component: resolve => require(['@/page/refund/index'], resolve) ,
      meta:{index: 3, title: '退款/售后', requireAuth: false}
    },
    {
      path: '/refund/apply',
      name: 'RefundApply',
      component: resolve => require(['@/page/refund/apply'], resolve) ,
      meta:{index: 4, title: '申请退款', requireAuth: false}
    },
    {
      path: '/cart/index',
      name: 'CartIndex',
      component: resolve => require(['@/page/cart/index'], resolve) ,
      meta:{index: 1, title: '购物车', requireAuth: false}
    },
    {
      path: '/me/index',
      name: 'MeIndex',
      component: resolve => require(['@/page/me/index'], resolve) ,
      meta:{index: 1, title: '我的', requireAuth: false}
    },
    {
      path: '/setUp/index',
      name: 'setUpIndex',
      component: resolve => require(['@/page/setUp/index'], resolve) ,
      meta:{index: 3, title: '设置', requireAuth: false}
    },
    {
      path: '/setUp/nickname',
      name: 'setUpNickname',
      component: resolve => require(['@/page/setUp/nickname'], resolve) ,
      meta:{index: 4, title: '设置昵称', requireAuth: false}
    },
    {
      path: '/setUp/tel',
      name: 'setUpTel',
      component: resolve => require(['@/page/setUp/tel'], resolve) ,
      meta:{index: 4, title: '设置手机号', requireAuth: false}
    },
    {
      path: '/collect/index',
      name: 'CollectIndex',
      component: resolve => require(['@/page/collect/index'], resolve) ,
      meta:{index: 2, title: '我的收藏', requireAuth: false}
    },
    {
      path: '/me/code',
      name: 'MeCode',
      component: resolve => require(['@/page/me/code'], resolve) ,
      meta:{index: 2, title: '我的推广二维码', requireAuth: false}
    },
    {
      path: '/me/team',
      name: 'MeTeam',
      component: resolve => require(['@/page/me/team'], resolve) ,
      meta:{index: 2, title: '我的团队', requireAuth: false}
    },
    {
      path: '/me/reseller',
      name: 'MeReseller',
      component: resolve => require(['@/page/me/reseller'], resolve) ,
      meta:{index: 2, title: '分销商', requireAuth: false}
    },
    {
      path: '/me/assets',
      name: 'MeAssets',
      component: resolve => require(['@/page/me/assets'], resolve) ,
      meta:{index: 2, title: '佣金资产', requireAuth: false}
    },
    {
      path: '/integral/index',
      name: 'IntegralIndex',
      component: resolve => require(['@/page/integral/index'], resolve) ,
      meta:{index: 3, title: '我的积分', requireAuth: false}
    },
    {
      path: '/integral/order',
      name: 'IntegralOrder',
      component: resolve => require(['@/page/integral/order'], resolve) ,
      meta:{index: 4, title: '我的积分订单', requireAuth: false}
    },
    {
      path: '/integral/detailed',
      name: 'IntegralDetailed',
      component: resolve => require(['@/page/integral/detailed'], resolve) ,
      meta:{index: 4, title: '积分明细', requireAuth: false}
    },
    {
      path: '/integralMall/index',
      name: 'MallIndex',
      component: resolve => require(['@/page/integralMall/index'], resolve) ,
      meta:{index: 2, title: '积分商城', requireAuth: false}
    },
    {
      path: '/integralGoods/index/:id',
      name: 'integralGoodsIndex',
      component: resolve => require(['@/page/integralGoods/index'], resolve) ,
      meta:{index: 3, title: '详情', requireAuth: false}
    },
    {
      path: '/integralOrder/orders',
      name: 'integralOrderIndex',
      component: resolve => require(['@/page/integralOrder/orders'], resolve) ,
      meta:{index: 4, title: '订单', requireAuth: false}
    },
    {
      path: '/integralOrder/address',
      name: 'integralOrderAddress',
      component: resolve => require(['@/page/integralOrder/address'], resolve) ,
      meta:{index: 4, title: '地址选择', requireAuth: false}
    },
    {
      path: '/integralOrder/add',
      name: 'integralOrderAdd',
      component: resolve => require(['@/page/integralOrder/add'], resolve) ,
      meta:{index: 5, title: '新增收货地址', requireAuth: false}
    },
    {
      path: '/address/index',
      name: 'AddressIndex',
      component: resolve => require(['@/page/address/index'], resolve) ,
      meta:{index: 2, title: '我的收货地址', requireAuth: false}
    },
    {
      path: '/address/add',
      name: 'AddressAdd',
      component: resolve => require(['@/page/address/add'], resolve) ,
      meta:{index: 3, title: '新增收货地址', requireAuth: false}
    },
    {
      path: '/address/edit',
      name: 'AddressEdit',
      component: resolve => require(['@/page/address/edit'], resolve) ,
      meta:{index: 3, title: '地址编辑', requireAuth: false}
    },{
      path: '/order/success',
      name: 'orderSuccess',
      component: resolve => require(['@/page/order/success'], resolve) ,
      meta:{index: 7, title: '交易成功', requireAuth: false}
    },
    {
      path: '/pay/index',
      name: 'payIndex',
      component: resolve => require(['@/page/pay/index'], resolve) ,
      meta:{index: 7, title: '支付', requireAuth: false}
    }
  ],
  //回到顶部
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
});
// 使用 router.beforeEach 注册一个全局前置守卫，
// 判断用户是否登陆
router.beforeEach((to, from, next) => {
  //重置title
    let token = localStorage.token
    let title = to.query.title
    if(title){
      document.title = title
    }
    else if (to.meta.title) {
      document.title = to.meta.title
    }
    next()

  // let path = to.path
  // 判断该路由是否需要登录权限
  // if (to.matched.some(record => record.meta.requireAuth)){
  //   if(token!=0){
  //     next()
  //   }else{
  //     next({
  //       path: '/reg/login',
  //       query: {redirect: to.fullPath} // 将要跳转路由的path作为参数，传递到登录页面
  //     })
  //   }
  // }
})
export default router

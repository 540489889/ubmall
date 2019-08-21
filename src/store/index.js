import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    isAddress: false,//是否显示地址管理
    staticImg: '/static/img/',
    defaultTitle: 'BCAC商城',
    IMGPATH: 'http://youjia.svkeji.cn',
    isLoading: true,
    cartNum: localStorage.cartNum?localStorage.cartNum:0,//购物车数量
    // 存储token
    token: localStorage.token ? localStorage.token : ''
  },
  mutations: {
    changeAddress(state,val){
      state.isAddress = val
    },
    // 修改token，并将token存入localStorage
    changeLogin (state, token) {
      state.token = token
      localStorage.token = token
    },
    //导航
    changeTitle (state, title){
      state.defaultTitle = title
    },
    //ajax 请求状态管理
    changeLoading (state, val){
      state.isLoading = val
    },
    //购物车数量监听
    changeCartNum (state, val){
      localStorage.cartNum = val
      state.cartNum = localStorage.cartNum
    }
  },
  actions: {
    // changeMallInfo(ctx,data){
    //   ctx.commit("changeMallInfo",data)
    // }
  }
})

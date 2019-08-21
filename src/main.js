// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// By default we import all the components.
// Only reserve the components on demand and remove the rest.
// Style is always required.
//初始样式
import './assets/style/currency.css'
import './assets/style/animate.min.css'
//全局懒加载
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
  // error: '/Public/static/images/error-no.png',
  // loading: '/Public/static/images/loading.gif',
  // loading: '/static/images/loading.gif',
  // error: '/static/images/error-no.png',
  throttleWait:200
})
//fastclick click 延迟
import fastclick from 'fastclick';
fastclick.attach(document.body);
//axios 封装
import http from './api/http'
import ports from './api/ports'
Vue.prototype.http = http
Vue.prototype.ports = ports
import axios from 'axios'
Vue.config.debug = true
Vue.config.productionTip = false
Vue.prototype.$axios = axios
axios.defaults.withCredentials=true;
// 添加请求拦截器，在请求头中加openId
axios.interceptors.request.use(
  config => {
    if (localStorage.token){
      config.headers.token = localStorage.token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  });
//请求拦截
axios.interceptors.response.use(function (response) {
  // 未登录
  if (response.data.code===-2){
    localStorage.clear()
    plus.nativeUI.toast('登录过期了，请重新登录');
    setTimeout(function() {
      plus.runtime.restart();
    }, 200);
  }else{
    return response
  }
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})
//swiper轮播插件
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default global options } */)
//vuex
import store from './store/index'

import {
  Style,
  // basic
  Button,
  Loading,
  Tip,
  Toolbar,
  TabBar,
  TabPanels,
  // form
  Checkbox,
  CheckboxGroup,
  Checker,
  Radio,
  RadioGroup,
  Input,
  Textarea,
  Select,
  Switch,
  Rate,
  Validator,
  Upload,
  Form,
  // popup
  Popup,
  Toast,
  Picker,
  CascadePicker,
  DatePicker,
  TimePicker,
  SegmentPicker,
  Dialog,
  ActionSheet,
  Drawer,
  ImagePreview,
  // scroll
  Scroll,
  Slide,
  IndexList,
  Swipe,
  Sticky,
  ScrollNav,
  ScrollNavBar,
  RecycleList
} from 'cube-ui'
import App from './App'
import router from './router'
//注册全局加载组件
import myLoading from './components/loading.vue'  // 引入组件
Vue.component("my-loading",myLoading); // 全局注册组件
Vue.use(Button)
Vue.use(Loading)
Vue.use(Tip)
Vue.use(Toolbar)
Vue.use(TabBar)
Vue.use(TabPanels)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Checker)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Input)
Vue.use(Textarea)
Vue.use(Select)
Vue.use(Switch)
Vue.use(Rate)
Vue.use(Validator)
Vue.use(Upload)
Vue.use(Form)
Vue.use(Popup)
Vue.use(Toast)
Vue.use(Picker)
Vue.use(CascadePicker)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(SegmentPicker)
Vue.use(Dialog)
Vue.use(ActionSheet)
Vue.use(Drawer)
Vue.use(ImagePreview)
Vue.use(Scroll)
Vue.use(Slide)
Vue.use(IndexList)
Vue.use(Swipe)
Vue.use(Sticky)
Vue.use(ScrollNav)
Vue.use(ScrollNavBar)
Vue.use(RecycleList)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

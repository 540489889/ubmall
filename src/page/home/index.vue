<template>
  <div class="homeIndex">
    <my-loading v-if="isLoading"></my-loading>
    <!--<home-search></home-search>-->
    <home-swiper :banner="banner"></home-swiper>
    <nav-swiper :menu="classfly"></nav-swiper>
    <div class="advertBox" v-if="ad_list.length">
      <a v-for="item in ad_list" :key="item.id"  :href="item.link">
        <img :src="item.url" alt="">
      </a>
    </div>
    <!--<sort-mall-->
      <!--:hot_list="hot_list"-->
      <!--:recom_list="recom_list"-->
      <!--:sale_list="sale_list"></sort-mall>-->
    <data-list :list="goods_list"></data-list>
    <!--<advert-swiper :information="information"></advert-swiper>-->
    <!--<home-list-->
      <!--:choice="choice"-->
      <!--:newList="newList"></home-list>-->
  </div>
</template>
<script>
  import HomeSearch from '../../components/searchBar.vue'
  import DataList from '../../components/dataList.vue'
  import HomeSwiper from './components/swiper.vue'
  import NavSwiper from './components/navSwiper.vue'
  import AdvertSwiper from './components/advertSwiper.vue'
  import HomeList from './components/list.vue'
  import SortMall from './components/sortMall.vue'
//  import loading from '../../components/loading.vue'
  export default {
    name: 'homeIndex',
    data() {
      return {
        isLoading: true,
        banner: [], //轮播图
        classfly: [], //销售榜单
        goods_list: [],//首页商品
        hot_list: [], //销售榜单
        recom_list: [], //人气榜单
        sale_list: [],//限时抢购
        ad_list: [],//广告图片
      }
    },
    components: {
      HomeSearch,
      HomeSwiper,
      NavSwiper,
      AdvertSwiper,
      HomeList,
      SortMall,
      DataList
//      loading
    },
    created (){

    },
    methods: {
      showToastTxtOnly(text) {
        this.toast = this.$createToast({
          txt: text,
          type: 'txt'
        })
        this.toast.show()
      },
      //获取首页数据
      getIndexData(){
        this.http.get(this.ports.home.index, res =>{
          this.isLoading = false
          this.$store.commit('changeLoading',false)
          console.log(res)
          if(res.success){
            let data = res.data
            this.banner = data.banner
            this.classfly = data.classfly
            this.goods_list = data.goods_list
            this.hot_list = data.hot_list
            this.recom_list = data.recom_list
            this.sale_list = data.sale_list
            this.ad_list = data.ad_list
          }else{
            this.showToastTxtOnly(res.msg)
          }
        })
      },
      //获取购物车数量
      getCartNumber(){
        this.http.get(this.ports.home.cartNum,res=>{
          if(res.success){
            let num = res.data
            this.$store.commit('changeCartNum',num)
          }else{
            this.$store.commit('changeCartNum',0)
          }
        })
      }
    },
    mounted (){
      let that = this
      let token = this.$route.query.token
      if(token){
        this.$store.commit('changeLogin',token)
        setTimeout(()=>{
          that.getIndexData()
          that.getCartNumber()
        },500)
      }else{
        if(!this.$store.state.token){
          window.localStorage.clear();
          plus.nativeUI.toast('登录过期了，请重新登录');
          setTimeout(function() {
            plus.runtime.restart();
          }, 200);
        }else{
          this.getIndexData()
          this.getCartNumber()
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .homeIndex{
    width:750px;
    min-height:100vh;
    background-color:#f9f9f9;
    font-size:26px;
    padding-bottom:100px;
    .advertBox{
      background-color:#f9f9f9;
      overflow: hidden;
      a{
        display: block;
        img{
          width:730px;
          /*height:130px;*/
          margin:20px auto;
        }
      }

    }
    h1{
      background-color:white;
      height:100px;
      line-height:100px;
      text-align: center;
      font-size:32px;
    }
    h2{
      line-height:2;
    }
  }
</style>

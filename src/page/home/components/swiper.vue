<template>
  <div class="swiperWrapper" v-if="showSwiper">
    <home-search></home-search>
    <div class="swiperWd">
      <swiper :options="swiperOption" ref="mySwiper">
        <!--slide-->
        <swiper-slide v-for="item in banner" :key="item.id">
          <a :href="item.link">
            <img class="swiper-img" :src="item.url" alt="">
            <!--<img class="swiper-img" src="./../../../assets/image/index-banner1.png" alt="">-->
          </a>
        </swiper-slide>
        <div class="swiper-pagination swiper-pagination-white"  slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>
<script>
  import HomeSearch from './../../../components/searchBar.vue'
  import {mapState} from 'vuex'
  export default {
    name: 'HomeSwiper',
    data (){
      return {
        swiperOption: {
//          loop: true,
          observer:true,//修改swiper自己或子元素时，自动初始化swiper
          observeParents:true,//修改swiper的父元素时，自动初始化swiper
//          paginationClickable: true,
          autoplay: true,
          pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
            autoplay : {
              disableOnInteraction: false,
              delay:3000
            },
          },
        }
      }
    },
    components: {
      HomeSearch
    },
    props: {
      banner: Array
    },
    methods: {

    },
    computed: {
      showSwiper () {
        return this.banner.length
      },
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    mounted (){

    }
  }
</script>
<style lang="less" scoped>
  .swiperWrapper{
    width:750px;
    height:350px;
    background:url(./../../../assets/image/index-td-bg.png) no-repeat center;
    background-size:100%;
    position:relative;
    /*overflow: hidden;*/
    .trust{
      width:509px;
      height:30px;
      background:url(./../../../assets/img/xr-ico.png) no-repeat center;
      background-size:100%;
      margin:10px auto;
    }
    .swiperWd{
      position:absolute;
      left:20px;
      top:120px;
      width:710px;
      margin:0 auto;
      /*margin-top:20px;*/
      .swiper-container-horizontal>.swiper-pagination-bullets, .swiper-pagination-custom, .swiper-pagination-fraction{
        bottom:30px;
        color:white;
        width:100px;
        text-align: center;
        background:rgba(0,0,0,0.5);
        height:30px;
        line-height:30px;
        border-radius: 15px;
        margin-left:30px;
      }
      .swiper-pagination-bullet-active{
        background-color:white;
      }
      .swiper-slide{
        margin:0 auto;
        a{
          display: block;
          .swiper-img{
            width:100%;
            height:350px;
          }
        }
      }
    }
  }
</style>


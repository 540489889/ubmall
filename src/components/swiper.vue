<template>
  <div class="swiperWrapper">
    <div class="swiperWd">
      <swiper :options="swiperOption" ref="mySwiper">
        <!--slide-->
        <swiper-slide v-for="(item,index) in banner" :key="index">
          <a>
            <img class="swiper-img" :src="item" alt="">
          </a>
        </swiper-slide>
        <div class="swiper-pagination swiper-pagination-white"  slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  export default {
    name: 'HomeSwiper',
    data (){
      return {
        list: [],
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
    background-color:white;
    overflow: hidden;
    .swiperWd{
      margin:0 auto;
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
            height:750px;
          }
        }
      }
    }
  }
</style>


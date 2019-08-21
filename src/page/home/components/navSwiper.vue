<template>
  <div class="navSwiperWrapper">
    <div class="swiperWd">
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for="(item,index) in menu" :key="item.id">
          <router-link tag="a" :to="'/sortGoods/index?title='+item.name+'&cid='+item.id">
            <img class="swiper-img" :src="item.ico" alt="">
            <h4>{{item.name}}</h4>
          </router-link>
        </swiper-slide>
        <div class="swiper-pagination swiper-pagination-white"  slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  export default {
    name: 'NavSwiper',
    data (){
      return {
        list: [],
        swiperOption: {
//          loop: true,
          observer:true,//修改swiper自己或子元素时，自动初始化swiper
          observeParents:true,//修改swiper的父元素时，自动初始化swiper
//          paginationClickable: true,
          autoplay: false,
          slidesPerView: 5,
          spaceBetween: 10,
          freeMode: true,
          pagination: {
            el: '.swiper-pagination',
          },
        }
      }
    },
    props:{
      menu: Array
    },
    methods: {

    },
    computed: {
      showSwiper () {
        return this.list.length
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
  .navSwiperWrapper{
    background-color:white;
    font-size:28px;
    padding:50px 0;
    overflow: hidden;
    padding-top:150px;
    .swiperWd{
      .swiper-container{
        overflow: initial;
      }
      .swiper-container-horizontal>.swiper-pagination-bullets, .swiper-pagination-custom, .swiper-pagination-fraction{
        bottom:-30px;
      }
      .swiper-slide{
        margin:0 auto;
        a{
          display: block;
          color:black;
          .swiper-img{
            width:107px;
            height:112px;
            margin-bottom:0;
            border-radius: 50%;
          }
        }
      }
    }
  }
</style>


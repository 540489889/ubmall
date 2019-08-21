<template>
  <div class="advertWrapper flex-box">
    <i class="adverIco"></i>
    <div class="box-1">
      <swiper :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiper-slide  v-for="(item,index) in information" :key="index">
          <div class="media_title" v-if="index==0"><span>最新</span>{{item.content}}</div>
          <div v-else class="media_title">{{item.content}}</div>
        </swiper-slide>
        <!--<div class="swiper-pagination"  slot="pagination"></div>-->
      </swiper>
    </div>
  </div>

</template>
<script>
  export default {
    name: 'advertSwiper',
    data() {
      return {
        swiperOption: {
          loop: true,
          observer:true,//修改swiper自己或子元素时，自动初始化swiper
          observeParents:true,//修改swiper的父元素时，自动初始化swiper
          paginationClickable: true,
          direction: 'vertical',//垂直切换
          autoplay:false,
          preventClicks : false,

        },
      }
    },
    props: {
      information: Array,
      path: String
    },
    methods:{
      handleClickHref(href){
        window.location.href = href
      },
    },
    computed: {
      showSwiper () {
        return this.information.length
      },
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    mounted() {

    }
  }
</script>
<style lang="less" scoped>
  .advertWrapper{
    background-color:white;
    padding:20px 30px;
    overflow: hidden;
    height:50px;
    .adverIco{
      width:131px;
      height:30px;
      background:url(./../../../assets/ico/ad-ico.png) no-repeat center;
      background-size:100%;
      margin-right:10px;
      position:relative;
      top:-5px;
    }
    .adverIco::before{
      /*content: "";*/
      display: inline-block;
      height:100%;
      width:1px;
      background-color:#dddddd;
      position:absolute;
      right:-30px;
      top:0;
    }
    .swiper-container{
      height:50px;
      line-height:50px;
      overflow: hidden;
      .swiper-slide{
        width:100%;
        height:50px;
        line-height:50px;
        overflow: hidden;
        text-align: left;
        a{
          display: block;
          height:50px;
          line-height:50px;
        }
        .media_title{
          height:50px;
          display: block;
          padding-left:15px;
          font-size:28px;
          color:black;
          span{
            border:1px solid #d6001e;
            border-radius: 5px;
            padding:0 4px;
            color:#d6001e;
            margin-right:10px;
            font-size:24px;
          }
        }
      }
    }
  }

</style>

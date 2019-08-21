<template>
  <div class="sortMall">
    <div class="content flex-box">
      <div class="leftMall box-1">
        <h2 class="sortTitle">销售榜单</h2>
        <ul class="flex-box">
          <router-link tag="li" :to="'/goods/index/'+item1.id" v-for="item1 in hot_list" :key="item1.id"><img :src="item1.imgs" alt=""></router-link>
        </ul>
      </div>
      <div class="rightMall box-1">
        <h2 class="sortTitle">人气榜单</h2>
        <ul class="flex-box">
          <router-link tag="li" :to="'/goods/index/'+item2.id" v-for="item2 in recom_list" :key="item2.id"><img :src="item2.imgs" alt=""></router-link>
        </ul>
      </div>
    </div>
    <div class="content flex-box contentTwo">
      <div class="leftMall box-1 ">
        <h2 class="sortTitle">限时抢购</h2>
        <ul class="flex-box">
          <router-link tag="li" :to="'/goods/index/'+item3.id" v-for="item3 in sale_list" :key="item3.id"><img :src="item3.imgs" alt=""></router-link>
        </ul>
      </div>
      <!--<div class="rightMall box-1">-->
        <!--<h2 class="sortTitle">人气榜单</h2>-->
        <!--<ul class="flex-box">-->
          <!--<li><img src="../../../assets/image/s-mall-7.png" alt=""></li>-->
          <!--<li><img src="../../../assets/image/s-mall-8.png" alt=""></li>-->
        <!--</ul>-->
      <!--</div>-->
    </div>
  </div>
</template>
<script>
  export default {
    name: 'SortMall',
    data (){
      return {

      }
    },
    props:{
      hot_list: Array, //销售榜单
      recom_list: Array, //人气榜单
      sale_list: Array,//限时抢购

    },
    methods: {

    },
    mounted (){

    }
  }
</script>
<style lang="less" scoped>
  .sortMall{
    padding:0 20px;
    .content{
      background-color:white;
      border-radius: 5px;
      flex-wrap:nowrap;
      border-bottom:1px solid #eee;
      .leftMall,.rightMall{
        padding:30px 20px;
      }
      .leftMall{
        border-right:1px solid #eee;
      }
      .leftMall ul,.rightMall ul{
        flex-wrap:nowrap;
      }
      .leftMall ul li,.rightMall ul li{
        width:50%;
        margin-top:20px;
      }
      .leftMall ul li img,.rightMall ul li img{
        width:100%;
        height:148px;
      }
      .leftMall .sortTitle,.rightMall .sortTitle{
        font-size:28px;
        font-weight:bold;
        text-align: left;
      }
    }
    .contentTwo{
      border:none;
      .leftMall{
        border-right:none;
        padding-bottom:20px;
        ul{
          flex-wrap: wrap;
        }
      }
      ul{
        li{
          width:25% !important;
        }
      }
    }
  }
</style>


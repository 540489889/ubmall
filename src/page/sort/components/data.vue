<template>
  <div class="dataWrapper">
    <ul>
      <router-link tag="li" v-for="item in list" :key="item.id" :to="'/goods/index/'+item.id" class="flex-box">
        <div class="left">
          <img :src="item.logo" alt="">
        </div>
        <div class="right box-1">
          <h4 class="title flex-box"><span class="">来点认证</span> <p class="media_title box-1">{{item.title}}</p></h4>
          <p class="desc media_desc">{{item.desc}}</p>
          <h5 class="sold">已售：{{item.number_sales}}件</h5>
          <div class="money flex-box">
            <div class="left-2">
              <span>{{item.price_market}}</span>
              <b>{{item.price_selling}}</b>
            </div>
            <div class="right-2">查看详情</div>
          </div>
        </div>
      </router-link>
      <!--<router-link tag="li" to="/goods/index" class="flex-box">-->
        <!--<div class="left">-->
          <!--<img src="../../../assets/img/sort1.png" alt="">-->
        <!--</div>-->
        <!--<div class="right box-1">-->
          <!--<h4 class="title flex-box"><span class="">来点认证</span> <p class="media_title box-1">重庆有线来点套餐重庆有线来点套餐重庆有线来点套餐</p></h4>-->
          <!--<p class="desc">超高清 5G传输速度</p>-->
          <!--<h5 class="sold">已售：288件</h5>-->
          <!--<div class="money flex-box">-->
            <!--<div class="left-2">-->
              <!--<span>540</span>-->
              <!--<b>600</b>-->
            <!--</div>-->
            <!--<div class="right-2">查看详情</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</router-link>-->
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'SortData',
    data (){
      return {

      }
    },
    props: {
      list: Array
    },
    methods: {

    },
    mounted (){

    }
  }
</script>
<style lang="less" scoped>
  .dataWrapper{
    padding:30px;
    padding-top:0;
    ul{
      li{
        margin-bottom:20px;
        background-color:white;
        padding:15px;
        border-radius: 10px;
        align-items: flex-start;
        .left{
          width:170px;
          height:170px;
          margin-right:15px;
          img{
            width:100%;
            height:100%;
            border-radius: 10px;
          }
        }
        .right{
          text-align: left;
          .title{
            margin-bottom:10px;
            span{
              color:white;
              background-color:#ff3545;
              padding:5px 15px;
              border-radius: 5px;
              font-size:24px;
              margin-right:10px;
            }
          }
          .desc{
            color:#7f8593;
            font-size:24px;
            line-height:1.8;
          }
          .sold{
            color:#c6c6c6;
            font-size:24px;
            line-height:1.8;
          }
          .money{
            justify-content: space-between;
            .left-2{
              color:#ff0207;
              span{
                font-size:36px;
                font-weight: bold;
              }
              b{
                color:#c6c6c6;
                font-size:24px;
                text-decoration: line-through;
              }
            }
            .right-2{
              color:white;
              background-color:#e8c25e;
              font-size:26px;
              height:50px;
              line-height:50px;
              text-align: center;
              padding:0 15px;
              border-radius: 25px;
            }
          }
        }
      }
    }
  }
</style>


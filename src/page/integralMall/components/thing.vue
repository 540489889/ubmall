<template>
  <div class="thingWrapper">
    <h2 class="title">全部好物</h2>
    <ul>
      <router-link tag="li" :to="'/integralGoods/index/'+item.id" class="flex-box" v-for="item in list" :key="item.id">
        <a>
          <img :src="item.image" alt="">
          <h4 class="media_title">{{item.title}}</h4>
          <h5><span>{{item.point_price}}</span>积分</h5>
        </a>
      </router-link>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'thingWrapper',
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
  .thingWrapper{
    padding:30px;
    padding-top:0;
    .title{
      text-align: left;
      font-size:32px;
      font-weight: bold;
      margin-bottom:30px;
    }
    ul{
      overflow: hidden;
      li{
        width:50%;
        margin-bottom:30px;
        float:left;
        box-sizing: border-box;
        a{
          display: block;
          img{
            width:100%;
            height:330px;
            border-radius: 10px;
          }
          h4{
            font-size:28px;
            color:black;
            font-weight: bold;
            margin-top:15px;
            margin-bottom:10px;
          }
          h5{
            color:#f54029;
          }
        }
      }
      li:nth-child(even){
        padding-left:15px;

      }
      li:nth-child(odd){    padding-right:15px;
      }
    }
  }
</style>


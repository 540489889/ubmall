<template>
  <div class="DataList">
    <ul>
      <router-link tag="li" v-for="item in list" :key="item.id" :to="'/goods/index/'+item.id">
        <div class="content">
          <img :src="item.imgs" alt="">
          <div class="hgBox">
            <h4 class="media_desc">
              {{item.title}}
            </h4>
          </div>

          <p>来源：{{item.source}}</p>
          <h6>{{item.price}}<span>BCAC</span></h6>
        </div>
      </router-link>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'DataList',
    data (){
      return {

      }
    },
    props:{
      list: Array
    },
    methods: {

    },
    mounted (){

    }
  }
</script>
<style lang="less" scoped>
  .DataList{
    padding:20px;
    font-size:26px;
    ul{
      overflow: hidden;
      li{
        width:50%;
        float:left;
        border-radius: 5px;
        box-sizing: border-box;
        text-align: left;
        margin-bottom:20px;
        .content{
          background-color:white;
          .hgBox{
            height:75px;
            h4{
              margin:20px 0;
              padding:0 10px;
            }
          }
          p{
            color:#c1c8d6;
            font-size:22px;
            padding:0 10px;
          }
          h6{
            font-size:34px;
            font-weight: bold;
            color:#fa2947;
            padding:20px 10px;
            span{
              font-size:20px;
            }
          }
          img{
            width:100%;
            height:345px;
          }
        }
      }
      li:nth-child(odd){
        padding-right:10px;
      }
      li:nth-child(even){
        padding-left:10px;
      }
    }
  }
</style>


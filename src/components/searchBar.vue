<template>
  <div class="searchWrapper flex-box">
    <div class="searchInput box-1">
      <input type="text" placeholder="输入关键字搜索" @focus="changeSearch()">
      <i class="cubeic-search"></i>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'search',
    data (){
      return {

      }
    },
    props: {
      cart: Number
    },
    methods: {
      changeSearch(){
        this.$router.push({ path: '/search/index' });
      }
    },
    mounted (){

    }
  }
</script>
<style lang="less" scoped>
  .searchWrapper{
    /*background-color:white;*/
    padding:30px 20px;
    /*border-bottom:1px solid #eee;*/
    font-size:26px;
    position:relative;
    z-index: 101;
    .searchInput{
      position:relative;
      input{
        height:60px;
        width:100%;
        box-sizing: border-box;
        background-color:#f5f5f5;
        color:black;
        border-radius: 30px;
        padding:0 30px 0 70px;
      }
      i{
        font-size:38px;
        position:absolute;
        left:20px;
        top:12px;
      }
    }
    .cart{
      width:40px;
      height:36px;
      background:url(../assets/ico/cart-ico.png) no-repeat center;
      background-size:100%;
      margin-left:20px;
      position:relative;
      span{
        position:absolute;
        top:-15px;
        right:-15px;
        display: inline-block;
        border-radius: 50%;
        font-size:22px;
        color:white;
        background-color:#ff0207;
        padding:5px;
        width:20px;
        height:20px;
      }
    }
  }
</style>

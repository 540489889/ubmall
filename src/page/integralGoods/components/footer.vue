<template>
  <div class="goodsFooter flex-box">
    <router-link tag="div" to="/" class="gd-f-1">
      <i class="home-ico-1"></i>
      <h4>首页</h4>
    </router-link>
    <router-link tag="div" to="/cart/index" class="gd-f-2">
      <i class="cart-ico-1"></i>
      <h4>购物车</h4>
      <b v-if="$store.state.cartNum">{{$store.state.cartNum}}</b>
    </router-link>
    <div class="gd-f-3" @click="addCart()">加入购物车</div>
    <div class="gd-f-4" @click="confirmClick()">立即购买</div>
  </div>
</template>
<script>
  export default {
    name: 'GoodsFooter',
    data (){
      return {
      }
    },
    methods: {
      //加入购物车
      addCart(){
        this.$emit('openChangeSelected',true)
      },
      //立即购买
      confirmClick(){
        this.$emit('openChangeSelected',true)
      }
    },
    mounted (){
      console.log(this.$store.state.cartNum)
    }
  }
</script>
<style lang="less" scoped>
  .goodsFooter{
    position:fixed;
    bottom:0;
    left:0;
    width:100%;
    background-color:white;
    height:130px;
    z-index: 203;
    .gd-f-1,.gd-f-2{
      width:20%;
      font-size:24px;
      color:#7f8593;
      position:relative;
      i{
        display: block;
        margin:0 auto;
        width:55px;
        height:55px;
        margin-bottom:5px;
      }
      b{
        position:absolute;
        right:30px;
        top:0;
        color:white;
        background-color:#ff0207;
        display: inline-block;
        border-radius: 50%;
        width:30px;
        height:30px;
        line-height:30px;
        font-size:20px;
      }
    }
    .gd-f-1{
      i{
        background:url(../../../assets/ico/a-1.png) no-repeat center;
        background-size:100%;
      }
    }
    .gd-f-2{
      border-left:1px solid #eee;
      i{
        background:url(../../../assets/ico/c-1.png) no-repeat center;
        background-size:100%;
      }
    }
    .gd-f-3,.gd-f-4{
      width:30%;
      font-size:30px;
      height:100%;
      line-height:130px;
    }
    .gd-f-3{
      background-color:#ffa858;
      color:white;
    }
    .gd-f-4{
      background-color:#ff3747;
      color:white;
    }
  }
</style>


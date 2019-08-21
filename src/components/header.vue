<template>
  <div class="header flex-box">
    <span @click="goBack()" class="small-width left-header">
      <img class="return-ico" src="../assets/icon/return-ico.png" alt="">
    </span>
    <div class="closeMall" @click="closeMall"><img src="../assets/icon/closeMall.png" alt=""></div>
    <div class="title box-1">{{$store.state.defaultTitle}}</div>
    <span class="small-width right-header"><router-link tag="b" to="/address/index"  v-if="$store.state.isAddress">地址管理</router-link></span>
  </div>
</template>
<script>
  export default {
    name: 'mallHeader',
    data (){
      return {

      }
    },
    props: {
      isAddress: Boolean
    },
    methods: {
      goBack(){
        this.$router.go(-1)
      },
      closeMall(){
        plus.nativeUI.confirm('确认离开BCAC商城?',function(event){
          if(event.index==0){
            plus.webview.currentWebview().close('slide-out-right');
          }
        });
      }
    },
    mounted (){

    }
  }
</script>
<style lang="less" scoped>
  .header{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:130px;
    color:black;
    font-weight: bold;
    z-index: 899;
    padding:30px;
    padding-top:70px;
    box-sizing: border-box;
    background-color:white;
    border-bottom:1px solid #eee;
    .title{
      padding:0 15px;
      font-weight: bold;
    }
    .closeMall{
      img{
        width:32px;
        height:32px;
      }
    }
    .left-header{
      text-align: left;
    }
    .right-header{
      text-align: right;
    }
    .small-width{
      min-width:100px;
      .return-ico{
        width:32px;
        height:32px;
      }
    }
  }
</style>


<template>
  <div class="setUpIndex">
    <div class="title flex-box">
      <img src="../../assets/ico/mb-tx.png" alt="">
    </div>
    <div class="content">
      <ul>
        <router-link tag="li" to="./nickname" class="flex-box">昵称 <div class="right-text box-1">不吃萝卜的兔子 <i class="cubeic-arrow"></i></div></router-link>
        <router-link tag="li" to="./tel" class="flex-box">手机号 <div class="right-text box-1">18375875809 <i class="cubeic-arrow"></i></div></router-link>
        <li class="flex-box">帐号密码 <div class="right-text box-1"> <i class="cubeic-arrow"></i></div></li>
      </ul>
      <div class="other-text flex-box">
        所属公司
        <div class="right-text box-1">重庆有线</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'setUpIndex',
    data (){
      return {

      }
    },
    methods: {

    },
    mounted (){
      this.$store.commit('changeLoading',false)
    }
  }
</script>
<style lang="less" scoped>
  .setUpIndex{
    width:100%;
    min-height:100vh;
    background-color:aliceblue;
    font-size:28px;
    .title{
      background-color:white;
      height:300px;
      justify-content: center;
      align-items: center;
      img{
        width:120px;
        height:120px;
        border-radius: 50%;
        background-color:red;
      }
    }
    .content{
      color:#7f8593;
      ul{
        margin-top:20px;
        li{
          background-color:white;
          padding:30px;
          border-bottom:1px solid #eee;
          .right-text{
            text-align: right;
            margin-left:20px;
            font-size:24px;
          }
        }
        li:last-child{
          border:none;
        }
      }
      .other-text{
        background-color:white;
        padding:30px;
        margin-top:20px;
        .right-text{
          text-align: right;
        }
      }
    }
  }
</style>


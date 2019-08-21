<template>
  <div class="serviceBox flex-box">
    <div class="serviceWrapper">
      <h2 class="title">产品安装服务
        <i class="closeBtn cubeic-wrong" @click="closeSelected()"></i>
      </h2>
      <ul class="list">
        <li class="flex-box">
          <span>联系电话</span>
          <p>{{address.phone}}</p>
        </li>
        <li class="flex-box">
          <span>安装地址</span>
          <p>{{address.province+address.city+address.address}}</p>
        </li>
        <li class="flex-box">
          <span>安装费用</span>
          <p>免费安装</p>
        </li>
      </ul>
      <div class="serviceBtn" @click="serviceClick">确定</div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'mb',
    data (){
      return {

      }
    },
    props:{
      address: Object
    },
    methods: {
      serviceClick(){
        this.$emit('changeServiceClick',this.address)
      },
      closeSelected(){
        this.$emit('changeSelected',false)
      }
    },
    mounted (){

    }
  }
</script>
<style lang="less" scoped>
  .serviceBox{
    width:100%;
    height:100vh;
    overflow: hidden;
    align-items: flex-end;
  }
  .serviceWrapper{
    height:700px;
    width:100%;
    box-sizing: border-box;
    padding:30px;
    position:fixed;
    bottom:0;
    left:0;
    background-color:white;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    .title{
      font-size:32px;
      font-weight: bold;
      text-align: center;
      position:relative;
      padding:15px 0;
      .closeBtn{
        position:absolute;
        top:50%;
        transform: translateY(-50%);
        right:20px;
        color:#ccc;
        font-size:45px;
        font-weight: bold;
      }
    }
    .list{
      text-align: left;
      margin-top:50px;
      margin-bottom:50px;
      li{
        padding:30px 0;
        font-size:26px;
        color:#7f8593;
        span{
          margin-right:50px;
        }
      }
    }
    .serviceBtn{
      height:80px;
      line-height:80px;
      text-align: center;
      border-radius: 40px;
      width:250px;
      background-color:#ff3747;
      margin:30px auto;
      color:white;
    }
  }
</style>


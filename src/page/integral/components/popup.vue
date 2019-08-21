<template>
  <div class="integralPopup popup_layer">
    <div class="content">
      <h6>恭喜您，签到成功！</h6>
      <h2><span>+{{signScore}}</span>积分</h2>
      <a @click="changeClick">确定</a>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'integralPopup',
    data (){
      return {

      }
    },
    props: {
      signScore: Number
    },
    methods: {
      changeClick(){
        this.$emit('changeClosePopup',false)
      }
    },
    mounted (){
    }
  }
</script>
<style lang="less" scoped>
  .integralPopup{
    .content{
      position:relative;
      top:45%;
      left:50%;
      transform: translate(-50%,-50%);
      width:629px;
      height:806px;
      background:url(../../../assets/ico/integrl-t-bg.png) no-repeat center;
      background-size:100%;
      overflow: hidden;
      h6{
        margin-top:420px;
        font-size:36px;
      }
      h2{
        color:#ff5155;
        font-size:24px;
        margin:50px auto;
        span{
          font-size:60px;
          font-weight: bold;
        }
      }
      a{
        display: block;
        width:320px;
        height:90px;
        line-height:90px;
        text-align: center;
        color:white;
        background-color:#48db8d;
        margin:0 auto;
        border-radius: 45px;
      }
    }
  }
</style>


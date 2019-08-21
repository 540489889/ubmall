<template>
  <div class="setUpIndex">
    <h2>请输入您的新手机号</h2>
    <cube-input v-model="value" :placeholder="placeholder"></cube-input>
    <div class="nameBtn">
      <cube-button :primary="true">确定</cube-button>

    </div>
  </div>
</template>
<script>
  export default {
    name: 'mb',
    data (){
      return {
        value: '',
        placeholder: '请输入您的新手机号'
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
    h2{
      padding:30px 20px;
      text-align: left;
    }
    .nameBtn{
      padding:30px 20px;
      margin-top:30px;
    }
  }
</style>


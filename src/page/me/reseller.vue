<template>
  <div class="resellerWrapper">
    <my-loading v-if="$store.state.isLoading"></my-loading>
    <div class="title flex-box">
      <img src="../../assets/img/p2.png" alt="">
      <p>不吃萝卜的小可爱</p>
    </div>
    <ul class="resellerList">
      <li><cube-input v-model="name" placeholder="请填写姓名"></cube-input></li>
      <li><cube-input v-model="tell" placeholder="请填写电话"></cube-input></li>
      <!--<li class="flex-box">-->
        <!--<cube-input class="input-ui box-1"-->
                    <!--placeholder="输入验证码"-->
                    <!--v-model="inputCode">-->
        <!--</cube-input>-->
        <!--<cube-button-->
          <!--class="codeBtn"-->
          <!--:inline="true"-->
          <!--:disabled="captchaDisable"-->
          <!--@click=""-->
        <!--&gt;{{captchaLabel}}</cube-button>-->
      <!--</li>-->
      <li>
        <cube-select
          :placeholder="placeholder"
        v-model="value"
        :options="options">
      </cube-select>
      </li>
      <li v-if="value=='支付宝'"><cube-input v-model="receivables_acount" placeholder="请填写支付宝账号"></cube-input></li>
      <template v-if="value=='银行卡'">
        <li><cube-input v-model="opening_bank" placeholder="请填写开户行"></cube-input></li>
        <li><cube-input v-model="receivables_acount" placeholder="请填写银行账号"></cube-input></li>
      </template>
      <li>
        <a class="submitBtn" @click="subReseller">提交申请</a>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'mb',
    data (){
      return {
        name: '',
        tell: '',
        receivables_acount: '',//提现账号
        receivables_type: '',//方式
        placeholder: '请选择提现方式',
        opening_bank: '',//开户行
        captchaLabel:"获取验证码",
        captchaDisable: false,
        inputCode: '',
        options: ['支付宝', '银行卡'],
        value: '银行卡'
      }
    },
    methods: {
      showToastTxtOnly(text) {
        this.toast = this.$createToast({
          txt: text,
          type: 'txt'
        })
        this.toast.show()
      },
      subReseller(){
        let tellReg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        if(!this.name){
          this.showToastTxtOnly('请填写姓名')
          return false
        }
        if(!tellReg.test(this.tell)){
          this.showToastTxtOnly('请填写正确的手机号码')
          return false
        }
        if(this.value=='支付宝'&&!this.receivables_acount){
          this.showToastTxtOnly('请填写支付宝账号')
          return false
        }
        if(this.value=='银行卡'){
          if(!this.opening_bank){
            this.showToastTxtOnly('请填写开户行')
            return false
          }
          if(!this.receivables_acount){
            this.showToastTxtOnly('请填写银行卡账号')
            return false
          }
        }

        let params = {}
        params.name = this.name
        params.phone = this.tell
        params.receivables_type = this.value
        params.opening_bank = this.opening_bank
        params.receivables_acount = this.receivables_acount
        this.http.post(this.ports.me.distribution,params, res =>{
          this.$store.commit('changeLoading',false)
          console.log(res)
          if(res.success){
            let data = res.data
            this.count = data.count
            this.list = data.res
          }else{
            this.showToastTxtOnly(res.msg)
          }
        })
      }
    },
    mounted (){
      this.$store.commit('changeLoading',false)
    }
  }
</script>
<style lang="less" scoped>
  .resellerWrapper{
    width:750px;
    height:1448px;
    background:url(../../assets/img/reseller-bg.png) no-repeat center;
    background-size:100%;
    position:relative;
    font-size:28px;
    .title{
      padding:30px;
      color:white;
      img{
        width:80px;
        height:80px;
        border-radius: 50%;
        margin-right:20px;
      }
    }
    .resellerList{
      position:absolute;
      top:550px;
      width:580px;
      left:85px;
      li{
        margin-bottom:30px;
        .cube-input{
          background:none;
          background-color:#eef4f8;
          border-radius: 10px;
          height:40px;
        }
        .cube-input:after{
          content: initial;
        }
        .codeBtn{
          margin-left:10px;
          background:#eef4f8;
          font-size:28px;
          box-sizing: initial;
          color:#c6c6c6;
          height:40px;
        }
        .cube-select{
          text-align: left;
          background:#eef4f8;
        }
        .cube-select:after{
          content: initial;
        }
        .submitBtn{
          display: block;
          height:80px;
          line-height:80px;
          background:#ff0207;
          color:white;
        }
      }
    }
  }
</style>


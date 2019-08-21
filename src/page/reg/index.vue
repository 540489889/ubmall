<template>
  <div class="registerWrapper">
    <div class="content">
      <h1 class="title">{{loginTitle}}</h1>
      <transition
        mode="out-in"
        name="component-fade"
      >
      <conmponents :is="who"></conmponents>
      </transition>
      <a class="targetA" @click="changeComponent">{{loginText}}</a>
      <h6 class="flex-box itBtn">
        <router-link tag="a" to="/reg/register">立即注册</router-link>
        <router-link tag="a" to="/reg/forgetPwd">忘记密码</router-link>
      </h6>
    </div>
  </div>
</template>
<script>
  import accountsLogin from './components/accountsLogin'
  import smsLogin from './components/smsLogin'
  export default {
    name: 'registerWrapper',
    data (){
      return{
        loginTitle: '帐号密码登录',
        loginText: '短信登录',
        who: 'accountsLogin',
        type: 'password',
        readonly: true,
        autofocus: true,
        autocomplete: true,
        eye: {
          open: false,
          reverse: false
        },
        inputName: '',
        inputPwd: '',
        inputPwds: '',
        inputTell: '',
        inputCode: '',
        captchaLabel:"获取验证码",
        seconds:60,
        captchaDisable:false,
        timer:null,
        isLoading: false,
        name: '',
        password: '',
        clearable: {
          visible: true,
          blurHidden: false
        },
        options: [1, 2, 3, 4, 5, 6],
        value: '',
        title: '请选择单位部门',
        placeholder: '设置密码',
        autoPop: false,
        disabled: false
      }
    },
    components: {
      accountsLogin,
      smsLogin
    },
    methods: {
      changeComponent(){
        if(this.loginText === '短信登录'){
          this.loginTitle = '短信登录'
          this.loginText = '帐号密码登录'
          this.who = 'smsLogin'
        }else{
          this.loginText = '短信登录'
          this.loginTitle = '帐号密码登录'
          this.who = 'accountsLogin'
        }
      },
      showToastTxtOnly(text) {
        this.toast = this.$createToast({
          txt: text,
          type: 'txt'
        })
        this.toast.show()
      },
      //定义倒计时数据
      countdown () {
        if (this.seconds < 1) {
          this.captchaLabel = '获取验证码';
        } else {
          this.captchaDisable = true;
          this.seconds --;
          this.captchaLabel = this.seconds + '秒后重新获取'
        }
      },
    },
    mounted (){
      this.$store.commit('changeLoading',false)
    }
  }
</script>
<style lang="less" scoped>
  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .3s ease;
  }
  .component-fade-enter, .component-fade-leave-to
    /* .component-fade-leave-active for below version 2.1.8 */ {
    opacity: 0;
  }
  .registerWrapper{
    width:100%;
    min-height:100vh;
    background-color:white;
    padding:0 60px;
    box-sizing: border-box;
    font-size:28px;
    overflow: hidden;
    .content{
      .targetA{
        margin:50px auto;
        display: block;
      }
      h1{
        font-size:48px;
        font-weight: bold;
        margin:70px auto;
        text-align: left;
      }
      .itBtn{
        padding:20px;
        justify-content: flex-end;
        margin-top:50px;
        a{
          margin-left:20px;
        }
      }
    }

  }
</style>


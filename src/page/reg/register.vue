<template>
  <div class="registerWrapper">
    <div class="content">
      <h1 class="title">欢迎来到优家商城</h1>
      <ul>
        <li> <cube-input v-model="inputTell" placeholder="输入手机号" :clearable="clearable"></cube-input></li>
        <li class="flex-box">
          <cube-input class="input-ui box-1"
                      placeholder="输入验证码"
                      v-model="inputCode">
          </cube-input>
          <cube-button
            :inline="true"
            :disabled="captchaDisable"
            @click="codeBtnAction"
          >{{captchaLabel}}</cube-button>
        </li>
        <li>
          <cube-input v-model="inputPwd"   :type="type" :eye="eye" placeholder="设置密码"></cube-input>
        </li>
        <li>
          <cube-input v-model="inputPwds"  :type="type" :eye="eye" placeholder="确认密码"></cube-input>
        </li>
        <li class="registerLi">
          <cube-button class="registerBtn">注册</cube-button>
        </li>
      </ul>
      <h6 class="flex-box itBtn">
        <router-link tag="a" to="/reg/index">已有账号</router-link>
        <router-link tag="a" to="/reg/forgetPwd">忘记密码</router-link>
      </h6>
    </div>

  </div>
</template>
<script>
  export default {
    name: 'registerWrapper',
    data (){
      return{
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
    methods: {
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
  .registerWrapper{
    width:100%;
    min-height:100vh;
    background-color:white;
    padding:0 60px;
    box-sizing: border-box;
    font-size:28px;
    overflow: hidden;
    .content{
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
      ul{
        li{
          background-color:#eef4f8;
          margin-bottom:35px;
          border-radius: 40px;
          /*padding:0 10px;*/
          box-sizing: border-box;
          .cube-input{
            background:none;
            border:none;
            border-radius: 40px;
          }
          .cube-input:after{
            content: initial;
          }
          .cube-btn-inline{
            background:none;
            color:#ff0207;
            border-left:1px solid white;
            padding:0 20px;
            font-size:14px;
          }
          .registerBtn{
            background:#ff0207;
            border-radius: 50px;
            height:80px;
            line-height:80px;
            padding:0;
          }
        }
        .registerLi{
          background:none;
        }
      }
    }
  }
</style>


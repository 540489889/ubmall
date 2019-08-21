<template>
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
    <li class="registerLi">
      <cube-button class="registerBtn">登录</cube-button>
    </li>
  </ul>
</template>
<style lang="less" scoped>
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
        box-sizing: border-box;
        background-color:#eef4f8;
        margin-bottom:35px;
        border-radius: 40px;
        /*padding:0 10px;*/
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
</style>
<script>
  import { mapMutations } from 'vuex'
  import axios from 'axios'
  export default {
    name: 'accountsLogin',
    data () {
      return {
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
    methods:{
      ...mapMutations(['changeLogin']),
      //显示密码
      showPwd (){
        if(this.visible === 'password'){
          this.visible = 'text'
        }else{
          this.visible = 'password'
        }
      },
      //登录
      accountsSign(){
        let nameReg = /^[a-zA-Z][a-zA-Z0-9]{3,15}$/;
        if (!this.inputName) {
          this.$message.error('请输入正确的用户名称')
          return false
        }
//        let pwdReg=/^[a-zA-Z0-9]{4,10}$/;
        if (!this.inputPwd) {
          this.$message.error('请输入密码');
          return false
        }
        this.subAccountsSign()
      },
      subAccountsSign(){
        let _this = this
        this.fullscreenLoading = true;
        let params = new URLSearchParams();
        params.append('loginName',this.inputName );
        params.append('pwd', this.inputPwd);
        axios({
          method: 'post',
          url: '/Home/Person/login',
          data: params
        }).then(function (res) {
          _this.fullscreenLoading = false;
          const data = res.data
          if(data.status){
            _this.userToken = 'Bearer ' + data.token;
            // 将用户token保存到vuex中
            _this.changeLogin({ Authorization: _this.userToken });
            //如果存在参数
            if(_this.$route.query.redirect) {
              let redirect = _this.$route.query.redirect;
              //则跳转至进入登录页前的路由
              _this.$router.replace(redirect);
            }else{
              _this.$router.replace({ path: '/' });
            }
          }else{
            _this.$notify.error({
              title: '错误',
              message: data.msg,
              showClose: false,
              duration: 2000
            });
          }

        }).catch(function (error) {
          console.log(error);
        })
      }
    }
  }
</script>

<template>
  <div class="integralIndex">
    <my-loading v-if="$store.state.isLoading"></my-loading>
    <div class="title">
      <div class="left">
        <i :class="'member-'+list.vip"></i>
        <p>还需{{list.level_score}}积分升级</p>
      </div>
      <router-link tag="div" to="./detailed" class="right">明细</router-link>
      <h2>{{list.score}}</h2>
      <a v-if="list.sign" class="signBtn">已签到</a>
      <a v-else class="signBtn" @click="sign">立即签到</a>
      <p>每日签到可获得积分奖励哦！</p>
    </div>
    <router-link tag="div" to="./order" class="flex-box orderText">
      <span>我的订单</span>
      <p>查看详情 <i class="cubeic-arrow"></i></p>
    </router-link>
    <div class="content">
      <h1>赚取积分</h1>
      <ul>
        <li class="flex-box">
          <i class="i-ico-1"></i>
          <div class="box-1 text">
            <h4>商城购物获得积分</h4>
            <p>下单成功会获得一定积分奖励</p>
          </div>
          <router-link tag="div" to="/" class="btn">去赚积分</router-link>
        </li>
        <li class="flex-box">
          <i class="i-ico-2"></i>
          <div class="box-1 text">
            <h4>分享好友得积分</h4>
            <p>分享商城或商品给好友可获得积分</p>
          </div>
          <div @click="shareClick()" class="btn">去赚积分</div>
        </li>
      </ul>
    </div>
    <transition
      name="custom-classes-transition"
      enter-active-class="animated tada"
      leave-active-class="animated bounceOutRight"
    >
    <integral-popul @changeClosePopup="changeClosePopup" :signScore="signScore" v-if="isSign"></integral-popul>
    </transition>
    <transition
      name="custom-classes-transition"
      enter-active-class="animated bounceInLeft"
      leave-active-class="animated bounceOutRight"
    >
    <div class="popup_layer shareWrapper" @click="changeCloseShare" v-if="isShare">
      <img src="../../assets/ico/arrow.png" alt="">
      <h4>点击右上角分享给好友哟！</h4>
    </div>
    </transition>
  </div>
</template>
<script>
  import integralPopul from './components/popup.vue'
  export default {
    name: 'integralIndex',
    data (){
      return {
        isShare: false,
        isSign: false,
        list: {},
        signScore:0,
      }
    },
    components: {
      integralPopul
    },
    methods: {
      //分享
      shareClick(){
        this.isShare = true
      },
      //分享关闭
      changeCloseShare(){
        this.isShare = false
      },
      //获取数据
      getIntegralData(){
        this.http.get(this.ports.integral.index, res =>{
          this.$store.commit('changeLoading',false)
          console.log(res)
          if(res.success){
            let data = res.data
            this.list = data
          }else{
            this.showToastTxtOnly(res.msg)
          }
        })
      },
      //签到
      sign(){
        this.isSign = true
        this.http.get(this.ports.integral.sign, res =>{
          this.$store.commit('changeLoading',false)
          console.log(res)
          if(res.success){
            let data = res.data
            this.signScore = data
            this.list.score += this.signScore
          }else{
            this.showToastTxtOnly(res.msg)
          }
        })
      },
      //关闭签到弹窗
      changeClosePopup(val){
        this.isSign = false
      }
    },
    mounted (){
      this.getIntegralData()
    }
  }
</script>
<style lang="less" scoped>
  .integralIndex{
    width:100%;
    min-height:100vh;
    background-color:#fff;
    font-size:28px;
    position:relative;
    .shareWrapper{
      color:white;
      padding:30px;
      text-align: right;
      box-sizing: border-box;
      img{
        width:186px;
      }
      h4{
        text-align: center;
        line-height:2;
      }
    }
    .orderText{
      padding:30px;
      justify-content: space-between;
      border-bottom:20px solid #f5f5f5;
      p{
        color:#bfbfbf;
        font-size:24px;
        line-height:2;
      }
    }
    .title{
      width:750px;
      height:350px;
      background:url(../../assets/ico/integral-t-bg.png) no-repeat center;
      background-size:100%;
      text-align: center;
      color:white;
      position:relative;
      h2{
        font-size:60px;
        font-weight: bold;
        line-height:3;
      }
      .signBtn{
        display: block;
        width:260px;
        height:90px;
        line-height:90px;
        text-align: center;
        margin:30px auto;
        background-color:#fff4f3;
        color:#ee5758;
        border-radius: 45px;
        margin-top:0;
      }
      .left{
        position:absolute;
        top:20px;
        left:20px;
        p{
          font-size:22px;
          line-height:1.8;
        }
        i{
          width:178px;
          height:54px;
          display: block;
        }
        .member-1{
          background:url(../../assets/ico/mb-bz-1.png) no-repeat center;
          background-size:100%;
        }
        .member-2{
          background:url(../../assets/ico/mb-bz-2.png) no-repeat center;
          background-size:100%;
        }
        .member-3{
          background:url(../../assets/ico/mb-bz-3.png) no-repeat center;
          background-size:100%;
        }
        .member-4{
          background:url(../../assets/ico/mb-bz-4.png) no-repeat center;
          background-size:100%;
        }
        .member-5{
          background:url(../../assets/ico/mb-bz-5.png) no-repeat center;
          background-size:100%;
        }
      }
      .right{
        position:absolute;
        right:20px;
        top:20px;
        border:1px solid white;
        color:white;
        text-align: center;
        padding:10px 20px;
        border-radius: 30px;
      }
    }
    .content{
      padding:30px;
      h1{
        font-size:32px;
        font-weight: bold;
        text-align: left;
      }
      ul{
        li{
          padding:30px 0;
          border-bottom:1px solid #eee;
          i{
            width:64px;
            height:64px;
          }
          .i-ico-1{
            background:url(../../assets/ico/i-ico-1.png) no-repeat center;
            background-size:100%;
          }
          .i-ico-2{
            background:url(../../assets/ico/i-ico-2.png) no-repeat center;
            background-size:100%;
          }
          .text{
            text-align: left;
            margin-left:20px;
            h4{line-height:2;}
            p{
              color:#bfbfbf;
              font-size:24px;
              line-height:2;
            }
          }
          .btn{
            width:130px;
            height:50px;
            line-height:50px;
            text-align: center;
            color:white;
            background-color:#f7cb9b;
            border-radius: 25px;
            font-size:24px;
          }
        }
        li:last-child{
          border:none;
        }
      }
    }
  }
</style>


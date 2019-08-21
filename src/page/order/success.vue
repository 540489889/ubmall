<template>
  <div class="success">
    <div class="content">
        <h1>
          <div class="succIcoBox">
            <i></i>
            <!--<p>交易成功！</p>-->
          </div>
          <!--<div v-if="!succ">-->
            <!--<i class="cubeic-wrong"></i>-->
            <!--<p>{{msg}}</p>-->

          <!--</div>-->
        </h1>
      <div class="orderList">
        <ul>
          <li class="flex-box">
            <span>支付金额：</span>
            <span>{{list.order_amount}}</span>
          </li>
          <li class="flex-box">
            <span>订单编号：</span>
            <span>{{list.order_sn}}</span>
          </li>
          <li class="flex-box">
            <span>付款时间：</span>
            <span>{{list.pay_time}}</span>
          </li>
          <li class="flex-box">
            <span>下单时间：</span>
            <span>{{list.add_time}}</span>
          </li>
        </ul>
      </div>
      <div class="payBtnBox">
        <router-link tag="a" :to="'/order/details?id='+list.order_sn" class="payBtn">订单详情</router-link>
        <router-link tag="a" to="/" class="cancelOrder">返回首页</router-link>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'success',
    data (){
      return {
        succ: false,
        list:{},
        msg: ''
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
      getOrderState(){
        let id = this.$route.query.order_sn
        this.http.get(this.ports.order.payInfor+'?order_sn='+id, res =>{
          this.$store.commit('changeLoading',false)
          console.log(res)
          if(res.success){
            let data = res.data
            this.list = data.orderInfo
          }else{
            this.list = {}
            this.showToastTxtOnly(res.msg)
          }
        })
      }
    },
    mounted (){
      this.getOrderState()
    }
  }
</script>
<style lang="less" scoped>
  .success{
    width:100%;
    min-height:100vh;
    background-color:white;
    font-size:28px;
    .content{
      overflow: hidden;
      h1{
        .succIcoBox{
        }
        margin-top:80px;
        i{
          width:186px;
          height:186px;
          border-radius: 50%;
          background:url(../../assets/icon/succ-ico.png) no-repeat center;
          background-size:100%;
          display: block;
          margin:0 auto;
        }
        .cubeic-wrong{
          color:red;
        }
        p{
          line-height:2;
          color:black;
        }
      }
      .orderList{
        background-color:white;
        margin-top:20px;
        ul{
          padding:30px;
          li{
            /*justify-content: space-between;*/
            padding:20px 0;
            span:first-child{
              margin-right:15px;
            }
            /*font-size:32px;*/
          }
        }
      }
      .btnBox{
        justify-content: center;
        margin-top:60px;
        a{
          width:250px;
          height:80px;
          text-align: center;
          border-radius: 40px;
          line-height:80px;
        }
        .lookInfo{
          margin-right:10px;
          border:1px solid #7f8593;
          color:black;
        }
        .home{
          margin-left:10px;
          background-color:#ff3747;
          color:white;
        }
      }
      .payBtnBox{
        margin-top:200px;
        padding:20px;
        a{
          display: block;
          width:100%;
          height:90px;
          line-height:90px;
          border-radius: 10px;
          margin-top:25px;
        }
        .payBtn{
          background:#00a0e9;
          color:white;
        }
        .cancelOrder{
          color:#333333;
          border:1px solid #bbbbbb;
        }
      }
    }
  }
</style>


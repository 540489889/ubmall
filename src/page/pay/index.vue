<template>
  <div class="payWrapper">
    <div class="allMoney flex-box">
        <h5>支付总金额</h5>
        <h2>{{list.order_amount}}<span>BCAC</span></h2>
        <p>当前可用BCAC：{{account_bcac}}</p>
    </div>
    <div class="orderList">
      <ul>
        <li class="flex-box">
          <span>订单编号：</span>
          <span>{{list.order_sn}}</span>
        </li>
        <li class="flex-box">
          <span>下单时间：</span>
          <span>{{list.add_time}}</span>
        </li>
      </ul>
    </div>
    <div class="payBtnBox">
      <a class="payBtn" @click="payClick">立即支付</a>
      <router-link tag="a" to="/" class="cancelOrder">取消支付</router-link>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'PayIndex',
    data (){
      return {
        account_bcac: '',
        list: {},
        type: 'number',
        readonly: true,
        maxlength: 100,
        disabled: true,
        autofocus: true,
        autocomplete: true,
        eye: {
          open: true,
          reverse: false
        }
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
      getOrderInfor(){
        let orderId = this.$route.query.order_id
        this.http.get(this.ports.order.createInfor+'?order_id='+orderId, res =>{
          console.log(res)
          this.$store.commit('changeLoading',false)
          if(res.success){
            let data = res.data
            this.list = data.orderInfo
            this.account_bcac = data.account_bcac
          }else{
            this.list = ''
            this.showToastTxtOnly(res.msg)
          }
        })
      },
      payClick(){
          this.dialog = this.$createDialog({
            type: 'prompt',
            title: '交易密码',
            prompt: {
              value: '',
              type: 'password',
              maxlength: 6,
              autofocus: true,
              autocomplete: true,
              eye: {
                open: false,
                reverse: false
              },
              placeholder: '请输入'
            },
            onConfirm: (e, promptValue) => {
              if(!promptValue){
                this.showToastTxtOnly('请输入交易密码')
                return false
              }
              this.http.post(this.ports.order.bcacPay,{order_sn: this.list.order_sn,pay_key: promptValue}, res =>{
                console.log(res)
                if(res.success){
                  this.$router.push({path:'/order/success',query:{order_sn: this.list.order_sn}})
                }else{
                  this.showToastTxtOnly(res.msg)
                }
              })
            }
          }).show()
        }
    },
    mounted (){
      this.getOrderInfor()
    }
  }
</script>
<style lang="less" scoped>
  .payWrapper{
    width:750px;
    min-height:100vh;
    background-color:#f9f9f9;
    font-size:28px;
    .allMoney{
      height:320px;
      width:100%;
      background-color:white;
      flex-wrap: wrap;
      text-align: center;
      padding:0.5rem;
      box-sizing: border-box;
      h5{
        width:100%;
        font-size:32px;
        position:relative;
        top:20px;
      }
      h2{
        color:#fa2947;
        font-size:68px;
        font-weight: bold;
        width:100%;
        span{
          font-size:42px;
        }
      }
      p{
        position:relative;
        top:-20px;
        color:#c1c8d6;
        width:100%;
      }
    }
    .orderList{
      background-color:white;
      margin-top:20px;
      ul{
        padding:20px;
        li{
          justify-content: space-between;
          padding:20px 0;
          font-size:32px;
        }
      }
    }
    .payBtnBox{
      margin-top:350px;
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
        background: -webkit-linear-gradient(#FD4B2D, #DC2912); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(#FD4B2D, #DC2912); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(#FD4B2D, #DC2912); /* Firefox 3.6 - 15 */
        background: linear-gradient(#FD4B2D, #DC2912); /* 标准的语法 */
        color:white;
      }
      .cancelOrder{
        color:#333333;
        border:1px solid #bbbbbb;
      }
    }
  }
</style>


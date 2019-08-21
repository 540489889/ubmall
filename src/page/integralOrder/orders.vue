<template>
  <div class="ordersWrapper">
    <my-loading v-if="$store.state.isLoading"></my-loading>
    <div v-if="address" @click="checkAddress" class="adderssBox flex-box">
      <div class="address-ico flex-box"><i></i></div>
      <div class="address-text box-1">
        <h4>{{address.name}}  <span>{{address.phone}}</span></h4>
        <h6 class="media_desc">{{address.city+address.area+address.address}}</h6>
      </div>
      <div class="address-right cubeic-arrow"></div>
    </div>
    <div v-else @click="checkAddress" class="adderssBox flex-box">
      <div class="address-ico flex-box"><i></i></div>
      <div class="address-text box-1">
        <h1>请新增地址</h1>
      </div>
      <div class="address-right cubeic-arrow"></div>
    </div>
    <div class="orderInfor">
      <div class="infor-1 flex-box">
        <div class="left"><img :src="goodsarr.logo" alt=""></div>
        <div class="text box-1">
          <div class="flex-box">
            <h6 class="media_desc box-1">{{goodsarr.title}}</h6>
            <span>{{goodsarr.point_price}}</span>
          </div>
          <!--<div class="typeInfo"></div>-->
          <p class="desc media_desc">{{goodsarr.desc}}</p>
        </div>
      </div>
      <ul class="infor-list">
        <li>
          <div class="nummber-infor flex-box">
            <h2>数量</h2>
            <div class="right flex-box">
              <!--<span @click="reduce()">-</span>-->
              <!--<cube-input :min="1" :max="10" type="number" @change="handleNumChange(data.item)" v-model="number"></cube-input>-->
              <!--<span @click="plus()">+</span>-->
              <b>{{number}}</b>
            </div>
          </div>
        </li>
        <li class="flex-box checkLi">
          <span>配送方式</span>
          <div class="liVal">{{goodsarr.express_desc}}</div>
        </li>
        <li class="flex-box checkLi">
          <span>开具发票</span>
          <div class="liVal" >本次不开具发票</div>
        </li>
        <li class="flex-box checkLi">
          <span>安装服务</span>
          <div class="liVal">本次不需要安装</div>
        </li>
        <!--<li class="flex-box checkLi">-->
          <!--<span>订单备注</span>-->
          <!--<div class="liVal box-1"><cube-input v-model="goodsarr.remarks" @input="remarksVal" placeholder="选填请提前与商家协商一致" ></cube-input></div>-->
        <!--</li>-->
        <li class="subtotal">
          共{{number}}件 小计：<span>{{number*goodsarr.point_price}}元</span>
        </li>
      </ul>
    </div>
    <div class="pay-ui flex-box">
      <span class="flex-box"><i class="wx-ico"></i>微信支付</span>
      <b>默认支付方式</b>
    </div>
    <div class="subOrder flex-box">
      <div class="left box-1">
        共一件 合计：<span>{{number*goodsarr.point_price}}元</span>
      </div>
      <div class="rightBtn" @click="rightSubClick">提交订单</div>
    </div>
    <!--安装信息-->
    <cube-page v-if="maskShow" type="swipe-scroll" title="Scroll">
      <template slot="content">
        <div class="scroll-list-wrap">
          <cube-scroll>
            <transition
              name="slide-fade"
            >
              <order-service
                v-if="selected"
                :list="address"
                @changeServiceClick="changeServiceClick"
                @changeSelected="changeSelected()"></order-service>
            </transition>
          </cube-scroll>
        </div>
      </template>
    </cube-page>
    <!--发票信息-->
    <cube-page v-if="maskShowTwo" type="swipe-scroll" title="Scroll">
      <template slot="content">
        <div class="scroll-list-wrap">
          <cube-scroll>
            <transition
              name="slide-fade"
            >
              <order-invoice
                v-if="selectedTwo"
                @changeInvoiceSub="changeInvoiceSub"
                @changeSelected="changeSelectedTwo()"></order-invoice>
            </transition>
          </cube-scroll>
        </div>
      </template>
    </cube-page>
  </div>
</template>
<script>
  import CubePage from '../../components/cube-page.vue'
  import orderService from './components/service.vue'
  import orderInvoice from './components/invoice.vue'
  export default {
    name: 'ordersWrapper',
    data (){
      return {
        selected: false,
        selectedTwo: false,
        maskShowTwo: false,
        maskShow: false,
        remarks: '',//备注
        number: 1, //数量
        address: {}, //地址
        goodsarr: {},//商品信息
        express: {},
        total_price: 0,// 总金额
        orderInfor: {}
      }
    },
    components: {
      orderService,
      orderInvoice,
      CubePage
    },
    methods: {
      //确认订单
      rightSubClick(){
        let params = {}
        params.goods_id = this.$route.query.goods_id
        params.count = this.$route.query.count
        params.address_id = this.address.id
        this.http.post(this.ports.integral.points,params, res =>{
          this.$store.commit('changeLoading',false)
          console.log(res)
          this.showToastTxtOnly(res.msg)
          if(this.toastTime){
            this.toastTime.hide()
          }
          if(res.success){
            let data = res.data
            this.list = data.res
//            this.$store.commit('changeCartNum',this.cart)
          }else{
            this.showToastTxtOnly(res.msg)
          }
        })
      },

      //地址选择
      checkAddress(){
        let goods_id = this.$route.query.goods_id
        let key = this.$route.query.key
        let count = this.$route.query.count
        this.$router.push({path: '/integralOrder/address',query:{
          goods_id: goods_id,
          key: key,
          count: count
        }})
      },
      //默认数据
      getOrdersData(){
        let checkAddress = this.$route.query.address
        let goods_id = this.$route.query.goods_id
        let count = this.$route.query.count
        this.number = count
        console.log(checkAddress)
        this.http.get(this.ports.integral.create+'?goods_id='+goods_id+'&count='+count, res =>{
          this.$store.commit('changeLoading',false)
          console.log(res)
          if(res.success){
            let data = res.data
            this.address = data.address
            if(checkAddress){
              this.address =JSON.parse(checkAddress)
            }
            this.goodsarr = data.goods
            this.total_price = data.total_price
            //订单提交基本数据
            let goods = []
//            this.goodsarr.forEach((even,i)=>{
//              goods.push(even.goods)
//              this.orderInfor.goods = goods
//            })
            this.orderInfor.address = this.address
//            console.log(this.orderInfor)
//            this.goods = data.goods
//            this.$store.commit('changeCartNum',this.cart)
          }else{
            this.showToastTxtOnly(res.msg)
          }
        })
      },
      //备注信息
      remarksVal(val){
        console.log(this.orderInfor)
      },
      //确认发票信息
      changeInvoiceSub(val){
        if(!val){
          this.changeSelectedTwo(val)
        }else{
          let invoice = {}
          if(val.name==1){
            val.name = this.address.name
          }else{
            if(!val.unit){
              this.showToastTxtOnly('请输入单位名称')
              return false
            }
            if(!val.sbCode){
              this.showToastTxtOnly('请输入纳税人识别码')
              return false
            }
          }
          this.goodsarr.forEach((even,i)=>{
            if(even.goods.a=='a'){
              this.$set(even.goods,'invoice',val)
            }
          })
          this.changeSelectedTwo(false)

        }
      },
      //确认安装信息
      changeServiceClick(val){
          this.goodsarr.forEach((even,i)=>{
            if(even.goods.b=='b'){
              this.$set(even.goods,'ress',val)
            }
          })
          this.changeSelected(false)
      },
      //弹出发票，安装弹出窗
      confirmClick(val,item,index){
        const that = this
        if(val==='invoice'){
          this.maskShowTwo = true
          setTimeout( ()=>{
            that.selectedTwo = true
            this.goodsarr.forEach((even,i)=>{
              even.goods.a = 'b'
            })
            item.a = 'a'
          },200)
        }else{
          this.maskShow = true
          setTimeout( ()=>{
            this.goodsarr.forEach((even,i)=>{
              even.goods.b = 'a'
            })
            item.b = 'b'
            that.selected = true
          },200)
        }

      },
      changeSelected(val){
        this.selected = false
        const that = this
        if(!val){
          setTimeout( ()=>{
            that.maskShow = false
          },300)
        }
      },
      changeSelectedTwo(val){
        this.selectedTwo = val
        const that = this
        if(!this.selectedTwo){
          setTimeout( ()=>{
            that.maskShowTwo = false
          },300)
        }
      },
      showToastTxtOnly(text) {
        this.toast = this.$createToast({
          txt: text,
          type: 'txt'
        })
        this.toast.show()
      },
      reduce(){
        if(this.number<=1){
          this.showToastTxtOnly('受不了了，宝贝不能再减少了哦')
          return false
        }else{
          this.number -=1;
        }
      },
      //加法
      plus(){
        if(this.number>=10) {
          this.showToastTxtOnly('已经没有更多的库存了，下次再来吧')
          return false
        }else{
          this.number +=1
        }
      },
      //数量监听限制
      handleNumChange(){
        if(this.number>=10){
          this.showToastTxtOnly('超出范围')
          this.number = 10
        }
      },
    },
    mounted (){
      this.getOrdersData()
    }
  }
</script>
<style lang="less" scoped>
  .slide-fade-enter-active {
    transition: all .6s ease;
  }
  .slide-fade-leave-active {
    transition: all .6s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateY(700px);
    opacity: 0;
  }
  .scroll-list-wrap{
    position:fixed;
    bottom:0;
    left:0;
    width:100%;
    height:100%;
    z-index: 200;
    background:rgba(0,0,0,0.6);
    /*background:#000\9;!*CSS Hack,只能对ie9以下浏览器ie6,ie7,ie8有效，否侧ie10,FF,Cherome会失去透明效果*!*/
    filter:Alpha(opacity=60);/*只对ie7,ie8有效*/
  }
  .ordersWrapper{
    background-color:aliceblue;
    font-size:28px;
    width:100%;
    min-height:100vh;
    padding:20px 30px;
    box-sizing: border-box;
    position:relative;
    padding-bottom:150px;
    .subOrder{
      position: fixed;
      bottom:0;
      left:0;
      width:100%;
      height:130px;
      box-sizing: border-box;
      padding:0 30px;
      background-color:white;
      .left{
        text-align: right;
        margin-right:20px;
        font-size:30px;
        span{
          color:#ff3747;
          font-weight: bold;
        }
      }
      .rightBtn{
        height:80px;
        width:260px;
        line-height:80px;
        text-align: center;
        background-color:#ff3747;
        color:white;
        border-radius: 40px;
      }
    }
    .adderssBox{
      background-color:white;
      padding:30px;
      border-radius: 10px;
      margin-bottom:20px;
      .address-ico{
        background-color:aliceblue;
        width:60px;
        height:60px;
        border-radius: 50%;
        justify-content: center;
        i{
          width:28px;
          height:35px;
          background:url(../../assets/ico/address-ico.png) no-repeat center;
          background-size:100%;
        }
      }
      .address-text{
        text-align: left;
        margin:0 15px;
        h1{
          font-size:36px;
          font-weight: bold;
        }
        h4{
          font-size:26px;
          margin-bottom:10px;
          span{
            color:#7f8593;
            margin-left:10px;
          }
        }
        h6{
          font-size:30px;
        }
      }
      .address-right{
        font-size:40px;
      }
    }
    .orderInfor{
      background-color:white;
      border-radius: 10px;
      padding:30px;
      margin-bottom:20px;
      .infor-1{
        align-items: flex-start;
        .left{
          margin-right:20px;
          img{
            width:170px;
            height:170px;
            border-radius: 15px;
          }
        }
        .desc{
          line-height:1.4;
        }
        .text{
          text-align: left;
          .flex-box{
            align-items: flex-start;
            span{
              color:#ff0207;
              font-size:40px;
              font-weight: bold;
              /*margin-left:5px;*/
            }
          }
          .typeInfo{
            height:70px;
            line-height:70px;
            text-align: center;
            background-color:#f2f2f2;
            color:#7f8593;
            padding:0 30px;
            border-radius: 35px;
            display: inline-block;
            margin-top:20px;
          }
        }
      }
      .infor-list{
        li{
          .nummber-infor{
            justify-content: space-between;
            h2{
              margin:25px 0;
            }
            .right{
              span{
                font-size:30px;
                width:30px;
                height:30px;
                text-align: center;
              }
            }
          }
        }
        .checkLi{
          justify-content: space-between;
          padding:30px 0;
          .liVal{
            color:#7f8593;
            font-size:26px;
            margin-left:20px;
            .cube-input:after{
              content: initial;
            }
          }
        }
        .subtotal{
          margin-top:20px;
          text-align: right;
          font-size:26px;
          span{
            color:#ff3747;
          }
        }
      }
    }
    .pay-ui{
      padding:40px 30px;
      justify-content: space-between;
      margin-top:20px;
      background-color:white;
      border-radius: 10px;
      span{
        i{
          width:36px;
          height:36px;
          background:url(../../assets/ico/wx-ico.png) no-repeat center;
          background-size:100%;
          margin-right:10px;
        }
      }
      b{
        color:#7f8593;
        font-size:26px;
      }
    }

  }
</style>


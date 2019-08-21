<template>
  <div class="orderIndex">
    <my-loading v-if="$store.state.isLoading"></my-loading>
    <cube-page type="sticky-view-scroll" title="Sticky">
      <template slot="content">
        <div class="listWrapper sticky-view-container">
          <cube-sticky :pos="scrollY">
            <cube-scroll
              :scroll-events="scrollEvents"
              @scroll="scrollHandler">
              <div style="height:65px;"></div>
              <cube-sticky-ele>
                <order-nav @changeNavClick="changeNavClick"></order-nav>
              </cube-sticky-ele>
              <div class="nullBox" v-if="!list.length">
                <img src="../../assets/ico/null-ico.png" alt="">
                <p>暂无订单</p>
              </div>
              <order-data
                @deleteGoodsOrder="deleteGoodsOrder"
                @confirmGoodsOrder="confirmGoodsOrder"
                @cancelOrder="cancelOrder"
                @changePayClick="changePayClick"
                :list="list"
                :type="type"
                @changeCallcelOrder="confirmClick"></order-data>
              <div style="height:55px;"></div>
            </cube-scroll>
          </cube-sticky>
          <!--<div v-if="!selected" class="mergePay">合并付款（已选2件）</div>-->
        </div>
      </template>
    </cube-page>
    <cube-page v-if="maskShow" type="swipe-scroll" title="Scroll">
      <template slot="content">
        <div class="scroll-list-wrap">
          <cube-scroll>
            <transition
              name="slide-fade"
            >
              <cancel-order
                v-if="selected"
                @changeDeleteOrder="changeDeleteOrder"
                @changeSelected="changeSelected"></cancel-order>
            </transition>
          </cube-scroll>
        </div>
      </template>
    </cube-page>
  </div>

</template>
<script>
  import CubePage from '../../components/cube-page.vue'
  import orderNav from './components/nav.vue'
  import orderData from './components/data.vue'
  import cancelOrder from './components/cancel.vue'
  export default {
    name: 'OrderIndex',
    data (){
      return {
        selected: false,
        maskShow: false,
        scrollEvents: ['scroll'],
        scrollY: 0,
        list: [],//列表数据
        toastTime:null,
        type: 'all', //默认待付款
      }
    },
    components: {
      orderNav,
      orderData,
      CubePage,
      cancelOrder
    },
    methods: {
      //确认收货
      confirmGoodsOrder(id,index){
        this.$createDialog({
          type: 'confirm',
//          icon: 'cubeic-alert',
          title: '您是否确认收货？',
//          content: '我是内容',
          confirmBtn: {
            text: '确定',
            active: true,
            disabled: false,
            href: 'javascript:;'
          },
          cancelBtn: {
            text: '取消',
            active: false,
            disabled: false,
            href: 'javascript:;'
          },
          onConfirm: () => {
            this.http.post(this.ports.order.confirm_order,{order_id:id}, res =>{
              console.log(res)
              if(res.success){
                this.list.splice(index, 1)
//            this.$store.commit('changeCartNum',this.cart)
              }else{
                this.showToastTxtOnly(res.msg)
              }
            })
          }
        }).show()
      },
      //取消订单
      cancelOrder(id,index){
        this.$createDialog({
          type: 'confirm',
//          icon: 'cubeic-alert',
          title: '您是否取消订单？',
//          content: '我是内容',
          confirmBtn: {
            text: '确定',
            active: true,
            disabled: false,
            href: 'javascript:;'
          },
          cancelBtn: {
            text: '取消',
            active: false,
            disabled: false,
            href: 'javascript:;'
          },
          onConfirm: () => {
            this.http.post(this.ports.order.cancel_order,{order_id:id}, res =>{
              console.log(res)
              if(res.success){
                this.list.splice(index, 1)
//            this.$store.commit('changeCartNum',this.cart)
              }else{
                this.showToastTxtOnly(res.msg)
              }
            })
          }
        }).show()

      },
      //去付款
      changePayClick(id,index){

        this.http.get(this.ports.order.pay+'?id='+id, res =>{
          if(res.success){
            this.list.splice(index, 1)
            let data = res.data
            location.href = data
//            this.$store.commit('changeCartNum',this.cart)
          }else{
            this.showToastTxtOnly(res.msg)
          }
        })
      },
      //删除订单
      deleteGoodsOrder(id,index){
        this.$createDialog({
          type: 'confirm',
//          icon: 'cubeic-alert',
          title: '您是否真的要删除订单？',
//          content: '我是内容',
          confirmBtn: {
            text: '确定',
            active: true,
            disabled: false,
            href: 'javascript:;'
          },
          cancelBtn: {
            text: '取消',
            active: false,
            disabled: false,
            href: 'javascript:;'
          },
          onConfirm: () => {
            this.http.post(this.ports.order.del_order,{order_id:id}, res =>{
              console.log(res)
              if(res.success){
                this.list.splice(index, 1)
//            this.$store.commit('changeCartNum',this.cart)
              }else{
                this.showToastTxtOnly(res.msg)
              }
            })
          }
        }).show()

      },
      showToastTime() {
         this.toastTime = this.$createToast({
          time: 0,
          txt: '加载中...'
        })
        this.toastTime.show()
      },
      //nav切换
      changeNavClick(val){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        this.type = val
//        this.showToastTime()
        this.getOrderData(val)
      },
      showToastTxtOnly(text) {
        this.toast = this.$createToast({
          txt: text,
          type: 'txt'
        })
        this.toast.show()
      },
      getOrderData(val){
        this.http.get(this.ports.order.orderList+'?status='+val, res =>{
          //获取全部订单
          this.$store.commit('changeLoading',false)
          console.log(res)
          if(this.toastTime){
            this.toastTime.hide()
          }
          if(res.success){
            let data = res.data
            this.list = data
//            this.$store.commit('changeCartNum',this.cart)
          }else{
//            this.showToastTxtOnly(res.msg)
            this.list = []
          }
        })
      },
      confirmClick(val){
        const that = this
        this.maskShow = true
        setTimeout( ()=>{
          that.selected = true
        },200)
      },
      changeSelected(val){
        this.selected = val
        const that = this
        if(!this.selected){
          setTimeout( ()=>{
            that.maskShow = false
          },300)
        }
      },
      changeDeleteOrder(val){
        alert(val)
        this.changeSelected(false)

      },
      scrollHandler({ y }) {
        this.scrollY = -y
      }
    },
    mounted (){
      this.getOrderData(this.type)
//      this.$store.commit('changeLoading',false)
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
  .listWrapper{
    font-size:28px;
    background-color:#f9f9f9;
    min-height:100vh;
    width:100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    padding-bottom: 100px;
    .mergePay{
      height:100px;
      line-height:100px;
      text-align: center;
      color:white;
      position:fixed;
      bottom:0;
      left:0;
      width:100%;
      background-color:#ff0207;
      z-index: 19;
    }
  }
</style>


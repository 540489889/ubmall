<template>
  <div class="orderIndex">
    <cube-page type="sticky-view-scroll" title="Sticky">
      <template slot="content">
        <div class="listWrapper sticky-view-container">
          <cube-sticky :pos="scrollY">
            <cube-scroll
              :scroll-events="scrollEvents"
              @scroll="scrollHandler">
              <div style="height:1px;"></div>
              <cube-sticky-ele>
                <order-nav @changeClick="changeClick"></order-nav>
              </cube-sticky-ele>
              <div class="nullBox" v-if="!list.length">
                <img src="../../assets/ico/null-ico.png" alt="">
                <p>暂无数据</p>
              </div>
              <component
                :is="curentTab"
                :list="list"
                @changeCallcelOrder="confirmClick"></component>
            </cube-scroll>
          </cube-sticky>
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
  import dataCenter from './components/dataCenter.vue'
  import dataOver from './components/dataOver.vue'
  import cancelOrder from './components/reason.vue'
  export default {
    name: 'OrderIndex',
    data (){
      return {
        selected: false,
        maskShow: false,
        scrollEvents: ['scroll'],
        scrollY: 0,
        list: [],
        curentTab: 'orderData',
        toastTime:null,
      }
    },
    components: {
      orderNav,
      orderData,
      CubePage,
      cancelOrder,
      dataCenter,
      dataOver
    },
    methods: {
      showToastTime() {
        this.toastTime = this.$createToast({
          time: 0,
          txt: '加载中...'
        })
        this.toastTime.show()
      },
      changeClick(val){
        this.showToastTime()
        if(val=='售后申请'){
          this.getData()
          this.curentTab = 'orderData'
        }else if(val=='处理中'){
          this.curentTab= 'dataCenter'
          this.getAfterlog(1)
        }else{
          this.curentTab= 'dataOver'
          this.getAfterlog(2)
        }
      },
      showToastTxtOnly(text) {
        this.toast = this.$createToast({
          txt: text,
          type: 'txt'
        })
        this.toast.show()
      },
      getAfterlog(type){
        this.list = []
        this.http.get(this.ports.refund.afterlog+'?type='+type, res =>{
          console.log(res)
          this.$store.commit('changeLoading',false)
          if(this.toastTime){
            this.toastTime.hide()
          }
          if(res.success){
            let data = res.data
            this.list = data.res
          }else{
            this.list = []
//            this.showToastTxtOnly(res.msg)
          }
        })
      },
      getData(){
        this.list = []
        this.http.get(this.ports.refund.afterindex, res =>{
          this.$store.commit('changeLoading',false)
          if(this.toastTime){
            this.toastTime.hide()
          }
          console.log(res)
          if(res.success){
            let data = res.data
            this.list = data.res
          }else{
            this.list = []
//            this.showToastTxtOnly(res.msg)
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
      this.getData()
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
    background-color:aliceblue;
    min-height:100vh;
    width:100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
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


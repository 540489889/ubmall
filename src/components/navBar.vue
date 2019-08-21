<template>
  <cube-tab-bar
    class="navBar"
    v-model="selectedNavTitle"
    @click="clickHandler"
    @change="changeHandler">
    <cube-tab
      :showSlider="showSlider"
      :inline="inline"
      :useTransition="useTransition"
      v-for="(item, index) in tabs"
      :label="item.label"
      :key="item.label">
      <!-- name为icon的插槽 -->
      <i slot="icon" :class="item.icon" v-if="index==1&&$store.state.cartNum!=0"><b>{{$store.state.cartNum}}</b></i>
      <i slot="icon" :class="item.icon" v-else></i>
      <!-- 默认插槽 -->
      {{item.label}}
    </cube-tab>
  </cube-tab-bar>
</template>

<script>
  import './../assets/style/cubeRest.css'
  export default {
    data () {
      return {
        selectedLabelSlots: 'BCAC商城',
        tabs: [{
          label: 'BCAC商城',
          icon: 'cubeic-home'
        },
//          {
//          label: '分类',
//          icon: 'cubeic-like'
//        },
          {
          label: '购物车',
          icon: 'cubeic-vip'
        }, {
          label: '我的订单',
          icon: 'cubeic-person'
        }],
        showSlider: false,
        inline: true,
        useTransition: false
      }
    },
    props:{
      selectedNavTitle: String,
    },
    methods: {
      clickHandler (label) {
        // if you clicked home tab, then print 'Home'
//        this.$store.commit('changeTitle',label)
        switch (label){
          case 'BCAC商城':
            this.$router.push('/')
            break
          case '我的订单':
            this.$router.push('/order/index')
            break
          case '分类':
            this.$router.push('/sort/index')
            break
          case '购物车':
            this.$router.push('/cart/index')
            break
          default:
            this.$router.push('/')
        }

      },
      changeHandler (label) {
        // if you clicked different tab, this methods can be emitted
//        console.log(this.$route.path)
      }
    },
    mounted (){
      console.log(localStorage.carNum,this.$store.state.cartNum)
//      this.clickHandler(this.selectedNavTitle)
    },
  }
</script>

<style scoped lang="less">
  .navBar{
    position:fixed;
    bottom:0;
    left:0;
    width:100%;
    font-size:24px;
    background-color:white;
    border-top:1px solid #eee;
    z-index: 99;
    .cube-tab{
      /*position:relative;*/
    }
    .cubeic-vip{
      position:relative;
    }
  }
  .navBar .cube-tab_active{
    color: #51b1ed;
  }
  .cubeic-vip b{
    position:absolute;
    right:-5px;
    top:-5px;
    color:white;
    background-color:#ff0207;
    display: inline-block;
    border-radius: 50%;
    width:15px;
    height:15px;
    line-height:15px;
    font-size:10px;
  }
</style>

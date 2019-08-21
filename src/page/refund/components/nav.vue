<template>
  <div class="orderNav">
    <cube-tab-bar
      v-model="selectedLabelSlots"
      :show-slider="showSlider"
      inline
      @click="clickHandler">
      <cube-tab :class="index===3?'lastTab':''" v-for="(item, index) in tabs" :label="item.label" :key="item.label">
        <!-- name为icon的插槽 -->
        <!--<i slot="icon" :class="item.icon"></i>-->
        <!-- 默认插槽 -->
        {{item.label}}
      </cube-tab>
    </cube-tab-bar>
  </div>
</template>
<script>
  export default {
    name: 'orderNav',
    data (){
      return {
        showSlider: false,
        selectedLabelSlots: '售后申请',
        tabs: [{
          label: '售后申请',
          icon: 'cubeic-home'
        }, {
          label: '处理中',
          icon: 'cubeic-like'
        }, {
          label: '申请记录',
          icon: 'cubeic-vip'
        }, {
          label: '',
          icon: 'cubeic-person'
        }]
      }
    },
    methods: {
      clickHandler (label) {
        // if you clicked home tab, then print 'Home'
        this.$emit('changeClick',label)
      }
    },
    mounted (){

    }
  }
</script>
<style lang="less" scoped>
  .orderNav{
    border-bottom:1px solid #eee;
    background:white;
    .cube-tab_active{
      color:black;
    }
    .cube-tab{
      padding:15px 0;
      position:relative;
    }
    .cube-tab_active::after{
      content: '';
      display: inline-block;
      width:25px;
      height:3px;
      background-color:red;
      position:absolute;
      bottom:0;
      left:50%;
      transform: translateX(-50%);
      border-radius: 2px;
    }
    .lastTab{
      opacity: 0;
      visibility: hidden;
    }
  }
</style>


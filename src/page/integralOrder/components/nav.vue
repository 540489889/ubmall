<template>
  <div class="orderNav">
    <cube-tab-bar
      v-model="selectedLabelSlots"
      :show-slider="showSlider"
      inline
      @change="changeHandler"
      @click="clickHandler">
      <cube-tab v-for="(item, index) in tabs" :label="item.label" :key="item.label">
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
        activeIndex: 0,
        selectedLabelSlots: '待付款',
        showSlider: false,
        inline:true,
        tabs: [{
          label: '待付款',
          icon: 'cubeic-home'
        },{
          label: '待发货',
          icon: 'cubeic-like'
        },{
          label: '待收货',
          icon: 'cubeic-vip'
        },{
          label: '已完成',
          icon: 'cubeic-person'
        }]
      }
    },
    methods: {
      activeInit(){
        let type = this.$route.query.type
        if(type == 2) {
          this.selectedLabelSlots = '待付款'
        }
        if(type == 3) {
          this.selectedLabelSlots = '待发货'
        }
        if(type == 4) {
          this.selectedLabelSlots = '待收货'
        }
        if(type == 5) {
          this.selectedLabelSlots = '已完成'
        }
      },
      clickHandler (label) {

        if(label=='待付款'){
          this.activeIndex = 2
        }
        if(label=='待发货'){
          this.activeIndex = 3
        }
        if(label=='待收货'){
          this.activeIndex = 4
        }
        if(label=='已完成'){
          this.activeIndex = 5
        }
        this.$emit('changeNavClick',this.activeIndex)
        // if you clicked home tab, then print 'Home'
      },
      changeHandler (label) {
        // if you clicked different tab, this methods can be emitted
      }
    },
    mounted (){
      this.activeInit()
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
  }
</style>


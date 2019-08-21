<template>
  <div class="mallIndex">
    <my-loading v-if="$store.state.isLoading"></my-loading>
    <goods-swiper :banner="banner"></goods-swiper>
    <hot-data :hot="hot"></hot-data>
    <thing-data :list="list"></thing-data>
  </div>
</template>
<script>
  import thingData from './components/thing.vue'
  import hotData from './components/hot.vue'
  import goodsSwiper from '../../components/swiper.vue'
  export default {
    name: 'mallIndex',
    data (){
      return {
        banner: [],
        hot: [],//热门
        list: [],//全部
      }
    },
    components: {
      goodsSwiper,
      hotData,
      thingData
    },
    methods: {
      getGoodsIndex(){
        this.http.get(this.ports.integral.goodsIndex, res =>{
          this.$store.commit('changeLoading',false)
          console.log(res)
          if(res.success){
            let data = res.data
            this.hot = data.hot
            this.list = data.all
          }else{
            this.showToastTxtOnly(res.msg)
          }
        })
      }
    },
    mounted (){
      this.getGoodsIndex()
    }
  }
</script>
<style lang="less" scoped>
  .mallIndex{
    font-size:28px;
    min-height:100vh;
    background-color:white;
    position:relative;
  }
</style>


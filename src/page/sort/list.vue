<template>
  <cube-page type="sticky-view-scroll" title="Sticky">
    <my-loading v-if="$store.state.isLoading"></my-loading>
    <template slot="content">
      <div class="listWrapper sticky-view-container">
        <cube-sticky :pos="scrollY">
          <cube-scroll
            :scroll-events="scrollEvents"
            @scroll="scrollHandler">
            <home-search></home-search>
            <cube-sticky-ele ele-key="123">
              <index-sort
                @changePriceClick="changePriceClick"
                @changeAmountClick="changeAmountClick"></index-sort>
            </cube-sticky-ele>
            <div class="nullBox" v-if="!list.length">
              <img src="../../assets/ico/null-ico.png" alt="">
              <p>暂无数据</p>
            </div>
            <data-sort :list="list"></data-sort>
          </cube-scroll>
        </cube-sticky>
      </div>
    </template>
  </cube-page>
</template>
<script>
  import CubePage from '../../components/cube-page.vue'
  import HomeSearch from '../../components/searchBar.vue'
  import IndexSort from './components/sort.vue'
  import DataSort from './components/data.vue'
  export default {
    name: 'SortList',
    data (){
      return {
        scrollEvents: ['scroll'],
        scrollY: 0,
        list: [],//商品列表
      }
    },
    components: {
      HomeSearch,
      IndexSort,
      DataSort,
      CubePage
    },
    methods: {
      //价格排序
      changePriceClick(val){
        if(val){
          this.getListData('price_market+desc')
        }else{
          this.getListData('price_market+asc')
        }
      },
      //销量排序
      changeAmountClick(val){
        if(val){
          this.getListData('number_sales+desc')
        }else{
          this.getListData('number_sales+asc')
        }
      },
      showToastTxtOnly(text) {
        this.toast = this.$createToast({
          txt: text,
          type: 'txt'
        })
        this.toast.show()
      },
      scrollHandler({ y }) {
        this.scrollY = -y
      },
      getListData(order){
        let id = this.$route.query.cate //分类id
        let title = this.$route.query.title //搜索内容
        let type = this.$route.query.type //当带有此参数时，为首页的新品推荐和平台精选。new为新品，choice为精选
        this.http.get(this.ports.search.index+'?cate='+id+'&title='+title+'&type='+type+'&order='+order, res =>{
          console.log(res)
          this.$store.commit('changeLoading',false)
          if(res.success){
            let data = res.data
            this.list = data.res
          }else{
            this.list = []
//            this.showToastTxtOnly(res.msg)
          }
        })
      }
    },
    mounted (){
      this.getListData('')
    }
  }
</script>
<style lang="less" scoped>
  .listWrapper{
    font-size:28px;
    background-color:aliceblue;
    min-height:100vh;
    width:100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
  }
</style>


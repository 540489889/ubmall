<template>
  <div class="sortGoods">
    <my-loading v-if="$store.state.isLoading"></my-loading>
    <data-list :list="list"></data-list>
  </div>
</template>
<script>
  import DataList from '../../components/dataList.vue'
  export default {
    name: 'mb',
    data (){
      return {
        list: []
      }
    },
    components: {
      DataList
    },
    methods: {
      showToastTxtOnly(text) {
        this.toast = this.$createToast({
          txt: text,
          type: 'txt'
        })
        this.toast.show()
      },
      //获取列表数据
      getSortData(){
        let title = this.$route.query.title
        let cid = this.$route.query.cid
        this.http.get(this.ports.sort.index+'?cid='+cid+'&so='+title, res =>{
          this.$store.commit('changeLoading',false)
          console.log(res)
          if(res.success){
            let data = res.data
            this.list = data
          }else{
            this.showToastTxtOnly(res.msg)
          }
        })
      }
    },
    mounted (){
      this.getSortData()
    }
  }
</script>
<style lang="less" scoped>
  .sortGoods{
    width:750px;
    min-height:100vh;
    background-color:#f9f9f9;
    font-size:26px;
  }
</style>


<template>
  <div class="sortBox">
    <div class="flex-box">
      <div class="sort-l sort-1">推荐</div>
      <div @click="priceClick" class="sort-l sort-2">价格
        <i class="cubeic-pullup" :class="{cksort: cksort&&!amount&&sortFs}"></i>
        <i class="cubeic-pulldown" :class="{cksort:!cksort&&!amount&&sortFs}"></i>
      </div>
      <div class="sort-l sort-3" @click="amountClick">销量
        <i class="cubeic-pullup" :class="{cksort: amount&&!cksort&&!sortFs}"></i>
        <i class="cubeic-pulldown" :class="{cksort:!amount&&!cksort&&!sortFs}"></i>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'sort',
    data (){
      return {
        sortFs: true,
        cksort: true, //价格
        amount: false, //销量
      }
    },
    methods: {
      //价格排序
      priceClick(){
        this.sortFs = true
        this.amount = false
        this.cksort = !this.cksort
        this.$emit('changePriceClick',this.cksort)
      },
      //销量排序
      amountClick(){
        this.sortFs = false
        this.cksort = false
        this.amount = !this.amount
        this.$emit('changeAmountClick',this.amount)
      }
    },
    mounted (){

    }
  }
</script>
<style lang="less" scoped>
  .sortBox{
    padding:30px;
    background-color:aliceblue;
    .sort-l{
      position:relative;
      margin-right:20px;
      height:50px;
      line-height:50px;
      border-radius: 25px;
      padding:0 30px;
      text-align: center;
      color:#7f8593;
      /*min-width:110px;*/
      i{
        font-size:50px;
      }
      .cubeic-pullup{
        position:absolute;
        right:-8px;
        bottom:5px;
      }
      .cubeic-pulldown{
        position:absolute;
        right:-8px;
        top:5px;
      }
      .cksort{
        color:#ff3545;
      }
    }
    .sort-1{
      color:white;
      background-color:#ff3545;
    }
  }
</style>


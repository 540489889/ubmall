<template>
  <div class="detailedWrapper">
    <my-loading v-if="$store.state.isLoading"></my-loading>
    <div class="title">
      <div class="flex-box hTitle">
        <div class="box-1"><span>{{sum}}</span>积分</div>
        <router-link tag="a" to="/integralMall/index" class="exchangeBtn">积分兑换商品</router-link>
      </div>
      <p>积分又可以在积分商城兑换礼品</p>
    </div>
    <div class="content">
      <h2>积分明细</h2>
      <h3 class="flex-box">
        <span class="t1">积分</span>
        <span class="t1">详细说明</span>
        <span class="box-1">记录时间</span>
      </h3>
      <ul>
        <li class="flex-box" v-for="(item,index) in list" :key="index">
          <span class="t1">{{item.point}}</span>
          <span class="t1">{{item.type}}</span>
          <span class="box-1">{{item.create_at}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'detailedWrapper',
    data (){
      return {
        list: [],
        sum: '',//总积分
      }
    },
    methods: {
      //获取数据
      getIntegralData(){
        this.http.get(this.ports.integral.loglist, res =>{
          this.$store.commit('changeLoading',false)
          console.log(res)
          if(res.success){
            let data = res.data
            this.list = data.res
            this.sum = data.sum
          }else{
            this.showToastTxtOnly(res.msg)
          }
        })
      },
    },
    mounted (){
      this.getIntegralData()
    }
  }
</script>
<style lang="less" scoped>
  .detailedWrapper{
    width:100%;
    min-height:100vh;
    background-color:#fff;
    font-size:28px;
    position:relative;
    .title{
      width:750px;
      height:350px;
      background:url(../../assets/ico/integral-t-bg.png) no-repeat center;
      background-size:100%;
      color:white;
      position:relative;
      padding:30px;
      box-sizing: border-box;
      overflow: hidden;
      text-align:left;
      .hTitle{
        margin-top:100px;
        span{
          font-size:60px;
          font-weight: bold;
        }
        .exchangeBtn{
          margin-left:20px;
          height:80px;
          width:300px;
          border-radius: 40px;
          text-align: center;
          border:1px solid #eee;
          color:white;
          line-height:80px;
        }
      }
      p{
        line-height:2;
        margin-top:50px;
      }
    }
    .content{
      h2{
        padding:30px;
        text-align: left;
        font-size:30px;
        border-bottom:1px solid #eee;
        font-weight: bold;
      }
      h3{
        padding:30px 0;
        border-bottom:1px solid #eee;
        .t1{
          width:200px;
          text-align: center;
        }
      }
      ul{
        li{
          padding:30px 0;
          border-bottom:1px solid #eee;
          .t1{
            width:200px;
            text-align: center;
          }
        }
      }
    }
  }
</style>


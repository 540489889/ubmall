<template>
  <div class="orderData">
    <ul class="dataList">
      <li  class="" v-for="(item,index) in list" :key="item.id">
        <!--{{item}}-->
        <template v-if="item.childOrder">
          <div class="tsInfor">等待买家付款</div>
          <router-link tag="div" :to="'/goods/index/'+it.goods_id" class="goodsBox flex-box"  v-for="it in item.childOrder" :key="it.id">
            <!--<div class="left-check">-->
            <!--<cube-checkbox v-model="checked" :option="option"></cube-checkbox>-->
            <!--</div>-->
            <div class="right-img"><img :src="it.goods_logo" alt=""></div>
            <div class="right-text box-1">
              <div class="flex-box tpText">
                <h2 class="media_desc box-1">{{it.goods_title}}</h2>
                <span><b>{{it.price_selling}}</b></span>
              </div>
              <p>{{it.goods_spec}}</p>
              <p>数量：1</p>
            </div>
          </router-link>
          <h6>共{{item.childOrder.length}}件商品 共计：<span>{{item.price_goods}}</span></h6>
          <div class="btn-ui" v-if="type==2">
            <a class="offBtn" @click="confirmClick(item.id,index)"> 取消订单</a>
            <a class="payBtn" @click="payClick(item.id,index)"> 立即付款</a>
          </div>
        </template>
        <template v-else>
          <div class="tsInfor" v-if="type==3">等待卖家发货</div>
          <div class="tsInfor" v-if="type==4">等待卖家收货</div>
          <div class="goodsBox flex-box" >
            <!--<div class="left-check">-->
            <!--<cube-checkbox v-model="checked" :option="option"></cube-checkbox>-->
            <!--</div>-->
            <div class="right-img"><img :src="item.goods_logo" alt=""></div>
            <div class="right-text box-1">
              <div class="flex-box tpText">
                <h2 class="media_desc box-1">{{item.goods_title}}</h2>
                <span><b>{{item.price_selling}}</b></span>
              </div>
              <p>{{item.goods_spec}}</p>
              <p>数量：1</p>
            </div>
          </div>
          <div class="btn-ui" v-if="type==3">
            <router-link tag="a" :to="'/refund/apply?id='+item.id" class="offBtn"> 申请退款</router-link>
          </div>
          <div class="btn-ui" v-if="type==4">
            <router-link tag="a" :to="'/refund/apply?id='+item.id" class="offBtn"> 申请退款</router-link>
            <router-link tag="a" to="'/refund/apply" class="offBtn"> 查看物流</router-link>
            <router-link tag="a" to="/refund/apply" class="offBtn"> 确认收货</router-link>
          </div>
          <div class="btn-ui" v-if="type==5">
            <router-link tag="a" :to="'/refund/apply?id='+item.id" class="offBtn"> 申请退款</router-link>
          </div>
        </template>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'OrderData',
    data (){
      return {
        checked: false,
        option: {
          label: '',
          value: '0',
          disabled: false
        }
      }
    },
    props: {
      list: Array,
      type: Number
    },
    methods: {
      //去付款
      payClick(id,index){
        this.$emit('changePayClick',id,index)
      },
      //取消
      confirmClick(id,index){
        console.log(id)
        this.$emit('deleteOrder',id,index)
      }
    },
    mounted (){
    }
  }
</script>
<style lang="less" scoped>
  .orderData{
    padding:0 30px;
    overflow: hidden;
    /*padding-bottom:100px;*/
    /*position:relative;*/
    .dataList{
      li{
        background-color:white;
        margin:20px 0;
        border-radius: 10px;
        padding:30px 0;
        padding-right:30px;
        padding-top:10px;
        position:relative;
        .tsInfor{
          text-align: left;
          font-size:24px;
          color:#ff0207;
          padding:15px;
        }
        .goodsBox{
          margin-top:20px;
          .left-check{
            .cube-checkbox{
              padding:0 10px;
            }
          }
          .right-img{
            width:170px;
            height:170px;
            margin-right:15px;
            margin-left:15px;
            img{
              width:100%;
              height:100%;
              border-radius: 10px;
            }
          }
          .right-text{
            text-align: left;
            .tpText{
              align-items: flex-start;
              span{
                color:#ff0207;
                b{
                  font-size:36px;
                  font-weight: bold;
                }
              }
            }
            p{
              color:#7f8593;
              font-size:24px;
              line-height: 2;
            }
          }
        }
        .goodsBox:first-child{
          margin-top:0;
        }
        h6{
          text-align: right;
          line-height:2;
          color:#7f8593;
          font-size:24px;
          span{
            color:black;
            font-size:28px;
          }
        }
        .btn-ui{
          text-align: right;
          margin-top:15px;
          a{
            display: inline-block;
            width:150px;
            height:50px;
            line-height:50px;
            text-align: center;
            border:1px solid #aaa;
            border-radius: 25px;
            font-size:26px;
            margin-left:10px;
          }
          .payBtn{
            color:#ff0207;
            border:1px solid #ff0207;
          }
        }
      }
    }
  }
</style>


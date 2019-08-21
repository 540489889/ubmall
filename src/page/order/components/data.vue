<template>
  <div class="orderData">
    <ul class="dataList">
      <li  class="" v-for="(item,index) in list" :key="item.id">
        <!--{{item}}-->
          <div class="tsInfor flex-box"><p class="box-1">下单时间：{{item.add_time}}</p>
            <span v-if="item.order_status==0">待付款</span>
            <span v-if="item.order_status==1">待发货</span>
            <span v-if="item.order_status==2">待收货</span>
            <span v-if="item.order_status==3">已完成</span>
            <span v-if="item.order_status==4">已退款</span>
            <span v-if="item.order_status==-1">已失效</span>
          </div>
          <router-link tag="div" :to="'/order/details?id='+item.order_id" class="goodsBox flex-box"  v-for="(it,x) in item.goods_list" :key="x">
            <!--<div class="left-check">-->
            <!--<cube-checkbox v-model="checked" :option="option"></cube-checkbox>-->
            <!--</div>-->
            <div class="right-img"><img :src="it.imgs" alt=""></div>
            <div class="right-text box-1">
              <div class="flex-box tpText">
                <h2 class="media_title box-1">{{it.title}}</h2>
              </div>
              <p>{{it.name}}</p>
              <p class="bcacNum">
                <span><b>{{it.price}}</b></span>x{{it.nums}}</p>
            </div>
          </router-link>
          <h6 class="numGoods">共<b>{{item.nums}}</b>件商品 共计：<span>{{item.order_amount}}<strong>BCAC</strong></span></h6>
          <div class="btn-ui" v-if="item.order_status==0">
            <a class="offBtn" @click="confirmClick(item.order_id,index)"> 取消订单</a>
            <router-link tag="a" :to="'/pay/index?order_id='+item.order_id" class="payBtn"> 立即付款</router-link>
          </div>
        <div class="btn-ui" v-if="item.order_status==1">
          <router-link tag="a" :to="'/order/details?id='+item.order_id" class="offBtn"> 查看详情</router-link>
        </div>
        <div class="btn-ui" v-if="item.order_status==2">
          <a class="offBtn" :href="'https://m.kuaidi100.com/result.jsp?nu='+item.tran_sn"> 查看物流</a>
          <a class="payBtn" @click="confirmGoods(item.order_id,index)"> 确认收货</a>
        </div>
        <div class="btn-ui" v-if="item.order_status==3">
          <a class="offBtn" @click="deleteOrderGoods(item.order_id,index)"> 删除订单</a>
          <a class="offBtn" :href="'https://m.kuaidi100.com/result.jsp?nu='+item.tran_sn"> 查看物流</a>
        </div>
        <div class="btn-ui" v-if="item.order_status==-1||item.order_status==4">
          <a class="offBtn" @click="deleteOrderGoods(item.order_id,index)"> 删除订单</a>
        </div>
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
    },
    methods: {
      //去付款
      payClick(id,index){
        this.$emit('changePayClick',id,index)
      },
      //取消订单
      confirmClick(id,index){
        console.log(id)
        this.$emit('cancelOrder',id,index)
      },
      //确认收货
      confirmGoods(id,index){
        this.$emit('confirmGoodsOrder',id,index)
      },
      deleteOrderGoods(id,index){
        this.$emit('deleteGoodsOrder',id,index)
      }
    },
    mounted (){
    }
  }
</script>
<style lang="less" scoped>
  .orderData{
    /*padding:0 30px;*/
    overflow: hidden;
    /*padding-bottom:100px;*/
    /*position:relative;*/
    .dataList{
      li{
        background-color:white;
        margin-bottom:20px;
        border-radius: 10px;
        padding:30px;
        padding-top:10px;
        position:relative;
        .numGoods{
          b{
            color:#fa2947;
          }
          span{
            color:#fa2947;
            font-size:34px;
            strong{
              font-size:20px;

            }
          }
        }
        .bcacNum{
          color:#c1c8d6;
          span{
            color:black;
            margin-right:20px;
            font-size:28px;
          }
        }
        .tsInfor{
          text-align: left;
          font-size:24px;
          padding:20px 0;
          span{
            color:#ff0207;
          }
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
            /*margin-left:15px;*/
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
            background: -webkit-linear-gradient(#FD4B2D, #DC2912); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(#FD4B2D, #DC2912); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(#FD4B2D, #DC2912); /* Firefox 3.6 - 15 */
            background: linear-gradient(#FD4B2D, #DC2912); /* 标准的语法 */
            color:white;
            border:none;
          }
        }
      }
    }
  }
</style>


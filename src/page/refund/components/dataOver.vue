<template>
  <div class="orderData">
    <ul class="dataList">
      <li class="" v-for="item in list" :key="item.id" v-if="list.length">
        <!--<div class="tsInfor">处理中...</div>-->
        <div class="flex-box orderDh">
          <span>服务单号：{{item.order_sn}}</span>
        </div>
        <router-link tag="div" :to="'/goods/index/'+item.goods_id" class="goodsBox flex-box">
          <div class="right-img"><img :src="item.goods_logo" alt=""></div>
          <div class="right-text box-1">
            <div class="flex-box tpText">
              <h2 class="media_desc box-1">{{item.goods_title}}</h2>
              <span><b>{{item.price_real}}</b></span>
            </div>
            <p>{{item.goods_attr}}</p>
            <p>数量：1</p>
          </div>
        </router-link>
        <div class="flex-box d-ui-center">
          <span>退换货类型</span>
          <span class="box-1" v-if="item.return_type==0">退货</span>
          <span class="box-1" v-if="item.return_type==1">换货</span>
        </div>
        <div class="flex-box d-ui-center">
          <span>换货属性</span>
          <span class="box-1">{{item.attr_val}}</span>
        </div>
        <div class="flex-box d-ui-center">
          <span>退换货原因</span>
          <span class="box-1">{{item.cause}}</span>
        </div>
        <div class="flex-box d-ui-center">
          <span>备注</span>
          <span class="box-1">{{item.remark}}</span>
        </div>
        <h6>共{{item.number_goods}}件商品 共计：<span>{{item.number_goods*item.price_real}}</span></h6>
        <h5 class="flex-box overInfor"><span>已完成</span> <p class="box">服务已完成，感谢您的支持</p></h5>
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
      confirmClick(){
        this.$emit('changeCallcelOrder',true)
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
    /*position:relative;*/
    .orderDh{
      padding:20px 15px;
    }
    .overInfor{
      background-color:#f5f5f5;
      padding:30px;
      margin-left:30px;
      margin-top:30px;
      span{
        margin-right:20px;
        p{
          color:#eee;
        }
      }
    }
    .d-ui-center{
      padding:30px;
      padding-bottom:0;
      justify-content: space-between;
      align-items: flex-start;
      color:#7f8593;
      .box-1{
        text-align: right;
        margin-left:15px;
      }
    }
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
          .left-check{
            .cube-checkbox{
              padding:0 10px;
            }
          }
          .right-img{
            margin-left:15px;
            width:170px;
            height:170px;
            margin-right:15px;
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


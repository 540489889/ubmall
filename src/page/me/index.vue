<template>
  <div class="meIndex">
    <my-loading v-if="$store.state.isLoading"></my-loading>
    <div class="mbTitle">
      <div class="title">
        <router-link tag="div" to="/setUp/index" class="set-up flex-box">
          <i class="cubeic-setting"></i>
          设置
        </router-link>
        <div class="flex-box">
          <div class="left">
            <img v-if="list.headimg" src="./../../assets/ico/mb-tx.png" alt="">
            <img v-else src="./../../assets/ico/mb-tx.png" alt="">
          </div>
          <div class="right">
            <h4 class="media_title">{{list.nickname}}</h4>
            <p class="flex-box">ID：{{list.openid}} <span :class="'mb-bz-'+list.vip_level"></span></p>
          </div>
        </div>
        <router-link tag="div" v-if="!list.vip_level" to="/reg/register" class="mbbt">
          <img  src="../../assets/ico/mbbt.png" alt="">
        </router-link>
      </div>
      <div class="flex-box mall-title">
        <router-link tag="div" to="/integral/index" class="left box-1 flex-box">
          <i class="mb-m-1"></i>积分
        </router-link>
        <router-link tag="div" to="/integralMall/index" class="right box-1 flex-box">
          <i class="mb-m-2"></i>商城
        </router-link>
      </div>
    </div>
    <div class="content">
      <div class="mb-list-1 mb-list">
        <h2 class="flex-box list-title">
          我的订单
          <router-link tag="span" :to="'/order/index?type='+2" class="flex-box">全部订单 <i class="cubeic-arrow"></i></router-link>
        </h2>
        <ul class="flex-box">
          <li class="box-1">
            <router-link tag="a" :to="'/order/index?type='+2">
              <b v-if="index0">{{index0}}</b>
              <img src="./../../assets/ico/mb-l1.png" alt="">
              <h4>待付款</h4>
            </router-link>
          </li>
          <li class="box-1">
            <router-link tag="a" :to="'/order/index?type='+3">
              <b v-if="index1">{{index1}}</b>
              <img src="./../../assets/ico/mb-l2.png" alt="">
              <h4>待发货</h4>
            </router-link>
          </li>
          <li class="box-1">
            <router-link tag="a" :to="'/order/index?type='+4">
              <b v-if="index2">{{index2}}</b>
              <img src="./../../assets/ico/mb-l3.png" alt="">
              <h4>待收货</h4>
            </router-link>
          </li>
          <li class="box-1">
            <router-link tag="a" :to="'/order/index?type='+5">
              <img src="./../../assets/ico/mb-l4.png" alt="">
              <h4>已完成</h4>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="mb-list-2 mb-list">
        <h2 class="flex-box list-title">
          分销中心
          <!--<span class="flex-box">全部订单 <i class="cubeic-arrow"></i></span>-->
        </h2>
        <ul class="flex-box">
          <li class="box-1">
            <router-link tag="a" to="/me/assets">
              <img src="./../../assets/ico/mb-a1.png" alt="">
              <h4>佣金资产</h4>
            </router-link>
          </li>
          <li class="box-1">
            <router-link tag="a" to="/me/code">
              <img src="./../../assets/ico/mb-a2.png" alt="">
              <h4>推广码</h4>
            </router-link>
          </li>
          <li class="box-1">
            <router-link tag="a" to="/me/team">
              <img src="./../../assets/ico/mb-a3.png" alt="">
              <h4>我的团队</h4>
            </router-link>
          </li>
          <li class="box-1">
            <router-link tag="a" to="/me/reseller">
              <img src="./../../assets/ico/mb-a4.png" alt="">
              <h4>成为分销商</h4>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="mb-list-3 mb-list">
        <h2 class="flex-box list-title">
          其他工具
          <!--<span class="flex-box">全部订单 <i class="cubeic-arrow"></i></span>-->
        </h2>
        <ol>
          <li>
            <router-link tag="a" to="/collect/index" class="flex-box">
              <img src="./../../assets/ico/mb-b1.png" alt="">
              <h4 class="flex-box box-1"><p class="box-1 media_title">我的商品收藏</p> <i class="cubeic-arrow"></i></h4>
            </router-link>
          </li>
          <li>
            <router-link tag="a" to="/refund/index" class="flex-box">
              <img src="./../../assets/ico/mb-b2.png" alt="">
              <h4 class="flex-box box-1"><p class="box-1 media_title">售后/退款</p> <i class="cubeic-arrow"></i></h4>
            </router-link>
          </li>
          <li>
            <router-link tag="a" to="/address/index" class="flex-box">
              <img src="./../../assets/ico/mb-b3.png" alt="">
              <h4 class="flex-box box-1"><p class="box-1 media_title">收货地址</p> <i class="cubeic-arrow"></i></h4>
            </router-link>
          </li>
          <li>
            <a class="flex-box">
              <img src="./../../assets/ico/mb-b4.png" alt="">
              <h4 class="flex-box box-1"><p class="box-1 media_title">官方客服</p> <i class="cubeic-arrow"></i></h4>
            </a>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'MeIndex',
    data (){
      return {
        index0: 0,
        index1: 0,
        index2: 0,
        list: {}
      }
    },
    methods: {
      getMeData(){
        this.http.get(this.ports.me.index, res =>{
          this.$store.commit('changeLoading',false)
          console.log(res)
          if(res.success){
            let data = res.data
            this.list = data
            this.index0 = data.order[0]
            this.index1 = data.order[1]
            this.index2 = data.order[2]
          }else{
            this.showToastTxtOnly(res.msg)
          }
        })
      }
    },
    mounted (){
      this.getMeData()
    }
  }
</script>
<style lang="less" scoped>
  .meIndex{
    width:100%;
    min-height:100vh;
    background-color:aliceblue;
    font-size:28px;
    padding-bottom:90px;
    .mbTitle{
      .mall-title{
        background-color:white;
        height:100px;
        .left{
          justify-content: center;
          .mb-m-1{
            display: inline-block;
            width:34px;
            height:34px;
            background:url(../../assets/ico/mb-m-1.png) no-repeat center;
            background-size:100%;
            margin-right:10px;
          }
        }
        .right{
          border-left:1px solid #ccc;
          justify-content: center;
          .mb-m-2{
            display: inline-block;
            width:34px;
            height:34px;
            background:url(../../assets/ico/mb-m-2.png) no-repeat center;
            background-size:100%;
            margin-right:10px;
          }
        }
      }
    }
    .title{
      width:750px;
      height:250px;
      background:url(./../../assets/ico/mb-t-bg.png) no-repeat center;
      background-size:100%;
      box-sizing: border-box;
      padding:20px 25px;
      color:white;
      position:relative;
      overflow: hidden;
      .mbbt{
        position:absolute;
        bottom:-20px;
        width:690px;
        height:95px;
        left:30px;
        img{
          width:100%;
          height:100%;
        }
      }
      .set-up{
        position:absolute;
        right:20px;
        top:20px;
        i{
          margin-right:5px;
          font-size:30px;
        }
      }
      .left{
        margin-right:20px;
        img{
          width:136px;
          height:136px;
          border-radius: 50%;
        }
      }
      .right{
        text-align: left;
        h4{
          font-size:32px;
          font-weight: bold;
          line-height:2;
        }
        p{
          span{
            width:178px;
            height:54px;
            font-size:24px;
            margin-left:10px;
            text-align: center;
          }
          .mb-bz-1{
            background:url(./../../assets/ico/mb-bz-1.png) no-repeat center;
            background-size:100%;
          }
          .mb-bz-2{
            background:url(./../../assets/ico/mb-bz-2.png) no-repeat center;
            background-size:100%;
          }
          .mb-bz-3{
            background:url(./../../assets/ico/mb-bz-3.png) no-repeat center;
            background-size:100%;
          }
          .mb-bz-4{
            background:url(./../../assets/ico/mb-bz-4.png) no-repeat center;
            background-size:100%;
          }
          .mb-bz-5{
            background:url(./../../assets/ico/mb-bz-5.png) no-repeat center;
            background-size:100%;
          }
        }
      }
    }
    .content{
      padding:30px;
      .mb-list{
        margin-bottom:30px;
        padding:25px 15px;
        border-radius: 10px;
        background-color:white;
        .list-title{
          font-size:32px;
          font-weight: bold;
          justify-content: space-between;
          padding-top:10px;
          span{
            font-size:22px;
            color:#ccc;
            i{
              font-size:28px;
            }
          }
        }
        ul{
          margin-top:30px;
          li{
            a{
              display: block;
              color:black;
              text-align: center;
              position:relative;
              b{
                position:absolute;
                top:-15px;
                right:30px;
                display: inline-block;
                border-radius: 50%;
                font-size:22px;
                color:white;
                background-color:#ff0207;
                padding:5px;
                width:20px;
                height:20px;
              }
              h4{
                line-height:1.8;
              }
            }
          }
        }
      }
      .mb-list-1{
        ul{
          li{
            a{
              img{
                width:70px;
                height:60px;
              }
            }
          }
        }
      }
      .mb-list-2{
        ul{
          li{
            a{
              img{
                width:70px;
                height:70px;
              }
            }
          }
        }
      }
      .mb-list-3{
        ol{
          margin-top:20px;
          li{
            a{
              padding:15px 0;
              img{
                width:50px;
                height:50px;
                margin-right:10px;
                position:relative;
                top:-2px;
              }
              h4{
                p{
                  line-height:1.4;
                  text-align: left;
                  margin-right:10px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>

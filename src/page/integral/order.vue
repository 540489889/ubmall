<template>
  <div class="orderWrapper">
    <my-loading v-if="$store.state.isLoading"></my-loading>
    <div class="orderData">
      <ul class="dataList">
        <li class="" v-for="item in list" :key="item.id">
          <router-link tag="div" :to="'/integralGoods/index/'+item.goods_id" class="goodsBox flex-box">
            <div class="right-img"><img :src="item.goods_logo" alt=""></div>
            <div class="right-text box-1">
              <div class="flex-box tpText">
                <h2 class="media_desc box-1">{{item.goods_title}}</h2>
                <span><b>{{item.pay_price}}</b></span>
              </div>
              <!--<p>放大大神了的积极哦</p>-->
              <p class="numBox">数量：{{item.number_goods}}</p>
            </div>
          </router-link>
          <h6>共{{item.number_goods}}件商品 共计：<span>{{item.number_goods*item.pay_price}}</span></h6>
          <div class="btn-ui">
            <a class="offBtn"> 查看物流</a>
            <!--<a class="payBtn"> 立即付款</a>-->
          </div>
        </li>
      </ul>
      <div class="nullBox" v-if="!list.length" style="z-index: 1">
        <img src="../../assets/ico/null-ico.png" alt="">
        <p>暂无数据</p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'integralOrder',
    data (){
      return {
        list: []
      }
    },
    methods: {
      showToastTxtOnly(text) {
        this.toast = this.$createToast({
          txt: text,
          type: 'txt'
        })
        this.toast.show()
      },
      getListData(){
        this.http.get(this.ports.integral.orderlist, res =>{
          this.$store.commit('changeLoading',false)
          console.log(res)
          if(res.success){
            let data = res.data
            this.list = data.res
          }else{
//            this.showToastTxtOnly(res.msg)
          }
        })
      }
    },
    mounted (){
      this.getListData()
    }
  }
</script>
<style lang="less" scoped>
  .orderWrapper{
    width:100%;
    min-height:100vh;
    background-color:aliceblue;
    font-size:28px;
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
            .numBox{
              margin-top:20px;
            }
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
              color:#ff0207;
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
  }
</style>


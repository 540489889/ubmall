<template>
  <div class="goodsIndex">
    <my-loading v-if="$store.state.isLoading"></my-loading>
    <goods-swiper :banner="banner"></goods-swiper>
    <div class="gd-ui-1 flex-box">
      <div class="money">
        {{goods.price}}<span>BCAC</span>
        <!--<b>{{Number(goods.price_market)}}</b>-->
      </div>
      <!--<div class="mb-ui flex-box">-->
        <!--<div class="left box-1">会员价</div>-->
        <!--<div class="right box-1">{{Number(goods.price_member)}}</div>-->
      <!--</div>-->

      <!--<div class="collect flex-box" v-if="collect" @click="cancelClick(goods.goods_id)"><i class="collect-ico collect-yes"></i>取消收藏</div>-->
      <!--<div v-else class="collect flex-box" @click="collectionClick(goods.goods_id)"><i class="collect-ico"></i>收藏</div>-->

      <!--<div @click="shareClick" class="share flex-box"><i class="share-ico"></i>分享</div>-->
      <div class="source">来源：{{goods.source}}</div>
    </div>
    <div class="gd-ui-2">
      <div class="content-2 flex-box">
        <!--<span>认证</span>-->
        <p class="box-1">{{goods.title}} </p>
      </div>
      <div class="content-1 flex-box">
        <!--<div class="left">运费：{{goods.price_express}}</div>-->
        <div class="center box-1">已销售：{{goods.sales}}件</div>
        <div class="right">库存：{{goods.stock}}</div>
      </div>
    </div>
    <!--<div class="gd-ui-3">-->
      <!--<ul>-->
        <!--<li class="flex-box">-->
          <!--<span>已选</span>-->
          <!--<div class="text box-1">型号 颜色 数量</div>-->
          <!--<i @click="confirmClick()"></i>-->
        <!--</li>-->
        <!--<li class="flex-box">-->
          <!--<span>运费</span>-->
          <!--<div class="text box-1"></div>-->
          <!--<span v-if="Number(goods.price_express)">{{Number(goods.price_express)}}</span>-->
        <!--</li>-->
      <!--</ul>-->
    <!--</div>-->
    <div class="gd-ui-4">
      <h2 class="title">商品详情</h2>
      <div class="content" v-html="goods.details">
        <!--<img src="../../assets/img/goods-b1.png" alt="">-->
        <!--<img src="../../assets/img/goods-b1.png" alt="">-->
      </div>
    </div>
    <goods-footer @openChangeSelected="confirmClick()"  v-if="!selected"></goods-footer>
    <!--<div class="mask" v-if="selected"></div>-->
    <cube-page v-if="maskShow" type="swipe-scroll" title="Scroll">
      <template slot="content">
        <div class="scroll-list-wrap">
          <cube-scroll>
            <transition
              name="slide-fade"
            >
              <goods-selected
                :goods="goods"
                v-if="selected"
                @changeAddCart="changeAddCart"
                @changeSelected="changeSelected" ></goods-selected>
            </transition>
          </cube-scroll>
        </div>
      </template>
    </cube-page>
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <img class="circle" src="../../assets/img/l-banner-1.png" v-if="isBall"/>
    </transition>
    <transition
      name="custom-classes-transition"
      enter-active-class="animated bounceInLeft"
      leave-active-class="animated bounceOutRight"
    >
      <div class="popup_layer shareWrapper" @click="changeCloseShare" v-if="isShare">
        <img src="../../assets/ico/arrow.png" alt="">
        <h4>点击右上角分享给好友哟！</h4>
      </div>
    </transition>
  </div>
</template>
<script>
  import goodsSwiper from '../../components/swiper.vue'
  import goodsFooter from './components/footer.vue'
  import goodsSelected from './components/selected.vue'
  import CubePage from '../../components/cube-page.vue'
  export default {
    name: 'GoodsIndex',
    data (){
      return {
        cartNum: 0,
        maskShow: false,
        selected: false,
        goods: {},//商品信息
        lists: [],//商品参数 型号/颜色/数量
        banner: [],//商品轮播图
        isBall: false,//加入购物车动画元素
        collect: 0, //是否收藏
        isShare: false,
      }
    },
    components: {
      goodsSwiper,
      goodsFooter,
      goodsSelected,
      CubePage
    },
    methods: {
      //分享
      shareClick(){
        this.isShare = true
      },
      //分享关闭
      changeCloseShare(){
        this.isShare = false
      },
      showToastTxtOnly(text) {
        this.toast = this.$createToast({
          txt: text,
          type: 'txt'
        })
        this.toast.show()
      },
      //商品收藏新增
      collectionClick(id){
        this.http.post(this.ports.goods.collection,{goods_id: id}, res =>{
          if(res.success){
            let data = res.data
            this.collect = true
          }else{
            this.showToastTxtOnly(res.msg)
          }
        })
      },
      //取消收藏
      cancelClick(id){
        this.http.delete(this.ports.goods.collection+'/'+id, res =>{
          if(res.success){
            this.collect = false
          }else{
            this.showToastTxtOnly(res.msg)
          }
        })
      },
      //加入购物车动画
      beforeEnter(el){
        el.style.transform = "translate(0, 0)"
      },
      enter(el, done){
        // el.offsetWidth 强制html渲染动画
        // el.offsetWidth 这句话如何不写就不会有动画效果直接渲染的
        el.offsetWidth;
        el.style.transform = "translate(-70px, 68vh) scale(0.01)";
        el.style.transition = "all 1s ease";
//        console.log(done);
        done()
      },
      afterEnter(el){
//        this.flag = !this.flag
      },
      //获取列表数据
      getIndexData(){
        let id = this.$route.params.id
        this.http.get(this.ports.goods.index+'?pid='+id, res =>{
          this.$store.commit('changeLoading',false)
          if(res.success){
            let data = res.data
            this.goods = data
            this.lists = data.lists
            this.banner = data.imgs
            console.log(this.goods)
          }else{
            this.showToastTxtOnly(res.msg)
          }
        })
      },
      //弹出规格选择
      confirmClick(){
        this.isBall = false
        this.maskShow = true
        const that = this
        setTimeout( ()=>{
          that.selected = true
        },200)
      },
      //加入购物车
      changeAddCart(val,type){
        let that = this
        this.cartNum = val
        this.selected = false
        if(!this.selected){
          setTimeout(()=>{
            this.maskShow = false
            this.isBall = true
            if(type){
              that.$store.commit('changeCartNum',parseInt(this.$store.state.cartNum)+1)
            }else{
              that.$store.commit('changeCartNum',parseInt(this.$store.state.cartNum)+0)
            }
          },500)
        }
      },
      //关闭规格选择
      changeSelected(val) {
        this.selected = false
        if(!this.selected){
          setTimeout(()=>{
            this.maskShow = false
          },500)
        }
      }
    },
    mounted (){
      this.getIndexData()
    }
  }
</script>
<style lang="less" scoped>
  .circle{
    border-radius: 50%;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height:100px;
    color:white;
    position:fixed;
    font-size:50px;
    top:20%;
    left:45%;
    z-index: 203;
  }
  .slide-fade-enter-active {
    transition: all .6s ease;
  }
  .slide-fade-leave-active {
    transition: all .6s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateY(700px);
    opacity: 0;
  }
  .scroll-list-wrap{
    position:fixed;
    bottom:0;
    left:0;
    width:100%;
    height:100%;
    z-index: 205;
    background:rgba(0,0,0,0.6);
    /*background:#000\9;!*CSS Hack,只能对ie9以下浏览器ie6,ie7,ie8有效，否侧ie10,FF,Cherome会失去透明效果*!*/
    filter:Alpha(opacity=60);/*只对ie7,ie8有效*/
  }
  .goodsIndex{
    font-size:28px;
    height:100vh;
    background-color:#f9f9f9;
    position:relative;
    .shareWrapper{
      color:white;
      padding:30px;
      text-align: right;
      box-sizing: border-box;
      img{
        width:186px;
      }
      h4{
        text-align: center;
        line-height:2;
      }
    }
    .cube-page{
      background:none;
    }
    /*padding-bottom:130px;*/
    .gd-ui-1{
      background-color:white;
      padding:20px 30px;
      padding-bottom:20px;
      justify-content: space-between;
      .money{
        font-size:40px;
        font-weight: bold;
        color:#ff0207;
        position:relative;
        span{
          font-size:26px;
          font-weight: bold;
        }
        b{
          position:absolute;
          font-size:24px;
          text-decoration: line-through;
          color:#c6c6c6;
          bottom:-25px;
          left:0;
        }
      }
      .source{
        color:#c1c8d6;
        font-size:22px;
      }
      .mb-ui{
        margin-left:20px;
        margin-right:30px;
        .left,.right{
          width:120px;
          height:40px;
          line-height:40px;
          font-size:26px;
          text-align: center;
        }
        .left{
          border-top-left-radius: 20px;
          border-bottom-left-radius: 20px;
          background: -webkit-linear-gradient(left, #fed4a6 , #cb9457); /* Safari 5.1 - 6.0 */
          background: -o-linear-gradient(right, #fed4a6 , #cb9457); /* Opera 11.1 - 12.0 */
          background: -moz-linear-gradient(right, #fed4a6 , #cb9457);/* Firefox 3.6 - 15 */
          background: linear-gradient(to right, #fed4a6 , #cb9457);/* 标准的语法 */
          color:#895724;
        }
        .right{
          border-top-right-radius: 20px;
          border-bottom-right-radius: 20px;
          background-color:#e2e2e2;
          color:#ff0207;
          font-weight: bold;
        }
      }
      .collect{
        font-size:24px;
        color:#7f8593;
        .collect-ico{
          width:35px;
          height:35px;
          background:url(../../assets/ico/collect-1.png) no-repeat center;
          background-size:100%;
          margin-right:5px;
        }
        .collect-yes{
          background:url(../../assets/ico/collect-2.png) no-repeat center;
          background-size:100%;
        }
      }
      .share{
        font-size:24px;
        margin-left:20px;
        color:#7f8593;
        .share-ico{
          width:48px;
          height:48px;
          background:url(../../assets/ico/share-1.png) no-repeat center;
          background-size:100%;
          margin-right:5px;
        }
      }
    }
    .gd-ui-2{
      font-size:24px;
      color:#c1c8d6;
      background-color:white;
      padding:0 30px;
      .content-1{
        padding:30px 0;
        /*border-top:1px solid #eee;*/
        .center{
          text-align: left;
        }
      }
      .content-2{
        /*padding-bottom:30px;*/
        text-align: left;
        span{
          font-size:22px;
          height:34px;
          line-height:34px;
          padding:0 15px;
          border-radius: 5px;
          color:white;
          background-color:#ff050a;
          margin-right:10px;
        }
        p{
          font-size:30px;
          line-height:1.6;
          color:black;
          font-weight: bold;
        }
      }
    }
    .gd-ui-3{
      background-color:white;
      margin-top:15px;
      padding:0 30px;
      ul{
        padding:20px 0;
        li{
          padding:30px 0;
          border-bottom:1px solid #eee;
          .text{
            color:#7f8593;
            font-size:24px;
            text-align: left;
            margin-left:30px;
          }
          i{
            width:44px;
            height:12px;
            background:url(../../assets/ico/more-i.png) no-repeat center;
            background-size:100%;
          }
        }
        li:last-child{
          border:none;
        }
      }
    }
    .gd-ui-4{
      margin-top:20px;
      padding-bottom:130px;
      /*background-color:aliceblue;*/
      .title{
        font-size:32px;
        font-weight: bold;
        color:white;
        background-color:#e8c25e;
        height:90px;
        line-height:90px;
        text-align: center;
      }
      .content{
        font-size:0;
        line-height:0;
        *{
          margin:0;
        }
        img{
          width:100%;
          border:none;
          margin:0;
        }
      }
    }
  }
</style>


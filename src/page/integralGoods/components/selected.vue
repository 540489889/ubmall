<template>
  <div class="selectedWrapper flex-box">
    <div class="goodsSelected">
      <i class="closeBtn cubeic-wrong" @click="closeSelected()"></i>
      <div class="goods-infor flex-box">
        <div class="left-1">
          <img :src="goods.image" alt="">
        </div>
        <div class="right-1 box-1">
          <div class="top flex-box">
            {{parseInt(goods.price_selling)}}
            <div class="mb-ui flex-box">
              <div class="left box-1">会员价</div>
              <div class="right box-1">{{parseInt(goods.price_member)}}</div>
            </div>
          </div>
          <p>编号：{{goods.id}}</p>
        </div>
      </div>
      <div class="specs-infor" v-for="(item,i) in goods.specs">
        <h2>{{item.name}}</h2>
        <ul>
          <li @click="checkSpecs($event,it,i)" :class="index==0?'cube-checker-item_active':''"  v-for="(it,index) in item.list" class="cube-checker-item">
            {{it.name}}
          </li>
        </ul>
      </div>
      <div class="nummber-infor flex-box">
        <h2>数量</h2>
        <div class="right flex-box">
          <span @click="reduce()">-</span>
          <cube-input :min="1" :max="10" type="number" @change="handleNumChange(data.item)" v-model="number"></cube-input>
          <span @click="plus()">+</span>
        </div>
      </div>
      <div class="btn-infor">
        <a class="btn-1" @click="addCart">加入购物车</a>
        <a ref="shop" @click="createOrder()" id="shop" class="btn-2">立即购买</a>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'GoodsSelected',
    data (){
      return {
        number: 1,
        checkerList: [],
        key: '',
        options: [
          {
            value: 0,
            text: 'mini蓝牙蓝色版小猴套装'
          },
          {
            value: 1,
            text: '米兔卡片学习机'
          },
          {
            value: 2,
            text: 'mini蓝牙蓝色版小猴套装'
          }
        ]
      }
    },
    props: {
      goods: Object
    },
    methods: {
      //提交订单
      createOrder(){
        this.$router.push({
          path: '/order/orders',
          query: {
            goods_id: this.goods.goods_id,
            key: this.key,
            count:this.number
          }
        })
      },
      showToastTxtOnly(text) {
        this.toast = this.$createToast({
          txt: text,
          type: 'txt'
        })
        this.toast.show()
      },
      //加入购物车动画

      //加入购物车
      addCart(){
        let params = {}
        params.goods_id = this.goods.goods_id
        params.key = this.key
        params.number = this.number
        this.http.post(this.ports.cart.index,params, res =>{
          if(res.success){
            let data = res.data
            console.log(data,9999)
            this.$emit('changeAddCart',this.number,data.type)
//            this.$emit('changeSelected',false)
          }else{
            this.showToastTxtOnly(res.msg)
          }
        })
      },
      //默认规格
      defaulCheck(){
        this.goods.lists.forEach((e,index)=>{
          if(index===0){
            this.checkerList = e[0].spec
            this.key = e[0].key
          }
        })
      },
      //规格选择
      checkSpecs(e,val,index){
        let btn = document.getElementById('shop')
        btn.style.backgroundColor = '#f2f2f2'
        btn.style.color = '#7f8593'
        let that = e.target
        $(that).addClass('cube-checker-item_active')
        $(that).siblings('li').removeClass('cube-checker-item_active')
        this.checkerList[index] = val.name
        this.goods.lists.forEach((e,index,array)=> {
          if(JSON.stringify(e[0].spec)===JSON.stringify(this.checkerList)){
            this.key = e[0].key
            btn.style.backgroundColor = '#ff3747'
            btn.style.color = '#fff'
            this.goods.price_selling = e[0].selling
            this.goods.price_member = e[0].member
          }
        })
      },
      addCheckVal(){
      },
      //关闭规格弹窗
      closeSelected(){
//        alert(1)
        this.$emit('changeSelected','close')
      },
      computed(){

      },
      reduce(){
        if(this.number<=1){
          this.showToastTxtOnly('受不了了，宝贝不能再减少了哦')
          return false
        }else{
          this.number -=1;
        }
      },
      //加法
      plus(){
        if(this.number>=10) {
          this.showToastTxtOnly('已经没有更多的库存了，下次再来吧')
          return false
        }else{
          this.number +=1
        }
      },
      //数量监听限制
      handleNumChange(){
        if(this.number>=10){
          this.showToastTxtOnly('超出范围')
          this.number = 10
        }
      },
    },
    mounted (){
      this.defaulCheck()
      this.addCheckVal();
      console.log(this.goods)
//      "型号::S9;;颜色::星耀红"
    }
  }
</script>
<style lang="less" scoped>
  .selectedWrapper{
    width:100%;
    height:100vh;
    align-items: flex-end;
  }
  .goodsSelected{
    position:relative;
    /*bottom:0;*/
    /*left:0;*/
    width:100%;
    box-sizing: border-box;
    background-color:white;
    height:800px;
    padding:30px;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    z-index: 200;
    .closeBtn{
      position:absolute;
      top:20px;
      right:20px;
      color:#ccc;
      font-size:45px;
      font-weight: bold;
    }
    .goods-infor{
      align-items: flex-end;
      .left-1{
        img{
          width:170px;
          height:170px;
          border-radius: 10px;
        }
      }
      .right-1{
        text-align: left;
        margin-left:25px;
        .top{
          font-size:50px;
          font-weight: bold;
          color:#ff0207;
          position:relative;
        }
        p{
          font-size:24px;
          color:#7f8593;
          line-height:2;
        }
        .mb-ui{
          margin-left:40px;
          margin-right:50px;
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
      }
    }
    .specs-infor{
      text-align: left;
      h2{
        margin:25px 0;
      }
      ul{
        li{
          display: inline-block;
          text-align: center;
          margin-right:15px;
        }
      }
      .cube-checker-item{
        background-color:#f2f2f2;
        color:#7f8593;
        height:40px;
        line-height:40px;
        border-radius: 100px;
        min-width:60px;
        padding:0 10px;
        margin-bottom:15px;
        border:none;
      }
      .cube-checker-item:after{
        border:none;
      }
      .cube-checker-item_active{
        color:#ff0207;
        background:#fecac9;
        border:none;
      }
      .cube-checker-item_active:after{
        content: initial;
      }
    }
    .nummber-infor{
      justify-content: space-between;
      h2{
        margin:25px 0;
      }
      .right{
        span{
          font-size:30px;
          width:30px;
          height:30px;
          text-align: center;
        }
      }
    }
    .btn-infor{
      padding:10px 0;
      a{
        width:255px;
        height:80px;
        line-height:80px;
        text-align: center;
        color:white;
        font-size:30px;
        display: inline-block;
        border-radius: 40px;
        margin:0 10px;
      }
      .btn-1{
        background-color:#1f1e1d;
      }
      .btn-2{
        background-color:#ff3747;
      }
    }
  }
</style>


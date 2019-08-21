<template>
  <div class="cart-wrapper">
    <my-loading v-if="$store.state.isLoading"></my-loading>
    <cube-page type="swipe-view" title="Swipe">
      <template slot="content">
        <div class="swipe-wrapper">
          <cube-scroll>
            <cube-swipe>
              <transition-group name="swipe" tag="ul">
                <li class="swipe-item-wrapper"
                    v-for="(data,index) in list"
                    :key="data.id">
                  <cube-swipe-item
                    ref="swipeItem"
                    :btns="data.btns"
                    :index="index"
                    @btn-click="onBtnClick">
                    <div @click="onItemClick(data, index)" class="item-inner flex-box">
                      <cube-checkbox v-if="data.stock" v-model="data.checked" @input="changeCheck" option="" ></cube-checkbox>
                      <cube-checkbox v-else v-model="data.checked" @input="changeCheck" :option="optionNo" ></cube-checkbox>
                      <div class="flex-box box-1 twoItem">
                        <div class="icon">
                          <img width="168" height="168" :src="data.imgs">
                          <b v-if="!data.stock" class="stockNo">库存不足</b>
                        </div>
                        <div class="text box-1">
                          <h2 class="item-name media_title"> {{data.title}}</h2>
                          <p class="item-desc media_desc">{{data.spec_name}}</p>
                          <h4 class="item-money flex-box">
                            <div class="left">
                              <span v-html="data.price"></span><b>BCAC</b>
                            </div>
                            <div class="right flex-box">
                              <span @click="reduce(data)">-</span>
                              <cube-input :min="1" type="number" @change="handleNumChange(data)" v-model="data.number"></cube-input>
                              <span @click="plus(data)">+</span>
                            </div>
                          </h4>
                        </div>
                      </div>

                    </div>
                  </cube-swipe-item>
                </li>
              </transition-group>
              <div class="nullBox" v-if="!list.length">
                <img src="../../assets/ico/null-ico.png" alt="">
                <p>购物车什么也没有哦</p>
                <router-link tag="a" to="/" class="goShopping">马上去购物</router-link>
              </div>
            </cube-swipe>
          </cube-scroll>
        </div>
      </template>
    </cube-page>
    <div class="all-check flex-box" v-if="list.length">
      <cube-checkbox
        v-model="checked"
        @input="changeAllCheck"
        :option="option"></cube-checkbox>
      <div class="all-money box-1">
        合计: <span>{{total.toFixed(2)}}<b>BCAC</b></span>
      </div>
      <a class="go-ck" @click="Settlement">去结算({{number}})</a>
    </div>
  </div>
</template>
<script>
  import CubePage from './components/cube-page.vue'
  import { customData } from './components/swipe'
  export default {
    name: 'cartIndex',
    data (){
      return {
        goods_id: '',//商品id
        key: '', //商品key
        count:'', //商品数量
        list: [],//购物车列表
        number:0,
        checked: false, //全选
        par: '',//结算提交数据
        cart_id: '',//购物车id
        option: {
          label: '全选',
          value: false
        },
        optionNo: {
          disabled: true
        },
        swipeData: customData
      }
    },
    components: {
      CubePage
    },
    computed: {
      //选择监听计算
      total: function () {
        let id = ''
        let goods_id = ''
        let key = ''
        let count = 0
        let num = 0;
        let number = 0;
        let tempData = this.list
        let checkGoods = ''
        let cart_id = ''
        for(let i=0;i<tempData.length;i++){
          if(tempData[i].checked){
            checkGoods+= tempData[i].product_id+':'+tempData[i].number+':'+'0'+':'+tempData[i].spec_id+','
            cart_id += tempData[i].id+','
            id += tempData[i].goods_id+'ღ'
            key +=  tempData[i].goods_spec+'ღ'
            count +=  tempData[i].number+'ღ'
            num += tempData[i].number*tempData[i].price
            number += Number(tempData[i].number)
          }
        }
        this.cart_id = cart_id.substr(0,cart_id.length-1)
        this.checkGoods = checkGoods.substr(0,checkGoods.length-1)
        console.log(this.checkGoods)

//        this.goods_id = encodeURIComponent(goods_id.substr(0,goods_id.length-1))
        this.key = encodeURIComponent(key.substr(0,key.length-1))
        let newCount = String(count).substr(1)
        this.count = encodeURIComponent(newCount.substr(0,newCount.length-1))
        this.number = number
//        console.log(this.goods_id,this.key,this.count)
        return num
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
      getIndexData(){
        this.http.get(this.ports.cart.index, res =>{
          this.$store.commit('changeLoading',false)
          console.log(res)
          if(res.success){
            let data = res.data
            this.list = data
            this.list.forEach((event)=>{
              this.$set(event,'checked',false)
              this.$set(event,'btns',[
                {
                  action: 'delete',
                  text: '删除',
                  color: '#ff3a32'
                }
              ])
            })
            console.log(this.list)
          }else{
            this.list = []
//            this.showToastTxtOnly(res.msg)
          }
        })
      },
      //去结算
      Settlement(){
        if(!this.number){
          this.showToastTxtOnly('请至少选择一件商品')
          return false
        }
        this.$router.push({
          path: '/order/orders',
          query: {
            checkGoods: this.checkGoods,
            path: 'cart/index',
            cart_id: this.cart_id
          }
        })
      },
      onItemClick(item) {
//        alert('click item:', item)
      },
      onBtnClick(btn, index) {
        if (btn.action === 'delete') {
          this.$createActionSheet({
            title: '确认要删除吗',
            active: 0,
            data: [
              {content: '删除'}
            ],
            onSelect: () => {
              this.http.get(this.ports.cart.delete+'?id='+this.list[index].id, res =>{
                if(res.success){
//                  let data = res.data
//                  this.list = data.res
                  this.list.splice(index, 1)
                  this.$store.commit('changeCartNum',parseInt(this.$store.state.cartNum)-1)
                }else{
                  this.showToastTxtOnly(res.msg)
                }
              })
            }
          }).show()
        } else {
          this.$refs.list[index].shrink()
        }
      },
      //减法
      reduce(item){
        if(item.number<=1){
          this.showToastTxtOnly('受不了了，宝贝不能再减少了哦')
          return false
        }else{
          item.number -=1;
        }
      },
      //加法
      plus(item){
        if(item.number>=item.stock) {
          this.showToastTxtOnly('已经没有更多的库存了，下次再来吧')
          return false
        }else{
          item.number +=1
        }
      },
      //数量监听限制
      handleNumChange(item){
        if(item.number>=item.stock){
          this.showToastTxtOnly('超出范围')
          item.number = item.stock
        }
      },
      //选择监听
      changeCheck(val){
        let nums = 0
        let newNum = this.list.map((currVal,index,arr)=>{
          if(!currVal.checked){
            nums = 0
          }else{
            nums = 1
          }
          return nums
        })
//        this.number = eval(newNum.join('+'))
        if(this.list.every((currentValue,index,arr)=>{
//          console.log(currentValue,index,arr)
          if(currentValue.checked === false){
            return false
          }else{
            return true
          }
        })){
          this.checked = true
        }else{
          this.checked = false
        }
      },
      //全选
      changeAllCheck(val){
        for(let i=0;i<this.list.length;i++){
          if(val&&this.list[i].stock) {
            this.$set(this.list[i],'checked',true)
            console.log(this.list[i].number)
            this.number += this.list[i].number
          }else{
            this.$set(this.list[i],'checked',false)
            this.number = 0
          }
        }

      },
      //获取购物车数量
      getCartNumber(){
        this.http.get(this.ports.home.cartNum,res=>{
          if(res.success){
            let num = res.data
            this.$store.commit('changeCartNum',num)
          }else{
            this.$store.commit('changeCartNum',0)
          }
        })
      }
    },
    mounted (){
      this.getIndexData()
      this.getCartNumber()
    }
  }
</script>
<style lang="less" scoped>
  .swipe-enter-active,.swipe-leave-active{
    transition: all .5s;
    .item-inner{
      transition: all .5s;
    }
  }
  .swipe-enter,.swipe-leave-to{
    .item-inner{
      height: 0
    }
  }
  .all-check{
    position:fixed;
    bottom:120px;
    width:750px;
    background-color:white;
    z-index: 10;
    height:110px;

    .all-money{
      /*font-size:26px;*/
      text-align: left;
      color:black;
      span{
        font-size:34px;
        color:#fa2947;
        font-weight: bold;
        b{
          font-size:20px;
        }
      }
    }
    .go-ck{
      display: inline-block;
      font-size:30px;
      color:white;
      background: -webkit-linear-gradient(#FD4B2D, #DC2912); /* Safari 5.1 - 6.0 */
      background: -o-linear-gradient(#FD4B2D, #DC2912); /* Opera 11.1 - 12.0 */
      background: -moz-linear-gradient(#FD4B2D, #DC2912); /* Firefox 3.6 - 15 */
      background: linear-gradient(#FD4B2D, #DC2912); /* 标准的语法 */
      height:100%;
      line-height:110px;
      /*border-radius: 40px;*/
      text-align: center;
      min-width:185px;
      /*margin:0 15px;*/
    }
  }
  .swipe-view{
    .swipe-wrapper{
      font-size:28px;
      position: fixed;
      top:0;
      padding-top:150px;
      left:0;
      right:0;
      bottom: 0;
      background: #f9f9f9;
      padding-bottom:230px;
      .swipe-item-wrapper:first-child{
        /*margin-top:20px;*/
      }
      .swipe-item-wrapper{
        overflow: hidden;
        /*width:700px;*/
        margin:0 auto;
      }
      .cube-swipe{}

      .item-inner{
        text-align: left;
        min-height: 168px;
        background-color:white;
        margin-bottom:20px;
        padding:30px;
        border-radius: 10px;
        .twoItem{
          align-items: flex-start;
        }

        .cube-checkbox{
          padding-left:0;
          padding-right:10px;
          font-size:20px;
        }
        .icon{
          width: 168px;
          height:168px;
          position:relative;
          overflow: hidden;
          b{
            position:absolute;
            left:0;
            bottom:0;
            width:100%;
            background:rgba(0,0,0,0.5);
            padding:10px;
            font-size:24px;
            color:white;
            text-align: center;
            box-sizing: border-box;
          }
          img{
            width:100%;
            height:100%;
            border-radius: 10px;
          }
        }
        .text{
          margin-left: 20px;
          line-height: 28px;
          overflow: hidden;
          font-size: 28px;
          .item-name{
            margin-bottom: 20px;
            color: black;
          }
          .item-desc{
            color:#7f8593;
            font-size:24px;
            line-height:1.4;
          }
          .item-money{
            margin-top:30px;
            justify-content: space-between;
            .left{
              color:#ff3747;
              span{
                font-size:36px;
                font-weight: bold;
              }
              b{
                font-size:20px;
              }
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
        }
      }
    }
  }
</style>


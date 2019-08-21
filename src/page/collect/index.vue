<template>
  <div class="cart-wrapper">
    <my-loading v-if="$store.state.isLoading"></my-loading>
    <cube-page type="swipe-view" title="Swipe">
      <template slot="content">
        <div class="swipe-wrapper">
          <cube-scroll>
            <cube-swipe>
              <transition-group name="swipe" tag="ul">
                <li class="swipe-item-wrapper" v-for="(data,index) in list" :key="data.id">
                  <cube-swipe-item
                    ref="swipeItem"
                    :btns="data.btns"
                    :index="index"
                    @btn-click="onBtnClick">
                    <div @click="onItemClick(data, index)" class="item-inner flex-box">
                      <div class="flex-box box-1 twoItem">
                        <div class="icon">
                          <img width="168" height="168" :src="data.logo">
                        </div>
                        <div class="text box-1">
                          <h2 class="item-name media_title" v-html="data.title"></h2>
                          <p class="item-desc media_desc" v-html="data.desc"></p>
                          <h4 class="item-money flex-box">
                            <div class="left">
                              <span v-html="data.price"></span>
                            </div>
                            <router-link tag="div" :to="'/goods/index/'+data.goods_id" class="right">
                              购买
                            </router-link>
                          </h4>
                        </div>
                      </div>
                    </div>

                  </cube-swipe-item>
                </li>
              </transition-group>
              <div class="nullBox" v-if="!list.length">
                <img src="../../assets/ico/null-ico.png" alt="">
                <p>什么也没有哦！</p>
              </div>
            </cube-swipe>
          </cube-scroll>
        </div>
      </template>
    </cube-page>
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
        this.http.get(this.ports.goods.collection, res =>{
          this.$store.commit('changeLoading',false)
          console.log(res)
          if(res.success){
            let data = res.data
            this.list = data.res
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
              console.log(this.list[index].goods_id)
              this.http.delete(this.ports.goods.collection+'/'+this.list[index].goods_id, res =>{
                if(res.success){
//                  let data = res.data
//                  this.list = data.res
                  this.list.splice(index, 1)
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
    },
    mounted (){
      this.getIndexData()
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
    width:100%;
    background-color:white;
    z-index: 10;
    height:110px;

    .all-money{
      font-size:26px;
      color:#7f8593;
      text-align: left;
      span{
        color:black;
        font-size:32px;
      }
    }
    .go-ck{
      display: inline-block;
      font-size:30px;
      color:white;
      background-color:#ff3747;
      height:80px;
      border-radius: 40px;
      line-height:80px;
      text-align: center;
      min-width:185px;
      margin:0 15px;
    }
  }
  .swipe-view{
    .swipe-wrapper{
      font-size:28px;
      position: fixed;
      top:0;
      left:0;
      right:0;
      bottom: 0;
      background: aliceblue;
      padding-bottom:230px;
      .swipe-item-wrapper:first-child{
        margin-top:20px;
      }
      .swipe-item-wrapper{
        overflow: hidden;
        width:700px;
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
          width: 170px;
          height:170px;
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
            }
            .right{
              width:130px;
              height:60px;
              line-height:60px;
              text-align: center;
              border-radius: 30px;
              background-color:#ff0207;
              color:white;
            }
          }
        }
      }
    }
  }
</style>


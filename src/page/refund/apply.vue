<template>
  <div class="refundApply">
    <div class="infor">
      <h4>温馨提示：</h4>
      <ul>
        <li>1.订单一旦取消无法恢复，需重新下单。</li>
        <li>2.退款商品，快递上门自取。</li>
        <li>3.退款金额在1-3个工作日自动返还支付账户。</li>
      </ul>
    </div>
    <div class="list">
      <ul>
        <li>
          <cube-select
            @change="changeType"
            :placeholder="placeholder"
            v-model="value"
            :options="options">
          </cube-select>
        </li>
        <li class="flex-box"><span>退款原因：</span>
          <div @click="confirmClick" class="box-1 flex-box">
            <p class="box-1">{{reasonTs}}</p> <i class="cubeic-pulldown"></i>
          </div>
        </li>
        <li class="flex-box"><span>属性：</span> <cube-input class="box-1" v-model="attr_val" placeholder="请填退换货属性"></cube-input></li>
        <li class="flex-box"><span>姓名：
        </span> <cube-input class="box-1" v-model="name" placeholder="请填写姓名"></cube-input></li>
        <li class="flex-box"><span>联系方式：</span> <cube-input class="box-1" v-model="tell" placeholder="请填写电话"></cube-input></li>
        <li class="flex-box"><span>备注：</span> <cube-input class="box-1" v-model="mark" placeholder="请填备注"></cube-input></li>

      </ul>
      <a class="okBtn" @click="subClick">确定</a>
    </div>
    <cube-page v-if="maskShow" type="swipe-scroll" title="Scroll">
      <template slot="content">
        <div class="scroll-list-wrap">
          <cube-scroll>
            <transition
              name="slide-fade"
            >
              <refumd-reaspm
                v-if="selected"
                @changeDeleteOrder="changeDeleteOrder"
                @changeSelected="changeSelected"></refumd-reaspm>
            </transition>
          </cube-scroll>
        </div>
      </template>
    </cube-page>
  </div>
</template>
<script>
  import CubePage from '../../components/cube-page.vue'
  import refumdReaspm from './components/reason.vue'
  export default {
    name: 'refundApply',
    data (){
      return {
        placeholder: '退换货类型',
        options: ['退款', '换货'],
        value: '',
        selected: false,
        maskShow: false,
        scrollEvents: ['scroll'],
        scrollY: 0,
        mark: '',//备注
        attr_val: '',//退换货属性
        name: '',
        tell: '',
        type: '',//退换货类型值
        reason:'',//退换货原因
        reasonTs: '请选择退换货原因'
      }
    },
    components: {
      CubePage,
      refumdReaspm
    },
    methods: {
      changeType(type){
        if(type=='退款'){
          this.type = 0
        }else{
          this.type = 1
        }
      },
      showToastTxtOnly(text) {
        this.toast = this.$createToast({
          txt: text,
          type: 'txt'
        })
        this.toast.show()
      },
      showToastType() {
        let that = this
        const toast = this.$createToast({
          txt: 'Correct',
          type: 'correct',
          time: 1000,
          onTimeout: () => {
            that.$router.push({path:'/refund/index'})
          }
        })
        toast.show()
      },
      subClick(){
        let id = this.$route.query.id
        if(!this.value){
          this.showToastTxtOnly('请选择退换货类型')
          return false
        }
        if(!this.reason){
          this.showToastTxtOnly('请选择退换货原因')
          return false
        }
        if(!this.attr_val){
          this.showToastTxtOnly('请填写退换货属性')
          return false
        }
        if(!this.name){
          this.showToastTxtOnly('请填写姓名')
          return false
        }
        if(!this.tell){
          this.showToastTxtOnly('请填写联系方式')
          return false
        }
        if(!this.mark){
          this.showToastTxtOnly('请填写备注信息')
          return false
        }
        let params = {}
        params.id = id
        params.return_type = this.type //退换货类型 0退货 1换货
        params.tell = this.tell // 联系方式
        params.attr_val = this.attr_val //换货属性
        params.cause = this.reason  //退换货原因
        params.remark = this.remark //备注
        this.http.post(this.ports.refund.aftersave,params, res =>{
          this.$store.commit('changeLoading',false)
          console.log(res)
          if(res.success){
            let data = res.data
            this.count = data.count
            this.list = data.res
            this.showToastType()
          }else{
            this.showToastTxtOnly(res.msg)
          }
        })

      },
      confirmClick(val){
        const that = this
        this.maskShow = true
        setTimeout( ()=>{
          that.selected = true
        },200)
      },
      changeSelected(val){
        this.selected = val
        const that = this
        if(!this.selected){
          setTimeout( ()=>{
            that.maskShow = false
          },300)
        }
      },
      changeDeleteOrder(val){
        this.reason = val.value
        this.reasonTs = val.label
        this.changeSelected(false)
      },
    },
    mounted (){
      this.$store.commit('changeLoading',false)
    }
  }
</script>
<style lang="less" scoped>
  .cube-page{
    background:none;
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
    z-index: 200;
    background:rgba(0,0,0,0.6);
    /*background:#000\9;!*CSS Hack,只能对ie9以下浏览器ie6,ie7,ie8有效，否侧ie10,FF,Cherome会失去透明效果*!*/
    filter:Alpha(opacity=60);/*只对ie7,ie8有效*/
  }
  .refundApply{
    width:100%;
    min-height:100vh;
    background-color:white;
    font-size:28px;
    padding:30px;
    box-sizing: border-box;
    .infor{
      background-color:aliceblue;
      border-radius: 10px;
      text-align: left;
      padding:20px;
      h4{
        line-height:2;
      }
      ul{
        li{
          line-height:1.8;
          color:#7f8593;
        }
      }
    }
    .list{
      margin-top:40px;
      .okBtn{
        display: block;
        width:100%;
        height:80px;
        line-height:80px;
        border-radius: 40px;
        background-color:#ff1e29;
        color:white;
        text-align: center;
        font-size:30px;
        margin-top:50px;
      }
      ul{
        li{
          padding:30px 0;
          border-bottom:1px solid #eee;
          .cube-select{
            text-align: left;
            background:#eef4f8;
          }
          .cube-select:after{
            content: initial;
          }
          .cube-input-field{
            padding:0;
          }
          span{
            width:170px;
            text-align: left;
          }
          p{
            text-align: left;
            color:#7f8593;
          }
          i{
            font-size:40px;
            font-weight: bold;
            color:#7f8593;
          }
        }
        li:last-child{
          border:none;
        }
      }
    }
  }
</style>


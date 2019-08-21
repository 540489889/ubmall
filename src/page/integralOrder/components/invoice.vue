<template>
  <div class="invoiceBox flex-box">
    <div class="invoiceWrapper">
      <h2 class="title">发票
        <i class="closeBtn cubeic-wrong" @click="closeSelected()"></i>
      </h2>
      <ul class="list">
        <li>
          <span>发票类型</span>
          <div class="checkDiv">
            <cube-checker
              v-model="checkerType"
              :options="optionsType"
              type="radio" />
          </div>
        </li>
        <li class="riseLi" v-if="isInvoiceRise">
          <span>发票抬头</span>
          <div class="checkDiv">
            <cube-checker
              v-model="checkerRise"
              :options="optionsRise"
              @input="changeInvoiceRise"
              type="radio" />
          </div>
          <transition
            name="custom-classes-transition"
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
          >
            <div v-if="invoiceCompany">
              <h6 class="flex-box"><span>单位名称</span>  <cube-input class="box-1" @blur="blurLeave" v-model="name" placeholder="请填写单位名称"></cube-input></h6>
              <h6 class="flex-box"><span>纳税人识别码</span>  <cube-input class="box-1" @blur="blurLeave" v-model="sbCode" placeholder="请填写纳税人识别码"></cube-input></h6>
            </div>
          </transition>
        </li>
        <li>
          <span>发票内容</span>
          <div class="checkDiv">
            <cube-checker
              v-model="checkerContent"
              :options="optionsContent"
              @input="changeInvoiceText"
              type="radio" />
          </div>
        </li>
      </ul>
      <div class="invoiceBtn" @click="invoiceSub">确定</div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'mb',
    data (){
      return {
        invoiceCompany: false,//是否显示单位信息
        isInvoiceRise:false, //是否显示发票抬头
        name: '',
        sbCode: '',
        checkerType: 0,
        optionsType: [
          {
            value: 0,
            text: '普通发票'
          },
          {
            value: 1,
            text: '增值税专用发票',
            disabled: true
          }
        ],
        checkerRise: 0,
        optionsRise: [
          {
            value: 0,
            text: '个人'
          },
          {
            value: 1,
            text: '单位',
          }
        ],
        checkerContent: 0,
        optionsContent: [
          {
            value: 0,
            text: '不开发票'
          },
          {
            value: 1,
            text: '商品明细',
          }
        ],
      }
    },
    methods: {
      blurLeave(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
      },
      //确定
      invoiceSub(){
        if(this.checkerContent==1&&this.checkerRise==0){
          //个人商品明细发票
          this.$emit('changeInvoiceSub',{name: 1})
        }
        else if(this.checkerContent==1&&this.checkerRise==1){
          //单位明细发票
          this.$emit('changeInvoiceSub',{unit: this.name,sbCode:this.sbCode})
        }else{
          this.$emit('changeInvoiceSub',false)
        }

      },
      closeSelected(){
        this.$emit('changeSelected',false)
      },
      //发票内容
      changeInvoiceText(val){
        if(val===0){
          this.isInvoiceRise = false
        }else{

          this.isInvoiceRise = true
        }
      },
      //发票抬头
      changeInvoiceRise(val){
        if(val===0){
          this.invoiceCompany = false
        }else{

          this.invoiceCompany = true
        }
      }
    },
    mounted (){

    }
  }
</script>
<style lang="less" scoped>
  .invoiceBox{
    width:100%;
    height:100vh;
    overflow: hidden;
    align-items: flex-end;
  }
  .invoiceWrapper{
    height:850px;
    width:100%;
    box-sizing: border-box;
    padding:30px;
    position:fixed;
    bottom:0;
    left:0;
    background-color:white;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    .title{
      font-size:32px;
      font-weight: bold;
      text-align: center;
      position:relative;
      padding:15px 0;
      .closeBtn{
        position:absolute;
        top:50%;
        transform: translateY(-50%);
        right:20px;
        color:#ccc;
        font-size:45px;
        font-weight: bold;
      }
    }
    .list{
      text-align: left;
      margin-bottom:30px;
      li{
        padding:20px 0;
        /*font-size:26px;*/
        h6{
          font-size:26px;
          span{
            margin-right:15px;
          }
          .cube-input:after{
            content: initial;
          }
          .cube-input{
            font-size:12px;
          }
        }
        h6:first-child{
          margin-top:10px;
        }
        .checkDiv{
          margin-top:20px;

        }
      }
      .riseLi{
        padding-bottom:0;
      }
    }
    .invoiceBtn{
      height:80px;
      line-height:80px;
      text-align: center;
      border-radius: 40px;
      width:250px;
      background-color:#ff3747;
      margin:30px auto;
      color:white;
    }
  }
</style>


<template>
  <div class="assetsWrapper">
    <my-loading v-if="$store.state.isLoading"></my-loading>
    <div class="title">
      <p class="test">6月佣金余额 (元)</p>
      <h1 class="money"><span>{{all}}</span></h1>
      <ul class="flex-box">
        <li class="box-1">
          待发放
          <b>{{wait}}</b>
        </li>
        <!--<li class="box-1">-->
          <!--冻结中-->
          <!--<b>0</b>-->
        <!--</li>-->
        <li class="box-1">
          累计提现
          <b>{{cash}}</b>
        </li>
      </ul>
    </div>
    <div class="content">
      <h1>佣金明细</h1>
      <h3 class="chTitle flex-box">
        <span class="box-1">{{defaultVal}}</span>
        <cube-button class="box-1" @click="showDatePicker">其他月份 <i class="cubeic-pulldown"></i></cube-button>
      </h3>
      <ul>
        <li  v-if="!list.length">暂无数据...</li>
        <li v-for="(item,index) in list" :key="index">
          <h4 class="list-tilte">{{item.type}}</h4>
          <div class="flex-box infor">
            <div class="text-1 flex-box box-1">
              <img src="./../../assets/ico/mb-tx.png" alt="">
              <p class="media_title">{{item.nickname}}</p>
            </div>
            <div class="text-2 box-1">
              {{item.create_at}}
            </div>
            <div class="text-3 box-1">
              {{item.profit_price}}元现金
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'assetsWrapper',
    data (){
      return {
        defaultVal: '本月佣金明细',
        all: 0,//总金额
        cash: 0,//累计提现
        wait: 0,//带发放
        list: []
      }
    },
    computed:{

    },
    methods: {
      showToastTxtOnly(text) {
        this.toast = this.$createToast({
          txt: text,
          type: 'txt'
        })
        this.toast.show()
      },
      getAssetsData(date){
        this.http.get(this.ports.me.distribution+'?date='+date, res =>{
          this.$store.commit('changeLoading',false)
          console.log(res)
          if(res.success){
            let data = res.data
            this.all = data.all
            this.cash = data.cash
            this.list = data.list.res
            let tList = data.list
            if(JSON.stringify(tList) == '{}'){
              this.list = []
//              this.showToastTxtOnly('无数据...')
            }
          }else{
              this.list = []
//            this.showToastTxtOnly(res.msg)
          }
        })
      },
      showDatePicker() {
        if (!this.datePicker) {
          this.datePicker = this.$createDatePicker({
            title: '日期选择',
            min: new Date(2019, 1),
            max: new Date(2020, 9),
            value: new Date(),
            format: {
              year: 'YYYY',
              month: 'MM',
            },
            columnCount: 2,
            onSelect: this.selectHandle,
            onCancel: this.cancelHandle
          })
        }

        this.datePicker.show()
      },
      selectHandle(date, selectedVal, selectedText) {
        console.log(date,selectedVal,selectedText)
        this.defaultVal = selectedText.join('-')
        this.getAssetsData(this.defaultVal)
//        this.$createDialog({
//          type: 'warn',
//          content: `Selected Item: <br/> - date: ${date} <br/> - value: ${selectedVal.join(', ')} <br/> - text: ${selectedText.join(' ')}`,
//          icon: 'cubeic-alert'
//        }).show()
      },
      cancelHandle() {
        this.$createToast({
          type: 'correct',
          txt: 'Picker canceled',
          time: 1000
        }).show()
      }
    },
    mounted (){
      this.getAssetsData("")
    }
  }
</script>
<style lang="less" scoped>
  .assetsWrapper{
    width:100%;
    min-height:100vh;
    background-color:white;
    font-size:28px;
    padding-top:25px;
    box-sizing: border-box;
    .title{
      width:745px;
      height:368px;
      background:url(../../assets/ico/assets-t-bg.png) no-repeat center;
      background-size:100%;
      margin:0 auto;
      border-bottom:20px solid #f5f5f5;
      color:white;
      overflow: hidden;
      .test{
        margin-top:50px;
      }
      .money{
        font-size:26px;
        margin-top:30px;
        span{
          font-size:48px;
          font-weight: bold;
        }
      }
      ul{
        margin-top:50px;
        li{
          position:relative;
          b{
            display: block;
            line-height:2.2;
          }
        }
        li:nth-child(2)::before{
          content: '';
          display: inline-block;
          width:1px;
          height:50px;
          background-color:white;
          position:absolute;
          left:0;
          top:50%;
          transform: translateY(-50%);
        }
        li:nth-child(2)::after{
          content: '';
          display: inline-block;
          width:1px;
          height:50px;
          background-color:white;
          position:absolute;
          right:0;
          top:50%;
          transform: translateY(-50%);
        }
      }
    }
    .content{
      h1{
        text-align: center;
        font-size:32px;
        font-weight: bold;
        padding:40px 30px;
      }
      .chTitle{
        .cube-btn{
          background-color:#eef4f8;
          color:black;
          font-size:14px;
        }
        .cubeic-pulldown{
          transform: scale(2.13);
          margin-left:20px;
        }
      }
      ul{
        li{
          padding:30px;
          border-bottom:1px solid #eee;
          .list-tilte{
            text-align: left;
            font-size:30px;
            margin-bottom:20px;
          }
          .infor{
            color:#7d8699;
            font-size:24px;
            .text-1{
              img{
                width:40px;
                height:40px;
                border-radius: 50%;
                margin-right:10px;
              }
              p{
                color:#7d8699;
              }
            }
            .text-2{
              margin:0 20px;
            }
            .text-3{
              color:#eeaf68;
            }
          }
        }
        li:last-child{
          border:none;
        }
      }
    }
  }
</style>


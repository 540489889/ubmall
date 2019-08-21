<template>
  <div class="addressAdd">
    <my-loading v-if="$store.state.isLoading"></my-loading>
    <div class="content">
      <ul>
        <li class="flex-box">
          <span>姓名</span>
          <cube-input v-model="name" placeholder="请输入姓名" type="text" ></cube-input>
        </li>
        <li class="flex-box">
          <span>联系电话</span>
          <cube-input v-model="tel"  placeholder="请输入电话"></cube-input>
        </li>
        <li class="flex-box">
          <span>省 市 区</span>
          <cube-button class="box-1" @click="showSetDataPicker" >{{cityShow}}</cube-button>
        </li>
        <li class="flex-box">
          <span>详细地址</span>
          <cube-input v-model="address"  placeholder="请输入详细地址"></cube-input>
        </li>
        <li class="flex-box">
          <span>设为默认地址</span>
          <cube-switch v-model="defaultVal" @input="defaultChange"></cube-switch>
        </li>
      </ul>
    </div>
    <a class="addBtn" @click="addAddress">新增收货地址</a>
  </div>
</template>
<script>
  import { provinceList, cityList, areaList } from './../../assets/js/area'
  const addressData = provinceList
  addressData.forEach(province => {
    province.children = cityList[province.value]
    province.children.forEach(city => {
      city.children = areaList[city.value]
    })
  })

  export default {
    name: 'AddressAdd',
    data (){
      return {
        defaultVal:false,
        is_default: 0,
        name: '',
        tel: '',
        cityAll: '',
        cityShow: '请选择地址',
        address: '',
        province: '',//省份
        area: '',//区域
        city: '',//城市
      }
    },
    methods: {
      defaultChange(val){
        if(val){
          this.is_default = 1
        }else{
          this.is_default = 0
        }

      },
      addAddress(){
        let tellReg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57]|19[0-9]|16[0-9])[0-9]{8}$/;
        if(!this.name){
          this.showToastTxtOnly('请输入姓名')
          return false
        }
        if(!tellReg.test(this.tel)){
          this.showToastTxtOnly('请输入电话')
          return false
        }
        if(!this.city){
          this.showToastTxtOnly('请输入选择地址')
          return false
        }
        if(!this.address){
          this.showToastTxtOnly('请输入详细地址')
          return false
        }
        let params = {};
        params.name = this.name
        params.phone = this.tel
        params.province = this.province
        params.city = this.city
        params.address = this.address
        params.area = this.area
        params.is_default = this.is_default //0：不是默认，1：默认
        this.http.post(this.ports.me.address,params, res =>{
          this.$store.commit('changeLoading',false)
          console.log(res)
          if(res.success){
            let data = res.data
//            this.list = data.res
            this.$router.go(-1);//返回上一层
          }else{
            this.showToastTxtOnly(res.msg)
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
      showSetDataPicker() {
        // setData when the picker is invisible.
        this.setDataPicker.setData(addressData)
        this.setDataPicker.show()
        setTimeout(() => {
          // setData when the picker is visible.
          this.setDataPicker.setData(addressData, [21, 0, 0])
        }, 1000)
      },
      selectHandle(selectedVal, selectedIndex, selectedText) {
        this.city = selectedText[0]
        this.area = selectedText[2]
        this.province = selectedText[0]
        this.cityAll = selectedText.join('')
        this.cityShow = this.cityAll
//        this.$createDialog({
//          type: 'warn',
//          content: `Selected Item: <br/> - value: ${selectedVal.join(', ')} <br/> - index: ${selectedIndex.join(', ')} <br/> - text: ${selectedText.join(' ')}`,
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
      this.$store.commit('changeLoading',false)
      this.setDataPicker = this.$createCascadePicker({
        title: '地址选择',
        onSelect: this.selectHandle,
        onCancel: this.cancelHandle
      })
    }
  }
</script>
<style lang="less" scoped>
  .addressAdd{
    width:100%;
    min-height:100vh;
    overflow: hidden;
    background-color:aliceblue;
    font-size:28px;
    color:#506187;
    .content{
      background-color:white;
      ul{
        padding:0 30px;
        li{
          justify-content: space-between;
          border-bottom:1px solid #eee;
          padding:5px 0;
          .cube-input:after{
            content: initial;
          }
          .cube-input{
            text-align: right;
          }
          .cube-btn{
            text-align: right;
            background:none;
            color:black;
            width:initial;
            font-size:14px;
            padding:15px 0;
          }
        }
        li:last-child{
          border:none;
        }
      }
    }
    .addBtn{
      display: block;
      width:630px;
      height:90px;
      line-height:90px;
      text-align: center;
      margin:60px auto;
      border:none;
      background-color:#ff0207;
      color:white;
      border-radius: 10px;
    }
  }
</style>


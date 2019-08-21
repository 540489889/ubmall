<template>
  <div class="addressIndex">
    <my-loading v-if="$store.state.isLoading"></my-loading>
    <div class="content">
      <ul>
        <li v-for="(item,index) in list" :key="item.id">
          <h4 class="flex-box">
            <span class="media_title">{{item.name}}</span>
            <span class="box-1">{{item.phone}}</span>
          </h4>
          <h5>{{item.city+item.district+item.detailed}}</h5>
          <h6 class="flex-box">
            <div class="cube-checkbox cube-checkbox_checked" v-if="item.status">
              <label class="cube-checkbox-wrap">
                <!--<input class="cube-checkbox-input" type="radio" name="ra" :value="item.is_default" :checked="true">-->
                <span class="cube-checkbox-ui"><i class="cubeic-right"></i></span>
                设为默认地址
              </label>
            </div>
            <div class="" v-else @click="defaultClick(item)">
              <label class="cube-checkbox-wrap">
                <span class="cube-checkbox-ui cubeic-round-border"></span>
                设为默认地址
              </label>
            </div>
            <!--<label :for="'ch'+index" v-else>-->
              <!--<input type="radio" name="ra" :value="item.is_default">-->
              <!--设为默认地址-->
            <!--</label>-->
            <div class="box-1 flex-box right-bb">
              <router-link tag="a" class="edit-ico" :to="'/address/edit?aid='+item.id">编辑</router-link>
              <a class="delete-ico" @click="deleteAddress(item.id,index)">删除</a>
            </div>
          </h6>
        </li>
      </ul>
      <router-link tag="a" to="./add" class="addBtn">新增收货地址</router-link>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'AddressIndex',
    data (){
      return {
        checkedTrue: true,
        checkedFalse: false,
        list: []
      }
    },
    methods: {

      //删除
      deleteAddress(id,index){
        this.$createDialog({
          type: 'confirm',
//          icon: 'cubeic-alert',
          title: '您确认删除该地址吗',
          content: '',
          confirmBtn: {
            text: '确定',
            active: true,
            disabled: false,
            href: 'javascript:;'
          },
          cancelBtn: {
            text: '取消',
            active: false,
            disabled: false,
            href: 'javascript:;'
          },
          onConfirm: () => {
            this.http.post(this.ports.address.delete,{aid: id}, res =>{
              console.log(res)
              if(res.success){
                this.list.splice(index, 1)
              }else{
                this.showToastTxtOnly(res.msg)
              }
            })
          }
        }).show()

      },
      //设置默认地址
      defaultClick(item){
        this.list.forEach((even,i)=>{
          even.status = 0
        })
        this.http.post(this.ports.address.default,{aid: item.id}, res =>{
          if(res.success){
            item.status = 1
//            let data = res.data
//            this.list = data.res
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
      //获取列表数据
      getAddressData(){
        this.http.get(this.ports.address.index, res =>{
          this.$store.commit('changeLoading',false)
          console.log(res)
          if(res.success){
            let data = res.data
            this.list = data.address_list
          }else{
            this.list = []
//            this.showToastTxtOnly(res.msg)
          }
        })
      }
    },
    mounted (){
      this.getAddressData()
    }
  }
</script>
<style lang="less" scoped>
  .addressIndex{
    font-size:28px;
    width:100%;
    min-height:100vh;
    background-color:white;
    overflow: hidden;
    [class*=" cubeic-"], [class^=cubeic-]{
      font-size: 120%;
    }
    .content{
      ul{
        li{
          padding:30px;
          border-bottom:20px solid #f5f5f5;
          h4{
            line-height:2;
            justify-content: space-between;
            span:first-child{
              text-align: left;
              margin-right:20px;
              font-size:34px;
              color:black;
            }
            span{
              text-align: left;
              color:#c1c8d6;
            }
            /*border-bottom:1px solid #eee;*/
          }
          h5{
            text-align: left;
            line-height:2;
            padding-bottom:5px;
            border-bottom:1px solid #eee;
          }
          h6{
            padding-top:10px;
            .cube-checkbox{
              padding:0;
            }
            .cube-checkbox-wrap{
              padding:5px 0;
            }
            .right-bb{
              justify-content: flex-end;
              a{
                /*border:1px solid #aaa;*/
                padding:15px 32px;
                display: inline-block;
                border-radius: 5px;
                margin-left:20px;
              }
              .edit-ico{
                background:url(../../assets/icon/edit-ico.png) no-repeat left 14px;
                background-size:25px 26px;
              }
              .delete-ico{
                background:url(../../assets/icon/delete-ico.png) no-repeat left center;
                background-size:26px 26px;
              }
            }
          }
        }
      }
      .addBtn{
        display: block;
        width:710px;
        height:90px;
        line-height:90px;
        text-align: center;
        margin:50px auto;
        border:none;
        background-color:#00a0e9;
        color:white;
        border-radius: 10px;
      }
    }
  }
</style>


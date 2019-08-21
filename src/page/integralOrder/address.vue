<template>
  <div class="addressIndex">
    <my-loading v-if="$store.state.isLoading"></my-loading>
    <div class="content">
      <ul>
        <li @click.stop.prevent="checkAddress(item)" v-for="(item,index) in list" :key="item.id">
          <h4 class="flex-box">
            <span class="box-1 media_title">{{item.name}}</span>
            <span>{{item.phone}}</span>
          </h4>
          <h5>{{item.city+item.area+item.address}}</h5>
          <h6 class="flex-box">
            <!--<div class="cube-checkbox cube-checkbox_checked" v-if="item.is_default">-->
              <!--<label class="cube-checkbox-wrap">-->
                <!--&lt;!&ndash;<input class="cube-checkbox-input" type="radio" name="ra" :value="item.is_default" :checked="true">&ndash;&gt;-->
                <!--<span class="cube-checkbox-ui"><i class="cubeic-right"></i></span>-->
                <!--设为默认地址-->
              <!--</label>-->
            <!--</div>-->
            <!--<div class="" v-else @click="defaultClick(item)">-->
              <!--<label class="cube-checkbox-wrap">-->
                <!--<span class="cube-checkbox-ui cubeic-round-border"></span>-->
                <!--设为默认地址-->
              <!--</label>-->
            <!--</div>-->
            <!--<label :for="'ch'+index" v-else>-->
              <!--<input type="radio" name="ra" :value="item.is_default">-->
              <!--设为默认地址-->
            <!--</label>-->
            <div class="box-1 flex-box right-bb">
              <!--<router-link tag="a" :to="'/address/edit/'+item.id">编辑</router-link>-->
              <!--<a @click="deleteAddress(item.id,index)">删除</a>-->
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
      //地址选择
      checkAddress(val){
        let address = JSON.stringify(val)
        let goods_id = this.$route.query.goods_id
        let key = this.$route.query.key
        let count = this.$route.query.count
        this.$router.push({path: '/integralOrder/orders',query:{
          goods_id: goods_id,
          key: key,
          count: count,
          address: address
        }})
      },
      //删除
      deleteAddress(id,index){
        this.http.delete(this.ports.me.address+'/'+id, res =>{
          console.log(res)
          if(res.success){
            this.list.splice(index, 1)
          }else{
            this.showToastTxtOnly(res.msg)
          }
        })
      },
      //设置默认地址
      defaultClick(item){
        this.list.forEach((even,i)=>{
          even.is_default = 0
        })
        item.is_default = 1
        this.http.put(this.ports.me.address+'/'+item.id,{is_default: 1}, res =>{
          if(res.success){
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
        this.http.get(this.ports.me.address, res =>{
          this.$store.commit('changeLoading',false)
          console.log(res)
          if(res.success){
            let data = res.data
            this.list = data.res
          }else{
            this.showToastTxtOnly(res.msg)
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
            }
            border-bottom:1px solid #eee;
          }
          h5{
            text-align: left;
            line-height:2;
            margin-top:10px;
          }
          h6{
            .cube-checkbox{
              padding:0;
            }
            .cube-checkbox-wrap{
              padding:5px 0;
            }
            .right-bb{
              justify-content: flex-end;
              a{
                border:1px solid #aaa;
                padding:15px 30px;
                border-radius: 5px;
                margin-left:20px;
              }
            }
          }
        }
      }
      .addBtn{
        display: block;
        width:630px;
        height:90px;
        line-height:90px;
        text-align: center;
        margin:50px auto;
        border:1px solid #ff0207;
        color:#ff0207;
        border-radius: 10px;
      }
    }
  }
</style>


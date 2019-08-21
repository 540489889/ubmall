<template>
  <div class="searchIndex">
    <div class="searchWrapper flex-box">
      <div class="searchInput box-1">
        <!--<input type="text"  placeholder="有线来点套餐">-->
        <cube-input
          :placeholder="placeholder"
          :autofocus="autofocus"
          ref="siteInput"
          v-model="value" ></cube-input>
        <i class="cubeic-search"></i>
      </div>
      <div class="cart" @click="searchClick">搜索</div>
    </div>
    <div class="rmSearch">
      <!--<h2>热门搜索</h2>-->
      <!--<div class="label">-->
        <!--<span></span>-->
        <!--<span>手机</span>-->
        <!--<span>牛奶</span>-->
        <!--<span>啤酒</span>-->
      <!--</div>-->
    </div>
  </div>

</template>
<script>
  export default {
    name: 'search',
    data (){
      return {
        value: '',
        autofocus: true,
        placeholder: '请输入搜索内容',
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
      getListData(callback){
        let cond = false
        let id = this.$route.query.cate //分类id
        let title = this.value //搜索内容
        let type = this.$route.query.type //当带有此参数时，为首页的新品推荐和平台精选。new为新品，choice为精选
        this.http.get(this.ports.sort.index+'?so='+title, res =>{
          console.log(res)
          if(res.success){
            let data = res.data
            if(!data){
              cond = false
            }else{
              cond = true
            }
          }else{
            cond = false
          }
          callback(cond)
        })
      },
      //搜索
      searchClick(){
        let type = this.$route.query.type //当带有此参数时，为首页的新品推荐和平台精选。new为新品，choice为精选
        let cate = this.$route.query.cate //分类id
        let that = this
        if(!this.value){
          this.showToastTxtOnly('请输入搜索内容')
          return false
        }
        this.getListData(function (cond) {
          if(cond){
            that.$router.push({path: '/sortGoods/index',query:{
              type: type,
              cid: '',
              title: that.value
            }})
          }else{
            that.showToastTxtOnly('太难了！')
          }
        })

      }
    },
    mounted (){
      this.$store.commit('changeLoading',false)
      this.$refs['siteInput'].focus();
    }
  }
</script>
<style lang="less" scoped>
  body{
    background-color:white !important;
  }
  .searchIndex{
    background-color:white;
    width:100%;
    height:100%;
    position:absolute;
    top:0;
    left:0;
    padding-top:130px;
    overflow: hidden;
    box-sizing: border-box;
    .searchWrapper{
      background-color:white;
      padding:15px 30px;
      border-bottom:1px solid #eee;
      font-size:26px;
      position:relative;
      z-index: 999;
      .searchInput{
        position:relative;
        input{
          height:60px;
          width:100%;
          box-sizing: border-box;
          background-color:#f5f5f5;
          color:black;
          border-radius: 30px;
          padding:0 30px 0 70px;
        }
        .cube-input{
          height:35px;
          width:100%;
          box-sizing: border-box;
          background-color:#f5f5f5;
          color:black;
          border-radius: 40px;
          padding:0 10px 0 35px;
        }

        .cube-input:after{
          content: initial;
        }
        i{
          font-size:38px;
          position:absolute;
          left:20px;
          top:15px;
        }
      }
      .cart{
        /*width:40px;*/
        /*height:36px;*/
        /*background:url(../../assets/ico/cart-ico.png) no-repeat center;*/
        background-size:100%;
        margin-left:20px;
        position:relative;
        span{
          position:absolute;
          top:-15px;
          right:-15px;
          display: inline-block;
          border-radius: 50%;
          font-size:22px;
          color:white;
          background-color:#ff0207;
          padding:5px;
        }
      }
    }
   .rmSearch{
     margin-top:20px;
     padding:30px;
      h2{
        line-height:2;
        text-align: left;
      }
     .label{
       text-align: left;
       margin-top:20px;
       span{
         display: inline-block;
         height:45px;
         line-height:45px;
         border-radius: 5px;
         padding:0 20px;
         font-size:24px;
         background-color:#eee;
         margin-right:10px;
         color:#aaa;
       }
     }
   }
  }
</style>

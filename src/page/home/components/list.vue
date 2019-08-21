<template>
  <div class="listWrapper">
    <router-link tag="div" :to="'/sort/list?type='+1" class="title flex-box">
      <div class="left">
        平台精选 <span>达人精选好物</span>
      </div>
      <div class="right">
        更多 <i class="cubeic-arrow"></i>
      </div>
    </router-link>
    <div class="content">
      <ul>
        <li v-for="item in choice.res" :key="item.id">
          <router-link tag="a" :to="'/goods/index/'+item.id" class="flex-box">
            <div class="left">
              <img :src="item.logo" alt="">
            </div>
            <div class="right box-1">
              <h4 class="media_title"><span v-if="item.a">认证</span>{{item.title}}L</h4>
              <p class="media_title">{{item.desc}}</p>
              <h5><span v-for="it in item.tags">{{it.tag_name}}</span></h5>
              <h6 class="flex-box"><span class="money"><a>{{parseInt(item.price_selling)}}</a><em>{{parseInt(item.price_market)}}</em></span> <span>已售：{{item.number_sales}}件</span></h6>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
    <router-link tag="div" :to="'/sort/list?type='+2" class="title flex-box">
      <div class="left">
        新品推荐
         <!--<span>达人精选好物</span>-->
      </div>
      <div class="right">
        更多 <i class="cubeic-arrow"></i>
      </div>
    </router-link>
    <div class="content">
      <ul>
        <li v-for="item in newList.res" :key="item.id">
          <router-link tag="a" :to="'/goods/index/'+item.id" class="flex-box">
            <div class="left">
              <img :src="item.logo" alt="">
            </div>
            <div class="right box-1">
              <h4 class="media_title"><span v-if="item.a">认证</span>{{item.title}}L</h4>
              <p class="media_title">{{item.desc}}</p>
              <h5><span v-for="it in item.tags">{{it.tag_name}}</span></h5>
              <h6 class="flex-box"><span class="money"><a>{{parseInt(item.price_selling)}}</a><em>{{parseInt(item.price_market)}}</em></span> <span>已售：{{item.number_sales}}件</span></h6>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'HomeList',
    data (){
      return {

      }
    },
    props: {
      choice: Object,
      newList: Object
    },
    methods: {

    },
    mounted (){
      this.$store.commit('changeLoading',false)
    }
  }
</script>
<style lang="less" scoped>
  .listWrapper{
    /*background-color:white;*/
    padding:0 30px;
    padding-bottom:30px;
    .title{
      justify-content: space-between;
      margin:20px auto;
      padding-top:30px;
      .left{
        font-weight: bold;
        font-size:32px;
        span{
          font-weight: 500;
          color:#ff3443;
          font-size:24px;
        }
      }
      .right{
        color:#c6c6c6;
      }
    }
    .content{
      ul{
        li{
          background-color:white;
          border-radius: 10px;
          padding:15px;
          margin-bottom:15px;
          a{
            align-items: flex-start;
            color:black;
            .left{
              margin-right:15px;
              width:170px;
              height:172px;
              img{
                width:100%;
                height:100%;
                border-radius: 10px;
              }
            }
            .right{
              text-align: left;
              h4{
                span{
                  color:white;
                  background-color:#ff050b;
                  font-size:22px;
                  min-width:55px;
                  height:30px;
                  line-height:32px;
                  text-align: center;
                  border-radius: 5px;
                  display: inline-block;
                  margin-right:10px;
                }
              }
              p{
                font-size:24px;
                color:#7f8593;
                margin:10px 0;
              }
              h5{
                span{
                  margin-right:10px;
                  color:#ff0207;
                  font-size:22px;
                  border:1px solid #ff0207;
                  display:inline-block;
                  min-width:70px;
                  text-align: center;
                  height:30px;
                  line-height:32px;
                  border-radius: 15px;
                }
                margin-bottom:10px;
              }
              h6{
                justify-content: space-between;
                margin-top:20px;
                color:#c6c6c6;
                .money{
                  color:#ff0207;
                  a{
                    font-size:36px;
                    font-weight: bold;
                    color:#ff0207;
                  }
                  em{
                    TEXT-DECORATION: line-through;
                    margin-left:10px;
                    color:#c6c6c6;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>


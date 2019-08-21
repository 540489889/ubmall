<template>
  <div class="teamWrapper">
    <my-loading v-if="$store.state.isLoading"></my-loading>
    <div class="title flex-box">
      <b class="text">团队成员</b>
      共 <span>{{count}}</span> 人
    </div>
    <div class="content">
      <h2>团队成员列表</h2>
      <ul>
        <li class="flex-box" v-for="item in list" :key="item.id">
          <div class="left flex-box box-1">
            <img :src="item.headimg" alt="">
            <div class="infor">
              <h4 class="media_title">{{item.nickname}}</h4>
              <p>手机：{{item.phone}}</p>
            </div>
          </div>
          <div class="right">
            <h5>级别：一级</h5>
            <p>加入时间：{{item.create_at}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'MeTeam',
    data (){
      return {
        list: [],
        count: 0,//总人数
      }
    },
    methods: {
      getTeamData(){
        this.http.get(this.ports.me.team, res =>{
          this.$store.commit('changeLoading',false)
          if(res.success){
            let data = res.data
            this.count = data.count
            this.list = data.res
          }else{
            this.showToastTxtOnly(res.msg)
          }
        })
      }
    },
    mounted (){
      this.getTeamData()
    }
  }
</script>
<style lang="less" scoped>
  .teamWrapper{
    width:100%;
    min-height:100vh;
    background-color:white;
    font-size:28px;
    .title{
      width:100%;
      height:200px;
      background-color:#1499ff;
      text-align: center;
      position:relative;
      color:white;
      justify-content: center;
      .text{
        position:absolute;
        left:30px;
        top:30px;
      }
      span{
        font-size:60px;
        font-weight: bold;
      }
    }
    .content{
      text-align: left;
      padding:30px;
      h2{
        padding-bottom:30px;
        border-bottom:1px solid #eee;
        font-size:30px;
      }
      ul{
        li{
          padding:30px 0;
          border-bottom:1px solid #eee;
          .left{
            margin-right:20px;
            img{
              width:80px;
              height:80px;
              border-radius: 100%;
              margin-right:20px;
            }
            .infor{
              p{
                color:#7f8593;
                font-size:22px;
                line-height:2;
              }
            }
          }
          .right{
            text-align: right;
            h5{
              color:#ff0207;
            }
            p{
              color:#7f8593;
              font-size:22px;
              line-height:2;
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


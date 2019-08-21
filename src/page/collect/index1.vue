<template>
  <div class="collectIndex">
    <ul>
      <li class="flex-box">
        <div class="left">
          <img src="../../assets/img/goods-b1.png" alt="">
        </div>
        <div class="right box-1">
          <h4 class="media_title">青藏高原正宗土鸡蛋...</h4>
          <p>生态 营养 特产</p>
          <div class="money flex-box">
            <div class="left-text">
               <span>100</span>
            </div>
            <div class="right-text">购买</div>
          </div>
        </div>
      </li>
      <li class="flex-box">
        <div class="left">
          <img src="../../assets/img/goods-b1.png" alt="">
        </div>
        <div class="right box-1">
          <h4 class="media_title">青藏高原正宗土鸡蛋...</h4>
          <p>生态 营养 特产</p>
          <div class="money flex-box">
            <div class="left-text">
               <span>100</span>
            </div>
            <div class="right-text">购买</div>
          </div>
        </div>
      </li>
      <li class="flex-box">
        <div class="left">
          <img src="../../assets/img/goods-b1.png" alt="">
        </div>
        <div class="right box-1">
          <h4 class="media_title">青藏高原正宗土鸡蛋...</h4>
          <p>生态 营养 特产</p>
          <div class="money flex-box">
            <div class="left-text">
               <span>100</span>
            </div>
            <div class="right-text">购买</div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'collectIndex',
    data (){
      return {

      }
    },
    methods: {

    },
    mounted (){
      this.$store.commit('changeLoading',false)
    }
  }
</script>
<style lang="less" scoped>
  .collectIndex{
    font-size:28px;
    min-height:100vh;
    background-color:aliceblue;
    position:relative;
    ul{
      padding:30px;
      li{
        padding:20px;
        background-color:white;
        align-items: flex-start;
        margin-bottom:20px;
        .left{
          width:170px;
          height:170px;
          border-radius: 10px;
          margin-right:15px;
          img{
            width:100%;
            height:100%;
            border-radius: 10px;
          }
        }
        .right{
          text-align:left;
          h4{

          }
          p{
            color:#7f8593;
            font-size:24px;
            margin:25px auto;
          }
          .money{
            justify-content: space-between;
            .left-text{
              color:#ff0207;
              font-size:24px;
              span{
                font-size:36px;
                font-weight: bold;
              }
            }
            .right-text{
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


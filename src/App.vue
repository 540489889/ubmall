<template>
  <div id="app">
    <mall-header></mall-header>
    <transition :name="transitionName">
      <router-view/>
    </transition>
    <!--<loading v-if="$store.state.isLoading"></loading>-->
    <nav-bar :selectedNavTitle="NavTitle" v-if="showBar"></nav-bar>
  </div>
</template>
<script>
  import loading from './components/loading.vue'
  import navBar from './components/navBar.vue'
  import mallHeader from './components/header.vue'
  export default {
    name: 'app',
    data (){
      return{
        transitionName:'',
        showBar: true,
        selectedNavTitle: '',
        title: '',
      }
    },
    created (){

    },
    methods:{

    },
    computed: {
      NavTitle (){
        return this.$store.state.defaultTitle
      }
    },
    components:{
      navBar,
      loading,
      mallHeader
    },
    watch: {
      //使用watch 监听$router的变化
      '$route' (to, from) {
        let title = to.query.title
        if(title=='BCAC商城'||to.meta.title=='BCAC商城'){
          this.$store.commit('changeAddress',true)
        }else{
          this.$store.commit('changeAddress',false)
        }
        if(title){
          this.$store.commit('changeTitle',title)
        }else{
          this.$store.commit('changeTitle',to.meta.title)
        }
        this.$store.commit('changeLoading',true)
        //导航显示
        switch (to.name){
          case 'Home':
            this.showBar = true
            break
          case 'SortIndex':
            this.showBar = true
            break
          case 'OrderIndex':
            this.showBar = true
            break
          case 'CartIndex':
            this.showBar = true
            break
          default :
            this.showBar = false
        }
        //如果to索引大于from索引,判断为前进状态,反之则为后退状态
        if(to.meta.index >= from.meta.index){
          //设置动画名称
          this.transitionName = 'slide-left';
        }else{
          this.transitionName = 'slide-right';
        }
      }, deep: true
    }
  }
</script>

<style lang="less" scoped>
  .slide-fade{
    position: absolute;left:0;right: 0;
  }
  .slide-fade-enter-active {
    transition: all 1s ease;
  }
  .slide-fade-leave-active {

    transition: all .1s cubic-bezier(2.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
  {
    left:0;right: 0;
    transform: translateX(50px);
    opacity: 0;
  }
  #app {
    padding-top:130px;
    /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: black;
  }
  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active{
    will-change: transform;
    transition: all 500ms ease-in-out	;
    position: absolute;
  }
  .slide-right-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
  .slide-right-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  .slide-left-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  .slide-left-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
</style>

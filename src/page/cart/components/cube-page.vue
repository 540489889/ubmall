<template>
  <div class="cube-page" :class="type">
    <!--<header class="header">-->
      <!--<h1>{{title}}</h1>-->
      <!--<i @click="back" class="cubeic-back"></i>-->
    <!--</header>-->
    <div class="wrapper">
      <section v-show="desc" class="desc"><slot name="desc">{{desc}}</slot></section>
      <main class="content">
        <slot name="content">{{content}}</slot>
      </main>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '',
        required: true
      },
      type: {
        type: String,
        default: ''
      },
      desc: {
        type: String,
        default: ''
      },
      content: {
        type: String,
        default: ''
      }
    },
    components:{
    },
    methods: {
      back() {
        this.$router.back()
      }
    }
  }
</script>
<style>
  .cube-page{
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #efeff4;
  }
</style>


<template lang="html">
    <div class="loaddingWrapper">
      <div class="spinner">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
      </div>
    </div>
</template>
<script>
export default {
  data() {
      return {

      }
  },
  props: {

  },
  mounted(){

  }
}
</script>
<style lang="css"  scoped>
  .loaddingWrapper{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    overflow: hidden;
    z-index: 666;
    background-color:white;
  }
.spinner {
  margin:0 auto;
  width: 200px;
  text-align: center;
  position:absolute;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
}

.spinner > div {
  width: 30px;
  height: 30px;
  background-color: red;

  border-radius: 100%;
  display: inline-block;
  -webkit-animation: bouncedelay 1.4s infinite ease-in-out;
  animation: bouncedelay 1.4s infinite ease-in-out;
  /* Prevent first frame from flickering when animation starts */
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

.spinner .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.spinner .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

@-webkit-keyframes bouncedelay {
  0%, 80%, 100% { -webkit-transform: scale(0.0) }
  40% { -webkit-transform: scale(1.0) }
}

@keyframes bouncedelay {
  0%, 80%, 100% {
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 40% {
      transform: scale(1.0);
      -webkit-transform: scale(1.0);
    }
}
</style>

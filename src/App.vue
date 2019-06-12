<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  let scale = 1/devicePixelRatio;
  document.querySelector("meta[name='viewport']").setAttribute('content',`initial-scale=${scale},maximum-scale=${scale},minimum-scale=${scale},user-scalable=no`);
  document.documentElement.style.fontSize = document.documentElement.clientWidth / 10 + 'px';
export default {
  name: 'App'
}
</script>
<style>
  @font-face {
    font-family: 'Callie Hand';
    src:url('./assets/Callie_Hand.ttf')
  }
  @font-face {
    font-family: 'Qian Kun';
    src:url('./assets/qiankun.ttf')
  }
  body{
    height:100vh;
  }
  #app{
    text-align: left;
    font-weight: 700;
    -webkit-font-smoothing: antialiased;
    color: #798dc1;
    height:100%;
    background: black;
  }
</style>

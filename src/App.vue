<template>
  <div id="app">
    <router-view />
    <transition name="fade">
      <div class="loading-bg" v-if="loading">
        <div class="loading">
          <div
            :class="`bar bar${idx}`"
            v-for="(item, idx) in 12"
            :key="idx"
          ></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
let scale = 1 / devicePixelRatio;
document
  .querySelector("meta[name='viewport']")
  .setAttribute(
    "content",
    `initial-scale=${scale},maximum-scale=${scale},minimum-scale=${scale},user-scalable=no`
  );
document.documentElement.style.fontSize =
  document.documentElement.clientWidth / 10 + "px";
window.onload = function () {
  let height = window.innerHeight || document.documentElement.clientHeight;
  document.body.style.height = height + "px";
};

export default {
  name: "App",
  data() {
    return {
      loading: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 5000);
  },
};
</script>
<style lang="scss">
body {
  height: 100vh;
}
#app {
  text-align: left;
  font-weight: 700;
  -webkit-font-smoothing: antialiased;
  color: #798dc1;
  height: 100%;
  background: black;
}
.loading-bg {
  width: 100%;
  height: 100%;
  background: black;
  position: absolute;
}
.loading {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  height: 3rem;
  width: 4rem;
  display: flex;
  justify-content: space-between;
}

.bar {
  display: inline-block;
  transform-origin: bottom;
  background: white;
  height: 100%;
  width: 0.2rem;
  animation: loading 1.5s ease-in-out infinite;
}

$i: 0;
@while ($i<20) {
  .bar#{$i} {
    animation-delay: #{$i/10}s;
  }
  $i: $i + 1;
}
@keyframes loading {
  0% {
    transform: scaleY(0.1);
    background: #f5b041;
  }
  50% {
    transform: scaleY(1);
    background: #2e86c1;
  }
  100% {
    transform: scaleY(0.1);
    background: transparent;
  }
}
</style>

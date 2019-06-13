<template>
    <div class="navigator">
      <div class="title">前言</div>
      <div class="content">
        <div
          :class="['content-row',{'hide':!animate}]"
          v-for="(item,idx) in contentList"
          :style="`transition:all 1s ${idx}s ease-in-out`"
        >
          {{item}}
        </div>
        <div :class="['signature',{'hide':!animate}]">
          Developed by Jake
        </div>
      </div>
      <div :class="['confirm',{'hide':!animate}]" @click="navigateHome">确认并开始</div>
    </div>
</template>

<script>
  export default {
    name: "Preload",
    data() {
      return {
        animate: false,
        contentList: [
          '本问卷只是为了互相了解',
          '不涉及任何择偶标准',
          '问卷的设计、取材、开发全由我个人完成',
          '纯属娱乐，如有雷同，纯属巧合'
        ]
      }
    },
    mounted() {
      setTimeout(() => {
        this.animate = true
      }, 6000)
    },
    methods: {
      navigateHome() {
        this.$router.push({path: '/home'})
      }
    }
  }
</script>

<style scoped>
  .navigator {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    width: 100vw;
    font-size: .5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: .4rem 0 2rem 0;
    color: #fff;
  }

  .title {
    margin: 0 auto;
    font-size: .8rem;
    font-family: "cyjianxk19f4c1ea241ff64";
  }

  .content {
    padding: .4rem;
    font-family: "cyjianxk19f4c1ea241ff64";
  }

  .hide {
    opacity: 0;
  }

  .signature {
    position: absolute;
    font-size: .5rem;
    bottom: 0;
    right: .4rem;
    font-family:'SnellRoundhand';
    transition: all 1s ease-in-out 4s;
  }

  .content-row {
    padding: .2rem 0;
  }

  .confirm {
    margin-top: 1rem;
    border: .04rem solid #fff;
    padding: .2rem;
    border-radius: .2rem;
    transition: all 1s ease-in-out 3s;
    font-family: "cyjianxk19f4c1ea241ff64";
  }

  @keyframes show {
    from{
      opacity:0
    }
    to{
      opacity:1
    }
  }
</style>

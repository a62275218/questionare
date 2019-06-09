<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div v-for="item in questionList" class="swiper-slide">
        <div class="question-card">
          {{item.title}}
          <el-checkbox-group
            v-if="item.type==='checkbox'"
            v-model="item.model"
          >
            <el-checkbox
              v-for="option in item.options"
              :label="option.label"
              :key="option.label"
            >
              {{option.label}}
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </div>
    <div class="swiper-scrollbar"></div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
  import Swiper from 'swiper';

  export default {
    name: 'Home',
    data() {
      return {
        questionList: [
          {
            title: '1231321',
            type: 'checkbox',
            options: [
              {
                label: '会',
              },
              {
                label: '不会',
              }
            ],
            model:[]
          },
          {
            title: 'adsa',
            type: 'checkbox',
            options: [
              {
                label: '会',
              },
              {
                label: '不会',
              }
            ],
            model:[]
          },
          {
            title: '1231321'
          },
          {
            title: '1231321'
          },
          {
            title: '1231321'
          },
          {
            title: '1231321'
          },
          {
            title: '1231321'
          }
        ]
      }
    },
    mounted() {
      this.$nextTick(()=>{
        const swiper = new Swiper('.swiper-container', {
          direction: 'vertical',
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
            renderBullet:(index,className)=>{
              return '<span class="swiper-pagination-bullet">123</span>';
            }
          },
          onInit: function(swiper){  //Swiper2.x的初始化是onFirstInit
            swiperAnimateCache(swiper);  //隐藏动画元素
            setTimeout(function(){ //2s后开始运行动画（移动端总是没加载完图片就开始动画了。。。。。）
              swiperAnimate(swiper); //初始化完成开始动画
            },2000)
          },
          scrollbar: {
            el: '.swiper-scrollbar',
          },
        })
      });
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../css/swiper.css';

  .swiper-container {
    background: gray;
    height: 100vh;
  }

  .swiper-slide {
    background: #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .question-card {
    background: #fff;
    width: 80%;
    height: 80%;
  }

  .swiper-pagination{
    background: red;
  }
  .swiper-pagination-progressbar {
    background: #007aff;
  }
</style>

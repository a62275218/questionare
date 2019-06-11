<template>
  <iframe>
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="(item,idx) in questionList" :key="idx" class="swiper-slide">
        <div :class="['question-card',{'question-card-hide':hide}]">
          <div :class="['inner-card',{'inner-card-hide':hide}]">
            <div class="inner-border"></div>
            <div class="text-wrapper">
              <div :class="['title',{hide:hide}]">
                {{idx+1+'. ' + item.title}}
              </div>
              <!--begin 复选框-->
              <el-checkbox-group
                v-model="item.model"
                @change="e=>handleChange(e,item)"
              >
                <el-checkbox
                  v-for="(option,i) in item.options"
                  :label="option.label"
                  :key="option.label"
                  :class="{'check-box-hide':hide}"
                  :style="`transition:all 0.5s ease-in-out ${1+i/10}s`"
                >
                  {{option.label}}
                </el-checkbox>
              </el-checkbox-group>
              <!--end 复选框-->
            </div>
          </div>
        </div>
        <div :class="['top-left-sunlight',{'top-left-sunlight-hide':hide}]"></div>
        <div :class="['center-feather',{'center-feather-hide':hide}]"></div>
        <div :class="['bot-left-feather',{'bot-left-feather-hide':hide}]"></div>
        <div :class="['bot-right-feather',{'bot-right-feather-hide':hide}]"></div>
      </swiper-slide>
      <div class="swiper-scrollbar" slot="scrollbar"></div>
    </swiper>
  </iframe>
</template>

<script>
  export default {
    name: 'Home',
    data() {
      const _this = this;
      return {
        hide: true,
        swiperOption: {
          direction: 'vertical',
          on: {
            init: function () {
              _this.hide = false;
            },
            transitionStart: function () {
              _this.hide = true;
              window.postMessage('123', 'http://localhost:8081/receiver')
            },
            transitionEnd: function () {
              _this.hide = false;
            }
          },
          scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true,
          },
        },
        questionList: [
          {
            title: '测试标题，测试测试测试？',
            type: 'checkbox',
            options: [
              {
                label: '会',
              },
              {
                label: '不会',
              },
              {
                label: 'abua',
              },
              {
                label: 'asdasd',
              }
            ],
            model: []
          },
          {
            title: '测试标题，测试测试测试？',
            type: 'radio',
            options: [
              {
                label: '会',
              },
              {
                label: '不会',
              }
            ],
            model: []
          },
          {
            title: '测试标题，测试测试测试？'
          },
          {
            title: '测试标题，测试测试测试？'
          },
          {
            title: '测试标题，测试测试测试？'
          },
          {
            title: '测试标题，测试测试测试？'
          },
          {
            title: '测试标题，测试测试测试？'
          }
        ]
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    methods: {
      handleChange(e, item) {
        if (item.type === 'radio' && item.model.length > 1) {
          item.model = [e[1]];
        }
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

  @mixin checkbox {
    cursor: pointer;
    position: absolute;
    display: block;
    box-sizing: border-box;
    height: 20px;
    content: '';
    width: 20px;
    top: 50%;
    transform: translate(0, -50%);
  }

  .swiper-container {
    height: 100vh;
    background-image: url("https://file.rrxh5.cc/g2/c1/2019/06/05/1559718187136.png@!user_image_700x1");
    background-size: cover;
  }

  .swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url("https://file.rrxh5.cc/g2/c1/2019/06/05/1559718187849.png@!user_image_700x1");
    background-size: cover;
    position: relative;

    .question-card-hide {
      transform: translate3d(-200%, 0, 0);
      transition: none !important;
    }

    .question-card {
      width: calc(100% - 60px);
      height: 70%;
      background: rgba(255, 255, 255, 0.3);
      z-index: 100;
      transition: all 0.5s ease-in-out 0.5s;

      .inner-card-hide {
        transform: translate3d(400%, -50%, 0) !important;
        transition: none !important;
      }

      .inner-card {
        position: relative;
        top: 50%;
        left: 50%;
        background: #fff;
        filter: opacity(0.6);
        transform: translate(-50%, -50%);
        width: calc(100% - 40px);
        height: calc(100% - 40px);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        padding: 20px;
        box-shadow: 0 0 20px #a2a2a2;
        overflow: hidden;
        transition: all 0.5s ease-in-out 0.5s;

        .inner-border {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: calc(100% - 10px);
          height: calc(100% - 10px);
          border: 1px solid #d2dee4;
        }
      }
    }
  }

  .text-wrapper {
    width: calc(100% - 30px);
    height: calc(100% - 80px);
    z-index: 2000;

    .hide {
      transform: translate3d(0, -180%, 0);
      transition: none !important;
    }

    .title {
      font-size: 18px;
      padding-bottom: 20px;
      transition: all 0.5s ease-in-out 1s;
    }
  }

  .top-left-sunlight-hide {
    transform: translate3d(0, -100%, 0) rotate(180deg) scale(2.5) !important;
    transition: none !important;
  }

  .top-left-sunlight {
    position: absolute;
    top: 10%;
    left: 75%;
    width: 100%;
    height: 220px;
    transform: rotate(180deg) scale(2.5);
    background: no-repeat url("https://file.rrxh5.cc/g2/c1/2019/06/05/1559718187619.png@!user_image_700x1");
    background-size: cover;
    transition: all 0.5s ease-in-out;
  }

  .center-feather-hide {
    transform: scale(0.2);
    transition: none !important;
    opacity: 0.2 !important;
  }

  .center-feather {
    position: absolute;
    top: -40%;
    left: -16%;
    width: 130%;
    height: 100%;
    background-image: url("https://file.rrxh5.cc/g2/c1/2019/06/05/1559718187847.png@!user_image_700x1");
    background-size: cover;
    transition: all 0.5s ease-in-out;
  }

  .bot-left-feather-hide {
    transform: rotate(-90deg);
    transition: none !important;
    left: -50% !important;
    opacity: 0;
  }

  .bot-left-feather {
    position: absolute;
    bottom: 0;
    left: -20%;
    width: 210px;
    height: 251px;
    background-image: url("https://file.rrxh5.cc/g2/c1/2019/06/05/1559718187886.png@!user_image_700x1");
    background-size: cover;
    transition: all 1.5s ease-in-out 0.5s;
  }

  .bot-right-feather-hide {
    transform: rotate(90deg) !important;
    transition: none !important;
    right: -100% !important;
    opacity: 0.1 !important;
  }

  .bot-right-feather {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 210px;
    height: 251px;
    transform: rotate(30deg);
    background-image: url("https://file.rrxh5.cc/g2/c1/2019/06/05/1559718187990.png@!user_image_700x1");
    background-size: cover;
    transition: all 1.5s ease-in-out 0.5s;
  }

  .swiper-scrollbar-drag {
    background: #798dc1;
  }

  //修改element ui 样式
  .el-checkbox-group, .el-radio-group {
    display: flex;
    flex-direction: column;
  }

  .check-box-hide {
    transform: translate3d(-200%, 0, 0);
    transition: none !important;
  }

  .el-checkbox {
    border: 1px solid #798dc0;
    border-radius: 2px;
    background: rgba(255, 255, 255, 1) !important;
    filter: opacity(1) !important;
    margin: 10px 0;
    padding: 4px;
    box-shadow: 2px 2px 4px #a1a1a1;

    input {
      visibility: hidden;
    }

    .el-checkbox__input {
      &:after {
        background: no-repeat center url(https://oss3.rabbitpre.com/rp2/apps/static/widget/pageManagement/checkbox-bg_66eca2a.png);
        background-size: 96% 90%;
        @include checkbox
      }
    }

    .is-checked {
      &:before {
        z-index: 9000;
        background: url(https://oss3.rabbitpre.com/rp2/apps/static/widget/pageManagement/checkbox-bg-h_fc9d504.png);
        background-size: cover;
        @include checkbox
      }
    }
  }

</style>

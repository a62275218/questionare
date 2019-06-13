<template>
  <swiper :options="swiperOption" ref="mySwiper">
    <swiper-slide v-for="(item,idx) in questionList" :key="item.title" class="swiper-slide" >
      <div :class="['question-card',{'question-card-hide':hide}]">
        <div :class="['inner-card',{'inner-card-hide':hide}]">
          <div class="inner-border"></div>
          <img class="nextBtn" v-show="item.model.length && idx!==questionList.length-1 && !complete"
               src="../assets/down.png" alt=""/>
          <div
            class="submit-btn"
            v-show="idx===questionList.length-1 && !complete && item.model.length"
            @click="submit()"
          >
            提交
          </div>
          <div :class="['complete',{'complete-hide':!complete}]"></div>
          <div class="text-wrapper">
            <div :class="['title',{hide:hide}]">
              <div>{{idx+1}}.</div>
              <div>{{item.title}}</div>
            </div>
            <!--begin 复选框-->
            <!--<el-checkbox-group-->
            <!--v-model="item.model"-->
            <!--@change="e=>handleChange(e,item)"-->
            <!--&gt;-->
            <!--<el-checkbox-->
            <!--v-for="(option,i) in item.options"-->
            <!--:label="option.label"-->
            <!--:key="option.label"-->
            <!--:class="{'check-box-hide':hide}"-->
            <!--:style="`transition:all 0.5s ease-in-out ${1+i/10}s;${option.label.length>14?'text-align:center':''}`"-->
            <!--&gt;-->
            <!--{{option.label}}-->
            <!--</el-checkbox>-->
            <!--</el-checkbox-group>-->

            <van-checkbox-group
              v-model="item.model"
              @change="e=>handleChange(e,item)"
            >
              <transition-group name="list">
                <van-checkbox
                  v-if="!hide"
                  v-for="(option, index) in item.options"
                  :key="option.label"
                  :name="option"
                  icon-size=".4rem"
                  shape="square"
                  :id="index"
                  :class="`delay${index}`"
                  checked-color="#f08b48"
                >
                  {{option.label}}
                </van-checkbox>
              </transition-group>
            </van-checkbox-group>
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
</template>

<script>
  import SDK from '../assets/NIM_Web_SDK_v6.5.0'

  let nim;
  export default {
    name: 'Home',
    mounted() {
      nim = SDK.NIM.getInstance({
        appKey: 'd8201c00ad3022a6bae5d14954b30605',
        account: 'a62275218',
        token: '66d76e593a3ca3541f18f092aef999f8',
        onconnect: function () {
          console.log('SDK连接成功')
        },
        onerror: function (err) {
          console.log(err)
        },
        oncustomsysmsg: function (sysMsg) {
          console.log('收到系统通知', sysMsg)
        }
      });
    },
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
            },
            transitionEnd: function () {
              _this.hide = false;
            }
          },
          scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true,
          },
          navigation: {
            nextEl: '.nextBtn',
          },
        },
        questionList: [
          {
            title: '逛街看到一家特别心仪的小吃摊想去吃，但是有一群人在排队，你会？',
            type: 'radio',
            options: [
              {
                label: '再长的队我都忍了',
                key: '1'
              },
              {
                label: '下次有机会再来',
                key: '2'
              },
              {
                label: '走人',
                key: '3'
              },
            ],
            model: []
          },
          {
            title: '最近蔡徐坤被黑得挺惨的，你怎么看？',
            type: 'radio',
            options: [
              {
                label: '不准黑我家坤坤',
                key: '4'
              },
              {
                label: '被黑是他活该',
                key: '5'
              },
              {
                label: '我只是个吃瓜的群众',
                key: '6'
              },
              {
                label: '蔡徐坤是谁？',
                key: '7'
              }
            ],
            model: []
          },
          {
            title: '男朋友出门忘带手机了，还没锁屏，你会?',
            type: 'radio',
            options: [
              {
                label: '马上想办法联系他，并且不看他手机内容',
                key: '8'
              },
              {
                label: '机会来了，看看他和哪个小妖精在聊骚',
                key: '9'
              },
            ],
            model: []
          },
          {
            title: '以下歌手/乐队知道哪些?',
            type: 'checkbox',
            options: [
              {
                label: '麦克学摇滚(Micheal Learns To Rock)',
                key: '10'
              },
              {
                label: '夜愿(Night Wish)',
                key: '11'
              },
              {
                label: '后弦',
                key: '12'
              },
              {
                label: '许嵩(Vae)',
                key: '13'
              },
              {
                label: '音阙诗听',
                key: '14'
              },
              {
                label: '毛不易',
                key: '15'
              }
            ],
            model: []
          },
          {
            title: '看上了一款卡地亚首饰，但是发现施华洛世奇有一款价格便宜得多的也不错，你会?',
            type: 'radio',
            options: [
              {
                label: '只有卡地亚配得上本仙女',
                key: '16'
              },
              {
                label: '我选择价格便宜的',
                key: '17'
              },
            ],
            model: []
          },
          {
            title: "肚子疼，和男朋友哭诉，结果换来一句'多喝热水'",
            type: 'radio',
            options: [
              {
                label: '老娘请你喝烫水',
                key: '18'
              },
              {
                label: '能怎么办？只能忍了',
                key: '19'
              },
              {
                label: '无所谓',
                key: '20'
              }
            ],
            model: []
          },
          {
            title: '和男朋友相处久了，发现对方是个沙雕',
            type: 'radio',
            options: [
              {
                label: '巧了，我也是',
                key: '21'
              },
              {
                label: '不和沙雕做朋友',
                key: '22'
              },
              {
                label: '能怎么办？只能忍了',
                key: '23'
              },
              {
                label: '无所谓',
                key: '24'
              },
              {
                label: '沙雕是什么？',
                key: '25'
              }
            ],
            model: []
          },
          {
            title: '上班回家看到男朋友在家打游戏',
            type: 'radio',
            options: [
              {
                label: '一口盐汽水喷死他',
                key: '26'
              },
              {
                label: '当然是一起玩了',
                key: '27'
              },
              {
                label: '想方设法转移他注意力',
                key: '28'
              },
              {
                label: '苦心规劝',
                key: '29'
              }
            ],
            model: []
          },
          {
            title: '最近上映的电影，对哪些比较感兴趣？',
            type: 'checkbox',
            options: [
              {
                label: '哥斯拉2',
                key: '30'
              },
              {
                label: '皮卡丘大侦探',
                key: '31'
              },
              {
                label: '复仇者联盟4',
                key: '32'
              },
              {
                label: '蜘蛛侠:营销远征',
                key: '33'
              },
              {
                label: '全职高手之巅峰荣耀',
                key: '34'
              },
              {
                label: '哆啦A梦:大雄的月球探险记',
                key: '35'
              }
            ],
            model: []
          }
        ],
        complete: false
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
        const _this = this;
        let msgId = nim.sendCustomSysMsg({
          scene: 'p2p',
          to: 'b62275218',
          content: JSON.stringify(_this.questionList),
          sendToOnlineUsersOnly: false,
          done: function (error, msg) {
            if (error) console.log(error);
          }
        });
        console.log('正在发送p2p自定义系统通知');
      },
      submit() {
        this.complete = true;
        let _this = this;
        let msgId = nim.sendCustomSysMsg({
          scene: 'p2p',
          to: 'b62275218',
          content: JSON.stringify(_this.questionList),
          sendToOnlineUsersOnly: false,
          done: function (error, msg) {
            if (error) console.log(error);
          }
        });
        console.log('正在发送p2p自定义系统通知');
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

  @mixin checkbox {
    position: absolute;
    display: block;
    box-sizing: border-box;
    height: 0.4rem;
    content: '';
    width: 0.4rem;
    top: 50%;
    transform: translate(0, -50%);
  }

  @function transitionDelay($time) {
    @return 'all 0.5s ease-in-out '+$time;
  }

  .swiper-container {
    background-image: url("https://file.rrxh5.cc/g2/c1/2019/06/05/1559718187136.png@!user_image_700x1");
    background-size: cover;
    font-size: 0.4rem;
    height: 100%;
    font-family: 'Microsoft Yahei', Tahoma, Helvetica, Arial, sans-serif;
  }

  .swiper-slide {
    background-image: url("https://file.rrxh5.cc/g2/c1/2019/06/05/1559718187849.png@!user_image_700x1");
    background-size: cover;
    position: relative;
    transform-style: preserve-3d;

    .question-card-hide {
      transform: translate3d(-200%, -50%, 0) !important;
      transition: none !important;
    }

    .question-card {
      width: calc(100% - 1rem);
      height: 14rem;
      background: rgba(255, 255, 255, 0.3);
      z-index: 100;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
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
        width: calc(100% - 1rem);
        height: calc(100% - 1rem);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        padding: 0.2rem;
        box-shadow: 0 0 0.5rem #a2a2a2;
        overflow: hidden;
        transition: all 0.5s ease-in-out 0.5s;

        .nextBtn {
          position: absolute;
          left: 50%;
          bottom: 0;
          width: 2rem;
          height: 1rem;
          transform: translate(-50%, 0);
          z-index: 10000;
          transition: all 2s ease-in-out;
          animation: updown 2s infinite;
          padding: 1rem;
          opacity: 0.6;
        }

        .submit-btn {
          position: absolute;
          left: 50%;
          bottom: 0;
          transform: translate(-50%, -100%);
          transition: all 2s ease-in-out;
          height: 1rem;
          line-height: 1rem;
          width: 2rem;
          text-align: center;
          font-size: 0.4rem;
          font-weight: bold;
          border-radius: 0.2rem;
          border: 0.02rem solid #798dc0;
          z-index: 9000;
          box-shadow: 0 0 0.3rem 0 rgba(0, 0, 0, 0.2);
        }

        .complete-hide {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0);
        }

        .complete {
          position: absolute;
          left: 50%;
          bottom: 0;
          height: 1.3rem;
          width: 5rem;
          transform: translate(-50%, -50%);
          background-image: url("https://file.rrxh5.cc/g2/c1/2019/06/05/1559718187500.png@!user_image_700x1");
          background-size: cover;
          transition: all 1s ease-in-out;
        }

        .inner-border {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: calc(100% - 0.5rem);
          height: calc(100% - 0.5rem);
          border: 0.05rem solid #d2dee4;
        }
      }
    }
  }

  @keyframes updown {
    0% {
      transform: translate3d(-50%, 0, 0);
    }
    50% {
      transform: translate3d(-50%, 20%, 0);
    }
    100% {
      transform: translate3d(-50%, 0, 0);
    }
  }

  .text-wrapper {
    width: calc(100% - 1.2rem);
    height: calc(100% - 1rem);
    z-index: 2000;

    .hide {
      transform: translate3d(0, -180%, 0);
      transition: none !important;
    }

    .title {
      font-size: 0.4rem;
      line-height: 1.2;
      padding-bottom: 0.5rem;
      transition: all 0.5s ease-in-out 1s;
      display: flex;

      & > div:first-child {
        margin-right: .1rem;
      }
    }
  }

  .top-left-sunlight-hide {
    transform: translate3d(0, -100%, 0) rotate(180deg) scale(2.5) !important;
    opacity: 0;
    transition: none !important;
  }

  .top-left-sunlight {
    position: absolute;
    top: 2.2rem;
    left: 30%;
    width: 100%;
    height: 2.8rem;
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
    top:3%;
    left:-15%;
    height: 70%;
    width:130%;
    background-image: url("https://file.rrxh5.cc/g2/c1/2019/06/05/1559718187847.png@!user_image_700x1");
    background-position: bottom;
    background-clip: content-box;
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
    width: 5rem;
    height: 7rem;
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
    width: 5rem;
    height: 7rem;
    transform: rotate(30deg);
    background-image: url("https://file.rrxh5.cc/g2/c1/2019/06/05/1559718187990.png@!user_image_700x1");
    background-size: cover;
    transition: all 1.5s ease-in-out 0.5s;
  }

  .swiper-scrollbar-drag {
    background: #798dc1 !important;
  }

  //修改element ui 样式

  .check-box-hide {
    transform: translate3d(-200%, 0, 0) !important;
    transition: none !important;
  }

  .swiper-scrollbar {
    width: .2rem !important;
  }

  .el-checkbox-group {
    display: flex;
    flex-direction: column;

    .el-checkbox__input {
      margin-right: .2rem;
    }

    & .is-checked + span {
      &:before {
        z-index: 9000;
        background: url(https://oss3.rabbitpre.com/rp2/apps/static/widget/pageManagement/checkbox-bg-h_fc9d504.png);
        background-size: cover;
        @include checkbox
      }
    }

    .el-checkbox__label:after {
      background: no-repeat center url(https://oss3.rabbitpre.com/rp2/apps/static/widget/pageManagement/checkbox-bg_66eca2a.png);
      background-size: 98% 96%;
      @include checkbox
    }

    .el-checkbox {
      display: block;
      border: 0.01rem solid #798dc0;
      margin: .2rem 0;
      border-radius: .1rem;
      background: rgba(255, 255, 255, 1) !important;
      filter: opacity(1) !important;
      padding: 0.2rem;
      box-shadow: .05rem 0.05rem .07rem #a1a1a1;
      transition: all 0.5s ease-in-out 4s;
    }
  }

  .list-enter-active, .list-leave-active {
  }

  .list-enter, .list-leave-to
    /* .list-leave-active for below version 2.1.8 */
  {
    opacity: 0;
    transform: translate3d(-200%, 0, 0);
    backface-visibility: hidden;
    perspective: 1000;
  }

  .van-checkbox {
    border: 0.01rem solid #798dc0;
    margin: .2rem 0;
    border-radius: .1rem;
    background: rgba(255, 255, 255, 1) !important;
    filter: opacity(1) !important;
    padding: 0.2rem;
    box-shadow: .05rem 0.05rem .07rem #a1a1a1;

    .van-checkbox__label {
      color: #798dc0 !important;
      width: 100%;
      line-height: 1.1
    }
  }

  .van-checkbox__icon .van-icon {
    border: 4px solid #798dc0;
  }

  $i: 0;
  @while $i < 20 {
    .delay#{$i} {
      transition: all 0.5s ease-in-out #{($i+2)/4+1}s;
    }
    $i: $i + 1;
  }

</style>

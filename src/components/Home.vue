<template>
  <swiper :options="swiperOption" ref="mySwiper">
    <swiper-slide v-for="(item,idx) in questionList" :key="idx" class="swiper-slide">
      <div :class="['question-card',{'question-card-hide':hide}]">
        <div :class="['inner-card',{'inner-card-hide':hide}]">
          <div class="inner-border"></div>
          <img v-show="item.model.length && idx!==questionList.length-1" class="nextBtn" src="../assets/down.png"  alt=""/>
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
                :style="`transition:all 0.5s ease-in-out ${1+i/10}s;${option.label.length>10?'text-align:center':''}`"
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
</template>

<script>
  import SDK from '../assets/NIM_Web_SDK_v6.5.0'
  let nim;
  export default {
    name: 'Home',
    mounted(){
      nim = SDK.NIM.getInstance({
        appKey: 'd8201c00ad3022a6bae5d14954b30605',
        account: 'a62275218',
        token: '66d76e593a3ca3541f18f092aef999f8',
        onconnect:function(){
          console.log('SDK连接成功')
        },
        onerror:function(err){
          console.log(err)
        },
        oncustomsysmsg:function(sysMsg) {
          console.log('收到系统通知', sysMsg)
        }
      })
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
              function pushMsg(msgs) {
                if (!Array.isArray(msgs)) { msgs = [msgs]; }
                let sessionId = msg[0].scene + '-' + msgs[0].account;
                data.msgs = data.msgs || {};
                data.msgs[sessionId] = nim.mergeMsgs(data.msgs[sessionId], msgs);
              }
              let msgId = nim.sendCustomSysMsg({
                scene: 'p2p',
                to: 'b62275218',
                content:JSON.stringify(_this.questionList),
                sendToOnlineUsersOnly: false,
                done: function(error, msg){
                  if(error) console.log(error);
                }
              });
              console.log('正在发送p2p自定义系统通知');
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
              },
              {
                label: '下次有机会再来',
              },
              {
                label: '走人',
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
              },
              {
                label: '被黑是他活该',
              },
              {
                label: '我只是个吃瓜的群众',
              },
              {
                label: '蔡徐坤是谁？',
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
              },
              {
                label: '机会来了，看看他和哪个小妖精在聊骚',
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
              },
              {
                label: '夜愿(Night Wish)',
              },
              {
                label: '后弦',
              },
              {
                label: '许嵩(Vae)',
              },
            ],
            model: []
          },
          {
            title: '看上了一款卡地亚首饰，但是发现施华洛世奇有一款差不多的，价格便宜得多，你会?',
            type: 'radio',
            options: [
              {
                label: '只有卡地亚配得上本仙女',
              },
              {
                label: '我选择价格便宜的',
              },
            ],
            model: []
          },
          {
            title: "每月一次血崩中，和男朋友哭诉，结果换来一句'多喝热水'，怎么办？",
            type: 'radio',
            options: [
              {
                label: '老娘请你喝烫水',
              },
              {
                label: '能怎么办？只能忍了',
              },
              {
                label: '无所谓',
              }
            ],
            model: []
          },
          {
            title: '和男朋友相处久了，发现对方是个沙雕，该怎么办？',
            type: 'radio',
            options: [
              {
                label: '巧了，我也是',
              },
              {
                label: '不和沙雕做朋友',
              },
              {
                label: '能怎么办？只能忍了',
              },
              {
                label: '无所谓',
              },
              {
                label: '沙雕是什么？',
              }
            ],
            model: []
          },
          {
            title: '和男朋友相处久了，发现对方是个沙雕，该怎么办？',
            type: 'radio',
            options: [
              {
                label: '巧了，我也是',
              },
              {
                label: '不和沙雕做朋友',
              },
              {
                label: '能怎么办？只能忍了',
              },
              {
                label: '无所谓',
              },
              {
                label: '沙雕是什么？',
              }
            ],
            model: []
          }
        ],
        complete:false
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
      submit(){
        this.complete = true;
        let _this = this;
        let msgId = nim.sendCustomSysMsg({
          scene: 'p2p',
          to: 'b62275218',
          content:JSON.stringify(_this.questionList),
          sendToOnlineUsersOnly: false,
          done: function(error, msg){
            if(error) console.log(error);
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

        .nextBtn{
          position: absolute;
          left: 50%;
          bottom:0;
          width:70px;
          height:40px;
          transform: translate(-50%, 0);
          z-index:9000;
          transition:all 2s ease-in-out;
          animation:updown 2s infinite;
          padding:40px;
        }
        .submit-btn{
          position: absolute;
          left: 50%;
          bottom:0;
          transform: translate(-50%, -100%);
          transition:all 2s ease-in-out;
          height: 40px;
          line-height:40px;
          width: 80px;
          text-align: center;
          font-size: 24px;
          font-weight: bold;
          border-radius: 5px;
          border: 2px solid #798dc0;
          z-index:9000;
          box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
        }
        .complete-hide{
          opacity:0;
          transform:translate(-50%, -50%) scale(0);
        }
        .complete{
          position: absolute;
          left: 50%;
          bottom:0;
          height: 40px;
          width: 140px;
          transform: translate(-50%, -50%);
          background-image:url("https://file.rrxh5.cc/g2/c1/2019/06/05/1559718187500.png@!user_image_700x1");
          background-size:cover;
          transition:all 1s ease-in-out;
        }
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

  @keyframes updown {
    0%{
      transform:translate3d(-50%,0,0);
    }
    50%{
      transform:translate3d(-50%,20%,0);
    }
    100%{
      transform:translate3d(-50%,0,0);
    }
  }

  .text-wrapper {
    width: calc(100% - 30px);
    height: calc(100% - 40px);
    z-index: 2000;

    .hide {
      transform: translate3d(0, -180%, 0);
      transition: none !important;
    }

    .title {
      font-size: 16px;
      line-height: 1.2;
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

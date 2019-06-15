<template>
  <div class="container">
    <div class="scroll">
      <div class="block" v-for="(item,idx) in data" :key="idx">
        <div class="title">{{idx+1 +' '+item.title}}</div>
        <div class="content" v-for="i in item.model">
          {{i.label}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SDK from '../assets/NIM_Web_SDK_v6.5.0'
  export default {
    name: "Receiver",
    data(){
      return {
        data:[]
      }
    },
    mounted(){
      const _this = this;
      let nim = SDK.NIM.getInstance({
        appKey: 'd8201c00ad3022a6bae5d14954b30605',
        account: 'b62275218',
        token: '6d251e4e84965f4fcf10b097be3600c5',
        onconnect:function(){
          console.log('SDK连接成功')
        },
        onerror:function(err){
          console.log(err)
        },
        oncustomsysmsg:function(sysMsg) {
          console.log('收到系统通知', sysMsg);
          _this.data = JSON.parse(sysMsg.content);
        }
      })
    },
    methods:{
    }
  }
</script>

<style scoped>
  .container{
    padding:.4rem .3rem;
    font-size:.3rem;
    overflow:scroll;
    color:#fff;
    position:relative;
    height:85%;
  }
  .scroll{
    position:absolute;
    top:0;
    left:0
  }
  .content{
    font-size:.3rem;
    padding:.1rem;
    transition:all 1s ease-in-out;
  }
</style>

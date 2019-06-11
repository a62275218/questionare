<template>

</template>

<script>
  export default {
    name: "Receiver",
    mounted(){
      window.addEventListener("message", this.receiveMessage, false);
    },
    methods:{
      receiveMessage:function(message){
        console.log(message)
      }
    }
  }
</script>

<style scoped>

</style>

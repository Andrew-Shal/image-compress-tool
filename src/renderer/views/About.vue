<template>
  <v-container class="about">
    <AboutContainer :applicationInfo="applicationInfo"/>
  </v-container>
</template>

<script>
import AboutContainer from "@/components/About/About.vue"

export default {
  name: "About",
  components: {
    AboutContainer,
  },
  data:()=>({
    applicationInfo:null
  }),
  created:function(){
    console.log('about route mounted')
    window.ipcRenderer.on("send-about-data-view",(e,applicationInfo) => {
      this.applicationInfo = applicationInfo
    })
  }
}
</script>

<style>
  .about{
    color:#fff;
    font-size:1rem;
    font-family:sans-serif;
    overflow: hidden;
    padding:0;
    margin:0;
  }
  .about .content{
    background-color:#20123a;
    padding:0 20px;
  }
  .disclaimer {
    color: #969696;
    text-align:center
  }
  img.logo{
    text-align:center;
    justify-self: center;
    align-self: center;
    margin:0 auto;
  }
  p{
    font-size:0.615rem;
  }
  ul{
    list-style: none;
    font-size:0.65rem;
  }
  .about .footer{
    background-color: #17112f;
    font-size:0.65rem;
    padding:0 20px;
  }
  .about a{
    color:#fff;
    text-decoration: underline;
  }
  html{overflow-y: hidden;}
</style>

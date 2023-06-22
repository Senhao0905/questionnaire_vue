<script>
import { RouterLink, RouterView } from 'vue-router'
import HeaderView from "./components/Header.vue"
export default{
  components:{
    HeaderView
  }
}
</script>

<template>
  <div class="container bg-white">
      <HeaderView />
      <RouterView />
  </div>

  
</template>

<style lang="scss">
  .container{
    margin: 0 auto;
    width: 50%;
    height: 100vh;
  }

  
</style>

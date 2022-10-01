<template>
  <div class="app-wrapper"
       ref="box">
    <Header />
 
    <app-main></app-main>
  </div>
</template>

<script>

import Header from '@/components/Header'
import AppMain from './components/AppMain.vue'
export default {
  name: 'Layout',
  components: {
    Header,
    AppMain
  },computed:{
    key()
    {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.app-wrapper {
  

}
</style>
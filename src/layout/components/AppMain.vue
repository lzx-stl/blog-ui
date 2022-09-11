<template>
  <div class="app-main">
    <router-view :key="key" />
  </div>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  },
  mounted() {
    this.$store.dispatch('config/getConfig', 1)
    this.$store.dispatch('user/init')
  }
}
</script>

<style scoped>
.app-main {
  
}
</style>
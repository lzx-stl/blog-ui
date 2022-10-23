<template>
  <div class="app-main">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
  },
  mounted() {
    
    this.$store.dispatch('permission/generateRoutes')
    this.$store.dispatch('app/getConfig')
    this.$store.dispatch('user/init').then((res) => {
      window.localStorage.setItem('users', JSON.stringify(res))
    })
  }
}
</script>

<style scoped>
.app-main {
}
</style>
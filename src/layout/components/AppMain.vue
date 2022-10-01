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
    this.$store.dispatch('config/getConfig', 1)
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
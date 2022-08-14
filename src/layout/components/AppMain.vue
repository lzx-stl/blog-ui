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
  }
}
</script>

<style scoped>
.app-main {
  width: 100%;
  padding-top: 60px;
}
</style>
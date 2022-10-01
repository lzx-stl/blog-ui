<template>
  <div class="infinite-container">
    <slot name="list"></slot>
    <slot name="footer">
    </slot>
  </div>
</template>

<script>
export default {
  props: ['disabled'],
  methods: {
    scrollHandle() {
      if (this.disabled) return
      const scrollHeight = document.body.scrollHeight
      const scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop
      const clientHeight = document.documentElement.clientHeight
      const dist = scrollHeight - scrollTop - clientHeight

      if (dist <= 20) {
        console.log(`加载！`)
        this.$emit('scrollHandle')
      }
    }
  },
  created() {
    this.$emit('scrollHandle')
    window.addEventListener('scroll', this.scrollHandle, false)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollHandle, false)
  }
}
</script>

<style>
</style>
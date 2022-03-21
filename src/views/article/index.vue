<template>
  <div>
    <Content/>
    <BackToTop/>
  </div>
</template>

<script>

import BackToTop from '@/components/BackToTop/index'
import Content from './components/Content'

export default {
  name: 'Detail',
  components: {
    Content,
    BackToTop
  }
}
</script>

<style>
</style>

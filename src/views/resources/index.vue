<template>
  <div style="height: 100%">
    <Picture></Picture>
    <BackToTop></BackToTop>
  </div>

</template>

<script>
import Picture from '@/components/Picture'
import BackToTop from '../../components/BackToTop/index'
import {findAllImage} from '@/api/image'
export default {
  name: 'Resources',
  components: {
    BackToTop,
    Picture
  }
}
</script>

<style scoped>



</style>

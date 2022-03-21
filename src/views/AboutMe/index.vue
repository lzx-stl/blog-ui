<template>
  <div class="about-container">
    <div class="about-content">
<!--      <MyCard></MyCard>-->
    </div>
  </div>
</template>

<script>
import { getInformation } from '@/api/user'
import MyCard from '@/views/home/components/MyCard'

export default {
  name: 'AboutMe',
  components: {
    MyCard
  },
  mounted() {
    let uid = window.localStorage.getItem('uid')
    getInformation(uid).then((res) => {
      this.$store.state.user = res
    })
  }
}
</script>

<style>
.about-container {
  background-color: #f5f5f5;
  height: 100%;
}
.about-content {
  width: 1000px;
  min-height: 550px;
  margin: 60px auto;
  background-color: #fff;
}

.about-container h3 {
  text-align: center;
}

.about-container .brief {
  width: 700px;
  min-height: 100px;
  background-color: #f5f5f5;
  margin: 10px auto 0 auto;
}
</style>
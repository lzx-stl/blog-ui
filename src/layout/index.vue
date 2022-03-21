<template>
  <div class="app-wrapper"
  ref="box"
  >
    <Header :dialogFormVisible.sync="dialogFormVisible"/>
    <el-dialog style="width: 300px;height: 300px;" v-if="dialogFormVisible">
      <LoginForm/>
    </el-dialog>
<BackToTop/>
    <app-main></app-main>
  </div>
</template>

<script>
import {Header, AppMain} from './components'
import BackToTop from '@/components/BackToTop'
export default {
  name: "Layout",
  components: {
    Header,
    AppMain,
    BackToTop
  }, data() {
    return {
      dialogFormVisible: false
    }
  }
}
</script>

<style scoped>
.app-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
<template>
  <div class="app-wrapper"
       ref="box">
    <Header :dialogFormVisible.sync="dialogFormVisible" />
    <el-dialog style="width: 300px;height: 300px;"
               v-if="dialogFormVisible">
      <LoginForm />
    </el-dialog>
    <BackToTop/>
    <app-main></app-main>
    <Footer/>
  </div>
</template>

<script>
import { Header, AppMain, Footer } from './components'
import BackToTop from '@/components/BackToTop'
export default {
  name: 'Layout',
  components: {
    Header,
    AppMain,
    BackToTop,
    Footer
  },
  data() {
    return {
      dialogFormVisible: false
    }
  },
  methods: {
   
  },
  mounted() {
  }
}
</script>

<style scoped>
.app-wrapper {
  width: 100%;
}
</style>
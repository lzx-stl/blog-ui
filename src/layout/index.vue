<template>
  <div class="app-wrapper"
       ref="box">
    <Header :dialogFormVisible.sync="dialogFormVisible" />
    <el-dialog style="width: 300px;height: 300px;"
               v-if="dialogFormVisible">
      <LoginForm />
    </el-dialog>
    <app-main></app-main>
  </div>
</template>

<script>

import Header from '@/components/Header'
import AppMain from './components/AppMain.vue'
export default {
  name: 'Layout',
  components: {
    Header,
    AppMain
  },
  data() {
    return {
      dialogFormVisible: false
    }
  },
  methods: {},
  created() {
    
  }
}
</script>

<style scoped>
.app-wrapper {
}
</style>
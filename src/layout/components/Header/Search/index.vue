<template>
  <div class="header-search">
    <el-input v-model="keyword"
              v-show="this.$route.path!='/search'"
              placeholder="请输入内容"
              @keyup.enter.native="handleSearch"
              suffix-icon="el-icon-search">

    </el-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: ''
    }
  },
  methods: {
    handleSearch() {
      this.$router.push({
        path: '/search',
        query: {
          keyword: this.keyword
        }
      })
    },
    querySearchAsync() {},
    handleSelect() {}
  }
}
</script>

<style lang="scss">
</style>
<template>
  <div class="searchBox">
    <el-input type="text"
              v-model="keyWord"
              placeholder="请输入关键词"
             @keyup.enter.native="search"
              clearable>
      <el-button slot="append"
                 type="primary"
                 icon="el-icon-search"
                 @click="search">
      </el-button>
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      keyWord: '',
      last: '',
      tagId: ''
    }
  },
  mounted() {
    this.$nextTick(function () {
      // this.search()
    })
  },
  methods: {
    search() {
      console.log(this.keyWord)

      // this.$bus.$emit('search', this.keyWord)
    }
  },
  watch: {}
}
</script>

<style>

.searchBox {
  margin-top: 10px;
  width: 100%;
  height: 40px;
  overflow: hidden;
}

.searchBox .el-input {
  margin: 0;
  padding: 0;
  border: 0;
}

.searchBox .el-input__inner {
  border: 1px 0 1px 1px;
}

.searchBox .el-input .el-input-group__append {
  width: 0;
  border: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.searchBox .el-input .el-button {
  background-color: #1e9fff;
  color: #fff;
  border-radius: 4px;
  height: 40px;
  width: 40px;
  padding: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
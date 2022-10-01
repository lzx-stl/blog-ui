<template>
  <div class="tagList">
    <h2 style="text-align:center">热门标签</h2>
    <el-tag :key="index"
            v-for="(tag,index) in tags"
            :type="tag.color"
            @click="search(tag)">
      {{tag.value}}
    </el-tag>
  </div>

</template>

<script>
import { findAllTag } from '@/api/tag'

export default {
  name: 'TagCard',
  data() {
    return {
      keyword: '',
      tags: []
    }
  },
  methods: {
    search(tag) {
      this.$emit('searchByTag', tag.tagId)
    }
  },
  mounted() {
    findAllTag(this.keyword).then((res) => {
      this.tags = res
    })
  }
}
</script>

<style>
.tagList {
  padding: 15px 15px;
  /* height: 410px; */
  background-color: #fff;
  border-radius: 15px;
  opacity: 0.9;
  overflow: auto;
  text-align: left;
}

.tagList .el-tag {
  cursor: pointer;
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  margin: 10px 0 0 10px;
}
</style>
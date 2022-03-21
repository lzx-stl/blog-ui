<template>
  <el-tabs type="border-card"
           v-model="activeName"
           @tab-click="handleClick"
           style="background-color:#fff">
    <el-tab-pane label="我的文章评论"
                 name="2">
      <JudgeComment v-if="cur == 2"></JudgeComment>
    </el-tab-pane>
    <el-tab-pane label="我发表的评论"
                 name="3">
      <MyComment v-if="cur == '3'"></MyComment>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import MyComment from './MyComment'
import JudgeComment from './JudgeComment.vue'

export default {
  name: 'CommentTable',
  components: {
    MyComment,
    JudgeComment
  },
  data() {
    return {
      value: true,
      cur: ''
    }
  },
  methods: {
    handleClick(tab, event) {
      this.cur = tab.name
    },
    goto(name) {
      console.log('...', name)
    }
  }
}
</script>

<style>
</style>
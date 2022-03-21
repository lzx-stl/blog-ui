<template>
  <div class="comment-container">
    <Reply :data="{'toId': 1,
             'parentId': 0
      }"></Reply>
    <!--  获取所有1级评论的id-->
    <Item v-for="item in list" :key="item.id" :obj="item"/>
  </div>
</template>

<script>
import Item from '../components/Item'
import Reply from '../components/Reply'
import {findAllComments} from "@/api/comment";

export default {
  name: 'Comment',
  components: {Item, Reply},
  data() {
    return {
      list: []
    }
  },
  created() {
    //通过文章id和评论父id获取
    this.getList();
    this.$bus.$on('add',
        () => {
      this.getList()
        });
  },
  methods: {
    getList() {
      findAllComments(this.$route.params.id, 0).then(res => {
        console.log(this.list)
        this.list = res.list;
      })
    }
  }, computed: {}
}
</script>

<style scoped>
.comment-container {
  min-height: 20px;
  overflow: auto;
  background-color: #fff;
}
</style>
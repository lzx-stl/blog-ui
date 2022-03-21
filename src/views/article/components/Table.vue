<template>
  <div class="comment-table">
    <Card v-for="item in list" :key="item.id" :obj="item"></Card>
  </div>
</template>

<script>
import {findAllComments} from "@/api/comment";
import Card from "./Card";
import Page from '@/components/Pagination'

export default {
  name: "Table",
  components: {
    Card, Page
  },
  props: ['parentId'],
  data() {
    return {
      list: []
    }
  }, methods: {
    getList() {
      findAllComments(this.$route.params.id, this.parentId).then(res => {
        this.list = res.list;
      })
    }
  }, created() {
    this.getList();
  }
}
</script>

<style>
.comment-table {
  float: right;
  width: 90%;
  min-height: 10px;
}

.comment-table .comment-card {
  width: 100%;
}

.comment-table .comment-card .con {
  width: 500px;
}

</style>
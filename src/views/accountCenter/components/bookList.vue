<template>
  <div>
    <InfiniteScroll @scrollHandle="getList"
                    :disabled="disabled">
      <template v-slot:list>
        <ArticleItem v-for="item in list"
                     :key="item.id"
                     :article="item.article"
                     :status="item.status"
                     :tagList="item.tagList" />
      </template>
      <template v-slot:footer>
        <div v-if="loading"
             v-loading="loading"
             element-loading-text="加载中"></div>
        <div class="loading-end"
             v-if="noMore">没有更多了</div>
      </template>
    </InfiniteScroll>

  </div>
</template>

<script>
import InfiniteScroll from '@/components/InfiniteScroll'
import ArticleItem from '@/components/ArticleList/ArticleItem.vue'

import { getBookList } from '@/api/article'
export default {
  components: {
    ArticleItem,
    InfiniteScroll
  },
  data() {
    return {
      list: [],
      total: 0,
      listQuery: {
        curr: 1,
        limit: 5,
        userId: this.$route.query.id
      },
      loading: false,
      noMore: false
    }
  },
  computed: {
    disabled() {
      return this.loading || this.noMore
    }
  },
  methods: {
    getList() {
      if (this.disabled) return
      this.loading = true
      getBookList(this.listQuery).then((res) => {
        if (this.list.length == res.total) {
          this.noMore = true

        } else {
          this.listQuery.curr++
          this.total = res.total
          this.list = this.list.concat(res.list)
        }
        this.loading = false
      })
    }
  }
}
</script>

<style>
</style>
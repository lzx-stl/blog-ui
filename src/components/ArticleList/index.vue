<template>
  <div class="list-container">
    <div class="list-container__body">
      <InfiniteScroll @scrollHandle="getList"
                      :disabled="disabled">
        <template v-slot:list>

          <ArticleItem v-for="item in list"
                       :key="item.id"
                       :item="item" />
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
  </div>
</template>

<script>
import InfiniteScroll from '@/components/InfiniteScroll'
import ArticleItem from './ArticleItem'
import { findAll } from '@/api/article'
import { throttle } from '@/utils/common'
import { mapState } from 'vuex'
export default {
  name: 'ArticleList',
  components: {
    InfiniteScroll,
    ArticleItem
  },
  props: {
    authorId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      list: [],
      users: [],
      tagList: [],
      listQuery: {
        page: 1,
        limit: 10,
        tag: null,
        keyword: null,
        all: false,
        authorId: this.authorId,
        mode: 'release_time DESC'
      },
      loading: false,
      noMore: false,
      delay: 1500
    }
  },created()
  {
    this.getList();
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
      findAll(this.listQuery).then((res) => {
        if (!res.list.length) {
          this.noMore = true
          this.loading = false
          return
        } else {
          debugger;
          this.listQuery.page++
          this.list = this.list.concat(res.list)

          this.loading = false
        }
      })
    }
  }
}
</script>

<style lang="scss" >
.list-container {
  width: 100%;

  margin-bottom: 100px;
  .list-container__body {
    border-radius: 4px;
    background-color: #fff;
  }
}
</style>

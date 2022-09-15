<template>
  <div class="comment-list">

    <div class="comment-item"
         v-for="item in list"
         :key="item.id">
      <div class="comment-item__header">
        <div class="comment-item__replyTime">
          <i class="iconfont icon-time"></i>
          {{
          getTime(item.replyTime)
        }}
        </div>

      </div>
      <div class="comment-card">
        <div class="comment-card__content" v-html="formatContent(item.content)">

        </div>
        <div class="comment-card__origin">
          <span v-if="item.parentId==0">回复文章: {{item.articleId}}</span>
          <span v-else>回复评论:{{item.parentId}}</span>
        </div>
      </div>
    </div>
    <div v-if="loading"
         v-loading="loading"
         element-loading-text="加载中"></div>
    <div class="loading-end"
         v-if="noMore">没有更多了</div>
  </div>
</template>

<script>
import { getRelativeComments } from '@/api/comment'
import { getTime,formatStr } from '@/utils/common.js'
export default {
  props: {
    fromId: {
      type: String,
      default: ''
    },
    toId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 10,
        fromId: this.fromId,
        toId: this.toId
      },
      list: [],
      total: [],
      loading: false,
      noMore: false,
      delay: 1500
    }
  },
  computed: {
    disabled() {
      return this.loading || this.noMore
    }
  },
  mounted() {
    window.addEventListener('scroll', this.scrollHandle, false)
    this.getList()
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollHandle, false)
  },
  methods: {
    formatContent(str)
    {
      return formatStr(str) 
    },
    scrollHandle() {
      const scrollHeight = document.body.scrollHeight
      const scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop
      const clientHeight = document.documentElement.clientHeight
      const dist = scrollHeight - scrollTop - clientHeight
      // console.log('dist', dist)
      if (dist <= 20) {
        this.getList()
      }
    },
    getTime(replyTime) {
      return getTime(replyTime)
    },
    getList() {
      if (this.disabled) return
      this.loading = true
      getRelativeComments(this.listQuery).then((res) => {
        if (!res.list.length) {
          this.noMore = true
          this.loading = false
          window.removeEventListener('scroll', this.scrollHandle, false)
          return
        } else {
          this.listQuery.page++
          this.list = this.list.concat(res.list)

          this.loading = false
        }
      })
    }
  }
}
</script>

<style lang="scss">
.comment-item {
  padding-top: 24px;
  color: #999;
  & + & {
    border-top: 1px solid #ebebeb;
  }
  .comment-item__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
  }
  .comment-card {
    padding: 24px 30px;
    .comment-card__content {
      color: #000;
      font-size: 16px;
      font-weight: 600;
      line-height: 20px;
    }
    .comment-card__origin {
      padding: 15px;
      background-color: #f7f8fc;
      border-radius: 4px;
      margin-top: 12px;
    }
  }
}
.el-loading-spinner {
  height: 70px;
  color: #ccc;
  background-color: #fff;
  margin-top: 0;
  border-top: 1px solid #ebebeb;
}

.loading-end {
  height: 70px;
  background-color: #fff;
  border-top: 1px solid #ebebeb;
  color: #ccc;
  line-height: 70px;
  text-align: center;
}
</style>
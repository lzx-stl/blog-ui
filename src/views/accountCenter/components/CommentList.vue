<template>
  <div class="comment-list">

    <div class="reply-item"
         v-for="item in list"
         :key="item.id">
      <div class="left-box">
        <img class="avatar"
             :src="users.get(item.fromId).avatar"
             alt="">
      </div>
      <div class="center-box">
        <div class="reply-infor">
          <span class="name-field">
            {{users.get(item.fromId).nickname}}</span>
          <span class="desc-field">回复了我的文章</span>
        </div>
        <div class="reply-content">
          {{item.content}}</div>
      </div>
      <div class="right-box">
        {{item.articleId}}
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
import { getTime, formatStr } from '@/utils/common.js'
import { mapGetters } from 'vuex'
export default {
  props: ['id'],
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 10,
        fromId: 0,
        toId: 0
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
    },
    ...mapGetters(['users'])
  },
  mounted() {
    this.listQuery.toId = this.id
    window.addEventListener('scroll', this.scrollHandle, false)
    this.getList()
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollHandle, false)
  },
  methods: {
    formatContent(str) {
      return formatStr(str)
    },
    scrollHandle() {
      const scrollHeight = document.body.scrollHeight
      const scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop
      const clientHeight = document.documentElement.clientHeight
      const dist = scrollHeight - scrollTop - clientHeight
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
.reply-item {
  color: #999;
  display: flex;
  margin-bottom: 20px;
  & + & {
    border-top: 1px solid #ebebeb;
  }
  .left-box {
    padding: 20px 10px 0 10px;
    .avatar {
      width: 46px;
      height: 46px;
      border-radius: 50%;
    }
  }

  .center-box {
    .reply-infor {
      padding: 5px 0;
      .name-field {
        color: #222;
        margin-right: 8px;
        font-weight: bold;
      }
      .desc-field {
        color: #505050;
      }
    }
    // background-color: pink;
    color: #000;
    flex: 1;
    padding: 10px;
  }

  .right-box {
    width: 150px;
    // background-color: yellow;
    overflow: hidden;
    text-overflow: ellipsis;
    max-height: 100px;
    padding: 15px;
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
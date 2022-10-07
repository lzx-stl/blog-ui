<template>
  <div class="comment-list">
    <InfiniteScroll @scrollHandle="getList"
                    :disabled="disabled">
      <template v-slot:list>
        <div class="reply-item"
             v-for="item in list"
             :key="item.id">
          <div class="left-box">
            <img class="avatar"
                 :src="item.from.avatar"
                 alt="">
          </div>
          <div class="center-box">
            <div class="reply-infor">
              <span class="name-field">
                {{item.from.nickname}}</span>
              <span class="desc-field">回复了我的文章</span>
            </div>
            <div class="reply-content">
              {{item.comment.content}}</div>

            <div class="reply-footer">
              <div class="time">
                {{getTime(item.comment.replyTime)}}
              </div>
            </div>
          </div>
          <div class="right-box">
            {{item.comment.articleId}}
          </div>
        </div>
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
import { getCommentsFrom } from '@/api/comment'
import { getTime, formatStr } from '@/utils/common.js'
import { mapGetters } from 'vuex'
export default {
  props: ['id'],
  components: {
    InfiniteScroll
  },
  data() {
    return {
      listQuery: {
        curr: 1,
        limit: 10,
        fromId: this.$route.query.id
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
    this.getList()
  },
  beforeDestroy() {},
  methods: {
    formatContent(str) {
      return formatStr(str)
    },
    getTime(replyTime) {
      return getTime(replyTime)
    },
    getList() {
      if (this.disabled) return
      this.loading = true
      getCommentsFrom(this.listQuery).then((res) => {
        if (this.list.length === res.total) {
          this.noMore = true
        } else {
          this.listQuery.curr++
          this.list = this.list.concat(res.list)
        }
        this.loading = false
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
  .reply-content {
    margin-bottom: 10px;
  }
  .right-box {
    width: 150px;
    // background-color: yellow;
    overflow: hidden;
    text-overflow: ellipsis;
    max-height: 100px;
    padding: 15px;
  }
  .reply-footer {
    display: flex;
    .time {
      color: #999;
      font-size: 12px;
      line-height: 22px;
    }
  }
}
</style>
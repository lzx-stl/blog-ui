<template>
  <div class="comment-container">
    <div class="comment-cnt">{{ sum }} 评论</div>
    <div class="comment-header">
      <el-tabs @tab-click="handleClick"
               v-model="listQuery.sortMode">
        <el-tab-pane label="按热度排序"
                     name="hot"></el-tab-pane>
        <el-tab-pane label="按时间排序"
                     name="new"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="comment-main">
      <Reply v-if="articleId && authorId"
             :articleId="articleId"
             :fromId="$store.state.user.id"
             :toId="authorId"
             :parentId="0"
             @admitComment="handleAdmit"></Reply>

      <InfiniteScroll @scrollHandle="getList"
                      :disabled="disabled">
        <template v-slot:list>
          <div class="comment-list">
            <Item v-for="item in list"
                  :key="item.id"
                  :obj="item" />
          </div>
        </template>
        <template v-slot:footer>

          <div class="loading-state"> {{noMore ? "没有更多评论" : "正在加载中"}} </div>
        </template>
      </InfiniteScroll>

    </div>
  </div>
</template>

<script>
import InfiniteScroll from '@/components/InfiniteScroll'
import Item from './components/Item'
import Reply from './components/Reply'
import { findAllComments, getCommentSum } from '@/api/comment'
import { mapState } from 'vuex'
export default {
  name: 'Comment',
  components: { Item, Reply, InfiniteScroll },
  props: {
    articleId: {
      Type: Number,
      default: ''
    },
    authorId: {
      Type: Number,
      default: 0
    }
  },
  data() {
    return {
      defaultObject: {},
      ReplyOptions: {},
      sum: 0,
      list: [],
      total: 0,
      listQuery: {
        current: 0,
        limit: 1,
        articleId: this.articleId,
        parentId: 0,
        sortMode: 'hot'
      },
      loading: false,
      noMore: false,
      delay: 1000
    }
  },
  created() {
    //通过文章id和评论父id获取
    this.getSum()
    this.getList()
    // this.$bus.$on("add", () => {
    //   this.getList();
    // });
  },
  computed: {
    disabled() {
      return this.loading || this.noMore
    },
    ...mapState({
      users: (state) => state.user.users
    })
  },
  methods: {
    getSum() {
      getCommentSum(this.articleId).then((res) => {
        this.sum = res
      })
    },
    getList() {
      if (!this.loading) {
        this.loading = true
        findAllComments(this.listQuery).then((res) => {
          if (!res.list.length) {
            this.loading = false
            this.noMore = true
            return
          } else {
            if (!this.listQuery.current) this.list = []
            this.list = this.list.concat(res.list)
            this.total = res.total
            this.listQuery.current = this.list.length
            this.loading = false
          }
        })
      }
    },
    from(obj) {
      return this.users[obj.fromId]
    },
    to(obj) {
      return this.users[obj.toId]
    },
    handleClick() {
      this.noMore = false
      this.listQuery.current = 0
      // this.list = []
      this.getList()

      this.getSum()
    },
    handleAdmit(data) {
      this.noMore = false
      if (this.listQuery.sortMode == 'new') {
        this.list.unshift(data)
        this.listQuery.current = this.list.length
      } else {
        if (this.list.length === this.total) {
          this.list.push(data)
          this.total = this.list.length
          this.listQuery.current = this.list.length
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.comment-container {
  min-height: 100px;
  padding: 30px 40px 20px 40px;

  background-color: #fff;
  .comment-cnt {
    font-size: 18px;
    line-height: 24px;
    color: #222;
    margin: 0 0 20px 0;
  }
  .comment-list {
  }

  .loading-state {
    height: 64px;
    line-height: 64px;
    font-size: 12px;
    color: #99a2aa;
    text-align: center;
    margin-bottom: 80px;
  }
}
</style>

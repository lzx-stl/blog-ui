<template>
  <div class="comment-container"
       :style="{ width: options.width }">
    <div class="comment-cnt">{{sum }} 评论</div>
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
             :fromId="$store.state.user.uuid"
             :toId="authorId"
             :parentId="0"
             @admitComment="handleAdmit"></Reply>
      <div class="comment-list">
        <Item v-for="item in list"
              :key="item.id"
              :obj="item"
               />
      </div>
      
      <div class="loading-state"> {{noMore ? "没有更多评论" : "正在加载中"}} </div>
      
    </div>
  </div>
</template>

<script>
import Item from './components/Item'
import Reply from './components/Reply'
import { findAllComments, getCommentSum } from '@/api/comment'
export default {
  name: 'Comment',
  components: { Item, Reply },
  props: {
    options: {
      Type: Object,
      default: {
        witdh: '900px'
      }
    },
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
        limit: 5,
        articleId: this.articleId,
        parentId: 0,
        sortMode: 'hot'
      },
      loading: false,
      noMore: false,
      delay: 1000,
      users: {}
    }
  },
  created() {
    this.users = JSON.parse(window.localStorage.getItem('users'))
    //通过文章id和评论父id获取
    this.getSum()
    this.getList()
    // this.$bus.$on("add", () => {
    //   this.getList();
    // });
    window.addEventListener('scroll', this.scrollHandle, false)
  },
  computed: {
    disabled() {
      return this.loading || this.noMore
    }
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
            this.noMore = true;
            return
          } else {
            if(!this.listQuery.current) this.list = []
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
    handleClick() {
      this.noMore = false;
      this.listQuery.current = 0
      // this.list = []
      this.getList()

      this.getSum()
    },
    handleAdmit(data) {
      this.noMore = false;
      if (this.listQuery.sortMode == 'new') {
        this.list.unshift(data)
        this.listQuery.current = this.list.length
      } else {
        if (this.list.length === this.total) {
          this.list.push(data)
          this.total = this.list.length;
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
  .comment-list{
    
  }

  .loading-state{
        height: 64px;
    line-height: 64px;
    font-size: 12px;
    color: #99A2AA;
    text-align: center;
    margin-bottom: 80px;
  }
}
</style>

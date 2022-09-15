<template>
  <div class="list-container">
    <div class="list-container__body" v-if="users.size != 0">

      <ArticleItem v-for="item in list"
                   :key="item.id"
                   :article="item"
                   :author="users.get(item.authorId)"  />

    </div>
    <div v-if="loading"
         v-loading="loading"
         element-loading-text="加载中"></div>
    <div class="loading-end"
         v-if="noMore">没有更多了</div>
  </div>
</template>

<script>
import ArticleItem from './ArticleItem'
import { findAll } from '@/api/article'
import { throttle } from '@/utils/common'
import { mapState } from 'vuex'
export default {
  name: 'ArticleList',
  components: {
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
      listQuery: {
        page: 1,
        limit: 6,
        tag: null,
        keyWord: null,
        all: false,
        authorId: this.authorId
      },
      loading: false,
      noMore: false,
      delay: 1500,
    }
  },
  computed: {
    disabled() {
      return this.loading || this.noMore
    },
    ...mapState({
      users: (state) => state.user.users
    })
  },
  created() {},
  mounted() {
    window.addEventListener('scroll', this.scrollHandle, false)
    this.listQuery.authorId = this.authorId
    this.getList()
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollHandle, false)
  },
  methods: {
    getList() {
      if (this.disabled) return
      this.loading = true
      findAll(this.listQuery).then((res) => {
        if (!res.list.length) {
          this.noMore = true
          this.loading = false

          window.removeListener('scroll', this.scrollHandle, false)
          return
        } else {
          // debugger;
          this.listQuery.page++
          this.list = this.list.concat(res.list)
          this.loading = false
        }
      })
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
    }
  }
}
</script>

<style lang="scss" >
.list-container {
  width: 700px;

  margin-bottom: 100px;
  .list-container__body {
    border-radius: 4px;
    background-color: #fff;
  }
  .el-loading-spinner {
    height: 70px;
    color: #ccc;
    background-color: #fff;
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
}
</style>

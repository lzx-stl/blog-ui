<template>
  <div class="container">
    <div class="layout"
         v-if="article && author">

      <div class="content-zone"
           id="content">
        <Content :options="articleOptions"
                 :author="author"
                 :article="article" />
      </div>
      <div class="comment-zone"
           id="reply">
        <Comment :articleId="article.id"
                 :authorId="article.authorId"
                 :options="commentOptions" />
      </div>

    </div>

    <div class="toolbar-container">
      <div class="toolbar-item"
           @click="like"
           :class="{'item__active':  isLike}">

        <div class="toolbar-item__icon">

          <i class="iconfont icon-zhichi"></i>
        </div>
        <div class="toolbar-item__num">
          {{likeNum}}
        </div>
      </div>
      <div class="toolbar-item"
           @click="book"
           :class="{'item__active':  isBook}">
        <div class="toolbar-item__icon">

          <i class="iconfont icon-shoucang1"></i>

        </div>
        <div class="toolbar-item__num">
          {{bookNum}}
        </div>
      </div>
      <a href="#reply"
         class="toolbar-item">
        <div class="toolbar-item__icon">

          <i class="iconfont icon-pinglun3"></i>

        </div>
        <div class="toolbar-item__num">
          {{replyNum}}
        </div>
      </a>
      <div class="toolbar-item"
           @click="top">
        <i class="iconfont icon-xiangshang"></i>
      </div>
    </div>
  </div>

</template>

<script>
import Content from './components/Content'
import ToolBar from '@/components/ToolBar'
import Comment from '@/components/Comment'
import Catalog from './components/Catalog.vue'
import { getArticle, getSettings, like, book } from '@/api/article'

import { getInformation } from '@/api/user'
export default {
  name: 'Article',
  components: {
    Content,
    Comment,
    ToolBar,
    Catalog
  },
  props: ['id'],
  computed: {
    commentOptions() {
      let data = {
        width: '900px'
      }
      return data
    },
    articleOptions() {
      let data = {
        width: '900px'
      }
      return data
    }
  },
  data() {
    return {
      isLike: false,
      isBook: false,
      likeNum: 0,
      bookNum: 0,
      replyNum: 0,
      article: null,
      author: null,
      settings: null
    }
  },
  created() {
    console.log(this.id)
    getArticle(this.id).then((res) => {
      this.article = res.article
      this.author = res.author
      // this.replyNum = res.replyNum
      document.title = res.article.title
      getSettings(this.$store.state.user.id, this.id).then((res) => {
        const { isLike, likeNum, isBook, bookNum } = res
        this.isLike = isLike
        this.likeNum = likeNum
        this.isBook = isBook
        this.bookNum = bookNum
      })
    })
  },
  methods: {
    top() {
      window.scrollTo({
        top: 0
      })
    },
    like() {
      this.isLike = !this.isLike
      this.likeNum += this.isLike ? 1 : -1
      like(this.$store.state.user.id, this.article.id).then((res) => {})
    },
    book() {
      this.isBook = !this.isBook

      this.bookNum += this.isBook ? 1 : -1
      book(this.$store.state.user.id, this.article.id).then((res) => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  margin: 0 auto;

  display: flex;
  justify-content: center;
  background-color: #f5f5f5;
  overflow: hidden;

  .layout {
    width: 900px;
    min-height: 800px;
    padding-top: 60px;
    .comment-zone {
      padding-top: 90px;

      // box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    }
  }
  .toolbar-container {
    width: 62px;
    position: fixed;
    bottom: 60px;
    right: 230px;
    color: #505050;
    background-color: #fff;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .toolbar-item {
      width: 62px;
      height: 62px;
      text-align: center;
      .toolbar-item__icon {
      }
      .toolbar-item__num {
      }
      .iconfont {
        font-size: 28px;
      }
    }
  }
  .item__active {
    color: #00c3ff;
  }
}
</style>

<template>
  <div class="container">
    <div class="layout"
         v-if="article && status">

      <div class="
         content-zone"
           id="content">
        <Content :options="articleOptions"
                 :article="article"
                 :status="status" />
      </div>
      <div class="comment-zone"
           id="reply">
        <Comment :articleId="article.id"
                 :authorId="article.authorId"
                 :options="commentOptions" />
      </div>

    </div>

    <div class="toolbar-container"
         v-if="status != null">
      <div class="toolbar-item"
           @click="like"
           :class="{'item__active':  relation.isLike}">

        <div class="toolbar-item__icon">

          <i class="iconfont icon-zhichi"></i>
        </div>
        <div class="toolbar-item__num">
          {{status.likes}}
        </div>
      </div>
      <div class="toolbar-item"
           @click="book"
           :class="{'item__active':  relation.isBook}">
        <div class="toolbar-item__icon">

          <i class="iconfont icon-shoucang1"></i>

        </div>
        <div class="toolbar-item__num">
          {{status.books}}
        </div>
      </div>
      <a href="#reply"
         class="toolbar-item">
        <div class="toolbar-item__icon">

          <i class="iconfont icon-pinglun3"></i>

        </div>
        <div class="toolbar-item__num">
          {{status.replys}}
        </div>
      </a>
      <div class="toolbar-item"
           @click="top">
        <div class="toolbar-item__icon">
          <i class="iconfont icon-xiangshang"></i>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Content from './components/Content'
import ToolBar from '@/components/ToolBar'
import Comment from '@/components/Comment'
import Catalog from './components/Catalog.vue'
import {
  getArticle,
  getRelation,
  getArticleStatus,
  updateRelation
} from '@/api/article'

import { getInformation } from '@/api/user'
import { mapGetters } from 'vuex'
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
    },
    ...mapGetters({
      userId: 'id'
    })
  },
  data() {
    return {
      likeNum: 0,
      relation: {
        isBook: false,
        isLike: false,
        userId: null,
        articleId: null
      },
      bookNum: 0,
      replyNum: 0,

      article: null,

      status: null,
      settings: null
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      let res = await getArticle(this.id)
      this.article = res.article
      this.tags = res.tags
      document.title = res.article.title
      console.log(this.userId)
      if (this.userId) {
        res = await getRelation(this.id, this.userId)
        this.relation = res.relation
      }
      res = await getArticleStatus(this.id)
      this.status = res.status
    },
    top() {
      window.scrollTo({
        top: 0
      })
    },

    async like() {
      if (this.relation.userId == null) {
        this.$alert(`请先登录`, '提示', {
          confirmButtonText: '确定'
        })
      } else {
        this.relation.isLike = !this.relation.isLike

        this.status.likes += this.relation.isLike ? 1 : -1
        this.relation.updateTime = new Date()
        let res = await updateRelation(this.relation)
        this.relation = res.relation
        res = await getArticleStatus(this.id)
        this.status = res.status
      }
    },
    async book() {
      if (this.relation.userId == null) {
        this.$alert(`请先登录`, '提示', {
          confirmButtonText: '确定'
        })
      } else {
        this.relation.isBook = !this.relation.isBook
        this.status.books += this.relation.isBook ? 1 : -1
        this.relation.updateTime = new Date()
        let res = await updateRelation(this.relation)
        this.relation = res.relation
        res = await getArticleStatus(this.id)
        this.status = res.status
      }
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
    width: 820px;
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
    top: 200px;
    left: 230px;
    color: #505050;
    background-color: #fff;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .toolbar-item {
      width: 62px;
      text-align: center;
      cursor: pointer;
      .toolbar-item__icon {
        height: 48px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .toolbar-item__num {
        height: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
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

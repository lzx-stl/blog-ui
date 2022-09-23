<template>
  <div class="container">
    <div class="layout"
         v-if="article && author">

      <div class="content-zone"
           id="content">
        <Content v-if="article"
                 :options="articleOptions"
                 :author="author"
                 :article="article" />
      </div>
      <div class="comment-zone"
           id="comment">
        <Comment :articleId="article.id"
                 :authorId="article.authorId"
                 :options="commentOptions" />
      </div>

    </div>
    
    <ToolBar />
  </div>

</template>

<script>
import Content from './components/Content'
import ToolBar from '@/components/ToolBar'
import Comment from '@/components/Comment'
import Catalog from './components/Catalog.vue'
import { getArticle } from '@/api/article'

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
      article: null,
      author: null
    }
  },
  created() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      getArticle(this.id)
        .then((res) => {
          this.article = res.article

          document.title = res.article.title
          return getInformation(res.article.authorId)
          // reslove(getArticle(this.article.authorId))
        })
        .then((res) => {
          this.author = res.user
        })
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
      width: 100%;
      // width: 900px;
      // padding: 30px 0;
      margin: 40px auto 0 auto;

      // box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    }
  }
}
</style>

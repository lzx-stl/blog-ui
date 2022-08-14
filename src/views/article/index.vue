<template>
  <div class="container">
    <div class="content-zone" id="content">
      <Content
        v-if="article && author"
        :options="articleOptions"
        :author="author"
        :article="article"
      />
    </div>
    <div class="comment-zone" id="comment">
      <Comment
        v-if="article && author"
        :articleId="article.id"
        :authorId="article.authorId"
        :options="commentOptions"
      />
    </div>
    <ToolBar />
    <BackToTop />
  </div>
</template>

<script>
import BackToTop from "@/components/BackToTop/index";
import Content from "./components/Content";
import ToolBar from "@/components/ToolBar";
import Comment from "@/components/Comment";
import { getArticle } from "@/api/article";

import { getInformation } from "@/api/user";
export default {
  name: "Article",
  components: {
    Content,
    Comment,
    ToolBar,
    BackToTop,
  },
  computed: {
    commentOptions() {
      let data = {
        width: "900px",
      };
      return data;
    },
    articleOptions() {
      let data = {
        width: "900px",
      };
      return data;
    },
  },
  data() {
    return {
      article: null,
      author: null,
    };
  },
  created() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      
      getArticle(this.$route.params.id)
        .then((res) => {
          this.article = res.article;
          this.getUpAvatar();
        })
        .catch((error) => {});
    },
    getUpAvatar() {
      getInformation(this.article.authorId).then((res) => {
        this.author = res;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  min-height: 700px;
  background-color: #f5f5f5;
  overflow: hidden;
}

.comment-zone {
  width: 900px;
  padding: 30px 0;
  margin: 40px auto;
  
  // box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>

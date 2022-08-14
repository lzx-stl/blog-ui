<template>
  <div class="list-container">
    <ArticleItem v-for="item in list" :key="item.id" :article="item">
      <template name="tagNew">
        <i class="iconfont icon-New-Tga"> </i>
      </template>
    </ArticleItem>
    <div
      v-if="loading"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
    ></div>
    <p v-if="noMore">没有更多了</p>
  </div>
</template>

<script>
import ArticleItem from "./ArticleItem";
import { findAll } from "@/api/article";
import { throttle } from "@/utils/common";

export default {
  name: "ArticleList",
  components: {
    ArticleItem,
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
      },
      loading: false,
      noMore: false,
      delay: 1500,
    };
  },
  computed: {
    disabled() {
      return this.loading || this.noMore;
    },
  },
  methods: {
    getList() {
      if (!this.disabled) {
        this.loading = true;
        findAll(this.listQuery).then((res) => {
          if (!res.list.length) {
            this.noMore = true;
            this.loading = false;
            return;
          } else {
            this.listQuery.page++;
            this.list = this.list.concat(res.list);
            setTimeout(() => {
              this.loading = false;
            }, this.delay);
          }
        });
      }
    },
    scrollHandle() {
      const scrollHeight = document.body.scrollHeight;
      const scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      const dist = scrollHeight - scrollTop - clientHeight;
      if (dist <= 0) {
        this.getList();
      }
    },
  },
  created() {
    this.getList();
    window.addEventListener("scroll", this.scrollHandle, false);
  },
};
</script>

<style scoped>
.list-container {
  width: 700px;
  height: fit-content;
  margin: 0 auto;
  padding: 50px 0;
  box-sizing: content-box;
}

.list-container p {
  width: 20%;
  text-align: center;
  margin: 0 auto;
  color: red;
}
</style>

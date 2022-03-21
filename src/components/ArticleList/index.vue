<template>
  <div class="list-container">
    <ArticleItem v-for="item in list"
                 :key="item.id"
                 :article="item"
                 v-cloak>
      <template name="tagNew">
        <i class="iconfont icon-New-Tga">
        </i>
      </template>
    </ArticleItem>
    <p v-if="loading">加载中...</p>
    <p v-if="noMore">没有更多了</p>
    <el-button type="primary"
               v-if="!disabled"
               @click="load"
               style="display:block;margin: 0 auto">加载更多</el-button>
  </div>
</template>

<script>
import ArticleItem from './ArticleItem'
import {findAll} from '@/api/article'
import {throttle} from "@/utils/common";

export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  }, data() {
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
      noMore: false
    }
  },
  computed: {
    disabled() {
      return this.loading || this.noMore;
    },
  }, methods: {
    load() {
      if(!this.disabled){
        this.loading = true;
        findAll(this.listQuery.page, this.listQuery.limit,
            this.listQuery.tag, this.listQuery.keyWord, this.listQuery.all).then(res => {
          if (!res.list.length) {
            this.noMore = true;
            this.loading = false;
            return;
          } else {
            this.listQuery.page++;
            for(let x of res.list) this.list.push(x);
            setTimeout(() => {
              this.loading = false
            }, 1000)
          }
        })
      }
      }
  }, created() {
    this.load();
  }
}
</script>

<style scoped>
.list-container {
  width: 100%;
  height: fit-content;
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

<template>
  <div class="search-curr">

    <div class="layout">
      <div class="layout-main">
        <div class="search-bar">
          <input type="text"
                 v-model="keyword"
                 @keyup.enter="handleSearch"
                 clearable
                 class="search-input" />
          <div class="search-submit">
            <button class="search-btn"
                    @click="handleSearch">搜索</button>

          </div>
        </div>
        <div class="search-curr__header">
          <div class="tab">
            <div class="tab-list">
              <div class="tab-item tab-item--active">全部</div>

              <div class="tab-item">话题</div>

              <div class="tab-item">随笔</div>
              <div class="tab-item">用户</div>
            </div>
          </div>

        </div>
        <div class="container search-section">
          <div class="search-section__header">
            <h3 class="section-title">文章</h3>
          </div>
          <div class="search-section__body">

            <el-empty :image-size="200"
                      v-if="!total"></el-empty>
            <ArticleItem v-for="item in list"
                         :key="item.id"
                         :article="item.article"
                         :status="item.status"
                         :tagList="item.tagList" />
          </div>

        </div>
        <div class="pagination-box">
          <Pagination :total="total"
                      :pageSizes="[5, 10, 20, 30]"
                      :page.sync="listQuery.curr"
                      :limit.sync="listQuery.limit"
                      @pagination="getList" />
        </div>
      </div>

      <div class="layout-sub">
        <side-menu class="search-history-section">
          <template v-slot:header>
            <h2 class="side-section__title">搜索历史</h2>
            <div class="side-section__link">
              <span href=""
                    @click="clear">清空</span>
            </div>
          </template>
          <template v-slot:content>
            <div class="search-history-list">

              <div class="search-history-list__card"
                   v-for="item in history"
                   :key="item"
                   @click="handleClick(item)">{{item}}
              </div>
            </div>
          </template>
        </side-menu>
      </div>
    </div>

  </div>

</template>

<script>
import Pagination from '@/components/Pagination'
import ArticleItem from '@/components/ArticleList/ArticleItem.vue'

import SideMenu from '@/components/SideMenu'
import { MessageBox } from 'element-ui'
import { findAll } from '@/api/article'
export default {
  components: {
    ArticleItem,
    SideMenu,
    Pagination
  },
  data() {
    return {
      history: [],
      list: [],
      total: 0,
      listQuery: {
        curr: 1,
        limit: 5,
        tag: null,
        keyword: '',
        isPublish: true,
        authorId: null,
        mode: 'release_time'
      },
      keyword: '',
      loading: false,
      noMore: false
    }
  },
  created() {
    this.keyword = this.$route.query.keyword
    let data = JSON.parse(window.localStorage.getItem('search-history'))
    if (data) this.history = data
    this.handleSearch()
  },
  mounted() {},
  methods: {
    getList() {
      findAll(this.listQuery).then((res) => {
        this.total = res.total
        this.list = res.list
      })
    },
    add(data) {
      if (data === '') return
      console.log(`data`, data)
      let n = this.history.length
      if (n == 0) this.history.push(data)
      else if (n == 1) {
        if (data == this.history[0]) return
        this.history.unshift(data)
      } else if (n < 20) {
        // 1< n < limit
        let index = this.history.indexOf(data)
        if (index != -1) this.history.splice(index, 1)
        this.history.unshift(data)
      } else {
        this.history.pop()
        this.history.push(data)
      }
      window.localStorage.setItem(
        'search-history',
        JSON.stringify(this.history)
      )
    },
    clear() {
      this.history = []
      window.localStorage.removeItem('search-history')
    },
    handleSearch() {
      this.keyword = this.keyword.trim()

      this.listQuery.keyword = this.keyword
      this.list = []
      this.noMore = false
      this.listQuery.curr = 1

      this.getList()
      this.add(this.keyword)
      this.$router.push({
        path: this.$route.path,
        query: {
          keyword: this.keyword
        }
      })
    },
    handleClick(item) {
      this.keyword = item
      this.handleSearch()
    }
  },
  watch: {
    'listQuery.keyword': {
      handler(newVal, oldVal) {
        console.log(newVal)
        // this.handleSearch()
      },
      immediate: true,
      deep: true // 可以深度检测到 person 对象的属性值的变化
    }
  }
}
</script>

<style lang="scss">
.search-curr {
  padding: 100px 0;
  background-color: #f5f5f5;

  .layout {
    width: 1000px;
    min-height: 600px;
    padding-left: 100px;
    padding-right: 100px;
    box-sizing: content-box;
    margin: 0 auto;
    &::after {
      content: '';
      display: block;
      visibility: hidden;
      height: 0;
      clear: both;
      font-size: 0;
    }
    .layout-main {
      float: left;
      width: 700px;
      // background-color: red;
      .search-bar {
        display: flex;
        height: 50px;

        border-radius: 4px;
        background-color: pink;
        .search-input {
          display: inline-block;
          height: 100%;
          border: none;
          padding: 0 30px;
          flex: 1;

          outline: none;
        }
        .search-submit {
          width: 120px;
          height: 100%;
          font-size: 16px;
          flex-shrink: 0;

          .search-btn {
            width: 100%;
            background-color: #ffe14c;

            font-size: 16px;
            color: #663c00;
            font-weight: 600;
            height: 50px;
            display: inline-flex;
            align-items: center;
            border: 0;
            justify-content: center;
          }
        }
      }
      .search-curr__header {
        padding: 0 30px;
        margin-top: 20px;
        margin-bottom: 20px;

        background-color: #fff;
        .tab {
          height: 50px;
          .tab-list {
            .tab-item {
              display: inline-block;
              line-height: 50px;

              font-size: 16px;
              position: relative;
              & + .tab-item {
                margin-left: 40px;
              }
            }
            .tab-item--active {
              color: #00c3ff;
              font-weight: 600;
              &::before {
                content: ' ';
                position: absolute;
                width: 100%;
                bottom: 0;
                left: 0;
                border-bottom: 3px solid #00c3ff;
              }
            }
          }
        }
      }
      .search-section {
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        .search-section__header {
          display: flex;
          padding: 0 30px;
          height: 50px;
          .section-title {
            margin-top: 22px;
            font-size: 16px;
          }
        }
        .search-section__body {
        }
      }
    }
    .layout-sub {
      float: right;
      width: 280px;
      .search-history-section {
        & .side-section__body {
          padding-right: 0;
          padding-bottom: 0;
        }
      }
      .search-history-list {
        display: flex;
        min-height: 50px;
        padding-bottom: 18px;
        padding-right: 8px;
        flex-wrap: wrap;
        .search-history-list__card {
          margin-bottom: 12px;
          margin-right: 12px;
          padding: 0 12px;
          height: 30px;
          line-height: 28px;
          border-radius: 15px;
          border: 1px solid #ebebeb;
          cursor: pointer;
          overflow: hidden;

          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
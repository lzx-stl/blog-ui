<template>
  <div class="category-container">
    <!-- <div class="search-wrapper">
      <Search :keyword.sync="listQuery.keyword"
              @search="getList"></Search>

    </div> -->
    <div class="list-nav">

      <TagNav @tagChange="getList"
              :tag.sync="listQuery.tag"
              :mode.sync="listQuery.mode" />
    </div>
    <el-empty :image-size="200"
              v-if="!total"></el-empty>
    <div class="card-list">
      <Card v-for="item in list"
            :key="item.id"
            :item="item"> </Card>

    </div>
    <div class="pagination-box">
      <Pagination v-show="total > 0"
                  :total="total"
                  :pageSizes="[12, 24, 36, 48]"
                  :page.sync="listQuery.page"
                  :limit.sync="listQuery.limit"
                  @pagination="getList" />
    </div>
  </div>
</template>

<script>
import { findAll } from '@/api/article'
import Search from '@/components/Search'
import TagNav from './components/TagNav'
import Card from './components/Card'
import Pagination from '@/components/Pagination'


export default {
  name: 'Category',
  components: { Search, TagNav, Card, Pagination },
  data() {
    return {
      list: null,
      total: 0,
      loading: false,
      listQuery: {
        page: 1,
        limit: 12,
        tag: '',
        keyword: '',
        mode: 'release_time DESC',
        all: false
      }
    }
  },
  computed: {
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      findAll(this.listQuery).then((res) => {
        this.list = res.list
        this.total = res.total
        this.loading = false
      })
    },
    handleSearch() {
      this.getList()
    }
  },
  watch: {
    listQuery: {
      handler(newVal, oldVal) {
        this.getList()
      },
      deep: true
    }
  }
}
</script>

<style lang="scss">
.category-container {
  width: 100%;
  padding-top: 60px;
  .list-nav {
    width: 1400px;

    margin: 50px auto 55px auto;
  }
  .card-list {
    display: grid;
    width: 1400px;
    margin: 0 auto;
    grid-gap: 25px;
    grid-column-gap: 25px;
    grid-template-columns: repeat(4, 1fr);
  }

  .pagination-box {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 50px 0 100px 0;
  }
  .el-empty {
    box-sizing: border-box;
  }
  .search-wrapper {
    display: flex;
    align-content: center;
    justify-content: center;
    width: 640px;
    height: 48px;
    margin: 45px auto 20px auto;
  }
}
</style>

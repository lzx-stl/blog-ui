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
            :article="item.article"> </Card>

    </div>
    <div class="pagination-box">
      <Pagination v-show="total > 0"
                  :total="total"
                  :page.sync="listQuery.curr"
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
        curr: 1,
        limit: 12,
        tag: '',
        keyword: null,
        isPublish: true,
        authorId: this.authorId,
        mode: 'release_time'
      }
    }
  },
  computed: {},
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

  padding: 60px 45px;
  .list-nav {
    margin: 40px auto 35px auto;
  }
  .card-list {
    display: flex;
    flex-wrap: wrap;
    // margin: 0 16 *.5 *-1,
    // grid-gap: 25px;
    // grid-column-gap: 30px;
    // grid-template-columns: repeat(3, 1fr);
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

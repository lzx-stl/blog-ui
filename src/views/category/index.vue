<template>
  <div class="category-container">
    <div class="search-wrapper">
      <Search :keyWord.sync="listQuery.keyWord"
              @search="getList"></Search>

    </div>
    <TagNav @tagChange="getList"
            :tag.sync="listQuery.tag" />

    <el-empty :image-size="200"
              v-if="total == 0"></el-empty>
    <div class="card-list">

      <Card v-for="obj in list"
            :key="obj.id"
            :article="obj"> </Card>
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
      listQuery: {
        page: 1,
        limit: 12,
        tag: '',
        keyWord: '',
        all: false
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      findAll(this.listQuery).then((res) => {
        this.list = res.list
        this.total = res.total
      })
    },
    handleSearch() {
      this.getList()
    }
  }
}
</script>

<style lang="scss">
.category-container {
  width: 100%;
  min-height: 900px;
  padding-top: 60px;

  .card-list {
    // background-color: red;

    display: grid;
    width: 1275px;
    margin: 0 auto;
    grid-gap: 25px;
    grid-column-gap: 25px;
    grid-template-columns: repeat(4, 300px);
  }
  .pagination-box{
    display: flex;
    justify-content: center;
    margin: 50px 0 100px 0;
  }
  .el-empty {
    padding: 75px 0;
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

<template>
  <div class="card-list">
    <div class="blog-search">
      <Search :keyWord.sync="listQuery.keyWord"
              @search="handleSearch" />
    </div>
    <TagNav @tagChange="getList"
            :tag.sync="listQuery.tag" />
    <Card v-for="obj in list"
          :key="obj.id"
          :article="obj"> </Card>
    <p v-if="!total"
       style="text-align: center; margin-top: 200px">
      什么也没有...
    </p>
    <Pagination v-show="total > 0"
                :total="total"
                :pageSizes="[12, 16, 20, 24]"
                :page.sync="listQuery.page"
                :limit.sync="listQuery.limit"
                @pagination="getList" />
    <BackToTop></BackToTop>
  </div>
</template>

<script>
import { findAll } from '@/api/article'
import TagNav from './TagNav'
import Card from './Card'
import Pagination from '@/components/Pagination'
import BackToTop from '@/components/BackToTop'

import Search from '@/components/Search'
export default {
  name: 'List',
  components: {
    Search,
    TagNav,
    Card,
    Pagination,
    BackToTop
  },
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
      console.log(this.listQuery)
      this.getList()
    }
  }
}
</script>

<style>
.card-list {
  width: 85%;
  margin: 0 auto;
  min-height: 400px;
}
</style>

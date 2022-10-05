<template>
  <div class="main-page">
    <div class="content">
      <InfiniteScroll @scrollHandle="getList"
                      :disabled="disabled">
        <template v-slot:list>
          <WaterFall :data="list"
                     v-if="list.length" />
        </template>
        <template v-slot:footer>
          <div v-if="loading"
               v-loading="loading"
               element-loading-text="加载中"></div>
          <div class="loading-end"
               v-if="noMore">没有更多了</div>
        </template>
      </InfiniteScroll>

    </div>

  </div>
</template>

<script>
import InfiniteScroll from '@/components/InfiniteScroll'
import WaterFall from '@/components/WaterFall'
import { findAllImage } from '@/api/image'
export default {
  name: 'Resources',
  components: {
    InfiniteScroll,
    WaterFall
  },
  data() {
    return {
      srcList: [],
      list: [],
      imgsArr: [],
      loading: false,
      noMore: false,
      listQuery: {
        curr: 1,
        limit: 15,
        mode: 'add_time'
      }
    }
  },
  computed: {
    prop() {
      return {
        column_cnt: 6 //列数
      }
    },disabled()
    {
      return this.loading || this.noMore
    }
  },
  methods: {
    getList() {
      if (this.disabled) return
      this.loading = true
      findAllImage(this.listQuery).then((res) => {
        if (!res.list.length) {
          this.noMore = true
          this.loading = false
          // window.removeListener('scroll', this.scrollHandle, false)
          return
        }
        this.list = this.list.concat(res.list)
        this.listQuery.curr++
        this.loading = false
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.main-page {
  padding-top: 60px;
  .content {
    width: 1500px;
    margin: 25px auto;
  }
}
</style>

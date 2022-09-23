<template>
  <div class="main-page">
    <div class="content">

      <WaterFall :data="list"
                 v-if="list.length" />
      <!-- <div v-if="loading"
           v-loading="loading"
           element-loading-text="加载中"></div> -->

    </div>

  </div>
</template>

<script>
import WaterFall from '@/components/WaterFall'
import { findAllImage } from '@/api/image'
export default {
  name: 'Resources',
  components: {
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
        page: 1,
        limit: 15
      }
    }
  },
  computed: {
    prop() {
      return {
        column_cnt: 6 //列数
      }
    }
  },
  methods: {
    getList() {
      if (this.loading || this.noMore) return
      this.loading = true

      findAllImage(this.listQuery.page, this.listQuery.limit).then((res) => {
        if (!res.list.length) {
          this.noMore = true
          this.loading = false
          // window.removeListener('scroll', this.scrollHandle, false)
          return
        }
        this.list = this.list.concat(res.list)
        this.listQuery.page++
        this.loading = false
      })
    },
    scrollHandle() {
      const scrollHeight = document.body.scrollHeight
      const scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop
      const clientHeight = document.documentElement.clientHeight
      const dist = scrollHeight - scrollTop - clientHeight
      if (dist <= 30) {
        this.getList()
      }
    }
  },
  created() {
    this.getList()
    window.addEventListener('scroll', this.scrollHandle, false)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollHandle, false)
  }
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

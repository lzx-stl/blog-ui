<template>
  <div class="wf-container">
    <div class="wf-item"
         v-for="o in list"
         :key="o.id"
         :style="{
          top: o.top + 'px',
          left: o.left + 'px',
          width: o.w + 'px',
          height: o.h + 'px',
          margin: '0 ' + gap + 'px',
      }">
      <img v-lazy="o.url"
           alt="">
      <!-- <el-image :src="o.url"
                :preview-src-list="srcList"
                lazy> </el-image> -->
    </div>
  </div>
</template>

<script>
import { findAllImage } from '@/api/image'
export default {
  name: 'Picture',
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
      },
      row: 1,
      cnt: 5,
      gap: 10,
      heightArr: []
    }
  },
  computed: {
    getWidth() {
      var o = document.querySelector('.wf-container')
      console.log('宽度：' + o.clientWidth)
      return (o.clientWidth - this.gap * (this.cnt - 1)) / this.cnt
    }
  },
  methods: {
    getMin() {
      //获取数组中最小高度所在的索引
      let index = 0
      for (let i = 1; i < this.cnt; i++)
        if (this.heightArr[index] > this.heightArr[i]) index = i
      return index
    },
    getMax() {
      //获取数组中最max高度所在的索引
      let index = 0
      for (let i = 1; i < this.cnt; i++)
        if (this.heightArr[index] < this.heightArr[i]) index = i
      return index
    },
    getList() {
      if (this.loading) return
      this.loading = true
      findAllImage(this.listQuery.page, this.listQuery.limit).then((res) => {
        if (res.list.length == 0) {
          this.noMore = true

          this.loading = false

          window.removeListener('scroll', this.scrollHandle)
          return
        }
        this.listQuery.page++
        for (let o of res.list) {
          let w = this.getWidth
          let h = (o.height * w) / o.width
          ;(o.w = w), (o.h = h)
          let index = this.list.length
          if (this.list.length < this.cnt) {
            this.heightArr.push(h)
            o.top = 0
            o.left = index * (this.gap + w)
          } else {
            let minIndex = this.getMin()
            o.top = this.heightArr[minIndex] + this.gap
            o.left = minIndex * (this.gap + w)
            this.heightArr[minIndex] += h + this.gap
          }
          this.list.push(o)
          this.srcList.push(o.url)
        }
        //设置父盒子高度
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

<style lang="scss">
.wf-container {
  width: 98%;
  min-height: 700px;
  margin: 25px auto;
  position: relative;
}
.wf-item {
  position: absolute;
  background-color: #f5f5f5;
  border-radius: 15px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    border-radius: 15px;
    transition: all 0.3s ease;
    &:hover {
      transform: scale(1.2);
    }
  }
}
</style>

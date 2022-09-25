<template>
  <div class="wf-container">
    <div class="wf-item"
         v-for="o in imgList"
         :key="o.id"
         :style="{
          top: o.top + 'px',
          left: o.left + 'px',
          width: o.w + 'px',
          height: o.h + 'px',
      }">
      <img v-lazy="o.url"
           alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Picture',
  props: {
    data: {
      type: Array,
      default: []
    },
    gap: {
      type: Number,
      default: 10
    },
    cnt: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      imgList: [],
      heightArr: [],
      itemWidth: 0
    }
  },
  computed: {
    //计算每一列的宽度
  },
  methods: {
    getWidth() {
      var o = document.querySelector('.wf-container')
      this.itemWidth = (o.clientWidth - this.gap * (this.cnt - 1)) / this.cnt
    },
    getMin() {
      //获取数组中第一个最小高度的索引位置
      let index = 0
      for (let i = 1; i < this.cnt; i++)
        if (this.heightArr[index] > this.heightArr[i]) index = i
      return index
    },
    getMax() {
      //获取数组中第一个最小高度的索引位置
      let index = 0
      for (let i = 1; i < this.cnt; i++)
        if (this.heightArr[index] < this.heightArr[i]) index = i
      return index
    },
    init(data) {

      for (let index in data) {
        let o = data[index]
        let w = this.itemWidth
        let h = (o.height * w) / o.width
        o.w = w
        o.h = h
        if (this.imgList.length < this.cnt) {
          this.heightArr.push(h)
          o.top = 0
          o.left = index * (this.gap + w)
        } else {
          let minIndex = this.getMin()
          o.top = this.heightArr[minIndex] + this.gap
          o.left = minIndex * (this.gap + w)
          this.heightArr[minIndex] += h + this.gap
        }
        this.imgList.push(o)
      }
      document.querySelector('.wf-container').style.height =
        this.heightArr[this.getMax()] + 'px'
    }
  },watch:{
    'data'(val){
      let data = val.slice(this.imgList.length);
      this.init(data)
    }
  },
  mounted() {
    this.getWidth()
    this.init(this.data)
  }
}
</script>

<style lang="scss">
.wf-container {
  width: 100%;
  // background-color: red;
  position: relative;
}
.wf-item {
  position: absolute;
  // background-color: #f5f5f5;
  border-radius: 15px;
  border: 5px solid pink;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    transition: all 0.3s ease-in-out;
    &:hover {
      transform: scale(1.2);
    }
  }
}
</style>

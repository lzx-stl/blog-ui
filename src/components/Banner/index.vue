<template>
  <div class="banner-container">
    <el-carousel trigger="click"
    height="100vh"
                 :interval="3000"
                 arrow="hover">
      <el-carousel-item v-for="item in list"
                        :key="item.id">
        <img v-lazy="item.src"
             alt="">
      </el-carousel-item>
    </el-carousel>
    <!-- <div class="banner-wrapper"
         :style="{left: -700 * curr + 'px'}">
      <div class="banner-slide"
           v-for="(item,index) in imgs"
           :key="item"
           :style="{left:  700 * index + 'px'}">
        <img v-lazy="item"
             alt="">
      </div>
    </div>

    <div class="banner-prev"
         @click="prev">
      <i class="iconfont icon-zuo"></i>
    </div>
    <div class="banner-next"
         @click="next">
      <i class="iconfont icon-you"></i>
    </div> -->
  </div>

</template>

<script>
export default {
  props:['list'],
  data() {
    return {
      curr: 0,
     
    }
  },
  methods: {
    prev() {
      this.curr--
      if (this.curr === -1) this.curr = this.list.length - 1
    },
    next() {
      this.curr++
      if (this.curr === this.list.length) this.curr = 0
    }
  },
  mounted() {
    setInterval(() => {
      this.next()
    }, 2000)
  }
}
</script>

<style lang="scss">
.banner-container {
  position: relative;
  overflow: hidden;

  border-radius: 4px;
  .banner-wrapper {
    width: 3500px;
    height: 100%;
    position: relative;
    left: 0;
    transition: all ease 0.6s;
  }
  .banner-prev,
  .banner-next {
    position: absolute;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    top: 50%;
    margin-top: -36px;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    // line-height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 55;
  }
  .banner-prev {
    left: 20px;
  }
  .banner-next {
    right: 20px;
  }
  .banner-slide {
    position: absolute;
    overflow: hidden;
    z-index: 1;
    border-radius: 8px;
  }
  .banner-active {
    // width: 100%;
    // height: 234px;
    // left: 102px;
    // top: 0;
    // z-index: 50;
  }
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
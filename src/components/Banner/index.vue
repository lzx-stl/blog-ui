<template>
  <div class="banner-container">
      <el-carousel trigger="click" height="350px">
      <el-carousel-item v-for="item in imgs" :key="item">
        <img v-lazy="item" alt="">
      </el-carousel-item>
    </el-carousel>
    <!-- <div class="banner-wrapper"
         :style="{left: -700 * curr + 'px'}">
      <div class="banner-slide"
           v-for="(item,index) in imgs"
           :key="item"
           :style="{left:  700 * index + 'px'}">
        <img :src="item"
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
  data() {
    return {
      curr: 0,
      url: 'https://upload-bbs.mihoyo.com/upload/2022/08/18/73715441/03cc2dc5d34aae585d515ca77943d2c3_3053093435832116764.jpg',
      imgs: [
        'https://upload-bbs.mihoyo.com/upload/2022/08/18/73715441/03cc2dc5d34aae585d515ca77943d2c3_3053093435832116764.jpg',
        'https://upload-bbs.mihoyo.com/upload/2022/05/25/112338446/3a166ade192b29580764d91ef4703d50_6534370283051785360.jpg',
        'https://upload-bbs.mihoyo.com/upload/2021/08/18/73715441/e732f197e09b367f0a20b79dfba2c784_7240066876530027930.jpg?x-oss-process=image/resize,s_600/quality,q_80/auto-orient,0/interlace,1/format,jpg',
        'https://upload-bbs.mihoyo.com/upload/2022/02/08/73491413/51df9519bdcdb4f42a630497f19b1485_4543259733633110045.jpg?x-oss-process=image//resize,s_600/quality,q_80/auto-orient,0/interlace,1/format,jpg',
        'https://w.wallhaven.cc/full/l3/wallhaven-l3r3zr.jpg'
      ]
    }
  },
  methods: {
    prev() {
      this.curr--
      if (this.curr === -1) this.curr = this.imgs.length - 1
    },
    next() {
      this.curr++
      if (this.curr === this.imgs.length) this.curr = 0
    }
  },
  mounted() {
    setInterval(() => {
      this.next();
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
    transition: all ease .6s;
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
    width: 700px;
    height: 100%;
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
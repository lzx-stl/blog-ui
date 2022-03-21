<template>
  <div style="width: 100%;height: 100%;">
    <el-carousel :autoplay="false"
                 indicator-position="none">
      <el-carousel-item v-for="item in list" :key="item">
        <img :src="item" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  props:['list']
}
</script>

<style>
.el-carousel__container{
  height: 720px;
}

.el-carousel__container img{
  width: 100%;
  height: 100%;
  user-select: all;
}

</style>
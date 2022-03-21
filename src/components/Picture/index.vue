<template>
  <div class="wf-container" ref="box">
    <div class="wf-item" v-for="(item, index) in list" :style="getPos(index)">
      <img :src="item.url" alt="">
    </div>
  </div>
</template>

<script>
import {findAllImage} from '@/api/image'
import {WaterFall} from '@/utils/common'
import elImageViewer from 'element-ui/packages/image/src/image-viewer'

export default {
  name: 'Picture',
  components: {
    elImageViewer
  }, data() {
    return {
      list: [],
      listQuery: {
        page: 1,
        limit: 5
      }
    }
  },
  methods: {
    getPos(index){
      console.log(this.list[index])
    },
    load() {
      console.log("page", this.listQuery.page)
      findAllImage(this.listQuery.page, this.listQuery.limit).then(res => {
        this.listQuery.page++;
        this.list = res.list;
      })
    }
  }, created() {
    this.load()
  }
}
</script>

<style>


.wf-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: red;
}


.wf-item img {
  width: 100%;
  height: 100%;
}
</style>
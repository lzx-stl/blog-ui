<template>
  <div>

    <div class="eventline-continer"
         :style="{'background-image': 'url('+$store.state.config.eventImg+')'}">
      <div class="order-rule"
           style="float:right">
        排序：
        <el-radio-group v-model="reverse">
          <el-radio :label="false">正序</el-radio>
          <el-radio :label="true">倒序</el-radio>
        </el-radio-group>
      </div>
      <div class="eventline-content">
        <div class="block">
          <el-timeline :reverse="reverse">
            <el-timeline-item :timestamp="$moment(t.time).format('YYYY年MM月DD日')"
                              placement="top"
                              v-for="(t, index) in list"
                              :key="index">
              <el-card>
                <h2>{{t.title}}</h2>
                <p>{{t.content}}</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>

    <BackToTop></BackToTop>
    </div>
  </div>
</template>

<script>
import BackToTop from '@/components/BackToTop'

import { findAll } from '@/api/event.js'
export default {
  name: 'EventLine',
  components: {
    BackToTop
  },

  data() {
    return {
      reverse: true,
      list: []
    }
  },
  mounted() {
    findAll().then((res) => {
      this.list = res.list
    })
  }
}
</script>

<style>
.eventline-continer {
  position: relative;
  /* overflow: hidden; */
  /* color: #000; */
  background-size: 100% 100%;
  background-attachment: fixed;
}

.eventline-content {
  margin: 0 auto;
  width: 1200px;
  padding: 50px;
  min-height: 850px;
}

.order-rule {
  font-size: 20px;
  height: 100px;
  margin: 100px;
}
.el-card{
  width: 470px!important;
}

.eventline-content .el-timeline {
  margin: 0 auto;
}

.eventline-content .el-timeline .el-timeline-item {
  width: 500px;
  margin: 0 auto;
  color: #fff;
}

.eventline-content .el-timeline .el-timeline-item .el-card {
  width: 600px;
  min-height: 250px;
  opacity: 0.8;
}

.el-card h2 {
  text-align: center;
}
.el-card p {
  margin-top: 20px;
  text-align: center;
}

.el-timeline-item__timestamp.is-top {
  color: #000;
  font-size: 22px;
  font-weight: 800px;
}
</style>
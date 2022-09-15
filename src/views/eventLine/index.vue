<template>
  <div class="flex-container"
       :style="{backgroundImage: `url(${eventImg})`}">
    <el-timeline class="container">
      <el-timeline-item v-for="item in list"
                        :key="item.id"
                        placement="top">
        <el-card class="event-card">
          <div class="event-card__header">

            <h2 class="title">{{item.title}}</h2>
          </div>
          <div class="event-card__body">
            {{item.content}}
          </div>
          <div class="event-card__footer">
            <div class="time">{{getTime(item.time)}}</div>

          </div>
        </el-card>
      </el-timeline-item>

    </el-timeline>
    <!-- <div class="flex-item"
         v-for="item in list"
         :key="item.id">
      <h1>
        {{item.title}}
      </h1>
      <div>{{item.content}}

      </div>
    </div> -->

  </div>
</template>

<script>
import { findAll } from '@/api/event'
import { getTime } from '@/utils/common'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      list: []
    }
  },
  methods: {
    getList() {
      findAll().then((res) => {
        console.log(res)
        this.list = res.list
      })
    },
    getTime(time) {
      return getTime(time)
    }
  },
  computed: {
    ...mapState({
      eventImg: (state) => state.config.eventImg
    })
  },
  created() {
    this.getList()
  }
}
</script>

<style lang="scss">
.flex-container {
  // background-color: yellow;
  padding-top: 100px;

  //   display: flex;
  // justify-content: center;
  //   align-items: center;
  background-size: 100% 100%;
  background-attachment: fixed;
  .flex-item {
    width: 100%;
    // background-color: red;
  }
  .container {
    opacity: 0.75;
    background-color: transparent;
    width: 550px;
    margin: 0 auto;
    .event-card {
      padding: 10px 5px;
      .event-card__header {
        display: flex;
        .title {
          flex-grow: 1;
        }
      }
      .event-card__body {
        padding: 10px 0;
      }
      .event-card__footer {
        display: flex;
        justify-content: end;
        .time {
          font-size: 16px;
        }
      }
    }
  }

  .card {
    background-color: skyblue;
  }
}
</style>
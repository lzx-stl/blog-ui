<template>
  <div class="comment-card">
    <div class="reply-face">
      <img :src="from.avatar"
           alt="" />
    </div>
    <div class="reply-con">
      <div class="user-name">
        {{ from.nickname }}
        <span class="text-con">
          回复@ <a href="">{{ to.nickname }}</a>:
          {{ obj.content }}

        </span>

      </div>
      <div class="con-msg">
        <span>{{ getTime }}</span>
        <span @click="handleUp"><i class="iconfont icon-zhichi"></i>
          {{ obj.up }}
        </span>
        <span><i class="iconfont icon-buzhichi"></i> {{ obj.down }}</span>
        <span @click="handleReply">回复</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getComment, like } from '@/api/comment'

import { getTime } from '@/utils/common.js'
export default {
  name: 'Card',

  props: ['obj', 'users'],
  data() {
    return {
      from: this.users[this.obj.fromId],
      to: this.users[this.obj.toId]
    }
  },

  computed: {
    getTime() {
      return getTime(this.obj.replyTime)
    }
  },
  methods: {
    handleReply() {
      console.log(this.obj.id)
      this.$store.dispatch('comment/change', {
        rootId: this.obj.parentId ? this.obj.parentId : this.obj.id,
        toId: this.from.uuid
      })
    },
    handleUp() {
      like(this.obj.id, this.obj.up + 1).then((res) => {
        this.obj.up++
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.comment-card {
  width: 100%;
  margin-top: 22px;
  .reply-face {
    width: 24px;
    height: 24px;
    position: absolute;
    & > img {
      width: 24px;
      height: 24px;
      cursor: pointer;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .reply-con {
    height: 100%;
    margin-left: 40px;
    position: relative;
    font-size: 14px;
    box-sizing: content-box;
    i:hover {
      color: #00a1d6;
    }
  }
  .user-name {
    display: inline-block;
    cursor: pointer;
    color: #fb7299;
    line-height: 18px;
    height: 18px;
    margin: 2px 0;
    font-weight: bold;
  }
  .text-con {
    font-size: 14px;
    color: #222;
    margin: 10px;
    font-weight: normal;
    line-height: 25px;
    a {
      color: #00a1d6;
      &:hover {
        color: #fb7299;
      }
    }
  }
  .con-msg {
    color: #99a2aa;
    font-size: 14px;
    height: 14px;
    line-height: 14px;
    margin-top: 10px;
    & > span {
      color: #99a2aa;
      line-height: 14px;
      margin-top: 6px;
      font-size: 12px;
      padding-right: 15px;
      cursor: pointer;
    }
  }
}
</style>

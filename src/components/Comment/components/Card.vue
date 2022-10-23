<template>
  <div class="comment-card">
    <div class="reply-face">
       <a class="name"
           target="_blank"
           :href="`/accountCenter/bookList?id=${from.id}`">
      <img v-lazy="from.avatar"
           alt="" />
       </a>
    </div>
    <div class="reply-con">
      <div class="user">
        <a class="name"
           target="_blank"
           :href="`/accountCenter/bookList?id=${from.id}`">{{from.nickname}}</a>

        <span class="text-con">
          回复
          <a target="_blank"
             :href="`/accountCenter/bookList?id=${to.id}`"> @{{to.nickname}}</a>:
          {{ comment.content }}
        </span>
      </div>

      <div class="con-msg">
        <span>{{ getTime }}</span>
        <span @click="handleUp"><i class="iconfont icon-zhichi"></i>
          {{ comment.up }}
        </span>
        <span><i class="iconfont icon-buzhichi"></i> {{ comment.down }}</span>
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

  props: ['comment','from', 'to'],

  computed: {
    getTime() {
      return getTime(this.comment.replyTime)
    }
  },
  methods: {
    handleReply() {
      this.$store.dispatch('comment/change', {
        rootId: this.comment.parentId ? this.comment.parentId : this.comment.id,
        toId: this.from.id
      })
    },
    handleUp() {
      like(this.comment.id, this.comment.up + 1).then((res) => {
        this.comment.up++
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.comment-card {
  width: 100%;
  margin-top: 22px;
  img {
    width: 24px;
    height: 24px;
    cursor: pointer;
    border-radius: 50%;
    // position: absolute;
    // left: 50%;
    // top: 50%;
    // transform: translate(-50%, -50%);
  }
  .reply-face {
    width: 24px;
    height: 24px;
    position: absolute;
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
  .user {
    
    .name {
      cursor: pointer;
      color: #fb7299;
      line-height: 18px;
      font-weight: bold;
      height: 18px;
      margin: 2px 0;
    }
    a {
      color: #00a1d6;
      &:hover {
        color: #fb7299;
      }
    }
    .text-con {
      white-space: pre-wrap;
    }
  }
  .user-name {
    display: inline-block;
  }
  // .text-con {
  //   font-size: 14px;
  //   color: #222;
  //   margin: 10px;
  //   font-weight: normal;
  //   line-height: 25px;
    
  // }
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

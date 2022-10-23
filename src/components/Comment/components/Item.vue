<template>
  <div class="reply-wrapper">
    <div class="first">
      <div class="user-avatar">

        <el-popover placement="top"
                    width="360"
                    trigger="click">
          <div class="user-card">
            <div class="bg"></div>
            <div class="face">

              <img v-lazy="from.avatar"
                   alt="" />
            </div>
            <div class="infor">
              <div class="user">
                <a class="name"
                   :href="`/accountCenter/${from.id}`"
                   target="_blank">{{from.nickname}}</a>
              </div>
              <div class="social">社交</div>
              <div class="verify">认证</div>
            </div>
            <div class="btn-box">
              <el-button type="primary">+关注</el-button>

              <el-button>发消息</el-button>
            </div>
          </div>
          <div slot="reference">
            <a class="user-name"
               :href="`/accountCenter/bookList?id=${from.id}`"
               target="_blank">
              <img v-lazy="from.avatar"
                   alt=""
                   class="user-avatar-img" />
            </a>
          </div>
        </el-popover>
      </div>
      <div class="con">
        <a class="user-name"
           :href="`/accountCenter/bookList?id=${from.id}`"
           target="_blank">
          {{ from.nickname }}
        </a>
        <p class="con-text"
           v-html="formatContent">
          <!-- {{ formatContent }} -->
        </p>
        <div class="con-msg">
          <span>{{ getTime }}</span>
          <span @click="handleUp"><i class="iconfont icon-zhichi"></i>
            {{ comment.up }}
          </span>
          <span><i class="iconfont icon-buzhichi"></i> {{ comment.down }}</span>
          <span @click="handleReply">回复</span>
        </div>

        <div class="reply-box">
          <Card v-for="item in list"
                :key="item.id"
                :comment="item.comment"
                :from="item.from"
                :to="item.to" />
          <div>
            <Pagination :background="false"
                        v-if="total > listQuery.limit"
                        :total="total"
                        :limit="listQuery.limit"
                        :layout="'total, prev, pager, next'"
                        @pagination="handlePageChange" />

          </div>
        </div>
      </div>
    </div>
    <div class="comment-send"
         v-if="comment.id == rootId">
      <Reply :articleId="comment.articleId"
             :fromId="$store.state.user.id"
             :parentId="rootId"
             :toId="toId"
             @admitComment="handleAdmit" />
    </div>
  </div>
</template>

<script>
import { getComment, like } from '@/api/comment'
import { getSecondList, getCommentSum } from '@/api/comment'
import Card from './Card'
import Reply from './Reply'
import { mapState } from 'vuex'
import Pagination from '@/components/Pagination'

import { getTime, formatStr } from '@/utils/common.js'
export default {
  name: 'Item',
  components: {
    Card,
    Reply,
    Pagination
  },
  props: ['from', 'to', 'comment'],
  data() {
    return {
      list: [],
      total: 0,
      listQuery: {
        curr: 1,
        limit: 5,
        articleId: this.comment.articleId,
        parentId: this.comment.id,
        mode: 'up'
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      getSecondList(this.listQuery).then((res) => {
        this.total = res.total
        this.list = res.list
      })
    },

    handlePageChange(val) {
      this.listQuery.curr = val.page
      this.list = []
      this.getList()
    },
    handleAdmit(val) {
      this.list.unshift(val)
      this.total++
    },
    handleReply() {
      this.$store.dispatch('comment/change', {
        rootId: this.comment.id,
        toId: this.from.id
      })
    },
    handleUp() {
      like(this.comment.id, this.comment.up + 1).then((res) => {
        this.comment.up++
      })
    }
  },
  computed: {
    ...mapState({
      rootId: (state) => state.comment.rootId,
      toId: (state) => state.comment.toId,

      users: (state) => state.user.users
    }),
    formatContent() {
      return formatStr(this.comment.content)
    },
    getTime() {
      return getTime(this.comment.replyTime)
    }
  }
}
</script>

<style lang="scss" scoped>
.reply-wrapper {
  width: 100%;
  min-height: 40px;
  margin-bottom: 10px;
  &:last-child .con {
    border-bottom: 1px solid #e5e9ef;
  }
  .first {
    .user-avatar {
      width: 82px;
      height: 48px;
      position: absolute;
      margin-top: 24px;

      .user-avatar-img {
        width: 48px;
        height: 48px;
        cursor: pointer;
        border-radius: 50%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .con {
      height: 100%;

      margin-left: 85px;
      position: relative;
      font-size: 14px;
      box-sizing: content-box;
      padding: 24px 0 14px 0;
      border-top: 1px solid #e5e9ef;

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
    .con-text {
      font-size: 15px;
      color: #222222;
      margin: 10px 0;
    }
    .con-msg {
      color: #99a2aa;
      font-size: 14px;
      height: 14px;
      line-height: 14px;
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

  .reply-box {
    .comment-card {
      width: 100%;
      .con {
        width: 500px;
      }
    }
  }
  .hasSub {
    min-height: 200px;
    background-color: red;
  }
  .comment-send {
    width: 100%;
    .comment-user {
      width: 535px;
      overflow: auto;
      .reply-input {
        width: 70%;
      }
    }
  }
}

.user-card {
  position: relative;
  .bg {
    // background-image: url('https://upload-bbs.mihoyo.com/upload/2022/02/08/73491413/51df9519bdcdb4f42a630497f19b1485_4543259733633110045.jpg?x-oss-process=image//resize,s_600/quality,q_80/auto-orient,0/interlace,1/format,jpg');
    position: absolute;
    width: 100%;
    height: 85px;
    top: 0;
    left: 0;
    border-radius: 8px 8px 0 0;
    overflow: hidden;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  .face {
    cursor: pointer;

    position: absolute;
    top: 95px;
    left: 10px;

    img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
    }
  }

  .infor {
    padding: 95px 20px 16px 80px;
    .name {
      max-width: 160px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: #222;
    }
  }
  .btn-box {
    display: flex;
    justify-content: center;
  }
}
</style>

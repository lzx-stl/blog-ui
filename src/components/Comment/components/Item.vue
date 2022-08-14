<template>
  <div class="reply-wrapper">
    <div class="first">
      <div class="user-avatar-img">
        <img :src="users[obj.fromId].avatar"
             alt="" />
      </div>
      <div class="con">
        <div class="user-name">
          {{ users[obj.fromId].nickname }}
        </div>
        <p class="con-text">
          {{ obj.content }}
        </p>
        <div class="con-msg">
          <span>{{ getTime }}</span>
          <span @click="handleUp"><i class="iconfont icon-zhichi"></i>
            {{ obj.up }}
          </span>
          <span><i class="iconfont icon-buzhichi"></i> {{ obj.down }}</span>
          <span @click="handleReply">回复</span>
        </div>

        <div class="reply-box">
          <div >
            <Card v-for="item in list"
                  :key="item.id"
                  :obj="item"
                  :users="users" />
          </div>
          <Pagination :background="false"
                      v-if="total > listQuery.limit"
                      :total="total"
                      :limit="listQuery.limit"
                      :layout="'total, prev, pager, next'"
                      @pagination="handlePageChange" />
        </div>
      </div>
    </div>
    <div class="comment-send"
         v-if="obj.id == rootId">
      <Reply :articleId="obj.articleId"
             :fromId="$store.state.user.uuid"
             :parentId="rootId"
             :toId="toId"
             @admitComment="handleAdmit" />
    </div>
  </div>
</template>

<script>
import { getComment, like } from '@/api/comment'
import { findAllCommentsByPage, getCommentSum } from '@/api/comment'
import Card from './Card'
import Reply from './Reply'
import { mapState } from 'vuex'
import Pagination from '@/components/Pagination'

import { getTime } from '@/utils/common.js'
export default {
  name: 'Item',
  components: {
    Card,
    Reply,
    Pagination
  },
  props: ['obj'],
  data() {
    return {
      users: {},
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        limit: 5,
        articleId: this.obj.articleId,
        parentId: this.obj.id
      }
    }
  },
 created() {
    this.users = JSON.parse(window.localStorage.getItem('users'))
    this.getList()
  },
  methods: {
    getList() {
      findAllCommentsByPage(this.listQuery).then((res) => {
        this.total = res.total
        this.list = res.list
      })
    },

    handlePageChange(val) {
      this.listQuery.page = val.page
      this.list = []
      this.getList()
    },
    from(obj) {
      return this.users[obj.fromId]
    },
    to(obj) {
      return this.users[obj.toId]
    },
    handleAdmit(val) {
      this.list.unshift(val);
      this.total++
    },
    handleReply() {
      console.log(this.obj.id)
      this.$store.dispatch('comment/change', {
        rootId: this.obj.id,
        toId: this.users[this.obj.fromId].uuid
      })
    },
    handleUp() {
      like(this.obj.id, this.obj.up + 1).then((res) => {
        this.obj.up++
      })
    }
  },
  computed: {
    ...mapState({
      rootId: (state) => state.comment.rootId,
      toId: (state) => state.comment.toId
    }),
    getTime() {
      // console.log(this.obj);
      return getTime(this.obj.replyTime)
    }
  }
}
</script>

<style lang="scss" scoped>
.reply-wrapper {
  float: left;
  width: 100%;
  min-height: 40px;
  margin-bottom: 10px;
  border-top: 1px solid #e5e9ef;
  .first {
    width: 100%;
    .user-avatar-img {
      width: 82px;
      height: 48px;
      position: absolute;
      margin-top: 24px;
      img {
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
    & > .con {
      height: 100%;

      margin-left: 85px;
      position: relative;
      font-size: 14px;
      box-sizing: content-box;
      padding: 24px 0 14px 0;
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
    min-height: 10px;
    .comment-card {
      width: 100%;
      .con {
        width: 500px;
      }
    }
    .pagination-container {
      background: #fff;
      padding: 5px 0px;
      text-align: left;
    }
  }

  .comment-send {
    width: 100%;
    min-height: 70px;
    float: left;
    .comment-user {
      width: 535px;
      overflow: auto;
      .reply-input {
        width: 70%;
      }
    }
  }
}
</style>

<template>
  <div class="comment-send">
    <div class="user-local">
      <div class="avatar-img">
        <el-image :src="avatar"
                  alt="">
          <div slot="error"
               class="image-slot">
            <i class="iconfont icon-yonghu"></i>
          </div>
        </el-image>

      </div>
    </div>
    <div class="textarea-container">
      <el-input type="textarea"
                class="ipt-txt"
                :placeholder="hint"
                v-model="form.content"
                rows="5"
                resize="none"></el-input>
      <el-button class="comment-submit"
                 @click="submitComment">提交评论</el-button>
    </div>
  </div>
</template>

<script>
import { empty } from '@/api/notify'
import { add, getFirsts } from '@/api/comment.js'
import { mapState } from 'vuex'
export default {
  name: 'Reply',
  props: ['articleId', 'parentId', 'fromId', 'toId'],
  created() {},
  data() {
    return {
      form: {
        id: '',
        content: '',
        parentId: this.parentId,
        articleId: this.articleId,
        fromId: this.fromId,
        toId: this.toId,
        replyTime: '',
        up: 0,
        down: 0
      }
    }
  },
  methods: {
    submitComment() {
      if (this.form.fromId) {
        if (this.form.content == '') {
          this.$alert(`评论内容不能为空!`, '提示', {
            confirmButtonText: '确定'
          })
          return
        } else {
          this.form.replyTime = new Date()
          add(this.form).then((res) => {
            this.$store.dispatch('comment/change', {
              rootId: '',
              toId: ''
            })
            let data = JSON.parse(JSON.stringify(this.form))
            data.id = res.id
            this.$emit('admitComment', data)
            this.form.content = ''
          })
        }
      } else {
        this.$alert(`登录后才能发表评论!`, '提示', {
          confirmButtonText: '确定'
        })
      }
    }
  },
  computed: {
    ...mapState({
      id: (state) => state.user.id,
      nickname: (state) => state.user.nickname,
      avatar: (state) => state.user.avatar,
      username: (state) => state.user.username,
      token: (state) => state.user.token
    }),
    hint() {
      return '发一条友善的评论'
    }
  }
}
</script>

<style lang="scss">
.comment-send {
  background-color: #fff;
  width: 100%;
  height: 90px;
  margin: 10px 0;
  box-sizing: content-box;

  .user-local {
    width: 82px;
    height: 65px;
    position: absolute;
    .avatar-img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      top: 50%;
      background-color: #f5f5f5;
      transform: translate(-50%, -50%);
      vertical-align: middle;
      .el-image {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        position: relative;
        .image-slot {
          display: flex;
          justify-content: center;
          align-items: center;

          border-radius: 50%;
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .textarea-container {
    position: relative;

    height: 64px;
    margin-left: 85px;
    margin-right: 85px;

    box-sizing: content-box;
    .ipt-txt {
      width: 100%;
      height: 100%;
      // border: 1px solid #e5e9ef;
      background-color: #f4f5f7;
      resize: none;
      font-size: 16px;
      // padding: 10px;
      .el-textarea__inner {
        height: 100%;
      }
      box-sizing: border-box;
      &:focus {
        outline-color: #1e9fff;
        background-color: #fff;
        border-color: #409eff;
      }
    }

    .comment-submit {
      position: absolute;
      top: 0;
      right: -85px;
      width: 70px;
      height: 64px;
      text-align: center;
      vertical-align: top;
      white-space: normal;
      background-color: #00a1d6;
      border: 1px solid #00a1d6;
      color: #fff;
      border-radius: 4px;
      font-size: 14px;
      min-width: 60px;
      padding: 4px 15px;
    }
  }
}
</style>

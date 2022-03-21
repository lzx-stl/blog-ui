<template>
  <div class="reply-container">
    <div class="user-local">
      <img :src="avatar" alt="">
    </div>
    <div class="comment-user">
      <textarea class="reply-input" :placeholder="hint" v-model="form.content"></textarea>
      <el-button class="reply-admit" @click="admit">提交评论</el-button>
    </div>

  </div>
</template>

<script>
import {empty} from "@/api/notify";
import {add, getFirsts} from "@/api/comment.js"
import {mapState} from 'vuex'
export default {
  name: "Reply",
  props: ['data'],
  mounted() {
    this.init();
  }, data() {
    return {
      form:{}
    }
  },
  methods: {
    init() {
      this.form = {
        id: '',
        content: '',
        parentId: this.data.parentId,
        articleId: this.$route.params.id,
        fromId: '',
        toId: this.data.toId,
        replyTime: '',
        up: 0,
        down: 0
      }
    },
    admit() {
      if (this.form.content == "") {
        this.$alert(`评论内容不能为空!`, "提示", {
          confirmButtonText: "确定",
          callback: action => {
            this.$message({
              type: "info",
              message: `action: ${action}`,
            });
          },
        });
      } else {
        this.form.fromId = this.uuid
        this.form.replyTime = new Date();
        console.log(this.form)
        add(this.form).then(res => {
          this.$message({
            message: "评论发表了哦",
            type: "success",
            offset: 250,
          });
          if (this.form.parentId)
            this.$bus.$emit('second');
          else this.$bus.$emit('add');
          this.init();
        });
      }
    },
  }, computed: {
    ...mapState({
      uuid: state => state.user.uuid,
      name: state => state.user.name,
      avatar: state => state.user.avatar,
      token: state => state.user.token,
    }),
    hint() {
      return "发一条友善的评论"
    }
  }
};
</script>

<style scoped>

.reply-container {
  background-color: #fff;
  width: 100%;
  height: 90px;
  margin: 20px auto;
  box-sizing: content-box;

}


.user-local {
  width: 82px;
  height: 65px;
  position: relative;
  float: left;
}

.user-local img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.comment-user {
  width: 655px;
  min-height: 45px;
  float: left;
}

.reply-input {
  float: left;
  border: 1px solid #e5e9ef;
  background-color: #f4f5f7;
  resize: none;
  width: 535px;
  height: 55px;
  font-size: 16px;
  box-sizing: content-box;
  padding: 10px;
  margin-right: 10px;
}

.reply-input:focus {
  outline-color: #1e9fff;
  border-color: red !important;
}


.reply-admit {
  float: left;
  width: 85px;
  height: 65px;
  background-color: #00a1d6;
  color: #fff;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: content-box;
  padding: 10px 0;
}


</style>

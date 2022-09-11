<template>
  <div class="account-info-edit__content">
    <div class="account-info-edit__avatar">
      <div class="avatar">
        <img :src="form.avatar"
             class="avatar__img">
      </div>

      <p class="account-info-edit__avatartext">修改头像</p>
    </div>
    <div class="account-info-edit__form">

      <div class="account-info-edit__item">

        <div class="account-info-edit__label">头像url</div>

        <div class="account-info-edit__value">
          <el-input type="primary"
                    v-model="form.avatar"></el-input>
        </div>
      </div>
      <div class="account-info-edit__item">

        <div class="account-info-edit__label">昵称</div>

        <div class="account-info-edit__value">
          <el-input  type="text"
                    placeholder="开始取一个有趣的名字吧～"
                    v-model="form.nickname"
                    maxlength="20"
                    show-word-limit></el-input>
        </div>
      </div>
            <div class="account-info-edit__item">

        <div class="account-info-edit__label">个人签名</div>

        <div class="account-info-edit__value">
          <el-input  type="textarea"
                    placeholder="系统默认签名"
                    v-model="form.information"
                    maxlength="48"
                    show-word-limit>
                    </el-input>
        </div>
      </div>
    </div>
    <footer class="account-info-edit__footer">
      <div class="form-button">
        <button class="form-button__button"
                @click="handleClick">保存</button>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      form: {
        uuid: '',
        nickname: '',
        avatar: '',
        information: ''
      }
    }
  },
  methods: {
    handleClick() {
      this.$store
        .dispatch('user/updateInfor', this.form)
        .then(({ nickname, avatar,information }) => {

          this.form.nickname = nickname
          this.form.avatar = avatar
          this.form.information = information;
          this.$store.dispatch('user/init')
        })
    }
  },
  computed: {
    ...mapState({
      uuid: (state) => state.user.uuid,
      nickname: (state) => state.user.nickname,
      avatar: (state) => state.user.avatar,
      username: (state) => state.user.username,
      information: (state) => state.user.information
    })
  },
  mounted() {
    this.form.uuid = this.uuid
    this.form.nickname = this.nickname
    this.form.avatar = this.avatar
    this.form.username = this.username
    this.form.information = this.information
  }
}
</script>

<style lang="scss">
.account-info-edit__content {
  padding: 40px 30px 100px;
  .account-info-edit__avatar {
    position: relative;
    text-align: center;
    width: 120px;
    margin: 0 auto 23px;
    .avatar {
      cursor: pointer;
      width: 120px;
      height: 120px;
      margin-bottom: 23px;
      .avatar__img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 1px solid #ebebeb;
        vertical-align: top;
      }
    }
    .account-info-edit__avatartext {
      cursor: pointer;
      color: #00c3ff;
      font-size: 12px;
    }
  }

  .account-info-edit__form {
    line-height: 44px;
    .account-info-edit__item {
      display: flex;
      margin-bottom: 10px;
      .account-info-edit__label {
        width: 60px;
        text-align: right;
        color: #999;
        margin-right: 30px;
      }
      .account-info-edit__value {
        flex-grow: 1;
      }
    }
  }

  .account-info-edit__footer {
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }
}
</style>
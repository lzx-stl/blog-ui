 <template>
  <div class="user-zone">
    <button class="login-btn"
            v-if="!isLogin"
            @click="dialogVisible = true">
      登录
    </button>
    <div class="header-avatar-wrap"
         v-if="isLogin">
      <el-popover placement="bottom"
                  width="150"
                  trigger="hover">

        <div class="avatar-panel">
          <div class="nick-name"> {{nickname}}
          </div>
          <div class="pannel-menu">
            <a :href="`/accountCenter/bookList?id=${id}`">

              <div class="pannel-menu-item">
                个人中心
              </div>
            </a>
            <div class="pannel-menu-item"
                 @click="logout">退出</div>
          </div>
        </div>
        <div slot="reference">
          <a :href="`/accountCenter/bookList?id=${id}`" v-if="avatar">

            <img class="avatar"
                 v-lazy="avatar"
                 :alt="nickname"
                 :class="{ 'avatar-hover': isHover }" />
          </a>
        </div>
      </el-popover>
    </div>
    <el-dialog title="登录"
               center
               :visible.sync="dialogVisible"
               width="30%"
               top="23vh"
               :close-on-click-modal="false"
               :modal-append-to-body='false'>
      <login-form />
    </el-dialog>
  </div>
</template>
 
 <script>
import { mapGetters } from 'vuex'
import LoginForm from '@/views/login/components/LoginForm.vue'
import { getToken } from '@/utils/auth'

export default {
  components: {
    LoginForm
  },
  computed: {
    ...mapGetters(['id', 'avatar', 'nickname'])
  },
  data() {
    return {
      dialogVisible: false,
      isLogin: false,
      isHover: false,
      visible: false,
      pannelVisable: false
    }
  },
  created() {
    this.isLogin = getToken()
  },
  methods: {
    handleClick() {
      this.$router.push({
        path: '/login',
        query: {
          redirect: this.$route.path
        }
      })
    },
    handleClose() {},
    logout() {
      this.$store.dispatch('user/logout')
      this.isLogin = false
    }
  }
}
</script>
 
 <style lang="scss">
.user-zone {
  .header-avatar-wrap {
    width: 48px;
    height: 48px;
    // background-color: #32ca99;
    .avatar {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .avatar-hover {
    transform-origin: top;
    transition-duration: unset;
    &:hover {
      transform: scale(1.72);
    }
  }
}
.avatar-panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #fff;
  border-radius: 6px;

  .pannel-menu {
    width: 100%;
    padding: 10px;
    .pannel-menu-item {
      border-radius: 4px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      & + .pannel-menu-item {
        border-top: 1px solid #f5f5f5;
      }
      &:hover {
        background-color: #f5f5f5;
      }
    }
  }
  .nick-name {
    // display: flex;
    // justify-content: center;
    font-size: 18px;
    font-family: PingFang SC, HarmonyOS_Medium, Helvetica Neue, Microsoft YaHei,
      sans-serif;
    font-weight: 500;
  }
}

.login-btn {
  cursor: pointer;
  height: 40px;
  font-size: 14px;
  padding: 10px 30px;
  border-radius: 8px;
  background-color: #32ca99;
  color: #fff;
  border: 0;
  // vertical-align: top;
}
</style>
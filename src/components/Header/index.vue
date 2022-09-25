<template>
  <div class="header-container">
    <div class="logo">
      <a href="/"></a>
    </div>
    <div class="header-nav">
      <div class="header-nav-menu">
        <div class="header-nav-menu__item"
             v-for="item in routers"
             :key="item.name"
             :class="{ 'menu-active': $route.path == item.path }">
          <router-link :to="item.path">
            {{ item.text }}
          </router-link>
          <div class="line"
               v-show="$route.path == item.path"></div>
        </div>
      </div>

      <!-- <div class="header-search">
        <el-autocomplete v-model="state"
                         :fetch-suggestions="querySearchAsync"
                         placeholder="请输入内容"
                         @select="handleSelect"
                         suffix-icon="el-icon-search">
          tm
        </el-autocomplete>
      </div> -->

      <div class="user-zone">
        <button class="login-btn"
                v-if="!isLogin"
                @click="handleClick">
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
                <a :href="`/accountCenter/${uuid}`">

                  <div class="pannel-menu-item">
                    个人中心
                  </div>
                </a>
                <div class="pannel-menu-item"
                     @click="logout">退出</div>
              </div>
            </div>
            <div slot="reference">
              <a :href="`/accountCenter/${uuid}`">

                <el-image class="avatar"
                          :src="avatar"
                          :alt="nickname"
                          :class="{ 'avatar-hover': isHover }"></el-image>
              </a>
            </div>
          </el-popover>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { getToken, setBack } from '@/utils/auth'
import { mapState } from 'vuex'
import Search from '@/components/Search'

export default {
  name: 'Header',
  components: {
    Search
  },
  data() {
    return {
      // 这里应该是从动态中获取的
      routers: [
        { text: '首页', path: '/home' },
        { text: '专栏', path: '/category' },
        { text: '图床', path: '/imagebed' },
        { text: '随笔', path: '/eventline' }
        // { text: '资源', path: '/resources' }
      ],
      visible: false,
      pannelVisable: false,
      activeIndex: -1,
      isLogin: false,
      isHover: false
    }
  },
  methods: {
    goto(path) {
      this.$router.push(path)
    },
    handleClick() {
      setBack(this.$route.path)
      this.$router.push({ path: '/login' })
    },
    logout() {
      this.$store.dispatch('user/logout')
      this.isLogin = false
    }
  },
  computed: {
    ...mapState({
      uuid: (state) => state.user.uuid,
      nickname: (state) => state.user.nickname,
      avatar: (state) => state.user.avatar,
      username: (state) => state.user.username,
      token: (state) => state.user.token
    })
  },
  mounted() {
    if (getToken()) {
      this.$store.dispatch('user/getInfor', getToken())
      this.isLogin = true
    }
  }
}
</script>

<style scoped lang="scss">
.header-container {
  /*color: #409eff;*/
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  width: 100%;

  height: 60px;
  position: fixed;
  top: 0;
  z-index: 1999;
  .logo {
    float: left;
    margin-left: 50px;
    width: 48px;
    height: 48px;
    border-radius: 4px;
    margin-top: 6px;
    background-color: #32ca99;
    background-image: url('@/assets/logo.png');
    background-size: 100% 100%;
    a{
      display: block;
      width: 100%;
      height: 100%;
    }
  }
}

.header-nav {
  width: 1250px;
  height: 100%;
  color: #1f2233;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 150px;
  .header-nav-menu {
    height: 100%;
    display: flex;
    .header-nav-menu__item {
      cursor: pointer;
      height: 100%;
      padding: 0 12px;
      position: relative;
      a {
        height: 100%;
        display: flex;
        align-items: center;
        color: #333;
        &:hover {
          color: #32ca99;
        }
      }
      .line {
        background-color: #32ca99;
        border-top-right-radius: 2px;
        bottom: 8px;
        height: 4px;
        left: 50%;
        margin-left: -6px;
        padding: 0;
        position: absolute;
        width: 12px;
      }
    }

    .menu-active {
      a {
        color: #32ca99;
      }
    }
  }

  .header-search {
    width: 280px;
    margin-right: 150px;
    margin-left: auto;
    .el-autocomplete {
      width: 100%;
    }
  }
}

.user-zone {
  .header-avatar-wrap {
    width: 48px;
    height: 48px;
    // background-color: #32ca99;
    .avatar {
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

<template>
  <div class="header-container">

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

      <div class="header-search">
        <!-- <el-autocomplete v-model="state"
                         :fetch-suggestions="querySearchAsync"
                         placeholder="请输入内容"
                         @select="handleSelect"
                         suffix-icon="el-icon-search">
                         tm
                         </el-autocomplete> -->
      </div>

      <div class="user-zone">
        <a v-if="isLogin"
           :href="`/accountCenter/${uuid}`">
          <el-image class="avatar"
                    :src="avatar"
                    :alt="nickname"
                    :class="{ 'avatar-hover': pannelVisable }"></el-image>
        </a>

        <button class="login-btn"
                v-if="!isLogin"
                @click="visible=true">
          登录
        </button>
      </div>

    </div>

    <el-dialog title="登录"
               :visible.sync="visible"
               center
               width="40%"
               top="91px"
               :close-on-click-modal="false"
               append-to-body
               :modal="false">
      <login-form />
      <!-- <span slot="footer"
            class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary"
                   @click="visible = false">确 定</el-button>
      </span> -->
    </el-dialog>
    <div class="avatar-panel"
         v-if="isLogin">
      <div class="nick-name"> {{nickname}}
      </div>
      <div class="pannel-menu">
        <div class="pannel-menu-item">
          个人中心
        </div>
        <div class="pannel-menu-item"
             @click="logout">退出</div>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
import openWindow from '@/utils/open-window'
import { getToken } from '@/utils/auth'
import { mapState } from 'vuex'
import LoginForm from './components/LoginForm'

import Search from '@/components/Search'

export default {
  name: 'Header',
  components: {
    LoginForm,
    Search
  },
  data() {
    return {
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
      isLogin: ''
    }
  },
  methods: {
    goto(path) {
      this.$router.push(path)
    },
    login(source) {
      login(source).then(res)
      {
      }
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
    if (getToken())
      this.$store.dispatch('user/getInfor', getToken()), (this.isLogin = true)
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
}

.header-nav {
  width: 1200px;
  height: 100%;
  color: #1f2233;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
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
  .user-zone {
    display: flex;
    align-items: center;
    .avatar {
      display: block;
      width: 48px;
      height: 48px;
      position: relative;
      z-index: 2;
      border-radius: 50%;
      transition: all 0.2s ease;
      transform-origin: top;
      &:hover {
        transform: scale(1.72);
      }
    }
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

.avatar-hover {
}

.avatar-panel {
  cursor: pointer;
  width: 150px;
  background-color: #fff;
  position: absolute;
  right: 100px;
  top: 62px;
  border-radius: 6px;
  z-index: 1;
  .pannel-menu {
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
    display: flex;
    margin: 30px;
    justify-content: center;
    font-size: 18px;
    font-family: PingFang SC, HarmonyOS_Medium, Helvetica Neue, Microsoft YaHei,
      sans-serif;
    font-weight: 500;
  }
}
</style>

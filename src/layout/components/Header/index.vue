<template>

  <div class="header-container">
    <ul class="header-nav">
      <li>
        <span @click="goto('/home')">
          <i class="iconfont icon-icons_home"></i> 首页</span>
      </li>
      <li>
        <span
           @click="goto('/category')">
          <i class="iconfont icon-fenlei1"></i> 专栏</span>
      </li>
      <li><span  @click="goto('/eventLine')">
        <i class="iconfont icon-guidang"></i>
        随笔</span>
      </li>
      <li><span
             @click="goto('/resources')">
        <i class="iconfont icon-fenxiang"></i>
        分享</span>
      </li>
<!--      <li><span -->
<!--             @click="goto('aboutMe')">-->
<!--        <i class="iconfont icon-yezi"></i>-->
<!--        关于</span>-->
<!--      </li>-->
    </ul>
    <img class="avatar" :src="avatar"
         :alt="name"
         v-if="isLogin">
    <button class="login-btn" @click="logout" v-if="isLogin">注销</button>
    <button class="login-btn"
            @click="login()" v-if="!isLogin">登录
    </button>
  </div>
</template>

<script>
import {login} from '@/api/user'
import openWindow from '@/utils/open-window'
import {getToken} from "../../../utils/auth";
import {mapState} from 'vuex'
export default {
  name: 'Header',
  methods: {
    goto(path) {
      this.$router.push(path);
    }, login() {
       login('gitee').then(res => {
         openWindow(res, "第三方登录", 800, 600)
       }).then(()=>{})
    }, logout() {
      this.$store.dispatch('user/logout');
    }
  },
  computed: {
    ...mapState({
      uuid: state => state.user.uuid,
      name: state => state.user.name,
      avatar: state => state.user.avatar,
      token: state => state.user.token,
    }),
    isLogin() {
      return this.token != "";
    }
  },mounted() {
    if(getToken()) this.$store.dispatch('user/getInfor', getToken());
  }
}
</script>

<style scoped>

.header-container {
  /*color: #409eff;*/
  position: relative;
  width: 100%;
  height: 60px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  background-color: #000;
  opacity: .8;
  color: #999;
}

.header-nav {
  width: 480px;
  height: 60px;
  margin: 0 auto;
  padding: 0;
  list-style: none;
}


ul li {
  float: left;
  height: 57px;
  cursor: pointer;
  /*font-size: 20px;*/
  line-height: 57px;
  margin-left: 40px;
}

li:first-child {
  margin: 0;
}


span {
  display: inline-block;
  color: #999;
  text-decoration: none;
}

.header-container .header-nav span:hover {
  color: orange;
  border-bottom: 3px solid orange;
}

.login-btn {
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 100px;
  height: 60px;
  font-size: 20px;
  color: #fff;
  background-color: transparent;
  border: 0;
  line-height: 60px;
}

.avatar {
  position: absolute;
  top: 5px;
  right: 150px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

</style>

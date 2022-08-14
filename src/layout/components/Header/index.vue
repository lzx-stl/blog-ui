<template>

  <div class="header-container">

    <ul class="header-nav">
      <li v-for="(o,index) in routers"
          :key="o.name"
          :class="{'active': activeIndex == index}"
          @click="activeIndex = index">
        <span @click="goto(o.name)">
          {{o.text}}</span>
      </li>
    </ul>
    <a href="">
      <el-image class="avatar"
                :src="avatar"
                :alt="nickname"
                v-if="isLogin"
                :class="{'avatar-hover' : isVisable}"
                @mouseover="inAvatar=true"></el-image>
    </a>
    <button class="login-btn"
            @click="logout"
            v-if="isLogin">注销</button>
    <button class="login-btn"
            v-if="!isLogin"
            @click="visible=true">
      登录
    </button>
    <el-dialog title="登录"
               :visible.sync="visible"
               center
               width="40%"
               append-to-body
               :modal="false">
      <span>需要注意的是内容是默认不居中的</span>

      <login-form />
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary"
                   @click="visible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- <div class="avatar-panel"
         v-if="isVisable"
         @mouseover="inAvatarPanel=true"
         @mouseleave="inAvatarPanel=false">
      <a class="nick-name">
        {{nickname}}</a>
        <a href=""></a>
    </div> -->

  </div>
</template>

<script>
import { login } from '@/api/user'
import openWindow from '@/utils/open-window'
import { getToken} from '@/utils/auth'
import { mapState } from 'vuex'
import LoginForm from './components/LoginForm'

export default {
  name: 'Header',
  components: {
    LoginForm
  },
  data() {
    return {
      routers: [
        { text: '首页', name: '/home' },
        { text: '专栏', name: '/category' },
        { text: '图床', name: '/resources' },
        { text: '文件上传', name: 'eventLine' },
        { text: '听歌', name: '/1' },
        { text: '追番', name: '/2' },
        { text: '计算器', name: '/3' }
      ],
      visible: false,
      inAvatar: false,
      inAvatarPanel: false,
      activeIndex: -1
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
    }
  },
  computed: {
    ...mapState({
      uuid: (state) => state.user.uuid,
      nickname: (state) => state.user.nickname,
      avatar: (state) => state.user.avatar,
      token: (state) => state.user.token
    }),
    isLogin() {
      return this.token != ''
    },
    isVisable() {
      console.log(this.inAvatar, this.inAvatarPanel)
      return this.inAvatar || this.inAvatarPanel
    }
  },
  mounted() {
 
  
    console.log(`token`, getToken())
    if (getToken()) this.$store.dispatch('user/getInfor', getToken())
  }
}
</script>

<style scoped lang="scss">
.header-container {
  /*color: #409eff;*/
  width: 100%;
  height: 60px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  position: fixed;
  top: 0;
  z-index: 2000;
  color: #000;
}

.header-nav {
  height: 60px;
  padding-left: 50px;
  list-style: none;
}

ul li {
  float: left;
  height: 60px;
  cursor: pointer;
  /*font-size: 20px;*/
  line-height: 60px;
  margin-left: 40px;
}

li:first-child {
  margin: 0;
}

.header-container .header-nav span:hover {
  color: #32ca99;
}

.active {
  border-bottom: 4px solid #32ca99;
  color: #32ca99;
}

.login-btn {
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 100px;
  height: 40px;
  font-size: 14px;
  padding: 10px 30px;
  border-radius: 8px;
  background-color: #32ca99;
  color: #fff;
  border: 0;
}

.avatar {
  position: absolute;
  top: 5px;
  right: 250px;

  z-index: 2;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  transition: all 0.2s ease;
  transform-origin: top right;
}

.avatar-hover {
  // transform: scale(1.72);
}

.avatar-panel {
  cursor: pointer;
  width: 300px;
  height: 70px;
  background-color: #fff;
  position: absolute;
  right: 145px;
  top: 65px;
  border: 2px solid #fc8bab;
  border-radius: 6px;
  z-index: 1;
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

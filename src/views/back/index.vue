<template>
  <el-container style="height: 100%">
    <el-container>
      <el-aside width="200px"
                style="overflow: hidden;background-color: #1c1b22">
        <div class="user">
          <img :src="$store.state.user.avatar"
               alt="">
          <h2>{{$store.state.user.username}}</h2>
        </div>

        <el-button type="primary"
                   style="margin-top:30px"
                   @click="loginOut">退出</el-button>

        <el-col :span="99"
                style="margin-top: 50px">
          <el-menu default-active="2"
                   class="el-menu-vertical-demo"
                   @open="handleOpen"
                   @close="handleClose"
                   background-color="#1c1b22"
                   text-color="#fff"
                   active-text-color="orange"
                   router>
            <!-- <el-submenu index="">
              <template slot="title">
                <i class="iconfont icon-iconfontpaixingbang"></i>
                数据
              </template>

              <el-menu-item index="">作品数据</el-menu-item>

              <el-menu-item index="">粉丝数据</el-menu-item>

            </el-submenu> -->

            <el-submenu index="2">
              <template slot="title">
                <i class="iconfont icon-guanli1"></i>
                管理
              </template>
              <el-menu-item index="/back/articleTable">文章</el-menu-item>
              <el-menu-item index="/back/commentTable">评论</el-menu-item>
              <el-menu-item index="/back/tagTable">标签</el-menu-item>
              <el-menu-item index="/back/eventTable">随笔</el-menu-item>
              <el-menu-item index="/back/pictureTable">图片</el-menu-item>
              
            </el-submenu>
              <el-menu-item index="/back/personalConfig">
              <i class="iconfont icon-apphoutaiguanli"></i>
              个性化</el-menu-item>
            
          </el-menu>

        </el-col>

      </el-aside>

      <el-main style="height:100%">

        <router-view></router-view>

      </el-main>
    </el-container>
  </el-container>

</template>

<script>
import { getInformation,logout } from '@/api/user'
export default {
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  methods: {
    loginOut() {

    },
    //left
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },

    //head
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    writeArtile() {
      this.$router.push({
        name: 'editor'
      })
    }
  }
}
</script>

<style>
el-menu-item:focus,
.el-menu-item:hover {
  background-color: #409eff !important;
}

.el-submenu:hover {
  background-color: #409eff !important;
}

.el-aside .user {
  margin: 20px auto 0 auto;
  width: 150px;
  height: 200px;
}

.el-aside .user h2 {
  width: 150px;
  margin: 10px auto;
  color: #fff;
  font-family: 'STXingkai';
}

.el-aside .user img {
  width: 144px;
  height: 144px;
  border: 5px solid #b2b2b2;
  border-radius: 50%;
}

.el-aside a {
  text-decoration: none;
}

.el-aside li {
  list-style: none;
}

.return {
  display: block;
  border: 0;
  width: 100px;
  height: 60px;
  background-color: #409eff;
  cursor: pointer;
  color: #fff;
}

.el-header {
  background-color: #b3c0d1;
  padding: 0;
}

.el-menu--horizontal {
  background-color: #1c1b22;
  color: #fff;
}

.el-submenu__title {
  color: #fff;
}

.el-menu-item.is-active {
  color: red;
}

.el-menu ul {
  width: 100%;
  height: auto;
}

.el-aside li,
.el-aside a {
  width: 200px;
}
.el-menu-item:focus,
.el-menu-item:hover {
  background-color: #409eff;
}

.el-menu-demo {
  background-color: #1c1b22;
}

.el-header,
.el-footer {
  background-color: #1c1b22;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
}

.el-menu {
  background-color: #1c1b22;
}

.el-menu ul {
  padding: 0;

  margin: 0;
  color: #fff;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}

body > .el-container {
  height: 900px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
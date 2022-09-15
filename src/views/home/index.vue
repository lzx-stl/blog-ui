<template>
  <div class="home-container">
    <div class="topBg"
         :style="{ backgroundImage: `url(${topImg})` }">
      <div class="down">
        <i class="iconfont icon-arrow-copy"
           @click="scrollWindow"></i>
      </div>
      <!--      <carousel :list="list"/>-->
      <!-- <el-button @click="down"
                 style="margin:0 auto">
        <i class="iconfont icon-arrow-copy"></i>
      </el-button> -->

      <!-- <TopCard></TopCard> -->
    </div>
    <div class="main"
         :style="{backgroundImage: `url(${mainImg})`}">

      <div class="layout">
        <div class="layout-main">

          <!-- <div class="home-header">
          <Banner />
        </div> -->
          <div class="article-list">
            <ArticleList></ArticleList>
          </div>
        </div>
        <div class="layout-sub">
          <SideMenu>
            <template v-slot:header>
              <h2 class="side-section__title">推荐用户</h2>
              <div class="side-section__link">
                <a href="">更多</a>
              </div>
            </template>
            <template v-slot:content>
              <div class="hot-articles">
                <div class="hot-item" 
                     v-for="item of users"
                     :key="item[0]">
                  <img :src="item[1].avatar"
                       class="user-avatar"
                       alt="">
                  <div class="infor">{{item[1].nickname}}</div>
                  <el-button type="primary">关注</el-button>
                </div>
              </div>
            </template>
          </SideMenu>

          <SideMenu>
            <template v-slot:header>
              <h2 class="side-section__title">热门文章</h2>
              <div class="side-section__link">
                <a href="">更多</a>
              </div>
            </template>
            <template v-slot:content>
              <div class="hot-articles">
                <div class="hot-item"
                     v-for="i in 5"
                     :key="i">

                  <div class="infor">你滴勋宗</div>
                  <div class="hot-num">1185448</div>
                </div>
              </div>
            </template>
          </SideMenu>

          <SideMenu>
            <template v-slot:header>
              <h2 class="side-section__title">热门话题</h2>
              <div class="side-section__link">
                <a href="">更多</a>
              </div>
            </template>
            <template v-slot:content>
              <div class="hot-articles">
                <div class="hot-item"
                     v-for="i in 5"
                     :key="i">
                  <div class="infor">你滴勋宗</div>
                </div>
              </div>
            </template>
          </SideMenu>

        </div>

      </div>

    </div>
    <Footer />
    <BackToTop />
  </div>
</template>

<script>
import { getConfig } from '@/api/config'
import Banner from '@/components/Banner'
import ArticleList from '@/components/ArticleList/index'

import TagCard from './components/TagCard'
import MyCard from './components/MyCard'
import SideMenu from './components/SideMenu'

import Search from '../../components/HeaderSearch/index'
import Footer from '@/components/Footer'
import BackToTop from '@/components/BackToTop'

import { mapState } from 'vuex'
import { Avatar } from 'element-ui'

export default {
  name: 'Home',
  components: {
    Banner,
    ArticleList,
    Search,
    TagCard,
    MyCard,
    Footer,
    BackToTop,
    SideMenu
  },
  data() {
    return {
      show: false,
      url: 'https://upload-bbs.mihoyo.com/upload/2022/05/09/287482956/a1c1d53d6842a703435b5057bd1d8c22_2060042160345570154.png?x-oss-process=image//resize,s_600/quality,q_80/auto-orient,0/interlace,1/format,png',
      avatar:
        'https://img-static.mihoyo.com/communityweb/upload/a17a95fb1724d2d4492987b50c56f7eb.png',
    }
  },
  mounted() {
  },
  computed: {
    ...mapState({
      users: (state) => state.user.users,
      topImg: (state) => state.config.topImg,
      mainImg: (state) => state.config.mainImg
    })
  },
  methods: {
    scrollWindow(event) {
      // window.scrollto
      window.scrollTo({
        top: 720,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style lang="scss">
.home-container {
  padding-top: 60px;
  background-size: 100% 100%;

  background-attachment: fixed;
  // background-color: #f5f5f5;
  min-height: 1000px;
  .home-header {
    width: 700px;
    margin-bottom: 30px;
  }
}

.topBg {
  width: 100%;
  height: 720px;
  background-size: 100% 100%;
  position: relative;
  overflow: hidden;
}

.blogName {
  font-family: 'STXingkai';
  color: black;
  text-align: center;
  position: relative;
  font-size: 30px;
  top: 50%;
  left: 25%;
}

.main {
  padding-top: 20px;
  background-size: 100% 100%;
  background-attachment: fixed;
}

.down {
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  font-size: 30px;
  font-weight: 800;
  z-index: 15;
  position: absolute;
  top: 560px;
  left: 50%;
  transform: translateX(-50%);
  /* background-color: red; */
}

@keyframes up_down {
  0% {
    top: 0;
  }
  50% {
    top: -10px;
  }
  100% {
    top: 0;
  }
}

.down > i {
  color: #fff;
  opacity: 0.5;
  cursor: pointer;
  position: absolute;
  left: 15px;
  animation-name: up_down;
  animation-timing-function: ease-in-out;
  /* animation-delay: 0.3s; */
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  font-size: 70px;
  font-weight: 500;
}

.layout {
  width: 1000px;
  min-height: 700px;
  margin: 0 auto;
  padding: 0 100px;
  // background-color: #f5f5f5;
  box-sizing: content-box;
  &::after {
    content: '';
    display: block;
    visibility: hidden;
    height: 0;
    clear: both;
    font-size: 0;
  }
  .layout-main {
    float: left;
    width: 700px;
  }
  .layout-sub {
    float: right;
    width: 280px;
  }

  .hot-articles {
    .hot-item {
      display: flex;
      align-items: center;
      & + .hot-item {
        margin-top: 20px;
      }
      .infor {
        margin-left: 10px;
        flex-grow: 1;
        color: #666;
      }
      .user-avatar {
        width: 44px;
        height: 44px;
        border-radius: 50%;
      }
    }

    .hot-num {
      font-style: italic;
      color: red;
    }
  }
}
</style>

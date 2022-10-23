<template>
  <div class="home-container">

    <div class="main">

      <div class="layout">

        <div class="layout-main">
          <div class="banner-box">
            <banner :list="bannerList" />
          </div>

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
                  <a :href="`/accountCenter/bookList?id=${item[1].id}`"
                     target="_blank"
                     class="user-card__link"><img v-lazy="item[1].avatar"
                         class="user-avatar"
                         alt="">
                  </a>
                  <div class="infor">
                    <a :href="`/accountCenter/bookList?id=${item[1].id}`"
                       class="user-card__link">{{item[1].nickname}}
                    </a>
                  </div>
                  <button class="user-follow">关注</button>
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

                  <div class="infor">咕咕咕</div>
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
                  <div class="infor">咕咕咕</div>
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
import Banner from '@/components/Banner'
import ArticleList from '@/components/ArticleList/index'

import TagCard from './components/TagCard'
import MyCard from './components/MyCard'
import SideMenu from '@/components/SideMenu'

import Footer from '@/components/Footer'
import BackToTop from '@/components/BackToTop'

import { mapState , mapGetters} from 'vuex'

export default {
  name: 'Home',
  components: {
    Banner,
    ArticleList,
    TagCard,
    MyCard,
    Footer,
    BackToTop,
    SideMenu
  },
  data() {
    return {}
  },
  created() {},
  mounted() {},
  computed: {
    ...mapState({
      users: (state) => state.user.users
    }),
    ...mapGetters(['bannerList'])
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
  background-color: #f5f5f5;
  background-attachment: fixed;

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
.article-list {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  // min-height: 700px;
  margin: 0 auto;
  padding: 0 100px;
  // background-color: #f5f5f5;
  box-sizing: content-box;

  .banner-box {
    margin-bottom: 20px;
  }
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
      }
      .user-avatar {
        width: 44px;
        height: 44px;
        border-radius: 50%;
      }
      .user-follow {
        background-color: #00c3ff;
        border-radius: 13px;
        height: 26px;
        line-height: 26px;
        font-size: 14px;
        width: 70px;
        display: inline-block;
        color: #fff;
        text-align: center;
        cursor: pointer;
        border: none;
      }
    }

    .hot-num {
      font-style: italic;
      color: red;
    }
  }
}
</style>

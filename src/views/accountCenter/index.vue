<template>
  <div class="main-page">

    <div class="layout">
      <div class="bg"></div>
      <div class="container account-center-header">
        <div class="account-center-header__avatar">
          <img :src="user.avatar"
               alt="" />
        </div>
        <div class="account-center-user">
          <div class="account-center-user__header">
            <div class="account-center-user__title">
              <span class="account-center-user__name">{{user.nickname}}</span>
            </div>
            <div class="form-button">
              <button class="form-button__button"
                      @click="activeText = '编辑资料'"
                      v-if="$store.getters.id === id">编辑</button>
            </div>

          </div>
          <div class="account-center-user__intro">
            <span style="margin-right: 20px;">个性签名</span>
            <p>{{user.information}}</p>
          </div>
          <!-- <div class="account-center-user__intro">IP</div>
          <div class="account-center-header__data">

            <div class="account-center-header__data-item"><a href=""
                 class="data-num">{{fansCount}}</a>
              <div class="label">粉丝</div>
            </div>
            <div class="account-center-header__data-item"><a href=""
                 class="data-num">{{followsCount}}</a>
              <div class="label">关注</div>
            </div>
            <div class="account-center-header__data-item">获赞</div>
          </div> -->
        </div>

      </div>
      <div class="side-menu container">
        <div class="side-menu__header">个人中心</div>
        <ul class="side-menu__list">
          <router-link v-for="item in userRoutes.children"
                       :key="item.path"
                       :to="{path: resolvePath(item.path), query: {id}}"
                       class="side-menu__item"
                       :class="{'active': item.meta.name == $route.meta.name}">
            <i :class="'iconfont ' + item.meta.icon"></i>
            <span>{{ item.meta.name }}</span>
          </router-link>
        </ul>
      </div>
      <div class="account-center-content container">
        <div class="account-center__subheader">{{ $route.meta.name }}</div>
        <div class="acount-subbody">
          <keep-alive>

            <router-view :key="key" />
          </keep-alive>

        </div>

      </div>

      <div class="clear"></div>
    </div>

    <div class="clear"></div>
    <BackToTop />
  </div>
</template>

<script>
import path from 'path'
import BackToTop from '@/components/BackToTop'

import CommentList from './components/CommentList'
import { getInformation, getFansCount, getFollowsCount } from '@/api/user'
import { mapState, mapGetters } from 'vuex'
import { userRoutes } from '@/router'
import { isExternal } from '@/utils/validate'
import { log } from 'console'
export default {
  name: 'accountCenter',
  components: {
    BackToTop,
    CommentList
  },
  props: ['id'],
  data() {
    return {
      basePath: '',
      user: {},
      activeText: '',
      fansCount: 0,
      followsCount: 0,
      likesCount: 0,
      url: 'http://thirdqq.qlogo.cn/g?b=oidb&k=wI8yLs7abh13VwaTQBic9NA&s=100&t=1613243338',
      list: []
    }
  },
  computed: {
    ...mapGetters(['userRoutes']),
    key() {
      return this.$route.path
    }
  },
  created() {
    getInformation(this.id).then((res) => {
      this.user = res.user
    })
    getFansCount(this.id).then((res) => {
      this.fansCount = res.count
    })

    getFollowsCount(this.id).then((res) => {
      this.followCount = res.count
    })
  },
  methods: {
    handleClick(path, id) {
      this.$router.push({
        path: path,
        query: {
          id
        }
      })
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  },
  mounted() {
    this.basePath = userRoutes.path
    console.log('refresh', userRoutes)
    //bu退出登录后头像和名字无法获取
  }
}
</script>

<style lang="scss" scoped>
.main-page {
  width: 100%;
  height: 100%;
  padding: 55px 0 180px 0;
  background-color: #f5f5f5;

  .layout {
    .bg {
      height: 250px;

      border-top-left-radius: 6px;

      border-top-right-radius: 6px;
      overflow: hidden;
      margin-bottom: 20px;
      background-image: url('https://upload-bbs.mihoyo.com/upload/2022/02/08/73491413/51df9519bdcdb4f42a630497f19b1485_4543259733633110045.jpg?x-oss-process=image//resize,s_600/quality,q_80/auto-orient,0/interlace,1/format,jpg');
      background-size: cover;
    }
    width: 1000px;
    margin: 0 auto;
    padding: 30px 100px;
    // overflow: auto;
    box-sizing: content-box;
    .account-center-header {
      padding: 20px 50px;
      display: flex;
      margin-bottom: 20px;
      border-radius: 6px;

      .account-center-header__avatar {
        width: 120px;
        height: 120px;
        margin-right: 24px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 1px solid #ebebeb;
          vertical-align: top;
        }
      }

      .account-center-user {
        -webkit-box-flex: 1;
        flex-grow: 1;
        height: 100%;

        .account-center-user__header {
          display: flex;
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
          .account-center-user__title {
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            .account-center-user__name {
              font-size: 16px;
              line-height: 21px;
              font-weight: 600;
            }
          }
        }

        .account-center-user__intro {
          display: flex;

          margin-top: 12px;
          color: #666;
          line-height: 18px;
        }
        .account-center-header__data {
          display: flex;
          padding-top: 19px;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          -ms-flex-item-align: center;
          align-self: center;
          -ms-flex-negative: 0;
          flex-shrink: 0;
          margin-top: 20px;
          border-top: 1px solid #f0f0f0;

          .account-center-header__data-item {
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            padding-right: 40px;
            .data-num {
              color: #333;
              font-size: 20px;
            }
            .label {
              margin-left: 10px;
            }
          }
        }
      }
    }

    .side-menu {
      width: 280px;
      float: left;
      .side-menu__header {
        width: 100%;
        padding: 0 30px;
        line-height: 50px;
        border-bottom: 1px solid #ebebeb;
        font-size: 16px;
      }
      .side-menu__list {
        padding: 0 30px 10px;
        .side-menu__item {
          padding: 0 20px;
          line-height: 50px;
          font-size: 14px;
          color: #666;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          cursor: pointer;
          span {
            margin-left: 10px;
          }
        }
        .active {
          color: #00c3ff;
        }
      }
    }
    .account-center-content {
      width: 700px;
      float: right;

      .account-center__subheader {
        width: 100%;
        padding: 0 30px;
        line-height: 50px;
        border-bottom: 1px solid #ebebeb;
        font-size: 16px;
      }
    }
    // .account-center__menu {
    // }
  }
}
</style>

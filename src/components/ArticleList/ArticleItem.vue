<template>
  <div class="article-card">
    <div class="article-card__header">

      <div class="article-card__userinfo">
        <!-- <a :href="`/accountCenter/bookList?id=${article.authorId}`">

          <div class="artilce-user__avatar">
            <img v-lazy="article.authorAvatar"
                 alt="">

          </div>
          <div class="artilce-user__name">{{article.authorNickname}}</div>
        </a> -->

      </div>
    </div>

    <a class="article-card__link"
       :href="`/article/details/${article.id}`"
       target="_blank">

      <div class="article-card__body">
        <div class="article-card__title">
          <h3>{{article.title}}</h3>
        </div>
        <div class="article-card__preview">
          <img v-lazy="article.mainImg" 
               alt="">
        </div>
        <!-- <div class="article-card__infor">

        </div> -->
      </div>
    </a>
    <div class="article-card__footer">

      <el-tag class="tag"
              type="info"
              v-for="tag in tagList"
              :key="tag">{{tag}}</el-tag>
      <div class="article-card__data">
        <i class="iconfont icon-liulanliang1"> {{status.readings}}</i>
        <i class="iconfont icon-pinglun4"> {{status.replys}}</i>
        <i class="iconfont icon-zhichi"> {{status.likes}}</i>
      </div>
    </div>
  </div>

</template>

<script>
import { getTags } from '@/api/tag'
export default {
  name: 'articleItem',
  props: ['article', 'status', 'tagList'],
  created() {}
}
</script>

<style lang="scss">
.article-card {
  width: 100%;
  padding: 24px 30px 15px 30px;
  color: #b3b3b3;
}
.article-card + .article-card {
  border-top: 1px solid #ebebeb;
}
.article-card__header {
  // background: red;
  // display: flex;
  // -webkit-box-align: center;
  // -ms-flex-align: center;
  // align-items: center;
  margin-bottom: 15px;
  position: relative;

  .article-card__userinfo {
    .artilce-user__avatar {
      display: inline-block;
      width: 32px;
      height: 32px;

      img {
        width: 100%;

        border: 1px solid #ebebeb;
        border-radius: 50%;
      }
    }

    .artilce-user__name {
      height: 32px;
      line-height: 32px;
      margin-left: 10px;
      color: #666;
      display: inline-block;
      vertical-align: top;
    }
    .artilce-user__name:hover {
      color: #00c3ff;
    }
  }
}

.article-card__link {
  .article-card__title {
    font-weight: 600;
    margin-bottom: 15px;
    color: #333;
    &:hover + {
      color: #00c3ff;
    }
  }
  .article-card__body {
    // background-color: #00c3ff;
    .article-card__preview {
      display: inline-block;
      width: 250px;
      img {
        width: 100%;
        border-radius: 5px;
        vertical-align: bottom;
        user-select: none;
      }
    }

    .article-card__infor {
      width: 390px;
      padding: 0 20px;
      .article-card__content {
      }
    }
  }
}

.article-card__footer {
  height: 32px;
  .tag {
    margin: 0 8px;
  }
  margin-top: 10px;
  // display: flex;
  // justify-content: flex-end;
  flex-grow: 1;
  -webkit-box-pack: end;
  // background-color: yellow;
  .el-tag {
    cursor: pointer;
    border: 0;
    border-radius: 12px;
    user-select: none;
    &:hover {
      color: #00c3ff;
    }
  }
  .article-card__data {
    // background-color: red;
    height: 32px;
    line-height: 32px;
    float: right;
    i {
      margin: 20px;
    }
  }
}
</style>

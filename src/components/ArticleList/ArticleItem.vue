<template>

  <div class="articleItem-container">
    <!-- <div class="bgImg"></div>  -->
    <router-link :to="{
        name: 'Detail',
        params:{
          id: article.id
        }
      }"
                 target="_blank">
      <div class="articleItem-content">
        <div class="article-img"
             :style="{'background-image': 'url('+article.titleImg+')'}"></div>
        <div class="article-brief">
          <h2 class="articleItem-title">
            {{article.title}}
          </h2>
        </div>
        <slot name="tagNew">....</slot>
      </div>
    </router-link>

  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: ['article']
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

.articleItem-container {
  margin: 0 auto 30px auto;
  width: 750px;
  height: 250px;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

}

.articleItem-title {
  margin: 85px auto;
  text-align: center;
  height: 30px;
  line-height: 30px;
}

.articleItem-container a {
  text-decoration: none;
  color: #fff;
}

.articleItem-content {
  width: 100%;
  height: 100%;
  /* box-shadow: 1px 1px 3px 250px rgba(0, 0, 0, 0.3) inset; */

  background-size: 100% 100%;
  /* transition: all .1s ease; */
  background-color: #fff;
  overflow: hidden;
}

.articleItem-content .article-img {
  float: left;
  width: 400px;
  height: 100%;
  background-size: 100% 100%;
}

.articleItem-content > slot {
  color: red;
  position: absolute;
  right: 0;
  font-size: 70px;
}

.article-brief {
  float: right;
  height: 100%;
  width: 350px;
  color: #000;
}


.datetime > i {
  font-size: 14px;
}

.operation > i {
  width: 70px;
  float: left;
  font-size: 14px;
  margin: 0 0 0 5px;
  text-align: left;
}

.v-note-wrapper.shadow {
  border: none;
  box-shadow: none !important;
}

.v-note-wrapper .v-note-panel .v-note-show .v-show-content,
.v-note-wrapper .v-note-panel .v-note-show .v-show-content-html {
  width: 100%;
  background-color: #fff !important;
  height: 100%;
  padding: 8px 25px 15px 25px;
  overflow-y: auto;
  box-sizing: border-box;
  overflow-x: hidden;
}
</style>
<template>
  <div class="article-item-container">
    <router-link
      :to="{
        name: 'Article',
        params: {
          id: article.id,
        },
      }"
    >
      <div class="article-item-content">
        <div
          class="article-img"
          :style="{ 'background-image': 'url(' + article.titleImg + ')' }"
        ></div>
        <div class="article-brief">
          <p class="article-item-title">
            {{ article.title }}
          </p>
        </div>
        <slot name="tagNew">....</slot>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "articleItem",
  props: ["article"]
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}

.article-item-container {
  margin: 0 auto 30px auto;
  width: 100%;
  height: 250px;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

}

.article-item-title {
  font-size: 18px;
  font-weight: 600;
  font-style: italic;
  margin-top: 85px;
  text-align: center;
  height: 30px;
  line-height: 30px;
}

.article-item-container a {
  text-decoration: none;
  color: #fff;
}

.article-item-content {
  width: 100%;
  height: 100%;
  /* box-shadow: 1px 1px 3px 250px rgba(0, 0, 0, 0.3) inset; */

  background-size: 100% 100%;
  /* transition: all .1s ease; */
  background-color: #fff;
  overflow: hidden;
}

.article-item-content .article-img {
  float: left;
  width: 400px;
  height: 100%;
  background-size: 100% 100%;
}

.article-item-content > slot {
  color: red;
  position: absolute;
  right: 0;
  font-size: 70px;
}

.article-brief {
  float: right;
  height: 100%;
  width: 300px;
  color: #000;
}

.datetime > i {
  font-size: 14px;
}

</style>

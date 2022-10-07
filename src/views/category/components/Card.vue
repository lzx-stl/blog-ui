<template>
  <div class="card-container">
    <a :href="`/article/${article.id}`"
       target="_blank">
      <div class="card-img">

        <img v-lazy="article.mainImg"
             alt="" />
      </div>

      <div class="card-footer">

        <div class="card-infor">
          <a :href="`/accountCenter/bookList?id=${article.authorId}`"
             target="_blank"
             class="author-infor">

            <img class="card-infor__avatar"
                 :src="article.authorAvatar" />
            <div class="card-infor__name">{{article.authorNickname}}</div>
          </a>
          <h3 class="card-title">{{ article.title }}</h3>

        </div>

      </div>

    </a>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['article'],
  data() {
    return {}
  },
  created() {}
}
</script>

<style lang="scss">
.card-container {
  cursor: pointer;
  font-size: 15px;
  text-align: center;
  width: 100%;
  height: 100%;
  border-radius: 14px;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  transition: all 0.2s linear;

  &:hover {
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
    transform: translate3d(0, -4px, 0);
  }
  .card-img {
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
    width: 100%;
    height: 168px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      transition: all 0.2s ease;
    }
  }

  .card-infor {
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .author-infor {
      display: flex;
      align-items: center;
      max-width: 122px;
    }
    .card-infor__name {
      max-width: 90px;
      padding-left: 8px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .card-infor__avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }
    .card-title {
      max-width: 220px;
      height: 100%;
      flex: 1;
      padding: 0 5px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      color: #000;
      text-align: right;
      font-style: italic;
    }
  }
}
</style>

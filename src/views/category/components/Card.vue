<template>
  <div class="card-container">
    <a :href="`/article/details/${article.id}`"
       target="_blank">
      <div class="card-img"
           v-lazy:back='article.mainImg'>

        <div class="shadow">
          {{article.title}}
        </div>
      </div>

      <div class="card-footer">

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
  margin-bottom: 20px;
  flex: 0 0 25%;
  max-width: 25%;
  cursor: pointer;
  font-size: 15px;

  padding: 0 8px;
  text-align: center;
  // width: 100%;
  // box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

  .card-img {
    width: 100%;
    // height: 100%;
    height: 200px;
    background-size: 100% 100%;
    overflow: hidden;
    position: relative;
    transition: all 0.2s linear;

  border-radius: 6px;
    &:hover {
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
      transform: translate3d(0, -4px, 0);
    }
    .shadow {
      width: 100%;
      min-height: 60px;
      position: absolute;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      color: #fff;
      font-size: 16px;
      // text-align: left;
      padding: 0 10px;
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

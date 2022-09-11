<template>
  <div class="card-container">
       <a :href="'/article/' + article.id" target="_blank">

    <div class="card-img">
      <img v-lazy="article.titleImg"
           alt="" />
    </div>
    <div class="card-infor">
      <h3 class="card-title">{{ article.title }}</h3>
    </div>
       </a>
    
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['article'],
  
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
    width: 100%;
    height: 50px;
    .card-title {
      line-height: 50px;
      color: #000;
      font-style: italic;
    }
  }
}
</style>

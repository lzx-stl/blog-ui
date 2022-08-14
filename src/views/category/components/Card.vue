<template>
  <div class="card-container"
       @click="handleClick">
    <div class="img-box">
      <img :src="article.titleImg"
           alt="" />
    </div>
    <div class="infor">
      <h3>{{ article.title }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['article'],
  methods: {
    handleClick() {
      this.$router.push({
        name: 'Article',
        params: {
          id: this.article.id
        }
      })
    }
  }
}
</script>

<style lang="scss">
.card-container {
  cursor: pointer;
  display: inline-block;
  font-size: 15px;
  text-align: center;
  width: 288px;
  height: 218px;
  border-radius: 14px;
  margin: 15px 15px;
  background-color: #fff;
  opacity: 0.89;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  position: relative;
  z-index: 1;
  transition: all 0.2s linear;
  a {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 14px;
    text-decoration: none;
    color: #000000;
  }
  &:hover {
    z-index: 2;
    shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
    transform: translate3d(0, -4px, 0);
  }
  .img-box {
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
    width: 100%;
    height: 168px;
    overflow: hidden;
  }
  p {
    height: 80px;
  }
}
.img-box {
  img {
    width: 100%;
    height: 100%;
    transition: all 0.2s ease;
  }
}
.infor {
  width: 100%;
  height: 50px;
  h3 {
    line-height: 50px;
    font-style: italic;
  }
}
.tool {
  width: 100%;
  margin-top: 30px;
  height: 50px;
  line-height: 50px;
  & > i {
    float: left;
    color: #748594;
    width: 33%;
  }
}
</style>

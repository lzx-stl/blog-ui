<template>
  <div class="card-container">

    <router-link :to="{
        name: 'Detail',
        params: {
          id: article.id,
        },
      }"

                 target="_blank">

    <div class="img-box" >
        <img :src="article.titleImg"
             alt="" >
    </div>

    <div class="infor">

        <h3>{{ article.title }}</h3>
      <!-- <p>
        {{article.brief}}
      </p> -->
      <!-- <div class="tool">
        <i class="iconfont icon-liulanliang"> {{ article.readCnt }}</i>
        <i class="iconfont icon-pinglun"> {{ article.replyCnt }}</i>

        <i class="iconfont icon-dianzan"> {{ article.thumbCnt }}</i>
      </div> -->
    </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['article'],

  mounted() {}
}
</script>

<style>
.card-container {
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
}

.card-container a{
  display: block;
  width: 100%;
  height: 100%;

  border-radius: 14px;

}

.card-container:hover{
  z-index: 2;
  shadow: 0 15px 30px rgba(0, 0, 0, .1);
  box-shadow: 0 15px 30px rgba(0, 0, 0, .3);
  transform: translate3d(0, -4px, 0);
}


.card-container .img-box {
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  width: 100%;
  height: 160px;

  overflow: hidden;
}


.img-box img {
  width: 100%;
  height: 160px;
  transition: all 0.2s ease;
}


.card-container a {
  text-decoration: none;
  color: #000000;
}

.infor {
  margin-top: 10px;
  width: 100%;
}

.infor h3 {
  width: 100%;
  height: 30px;
  line-height: 30px;
}

.card-container p {
  height: 80px;
  /* margin: 15px auto; */
}

.tool {
  width: 100%;
  margin-top: 30px;
  height: 50px;
  line-height: 50px;
}

.tool > i {
  float: left;
  color: #748594;
  width: 33%;
}
</style>

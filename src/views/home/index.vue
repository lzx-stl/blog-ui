<template>
  <div class="home-container">
    <div class="topBg" :style="{ 'background-image': 'url(' + topImg + ')' }">
      <div class="down">
        <i class="iconfont icon-arrow-copy" @click="scrollWindow"></i>
      </div>
    </div>
    <div class="main" :style="{ 'background-image': 'url(' + mainImg + ')' }">
      <ArticleList></ArticleList>
    </div>
  </div>
</template>

<script>
import { getConfig } from "@/api/config";
import Carousel from "@/components/Carousel";
import ArticleList from "@/components/ArticleList/index";

import TagCard from "./components/TagCard";
import MyCard from "./components/MyCard";
import Search from "../../components/HeaderSearch/index";

import { mapState } from "vuex";

export default {
  name: "Home",
  components: {
    Carousel,
    ArticleList,
    Search,
    TagCard,
    MyCard,
  },
  data() {
    return {
      uid: "",
      show: false,
      list: [
        "http://r8l2ddg76.hn-bkt.clouddn.com/ls8F80CxotuQEOG8am9rerEas2bh",
        "http://r8l2ddg76.hn-bkt.clouddn.com/Fu8w_HrPSLLrvyatF4kTjMaz5tv_",
        "http://r8l2ddg76.hn-bkt.clouddn.com/FpKpf4ROcl7s6ADkGZ_ikCNDFl4-",
      ],
    };
  },
  computed: {
    ...mapState(
      {
      topImg: (state) => state.config.topImg,
      mainImg: (state) => state.config.mainImg,
    }),
  },
  methods: {
    scrollWindow(event) {
      // window.scrollto
      window.scrollTo({
        top: 780,
        behavior: "smooth",
      });
    },
  },
};
</script>

<style scoped>
.home-container {
  width: 100%;
}

.topBg {
  width: 100%;
  height: 720px;
  background-size: 100% 100%;
  position: relative;
  overflow: hidden;
}

.blogName {
  font-family: "STXingkai";
  color: black;
  text-align: center;
  position: relative;
  font-size: 30px;
  top: 50%;
  left: 25%;
}

.main {
  width: 100%;

  height: fit-content;
  /*position: relative;*/
  background-color: #f5f5f5;
  /*padding: 50px 0 0 0;*/
  background-size: 100% 100%;
  background-attachment: fixed;
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

.container {
  width: 1200px;
  height: auto;

  margin: 60px auto 0 auto;
  overflow: auto;
}

.left-card {
  width: 300px;
  text-align: center;
  height: auto;
  float: left;
}

.mid-list {
  width: 550px;
  height: 100%;
  min-height: 600px;
  float: left;
}

.right-card {
  float: right;
  height: auto;
  text-align: center;
  width: 350px;
}
</style>

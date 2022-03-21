<template>
  <div class="mycard-container">
    <img :src="user.headImg"
         alt="" />

<!--    <div class="information">-->
<!--      <svg class="icon loginIcon"-->
<!--           aria-hidden="true">-->
<!--        <a href="#">-->
<!--          <use xlink:href="#icon-QQ"></use>-->
<!--        </a>-->
<!--      </svg>-->
<!--      <svg class="icon loginIcon"-->
<!--           aria-hidden="true">-->
<!--        <a href="#">-->
<!--          <use xlink:href="#icon-weixin"></use>-->
<!--        </a>-->
<!--      </svg>-->
<!--      <svg class="icon loginIcon"-->
<!--           aria-hidden="true">-->
<!--        <a href="#">-->
<!--          <use xlink:href="#icon-weibo"></use>-->
<!--        </a>-->
<!--      </svg>-->

<!--      <svg class="icon loginIcon"-->
<!--           aria-hidden="true">-->
<!--        <a href="https://blog.csdn.net/qq_43767451?spm=1000.2115.3001.5343">-->
<!--          <use xlink:href="#icon-csdn"></use>-->
<!--        </a>-->
<!--      </svg>-->

<!--      <svg class="icon loginIcon"-->
<!--           aria-hidden="true">-->
<!--        <a href="#">-->
<!--          <use xlink:href="#icon-gitee"></use>-->
<!--        </a>-->
<!--      </svg>-->

<!--      <svg class="icon loginIcon"-->
<!--           aria-hidden="true">-->
<!--        <a href="#">-->
<!--          <use xlink:href="#icon-github"></use>-->
<!--        </a>-->
<!--      </svg>-->
<!--      <svg class="icon loginIcon"-->
<!--           aria-hidden="true">-->
<!--        <a href="#">-->
<!--          <use xlink:href="#icon-zhihu"></use>-->
<!--        </a>-->
<!--      </svg>-->
<!--    </div>-->

  </div>
</template>

<script>
import { getInformation } from '@/api/user'
export default {
  name: 'MyCard',
  data() {
    return {
      user: {}
    }
  },
  mounted() {
    let uid = window.localStorage.getItem('uid')
    if (uid) {
      getInformation(uid).then((res) => {
        this.user = res
      })
    }
  },
  methods: {}
}
</script>

<style>
.mycard-container {
  height: auto;
  /*background-color: #fff;*/
  /* opacity: .75; */
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
  /* position: absolute; */
  /* top: 160px; */
  /* left: 50px; */
}

.mycard-container h2 {
  margin-top: 30px;
  font-weight: 700;
  font-family: 'STXingkai';
}

.mycard-container img {
  cursor: pointer;
  text-align: center;
  width: 135px;
  height: 135px;
  border-radius: 50%;
}

.information {
  /* border: 3px solid #000;  */
  margin: 50px auto 0 auto;
  min-height: 60px;
  border-radius: 20px;
}

.information svg {
  font-size: 35px;
  margin: 10px;
}
</style>

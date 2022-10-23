<template>
  <div>
    <div class="user-card">
      <img class="user-avatar"
           v-lazy="url" />
      <div class="user-infor">
        <span class="user-name">
          <a :href="`/accountCenter/bookList?id=${2}`"
             class="user-card__link"
             target="_blank">是在下输了</a></span>
        <p class="user-intro">人类的本质就是咕咕咕</p>

      </div>
      <button class="follow-btn__follow">
        已关注
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: 'http://thirdqq.qlogo.cn/g?b=oidb&k=iczqxOs0HiabbZ3FYdyKHozw&s=100&t=1663937644'
    }
  }
}
</script>

<style lang="scss">
.user-card {
  display: flex;

  align-items: center;
  padding: 15px 40px 15px 30px;
  .user-avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  .user-infor {
    margin-left: 20px;
    flex: 1;
    .user-name {
      color: #666;
      max-width: 180px;
    }
    .user-intro {
      line-height: 14px;
      color: #999;
      margin-top: 5px;
    }
  }
  .follow-btn__follow {
    border-radius: 13px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    width: 80px;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    border: none;
    background-color: #f5f5f5;
    color: #999;
  }
}
</style>
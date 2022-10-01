<template>
  <div class="user-card">
    <img class="user-avatar"
         :src="url" />
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
</template>

<script>
export default {}
</script>

<style>
</style>
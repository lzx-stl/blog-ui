<template>
  <div class="category-container">
    <div class="category-content">
      <list />
    </div>
  </div>
</template>

<script>
import List from './components/List'
import Search from '@/components/Search'

export default {
  name: 'Category',
  components: { List, Search }
}
</script>

<style lang="scss">
.category-container {
  width: 100%;
  height: 100%;
  .category-content {
    width: 100%;
    min-height: 760px;

    background-size: 100% 100%;
    background-attachment: fixed;
  }

  .blog-search {
    display: flex;
    align-content: center;
    justify-content: center;
    width: 640px;
    height: 48px;
    margin: 45px auto 20px auto;
  }
}
</style>

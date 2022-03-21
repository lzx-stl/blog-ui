<template>
  <div class="category-container">
    <div class="category-content">
      <list/>
    </div>

  </div>
</template>

<script>
import List from './components/List'
export default {
  name: 'Category',
  components: {List}
}
</script>

<style >
.category-container {
  width: 100%;
  height: 100%;
}

.category-content {
  width: 100%;
  min-height: 760px;
  background-size: 100% 100%;
  background-attachment: fixed;

}
</style>

<template>
  <div class="catalog-container">
      <div class="catalog-header">目录</div>
  </div>
</template>

<script>
export default {
  // name:'Catalog'
}
</script>

<style lang="scss">
.catalog-container{
  width: 200px;
  height: 400px;
  background-color: #fff;
  position: fixed;
  top: 280px;
  right: 50px;
  .catalog-header{
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    
    border-bottom: 1px solid #ebebeb;
    font-size: 16px;
  }
}
</style>
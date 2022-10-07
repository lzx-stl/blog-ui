<template>
  <div class="side-section">

    <div class="side-section__header">
      <slot name="header">

      </slot>

    </div>
    <div class="side-section__body">
      <slot name="content">
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title'],
  data() {
    return {}
  }
}
</script>

<style lang="scss">
.side-section {
  background-color: #fff;
  
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin-bottom: 20px;
  .side-section__header {
    display: flex;
    height: 50px;
    border-bottom: 1px solid #ebebeb;
    padding: 0 20px;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    .side-section__title {
      -webkit-box-flex: 1;
      flex-grow: 1;
      font-size: 16px;
      font-weight: 600;
    }
    .side-section__link {
      cursor: pointer;
      color: #999;
    }
  }

  .side-section__body {
    position: relative;
    padding: 20px;
  }
}
</style>
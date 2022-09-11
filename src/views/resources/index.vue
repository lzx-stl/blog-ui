<template>

  <div class="wrapper">

    <div class="grid-container">
      <div class="grid-item"
           v-for="i in 40"
           :key="i">
        <div class="icon">

          <img class="icon-avatar"
               src="https://infinityicon.infinitynewtab.com/user-share-icon/6e5da7bc6eaf3ecce1ca1affcf20fca5.png?imageMogr2/thumbnail/240x/format/webp/blur/1x0/quality/100|imageslim"
               alt="">
          <div class="icon-name">慕课网</div>
        </div>
      </div>
    </div>
  
      

  </div>

</template>

<script>
export default {}
</script>

<style lang="scss">
@import '~@/styles/variables.scss';
.box {
  width: 100%;
  background-color: #000;
  // position: absolute;
  opacity: 0.5;
}
.wrapper {
  // width: 100vw;

  // background-image: url('https://uploadstatic.mihoyo.com/contentweb/20210922/2021092217442572336.png');
  background-size: 100% 100%;
  background-attachment: fixed;
  padding-top: 60px;


  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.grid-container {
  // white-space: nowrap;
  position: relative;
  margin: 50px auto;
  width: 1500px;
  height: 540px;
  display: grid;
  grid-template-columns: repeat($icon-col, 100% / $icon-col);
  grid-template-rows: repeat($icon-row, 100% / $icon-row);
  .grid-item {
    width: 100%;
    height: 100%;
    text-align: center;
    .icon {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      // color: #f5f5f5;
      .icon-avatar {
        user-select: none;
        display: block;
        width: 64px;
        height: 64px;
        border-radius: 50%;
      }

      .icon-name {
        user-select: none;
      }
    }
  }
}
</style>
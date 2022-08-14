<template>
  <div class="toolbar-container">
    <div class="toolbar-item" v-for="o in arr" :key="o.icon_name">
      <a :href="o.href">
        <i :class="'iconfont ' + o.icon_name"></i>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "ToolBar",
  data() {
    return {
      arr: [
        {
          icon_name: "icon-zhichi",
          icon_num: 10,
          href: "",
        },
        {
          icon_name: "icon-shoucang1",
          icon_num: 11,
          href: "",
        },
        {
          icon_name: "icon-pinglun3",
          icon_num: 12,
          href: "#comment",
        },
        {
          icon_name: "icon-xiangshang",
          icon_num: undefined,
          href: "#content",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.toolbar-container {
  width: 62px;
  height: 262px;
  position: fixed;
  bottom: 60px;
  right: 170px;
  background-color: #fff;

  .toolbar-item {
    width: 62px;
    height: 62px;
    text-align: center;
    line-height: 62px;
    .iconfont {
      font-size: 28px;
    }
  }
}
</style>

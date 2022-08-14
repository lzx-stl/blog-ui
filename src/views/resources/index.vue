<template>
  <div class="main-page">
    <WaterFall :obj="prop" />
    <BackToTop />
  </div>
</template>

<script>
import WaterFall from "@/components/WaterFall";
import BackToTop from "../../components/BackToTop/index";
import { findAllImage } from "@/api/image";
export default {
  name: "Resources",
  components: {
    WaterFall,
    BackToTop,
  },
  computed: {
    prop() {
      return {
        column_cnt: 4, //列数
      };
    },
  },
};
</script>

<style scoped>
.main-page {
  width: 100%;
  position: relative;
  margin-top: 30px;
}
</style>

<template>
  <div class="main-page">
    <WaterFall :obj="prop" />
  </div>
</template>

<script>
import WaterFall from "@/components/WaterFall";
import { findAllImage } from "@/api/image";
export default {
  name: "Resources",
  components: {
    WaterFall,
  },
  computed: {
    prop() {
      return {
        column_cnt: 6, //列数
      };
    },
  },
};
</script>

<style scoped>
.main-page {
  
  padding-top: 60px;
  width: 100%;
  position: relative;
}
</style>

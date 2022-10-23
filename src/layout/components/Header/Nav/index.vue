<template>
  <div style="height:100%">
    <el-menu :default-active="activeMenu"
             class="el-menu-demo"
             mode="horizontal"
             style="height:100%"
             active-text-color="#32ca99"
             @select="handleSelect">
      <nav-item v-for="route in permission_routes"
                :item="route"
                :key="route.path"
                :base-path="route.path" />

    </el-menu>
    <!-- <div class="line"></div> -->
  </div>
</template>

<script>
import NavItem from './NavItem.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    NavItem
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['permission_routes']),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }
  },
  methods: {
    handleSelect() {}
  }
}
</script>

<style>
</style>
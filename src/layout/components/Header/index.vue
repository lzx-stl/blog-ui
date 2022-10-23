<template>
  <div class="header-container">

    <logo />
    <div class="header-nav">
      <Nav />
      <search />
      <login/>
    </div>
  </div>
</template>

<script>
import { getToken} from '@/utils/auth'
import { mapState, mapGetters } from 'vuex'
import Search from './Search'
import Login from './Login'
import Nav from './Nav/index.vue'
import Logo from './Logo'

import { getInformation, login } from '@/api/user'

export default {
  name: 'Header',
  components: {
    Search,
    Login,
    Nav,
    Logo
  },
  data() {
    return {
      user: {},
    }
  },
  methods: {
   
   
    
  },
  created() {
    // this.$store.dispatch('permission/generateRoutes', [])
    if (getToken()) {
      this.$store.dispatch('user/getInfo', [])
      this.isLogin = true
    }
  },
}
</script>

<style scoped lang="scss">
.header-container {
  /*color: #409eff;*/
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  width: 100%;
  height: 60px;
  position: fixed;
  top: 0;
  z-index: 100;
}

.header-nav {
  width: 1250px;
  height: 100%;
  color: #1f2233;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 150px;
  .header-nav-menu {
    height: 100%;
    display: flex;
    .header-nav-menu__item {
      cursor: pointer;
      height: 100%;
      padding: 0 12px;
      position: relative;
      a {
        height: 100%;
        display: flex;
        align-items: center;
        color: #333;
        &:hover {
          color: #32ca99;
        }
      }
      .line {
        background-color: #32ca99;
        border-top-right-radius: 2px;
        bottom: 8px;
        height: 4px;
        left: 50%;
        margin-left: -6px;
        padding: 0;
        position: absolute;
        width: 12px;
      }
    }

    .menu-active {
      a {
        color: #32ca99;
      }
    }
  }

  .header-search {
    width: 280px;
    margin-right: 150px;
    margin-left: auto;
    .el-autocomplete {
      width: 100%;
    }
  }
}
</style>

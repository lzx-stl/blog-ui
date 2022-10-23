<template>
  <div class="toolbar-container">
    <div class="toolbar-item"
         v-for="o in arr"
         :key="o.icon_name"
         @click="handleClick">
      <div @click="top">
        <i :class="`iconfont ${o.icon_name}`"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToolBar',
  data() {
    return {
      arr: [
        {
          icon_name: 'icon-zhichi',
          icon_num: 10,
          href: ''
        },
        {
          icon_name: 'icon-shoucang1',
          icon_num: 11,
          href: '',

          event: this.like
        },
        {
          icon_name: 'icon-pinglun3',
          icon_num: 12,
          href: '#comment'
        },
        {
          icon_name: 'icon-xiangshang',
          icon_num: undefined,
          href: '#content',
          event: this.like
        }
      ]
    }
  },
  methods: {
    top() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    like() {
    }
  }
}
</script>

<style lang="scss">

</style>

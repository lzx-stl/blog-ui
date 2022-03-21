<template>
  <ul class="tag-nav-container">
    <li @click="handleTagChange('')" :class="{'active-color': currentTag == ''}">全部</li>
    <li v-for="item in tagList" :key="item.value"
        @click="handleTagChange(item.value)" :class="{'active-color': currentTag == item.value}"
    >{{ item.value }}
    </li>
  </ul>
</template>

<script>

import {findAllTag} from "@/api/tag";

export default {
  name: "TagNav",
  props: ['tag'],
  data() {
    return {
      tagList: [],
    }
  },
  created() {
    this.getList();
  }, computed: {
    currentTag: {
      get() {
        return this.tag;
      },
      set(val) {
        this.$emit('update:tag', val);
      }
    }
  },
  methods: {
    getList() {
      findAllTag('').then(res => {
        this.tagList = res.list;
      })
    },
    handleTagChange(val) {
      this.currentTag = val;
      this.$emit('tagChange', val);
    }
  }
}
</script>

<style scoped>

.tag-nav-container {
  list-style: none;
  width: 100%;
  margin: 50px auto;
  padding: 4px;
  min-height: 30px;
  border-radius: 10px;
}

.tag-nav-container li {
  display: inline-block;
  height: 10px;
  padding: 10px 15px;
  line-height: 10px;
  font-size: 15px;
  color: #545c63;
  cursor: pointer;
  margin: 4px 0 0 4px;
  border-radius: 4px;
  user-select: none;
}


.tag-nav-container .active-color {
  color: #fff;
  background-color: #409eff;
}


.tag-nav-container .active-color {
  color: #fff;
  background-color: #1e9fff;;
}



</style>
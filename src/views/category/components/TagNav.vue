<template>
  <div class="tag-wrapper">
    <div class="container">

      <div class="tag-block">分类</div>
      <div class="tag-list">

        <div @click="handleTagChange('')"
             :class="{'active-color': currentTag == ''}">全部</div>
        <div v-for="item in tagList"
             :key="item.value"
             @click="handleTagChange(item.value)"
             :class="{'active-color': currentTag == item.value}">{{ item.value }}
        </div>
      </div>
    </div>
    <div class="container">
      <div class="tag-block">排序</div>
      <div class="tag-list">
        <div v-for="item in sortType"
             :key="item"
             @click="handleTagChange(item)"
             :class="{'active-color': currentTag == item}">{{ item}}
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import { findAllTag } from '@/api/tag'

export default {
  name: 'TagNav',
  props: ['tag'],
  data() {
    return {
      tagList: [],
      sortType: ['发布时间', '浏览量', '点赞数']
    }
  },
  created() {
    this.getList()
  },
  computed: {
    currentTag: {
      get() {
        return this.tag
      },
      set(val) {
        this.$emit('update:tag', val)
      }
    }
  },
  methods: {
    getList() {
      findAllTag('').then((res) => {
        this.tagList = res.list
      })
    },
    handleTagChange(val) {
      this.currentTag = val
      this.$emit('tagChange', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.tag-wrapper {
  width: 100%;
}
.container {
  color: #545c63;
  white-space: nowrap;

  .tag-block {
    // color: #000;
    display: inline-block;
    // font-weight: 600;
    height: 30px;
    padding: 10px 15px;
    line-height: 10px;
    margin: 4px 0 0 4px;
  }
  .tag-list {
    
    list-style: none;
    border-radius: 10px;
    display: inline-block;
    vertical-align: top;
    white-space: normal;
    div {
      display: inline-block;
      height: 30px;
      padding: 10px 15px;
      line-height: 10px;
      cursor: pointer;
      margin: 4px 0 0 4px;
      border-radius: 4px;
      user-select: none;
    }

    .active-color {
      color: #409eff;
      background-color: #dff6fd;
    }
  }
}
</style>
<template>
  <div class="tag-wrapper">
    <div class="container">

      <div class="tag-block">分类</div>
      <div class="tag-list">

        <div @click="currentTag = ''"
             :class="{'active-color': currentTag == ''}">全部</div>
        <div v-for="tag in tagList"
             :key="tag.name"
             @click="currentTag = tag.name"
             :class="{'active-color': currentTag == tag.name}">{{ tag.name }}
        </div>
      </div>
    </div>
    <div class="container">
      <div class="tag-block">排序</div>
      <div class="tag-list">
        <div @click="currentMode = 'release_time'"
             :class="{'active-color': currentMode == 'release_time'}">更新时间
        </div>
        <div v-for="mode in sortMode"
             :key="mode.text"
             @click="currentMode = mode.field"
             :class="{'active-color': currentMode == mode.field}">{{ mode.text}}
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import { findAllTag } from '@/api/tag'

export default {
  name: 'TagNav',
  props: ['tag', 'mode'],
  data() {
    return {
      tagList: [],
      sortMode: [
        { field: 'readings', text: '浏览量' },
        {
          field: 'likes',
          text: '点赞数'
        }
      ]
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
    },
    currentMode: {
      get() {
        return this.mode
      },
      set(val) {
        this.$emit('update:mode', val)
      }
    }
  },
  methods: {
    getList() {
      findAllTag('').then((res) => {
        this.tagList = res.tagList
      })
    },
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
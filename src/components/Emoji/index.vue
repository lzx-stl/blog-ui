<template>
  <div class="emoji-box">
    <el-popover placement="bottom-start"
                width="380" >
      <div class="emoji-wrap emoji-list">
        <div v-for="(img, index) in imgs"
             :key="index"
             class="emoji-item"
             @click="handleClick(img)"
             v-html="img.html">
        </div>
      </div>
      <div class="emoji-icon"
           slot="reference"><i class="iconfont icon-biaoqing"></i>

      </div>
    </el-popover>
  </div>
</template>

<script>
import twemoji from 'twemoji'
import list from './emoji.json'

export default {
  data() {
    return {
      list: [],
      imgs: [],
      text: ''
    }
  },
  mounted() {
    this.imgs = list
    for (let i in this.imgs) this.imgs[i].html = twemoji.parse(this.imgs[i].emoji)
    // this.list.push(twemoji.parse(i.emoji))
    // var img = twemoji.parse('🤓😃')
    // document.querySelector('.box').innerHTML = img
  },methods:{
    handleClick(img)
    {
      this.text = img.cn;
      this.$emit('addEmoji', this.text)
    }
  }
}
</script>

<style lang="scss">
.emoji-box {
  margin-left: 85px;

  margin-top: 10px;
  width: 70px;
  height: 25px;
}
.emoji-icon {
  padding: 0 5px;
  cursor: pointer;
  i {
    font-weight: 800;
    font-size: 25px;
  }
}

.emoji-wrap {
  width: 351px;
  height: 185px;
  overflow: auto;
  .emoji-item {
    display: inline-block;
    width: 32px;
    height: 32px;
    cursor: pointer;
    &:hover {
      background-color: #ddd;
    }
    img {
      margin: 4px;
      width: 24px;
      height: 24px;
    }
  }
}
</style>
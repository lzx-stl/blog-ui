<template>

  <div class="catalog-container"
       v-if="list.length > 0">

    <div class="catalog-header">目录</div>
    <el-scrollbar>

      <div class="catalog-body">

        <div class="catalog-item"
             @click="active=index"
             v-for="(item,index) in list"
             :style="{'paddingLeft': 15 *(item.num - 1) + 'px'}"
             :class="{'catalog-item__active' : active == index}"
             :key="index">

          <a :href="item.href">
            <div class="line"></div>

            <div class="container">
              {{item.hash}}
            </div>

          </a>
        </div>

      </div>
    </el-scrollbar>

  </div>

</template>

<script>
export default {
  // name:'Catalog',
  data() {
    return {
      active: -1,
      list: []
    }
  },
  mounted() {
    this.$nextTick(() => {
      const content = document.querySelector('.v-show-content').innerHTML
      content.replace(/<h(\d)>.*?<\/h\d>/g, (match, num) => {
        const hash = match.replace(/<.*?>/g, '')
        // const heef = ;
        this.list.push({ hash, num })
        match.replace(/<a\s+id="(\w+)">.*?<\/a>/, (a, b) => {
          this.list[this.list.length - 1].href = '#' + b
        })
      })
    })
  }
}
</script>

<style lang="scss">
.markdown-body a {
  width: 100%;
  height: 80px !important;
  display: block;
  position: absolute;
  margin-top: -80px;
}
.blog-content-anchor {
}
.el-scroller { 
}
.catalog-container {
  width: 100%;
  background-color: #fff;
  .catalog-header {
    margin: 0 20px;
    line-height: 50px;
    height: 50px;
    font-weight: 500;
    color: #1d2129;
    border-bottom: 1px solid #e4e6eb;
    font-size: 16px;
  }
  .catalog-body {
    max-height: 400px;
    .catalog-item {
      display: flex;
      align-items: center;
      position: relative;
      line-height: 40px;
      height: 40px;
      a {
        width: 100%;
        height: 100%;
      }
    }

    .catalog-item:last-child {
      margin-bottom: 20px;
    }
    .catalog-item__active {
      .container {
        color: #1e80ff;
      }
      .line {
        background-color: #1e80ff;
      }
    }
    .container {
      flex: 1;
      padding-left: 26px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      &:hover {
        background-color: #f7f8fa;
        border-radius: 4px;
      }
    }

    .line {
      margin-top: 7px;
      width: 4px;
      position: absolute;
      top: 4px;
      left: 0;
      height: 16px;

      border-radius: 0 4px 4px 0;
    }
  }
}
</style>
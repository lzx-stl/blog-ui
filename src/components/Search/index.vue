<template>
  <div class="search-container" :style="{ backgroundColor: bgColor }">
    <div class="search-icon">
      <i class="iconfont icon-icon-test3"></i>
    </div>
    <el-input
      placeholder="请输入关键字搜索"
      v-model="currentKeyWord"
      @mouseover.native="handleMouseOver"
      @mouseleave.native="handleMouseLeave"
      @click.native="focus = true"
      @blur="focus = false"
      @keyup.enter.native="handleSearch"
      clearable
    >
    </el-input>

    <button class="search-btn" @click="handleSearch">搜索</button>
    <!-- <div class="history"
         v-if="focus">
      <div class="header">
        <div class="title">搜索历史</div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "Search",
  props: {
    keyWord: {
      Type: String,
      default: "",
    },
  },
  data() {
    return {
      val: "",
      hover: false,
      focus: false,
      bgColor: "#f6f7f8",
    };
  },
  computed: {
    currentKeyWord: {
      get() {
        return this.keyWord;
      },
      set(val) {
        this.$emit("update:keyWord", val);
      },
    },
  },
  methods: {
    handleMouseOver() {
      console.log("in");
      this.hover = true;
      this.bgColor = "#fff";
    },
    handleMouseLeave() {
      console.log("out");
      this.bgColor = "#f6f7f8";
    },
    handleSearch() {
      this.$emit("search");
    },
  },
};
</script>

<style lang="scss">
.search-container {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  border-radius: 6px;

  line-height: 36px;
  /* align-items: center;
  justify-content: center; */

  .search-icon {
    position: absolute;
    width: 28px;
    text-align: center;
    line-height: 48px;
    color: #00aeec;
    margin: 0 15px;
    i {
      font-size: 28px;
    }
  }

  .el-input {
    width: 100%;
    font-size: 18px;

    .el-input__inner {
      height: 48px;
      padding-left: 58px;
      border-radius: 6px;
      background-color: transparent;
    }
    .el-input__suffix {
      right: 120px;
    }
  }

  .search-btn {
    position: absolute;
    right: 10px;
    border: 0;
    margin: 5px auto;
    border-radius: 6px;
    height: 38px;
    width: 100px;

    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    background-color: #00aeec;
    color: #fff;
  }

  .history {
    width: 640px;
    height: 350px;
    position: absolute;
    z-index: 100;
    margin: 50px auto;
    background-color: #fff;
    border-radius: 0 0 8px 8px;
    border: 1px solid #e3e5e7;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }

  .header {
    .title {
      height: 24px;
      font-size: 16px;
      line-height: 24px;
    }
  }
}
</style>

<template>
  <div class="information-container">
    <el-form>
      <el-form-item>
        <label>首页顶部图</label>
        <div class="middle-img">
          <upload
              :url.sync="form.topImg"/>
        </div>
        <el-input
            style="width: 55%;margin-top: 30px"
            v-model="form.topImg" placeholder="请输入图片链接"></el-input>
      </el-form-item>

      <el-form-item>
        <label>首页主图</label>
        <div class="middle-img">
          <upload
              :url.sync="form.mainImg"/>
        </div>
        <el-input
            style="width: 55%;margin-top: 30px"
            v-model="form.mainImg" placeholder="请输入图片链接"></el-input>
      </el-form-item>
      <el-form-item>
        <label>随笔页背景</label>
        <div class="middle-img">
          <upload
              :url.sync="form.eventImg"/>
        </div>
        <el-input
            style="width: 55%;margin-top: 30px"
            v-model="form.eventImg" placeholder="请输入图片链接"></el-input>
      </el-form-item>


      <el-form-item>
        <!-- <el-button type="primary">修改</el-button> -->
        <el-button type="primary"
                   @click="save">保存
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import {mapState} from 'vuex'
import Upload from '@/components/Upload'
import {getConfig} from "../../../api/config";

export default {
  name: 'PersonalConfig',
  components: {
    Upload
  },
  data() {
    return {
      form: {}
    }
  },
  computed: {
    ...mapState({
      id: state => state.config.id,
      topImg: state => state.config.topImg,
      mainImg: state => state.config.mainImg,
      eventImg: state => state.config.eventImg,
    })
  },
  methods: {
    save() {
      console.log(this.form)
      this.$store.dispatch('config/setConfig', this.form);

    }
  }, mounted() {
    getConfig(1).then(res => {
        this.form = res.config
    })
  }
}
</script>
<style>
.information-container {
  min-height: 500px;
  background-color: #fff;
  overflow: hidden;
}

.information-container .el-form {
  width: 800px;
  margin: 0 auto;
}

.information-container .el-form .el-form-item {
  width: 800px;
  height: auto;
  margin-top: 50px;
}


.information-container label {
  float: left;
  width: 100px;
  margin-right: 50px;
}

.middle-img {
  float: left;
  width: 500px;
  height: 280px;
  line-height: 280px;
}
</style>

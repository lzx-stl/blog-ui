<template>
  <div class="upload-container">
    <el-upload class="avatar-uploader"
               action="#"
               :show-file-list="false"
               :http-request="upload">
      <img class="avatar" v-if="currentUrl" :src="currentUrl"/>
      <i v-else
         class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import {upload} from '@/api/image.js'

export default {
  name: 'Upload',
  props: ['url', 'id'],
  computed: {
    currentUrl: {
      get() {
        return this.url;
      },
      set(val) {
        this.$emit('update:url', val);
      }
    }
  }, methods: {
    upload(param) {
      let formData = new FormData()
      formData.append('image', param.file)
      upload(formData).then(res => {
        this.currentUrl = res.url;
      })
    }
  },
}
</script>

<style>
.upload-container {
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: #fff;
}

.upload-container .avatar-uploader {
  width: 100%;
  height: 100%;
}

.avatar-uploader .el-upload {
  width: 100%;
  height: 100%;
  text-align: center;
}

.upload-container label {
  display: block;
  width: 700px;
  text-align: center;
}

.avatar-uploader .el-upload {
  border: 2px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader img {
  width: 100%;
  height: 100%;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
</style>

<template>
  <div class="pictureTable-container">
    <el-image :src="form.url" style="width:400px;height:250px;margin: 40px auto;">
      <div slot="error" class="image-slot" style="display:inline-block;text-align: center;vertical-align: center">
        <i class="el-icon-picture-outline"></i>
      </div>
    </el-image>
    <div>
      <el-input
          style="width: 60%"
          v-model="form.url" placeholder="请输入图片链接"></el-input>
      <el-button size="small"
                 type="primary" @click="uploading">点击上传
      </el-button>

    </div>
    <div class="show-zone">
      <el-image :src="item.url" v-for="item in list"
                :preview-src-list="srcList"
                style="width:400px;height:250px;padding: 5px" lazy>
      </el-image>
      <Pagination
          v-show="total>0"
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          @pagination="getList"
      />
    </div>

  </div>
</template>

<script>
import {add, upload} from '@/api/image.js'
import Picture from '@/components/Picture'
import {findAllImage} from "../../../api/image";
import Pagination from '@/components/Pagination'
export default {
  name: 'PictureTable',
  components: {
    Picture,
    Pagination
  },
  data() {
    return {
      fileList: [],
      form: {
        id: '',
        url: '',
        addTime: ''
      },
      listQuery: {
        page: 1,
        limit: 12
      },
      total: 0,
      list: [],
      srcList: []
    }
  },mounted(){
    this.getList();
  },
  methods: {
    getList(){
      findAllImage(this.listQuery.page, this.listQuery.limit).then(res =>{
        this.list = res.list
        this.total = res.total
        for(let x of this.list)
        this.srcList.push(x.url);
      })
    },
    uploading(params) {
      this.form.addTime = new Date();

      add(this.form).then(res => {
        this.getList();
      }).catch(error => {

      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(
          `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
              files.length + fileList.length
          } 个文件`
      )
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  }
}
</script>

<style scoped>
.pictureTable-container {
  width: 100%;
  min-height: 800px;
  border: 1px solid #fff;
  background-color: #fff;
}

.show-zone {
  width: 100%;
  height: auto;
}

.upload-zone {
  width: 90%;
  margin: 50px auto;
  min-height: 150px;
  overflow: auto;
}
</style>
<template>
  <div class="editor-container">
    <div class="blogTitle">
      <el-page-header @back="goBack"
                      style="width:10%;float:left;margin-left:50px;line-height:60px">
      </el-page-header>
      <el-input type="text"
                placeholder="请输入标题(不要超过10个字哟(＾Ｕ＾)ノ~ＹＯ)"
                v-model="form.title"
                clearable></el-input>
      <el-button type="primary"
                 style="float:left;margin-left:50px"
                 @click="save()">保存
      </el-button>
      <el-button type="primary" v-if="mode == 'edit'"
                 style="float:left;margin-left:50px"
                 @click="publish()">发布
      </el-button>
    </div>
    <div style="height:580px;text-align:center">
      <div style="width:800px;height:450px;line-height:450px;margin: 50px auto">
        <Upload :url.sync="form.titleImg">
        </Upload>
      </div>
      <el-input
          style="width: 60%"
          v-model="form.titleImg" placeholder="请输入图片链接"></el-input>
      <div class="el-upload__tip">点击上传你的封面图片</div>

    </div>
    <div
        style="margin:50px 0;text-align: center">
      <el-select v-model="form.tag"
                 filterable
                 clearable
                 placeholder="请选择" @visible-change="getList">
        <el-option v-for="item in tagList"
                   :key="item.value"
                   :label="item.value"
                   :value="item.value"
        >
        </el-option>
      </el-select>
    </div>

    <div>
      <mavon-editor :tab-size="3"
                    v-model="form.content"
                    class="editor"
                    :ishljs="true"
                    :code-style="prop.code_style"
                    :font-size="prop.font_size"
                    ref="md"
                    @imgAdd="$imgAdd"/>
    </div>


  </div>
</template>

<script>
import {findAllTag} from '@/api/tag'
import {addArticle, updateArticle, getArticle} from '@/api/article'

import Upload from '@/components/Upload'
import {upload} from "../../api/image";

export default {
  name: 'Editor',
  components: {
    Upload
  },
  data() {
    return {
      form: {
        id: '',
        title: '',
        titleImg: '',
        content: '',
        state: false,
        tag: '',
        releaseTime: new Date()
      },
      tagList: [],
      fileList: [],
      mode: this.$route.params.id ? 'update' : 'edit'
    }
  }, computed: {
    prop() {
      return {
        mdStr: '',
        code_style: 'tomorrow-night',
        font_size: '18px'
      }
    }
  },created() {
    this.getDetail(this.$route.params.id)

  },
  methods: {
    getList() {
      findAllTag().then(res => {
        this.tagList = res.list
      })
    },
    getTagIdByValue(val){
      for(let x of this.tagList)
        if(x.value == val)  return x.id;
    },
    getTagValueById(id){
      for(let x of this.tagList)
        if(x.id == id)  return x.value;
    },
    handleUrlChange(val) {
      this.form.titleImg = val
    },
    goBack() {
      this.$router.go(-1)
    },
    getDetail(id) {
      getArticle(id).then(res => {
        this.form = res.article
        this.$nextTick(()=>{
          this.tagValue = this.getTagValueById(this.form.tagId);

        })
      })
    },
    $imgAdd(pos, $file) {
      var formData = new FormData()
      formData.append('image', $file)
      upload(formData).then(res => {
        console.log(res)
        this.$refs.md.$img2Url(pos, res.url)
      })
    },
    publish() {
      this.form.state = true
      addArticle(this.form).then(res => {

      })
    },
    save() {
      console.log(this.form);

      if (this.mode == 'update') {
        updateArticle(this.form).then(res => {

        })
      } else {
        this.form.state = false;
        addArticle(this.form).then(res => {
        })
      }
    },
    update() {
      updateArticle(this.form).then((res) => {
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
  },watch: {
    tagValue(newVal, oldVal) {
      console.log(this.getTagIdByValue(newVal))
        this.form.tagId = this.getTagIdByValue(newVal);
    }
  }
}
</script>

<style>
.v-note-help-wrapper {
  z-index: 2100 !important;
}

.tagBox {
  width: 60%;
  height: 350px;
  margin: 20px auto;
  float: right;
}

.editor-container {
  min-height: 100px;
  overflow: auto;
  background-color: #fff;
  margin: 30px;
  border: 3px solid #f5f5f5;
}

.editor {
  height: 720px;
}

.blogTitle {
  overflow: hidden;
  height: 60px;
  background-color: #f5f5f5;
}

.blogTitle .el-input {
  float: left;
  width: 65%;
  margin: 10px auto;
  border: 0;
  height: 40px;
  border-radius: 10px;
  outline-style: none;
  font-size: 18px;
}

.blogTitle .el-input__inner {
  border-radius: 40px !important;
}

.blogTitle .el-select .el-input__inner {
  float: left;
  /* width: 200px; */
}

.blogTitle button {
  float: left;
  cursor: pointer;
  border: 0;
  width: 80px;
  height: 40px;
  margin: 10px 25px;
  border-radius: 5px;
  background-color: #409eff;
  color: #fff;
}
</style>

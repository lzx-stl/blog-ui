<template>
  <div class="tag-mange">
    <div class="tagSearch">
      <el-input placeholder="请输入关键词后回车"
                clearable
                v-model="keyWord"
                @keyup.enter.native="getList()"></el-input>
    </div>
    <div class="tag-list">
      <el-tag :key="item.value"
              v-for="(item, index) in list"
              :type="item.color"
              closable
              :disable-transitions="false"
              @click="edit(item)"
              @close="handleClose(item)">
        {{ item.value }}
      </el-tag>
      <el-button class="input-new-tag"
                 @click="add">添加+
      </el-button>
    </div>

    <el-dialog
        class="tagClass"
        :title="type == 'add' ? '添加标签' : '更新标签'"
        :visible.sync="showDialog"
        v-if="showDialog">
      <el-form :form="form">
        <el-form-item>
          <el-input v-model="form.value"
                    placeholder="请输入标签名"
                    @keydown.enter.native="submit" autofocus></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="form.color"
                     style="margin-top:20px"
                     placeholder="请选择颜色"
                     @keydown.enter.native="submit">
            <el-option v-for="c in colors"
                       :key="c"
                       :value="c"
                       style="width:100%;">
              <el-tag :type="c"

                      style="width:100%"></el-tag>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="margin-top:50px">
          <el-button @click="showDialog = false"
                     style="float:left;">取 消
          </el-button>
          <el-button type="primary"
                     @click="submit"
                     style="float:right;">确定
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {addTag, delTag, findAllTag, updateTag} from '@/api/tag'

export default {
  data() {
    return {
      colors: ['normal', 'success', 'info', 'warning', 'danger'],
      list: [],
      keyWord: '',
      showDialog: false,
      type: 'add',
      form: {
        value: '',
        color: '',
        effect: 'dark'
      },
    }
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      findAllTag(this.keyWord).then(res => {
        this.list = res.list
      })
    },
    handleClose(tag) {
      this.$confirm('此操作将永久删除该标签, 是否继续?', '提示', {
        with: '800px',
        height: '600px',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        delTag(tag.value).then((res) => {
          if (res) {
            this.$message.success('成功删除!')
            this.getList();
          }
        })
      })
    },
    add() {
      this.showDialog = true
      this.type = 'add'
    },
    edit(item) {
      this.showDialog = true
      this.type = 'update'
      this.form = item
    },
    submit() {
      if (this.type == 'add') {
        addTag(this.form).then(res => {
          this.showDialog = false
          this.getList()
        })
      } else {
        updateTag(this.form).then(res => {
          this.showDialog = false
          this.getList()
        })
      }
      this.$message.success(
          this.type == 'add' ? '新增标签成功~' : '更新标签成功~'
      )
    },
    clear() {
      this.form = {}
    }
  },
  watch: {}
}
</script>

<style>
tag-mange .tag-list {
  text-align: left;
  height: auto;
  margin: 100px 100px;
}

.square {
  width: 40px;
  height: 30px;
  /* height: 40px; */
  margin: 5px auto;
  float: left;
}

.tag-mange {
  margin: 150px auto;
}

.tag-mange .el-tag {
  font-size: 23px;
  height: 50px;
  line-height: 50px;
  margin: 0 10px 10px 0;
}

.tag-mange .button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.tag-mange .input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

.tagSearch {
  width: 50%;
  height: 50px;
  margin: 100px auto;
}

.tagSearch .el-input {
  width: 60%;
  height: 100%;
}

.tagSearch .el-buttton {
  width: 20%;
  height: 40px;
}

</style>

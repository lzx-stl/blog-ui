<template>
  <div class="articleTable-container">
    <div class="tableToolBar">
      <el-button type="primary"
                 style="float:left;margin:20px 50px" @click="goto('editor')">
        <i class="iconfont icon-xieboke"></i>
        创作
      </el-button>

      <el-select
          style="margin-top: 20px"
          v-if="tagList.length > 0"
          v-model="listQuery.tag"
          filterable
          clearable
          placeholder="请选择" @visible-change="getTagList()">
        <el-option v-for="item in tagList"
                   :key="item.value"
                   :label="item.value"
                   :value="item.value"
        >
        </el-option>
      </el-select>
      <el-row class="tableSearchBox">
        <el-input placeholder="请输入关键词" v-model="listQuery.keyWord"
                  @keyup.enter.native="getList"
                  clearable>
          <el-button type="primary"
                     icon="el-icon-search"
                     style="float: right"
                     slot="append"  @click="getList()"></el-button>
        </el-input>
      </el-row>
    </div>
    <el-table :data="list" class="articleTable" style="min-height:480px;">
      <el-table-column laebl="序号" width="50">
        <template slot-scope="scope">
          <p>{{ scope.$index + 1 }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="titleImg" label="封面图片" width="200">
        <template width="200" slot-scope="scope">
          <el-image :src="scope.row.titleImg"
                    style="width:200px;height:95px;border:none;"
                    :preview-src-list="srcList">
          </el-image>
        </template>
      </el-table-column>

      <el-table-column prop="title"
                       label="标题"
                       width="300"></el-table-column>
      <el-table-column prop="state"
                       label="是否发布"
                       width="80">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.state"
                     @change="changeState(scope)"
                     active-color="#13ce66"
                     inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="readCnt" label="阅读量" width="100">
        <template width="100" slot-scope="scope">
          {{ scope.row.readCnt }}
        </template>
      </el-table-column>

      <el-table-column prop="releaseTime" label="发布日期" width="210">
        <template slot-scope="scope">
          <i class="iconfont icon-time">
            {{ $moment(scope.row.releaseTime).format("YYYY-MM-DD HH:mm:ss") }}
          </i>
        </template>
      </el-table-column>

      <el-table-column fixed="right"
                       label="操作"
                       width="250">
        <template slot-scope="scope">
          <el-button type="primary"
                     icon="el-icon-edit" @click="editRow(scope)"
          ></el-button>

          <el-button type="danger"
                     icon="el-icon-delete" @click="delRow(scope)"
          >
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList"
    />
  </div>
</template>

<script>
import {del, findAll, updateArticle} from '@/api/article'
import {findAllTag} from '@/api/tag'
import Pagination from '@/components/Pagination'

export default {
  components: {
    Pagination
  },
  data() {
    return {
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 12,
        tag: null,
        keyWord: null,
        all : true
      },
      tagList: [],
      srcList: [],
      dialogFormVisible: false,
      formLabelWidth: '120px'
    }
  },
  created() {
    this.getList();
    this.getTagList();
  }, watch: {
    'listQuery.tag': {
      handler(newVal, oldVal) {
        this.getList();
      }
    }
  },
  methods: {
    getList() {
      findAll(this.listQuery.page, this.listQuery.limit,
          this.listQuery.tag, this.listQuery.keyWord, this.listQuery.all).then(res => {
        this.list = res.list;
        this.total = res.total;
      })
      this.srcList = [];
      for (let o of this.list) this.srcList.push(o.titleImg);
    }, getTagList() {
      findAllTag().then(res => {
        this.tagList = res.list
      })
    },
    changeState(scope){
      updateArticle(scope.row).then(res =>{

      })
    },
    goto(name) {
      this.$router.push({name});
    },
    editRow(obj) {
      this.$router.push('/edit' + '/' + obj.row.id);
    },
    delRow(obj) {
      let id = obj.row.id;
      del(id).then(res => {
        this.getList();
      })
    }
  }
}
</script>

<style>
.articleTable-container {
  height: auto;
}

.el-main {
  padding: 20px 20px 0 20px;
}

.tableSearchBox {
  float: right;
  padding: 20px 30px 0 0;
  width: 370px;
  height: 80px;
  margin-right: 50px;
}

.tableSearchBox .el-input {
  margin: 0;
  padding: 0;
  border: 0;
}


.tableSearchBox .el-input .el-input-group__append {
  width: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.tableSearchBox .el-input .el-button {
  background-color: #1e9fff;
  color: #fff;
  border-radius: 4px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  width: 40px;
  height: 40px;
  padding: 0;
}

.tableToolBar .tableSelect {
  float: left;
  width: 200px;
  height: 40px;
  margin: 20px 30px;
}

.tableSelect .el-input--suffix {
  width: 100%;
  height: 100%;
}

.tableSelect .el-input--suffix .el-input__inner {
  width: 100%;
  height: 100%;
}

.articleTable {
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.el-dialog {
  height: 90%;
}

.el-table .cell {
  text-align: center;
}

.tableToolBar {
  width: 100%;
  height: 80px;
  background-color: #fff;
  margin: 0 auto 20px auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.el-dialog {
  margin-left: 300px;
  margin-top: 20px !important;
  overflow: hidden;
  z-index: 1 !important;
}

.el-dialog__body {
  width: 100%;
  height: 450px !important;
  overflow-x: hidden;
}

.el-dialog__wrapper {
  z-index: 2;
}

.el-table .cell {
  margin-right: 0;
}

.articleTable .cell .el-button {
  width: 50px;
  margin-left: 30px;
  /* width: 100px;
  padding: 0;
  margin: 0; */
}
</style>

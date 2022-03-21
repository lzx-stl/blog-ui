<template>
  <div class="commentsBox">
    <el-table :data="tableData"
              height="600px">

      <el-table-column width="1250"
                       style="padding:20px">
        <template slot-scope="scope">
          <el-collapse v-model="activeNames "
                       accordion>

            <div class="comment-item">

              <div class="leftBox">

                <el-collapse-item>

                  <template slot="title">

                    <img :src="scope.row.fromHeadImg"
                         alt="">
                    {{scope.row.toName}}

                    <span>在</span>
                    <span style="color:#1ab667">{{
                      $moment(scope.row.replyTime).format('YYYY-MM-DD HH:mm:ss'
                      )}}</span>
                    <span>
                      评论了
                    </span>

                    我
                    <span>的文章</span>

                    <router-link :to="{
                          name: 'detail',
                          params:{
                            id: scope.row.articleId
                          }
                      }"
                                 target="_blank">{{scope.row.articleTitle}}</router-link>

                  </template>
                  <div class="rightBox">
                    <el-switch v-model="scope.row.state"
                               style="margin-top:30px"></el-switch>
                  </div>
                  <p>{{scope.row.content}}</p>

                </el-collapse-item>
              </div>

            </div>
          </el-collapse>

        </template>

      </el-table-column>

    </el-table>
  </div>
</template>

<script>
export default {
  name: 'JudgeComment',
  data() {
    return {
      activeNames: [],
      tableData: [],
      tableDataCnt: 0
    }
  },
  mounted() {
    this.findAll()
  },
  methods: {
    getArticleTitle(id) {
      console.log(id)
      this.$http({
        url: '/article/getTitle',
        method: 'get',
        params: {
          id: id
        }
      }).then((res) => {
        console.log(res.data)
        return res.data
      })
    },
    del(id, index) {
      console.log(id, index)
      this.$http({
        url: '/comment/del',
        method: 'post',
        params: {
          id: id
        }
      }).then((res) => {
        this.$message.success('删除评论成功!')
        this.tableData.splice(index, 1)
      })
    },
    findAll() {
      let uid = window.localStorage.getItem('uid')
      console.log(uid)
      this.$http({
        url: '/comment/getToMyComments',
        method: 'get',
        params: {
          toId: uid
        }
      }).then((res) => {
        this.tableData = res.data.list
        this.tableDataCnt = res.data.cnt
        console.log(this.tableData)
      })
    }
  }
}
</script>

<style scoped>
.commentsBox {
  height: 100%;
  background-color: red;
  overflow: hidden;
}

.commentsBox .el-table {
  height: 800px;
}

.comment-item {
  height: auto;
  margin: 0 auto;
}

.comment-item .leftBox {
  float: left;
  text-align: left;
  height: auto;
  width: 100%;
}

.comment-item .rightBox {
  float: right;
  width: 10%;
  height: inherit;
  line-height: 100%;
}

.comment-item img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  line-height: 30px;
}

.comment-item span {
  color: #b2b2b2;
  font-size: 16px;
}

.comment-item .el-button {
  float: left;
  margin-top: 10px;
  margin-right: 5px;
}

.comment-item a {
  color: #349edf;
  width: auto;
  text-decoration: none;
}

.comment-item p {
  color: #1ab667;
  text-align: left;
  padding: 10px;
  overflow: hidden;
  font-size: 20px;
}
</style>
<template>
  <div class="eventTable-container">
    <div style="height: 120px">
      <el-button type="primary"
                 class="el-icon-document-add"
                 style="font-size:25px;float:right;margin: 30px;"
                 @click="addEvent()"></el-button>
    </div>
    <div class="event-table">
      <div class="event-table-item" v-for="(o, index) in list" :key="index">
        <div class="item-title">{{ o.title }}</div>
        <div class="item-content">{{ short(o.content, 100) }}</div>
        <div class="item-op">
          <i class="el-icon-edit" @click="editEvent(index)"></i>
          <i class="el-icon-delete" @click="deleteEvent(index)"></i>
        </div>
      </div>
      <el-dialog title="新动态" :visible.sync="dialogFormVisible">
        <el-form style="width: 100%;">
          <el-form-item prop="title">
            <label>标题</label>
            <el-input v-model="form.title"></el-input>

          </el-form-item>
          <el-form-item prop="content">
            <label>内容</label>
            <el-input type="textarea"
                      v-model="form.content"></el-input>
          </el-form-item>
          <!--          <el-form-item>-->
          <!--            &lt;!&ndash; <el-button type="primary">保存</el-button> &ndash;&gt;-->
          <!--            <el-button type="primary"-->
          <!--                       @click="publish">{{发布}}-->
          <!--            </el-button>-->
          <!--          </el-form-item>-->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false" style="">取 消</el-button>
          <el-button type="primary" @click="publish">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!--    <el-calendar style="">-->
    <!--      &lt;!&ndash; 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法&ndash;&gt;-->
    <!--      <template-->
    <!--          slot="dateCell"-->
    <!--          slot-scope="{date, data}">-->
    <!--        <p :class="data.isSelected ? 'is-selected' : ''">-->
    <!--          {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}-->
    <!--        </p>-->
    <!--      </template>-->
    <!--    </el-calendar>-->
  </div>
</template>

<script>
import {add, findAll, update, del} from '@/api/event.js'

export default {
  name: 'eventTable',
  components: {},
  data() {
    return {
      list: [],
      form: {
        id: '',
        title: '',
        content: '',
        time: '',
      },
      mode: 'add',
      dialogFormVisible: false
      // , formLabelWidth: '200px'
    }
  }, mounted() {
    this.getList()
  },
  methods: {
    getList() {
      findAll().then(res => {
        this.list = res.list;
        console.log(res.list)
      });
    },
    publish() {
      this.dialogFormVisible = false;
      if (this.mode === 'add') {
        this.form.time = new Date();
        add(this.form).then((res) => {
          this.getList();
        })
      } else {
        update(this.form).then(res => {
          let index = this.list.indexOf(this.form);
          this.list[index] = this.form;
        })
      }

    }, short(str, len) {
      return str && str.length > len ? str.substr(0, len) + '...' : str;
    },
    addEvent() {
      this.form = {};
      this.dialogFormVisible = true;
      this.mode = 'add';
    }
    , editEvent(index) {
      this.dialogFormVisible = true;
      this.form = this.list[index];
      this.mode = 'edit';

    }, deleteEvent(index) {
      let id = this.list[index].id;
      console.log(id)
      del(id).then(res => {
        if (res) this.list.splice(index, 1);
      }).catch(error => {

      })
    }
  }
}
</script>

<style>
.event-table {
  width: 100%;
  min-height: 700px;
  margin: 0 auto;
}

.event-table-item {
  float: left;
  width: 24%;
  height: 250px;
  margin: 20px 0 0 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}


.item-title {
  height: 60px;
  line-height: 60px;
}

.item-content {
  height: 120px;
  margin: 10px 10px;
}

.item-op {
  width: 80%;
  height: 50px;
  margin: 0 auto;
}

.item-op i {
  width: 40px;
  height: 40px;
  font-size: 20px;
  line-height: 40px;
  border-radius: 10px;
  cursor: pointer;
}

.item-op i:first-child {
  float: left;
  background-color: #1e9fff;
  color: #fff;
}

.item-op i:last-child {
  float: right;
  background-color: red;
  color: #fff;

}

.eventTable-container {
  width: 1250px;
  min-height: 980px;
  margin: 0 auto;
  background-color: #fff;
  overflow: hidden;
}


.eventTable-container .el-form {
  width: 1000px;
  margin: 0 auto;
}

.eventTable-container .el-form-item {
  margin-top: 30px;

}

.eventTable-container .el-form-item label {
  display: inline-block;
  height: 100%;
  line-height: 100%;
  margin-right: 50px;
}

.eventTable-container .el-form-item .el-input {
  width: 50%;
}

.eventTable-container .el-form-item .el-textarea {
  width: 50%;
  height: 200px;
}

.el-textarea .el-textarea__inner {
  height: 100%;
}
</style>
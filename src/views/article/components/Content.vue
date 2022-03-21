<template>
  <div class="content-container">
    <div class="detail-content">
      <div class="big-title">{{ article.title }}</div>
<!--      <div style="height:30px;">-->
<!--        <span style="margin-left:50px">-->
<!--          <i class="iconfont icon-liulanliang"> {{ article.readCnt }}</i>-->
<!--        </span>-->
<!--      </div>-->
      <!-- <div class="author-Infor"><span>{{article.author.username}}</span>
      </div> -->
      <div style="width:100%;">
        <mavon-editor class="md"
                      :value="article.content"
                      :subfield="prop.subfield"
                      :defaultOpen="prop.defaultOpen"
                      :toolbarsFlag="prop.toolbarsFlag"
                      :editable="prop.editable"
                      :scrollStyle="prop.scrollStyle"
                      :code-style="code_style"
        ></mavon-editor>
      </div>
      <!-- <div class="bottomBar">
      <i class="iconfont icon-dianzan"
         style="color:red"></i>
      <i class="iconfont icon-collect-01"
         style="color:yellow"></i>

      <svg class="icon loginIcon"
           aria-hidden="true">
        <a href="#">
          <use xlink:href="#icon-fenxiang"></use>
        </a>
      </svg>
    </div> -->
    </div>
    <div class="comment-zone">
      <Comment></Comment>
    </div>
<!--    <Reply style="position: fixed;bottom: 0;background-color: #fff"></Reply>-->
  </div>
</template>

<script>
import Comment from '../components/Comment'
import Reply from "./Reply";
import { getArticle} from '@/api/article'
export default {
  name: 'Content',
  components: {
    Comment,Reply
  },
  data() {
    return {
      code_style: 'tomorrow-night',
      article: {}
    }
  },
  created() {
    this.getDetail()
  },methods:{
    getDetail() {
      getArticle(this.$route.params.id).then(res =>{
        this.article = res.article;
      }).catch(error => {
      })
    }

  },
  computed: {
    prop() {
      let data = {
        subfield: false, // 单双栏模式
        defaultOpen: 'preview', //edit： 默认展示编辑区域 ， preview： 默认展示预览区域
        editable: false,
        toolbarsFlag: false,
        scrollStyle: true,
        navigation: true,
      }
      return data
    }
  }
}
</script>

<style>
.big-title {
  text-align: left;
  font-size: 28px;
  font-weight: 600;
  margin: 30px;
}

.hljs {
  font-size: 18px;
  font-weight: 900;
}

.content-container {
  width: 760px;
  min-height: 20px;
  overflow: visible;
  border: 1px solid #fff;
  margin: 50px auto 100px auto;

  /*background-size: 100% 100%;*/
  /*background-attachment: fixed;*/
}

.detail-content {
  width: 760px;
  height: auto;
  background-color: #fff;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

}

.v-note-wrapper .markdown-body .md .shadow{
  box-shadow: none!important;
}
.v-show-content{
  background-color: #fff!important;
}

.comment-zone{
  /*float: left;*/
  width: 100%;
  min-height: 20px;
  padding: 30px 0;
  margin: 80px auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

</style>

<template>
  <div class="article-container">
    <div class="article-header">
      <div class="title-container">
        <h1 class="big-title"
            @click="get">{{ article.title }}</h1>
        <div class="article-read-info"
             v-if="status">
          <span class="publish-text"
                data-v-0735ec40="">2022-07-08 20:06</span>
          <span>{{ status.readings }} 阅读</span>
          <span>{{ status.likes }} 点赞</span>
          <span>{{ status.replys }} 评论</span>
        </div>
      </div>
      <div class="article-up-info">
        <a :href="`/accountCenter/bookList?id=${article.authorId}`">

          <div class="up-left">
            <div class="avatar-container">
              <img v-if="article.authorAvatar"
                   v-lazy="article.authorAvatar" />
            </div>
            <div class="up-name-pannel">{{ article.authorNickname }}</div>
          </div>
        </a>
      </div>

    </div>
    <div class="article-content">
      <div class="article-content">
        <mavon-editor class="md"
                      :value="article.content"
                      :subfield="subfield"
                      :defaultOpen="defaultOpen"
                      :toolbarsFlag="toolbarsFlag"
                      :editable="editable"
                      :code-style="codeStyle"
                      :previewBackground="previewBackground">
        </mavon-editor>
      </div>
      <div class="catalog">

        <Catalog />
      </div>

      <div class="article-footer">
        <!-- <div class="article-tags"> -->
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>


<script>
import Reply from '@/components/Comment/components/Reply'
import Catalog from './Catalog'
export default {
  name: 'Content',
  components: {
    Reply,
    Catalog
  },
  props: {
    article: {
      Type: Object,
      default: () => {}
    },
    status: {
      Type: Object,
      default: () => {}
    }
  },
  created() {},
  data() {
    return {
      mdStr: '',
      tags: ['原神', '原神爆料', '八重神子', '神里凌人', '八重神子材料'],
      codeStyle: 'atom-one-dark',
      subfield: false, // 单双栏模式
      defaultOpen: 'preview', //edit： 默认展示编辑区域 ， preview： 默认展示预览区域
      editable: false,
      toolbarsFlag: false,
      scrollStyle: true,
      previewBackground: '#fff'
    }
  },
  mounted() {},
  methods: {
    get() {}
  },
  computed: {
    prop() {
      let data = {
        // header: true, // 标题,
        // boxShadowStyle: '0 2px 12px 0 rgba(0, 0, 0, 0)'
      }
      return data
    }
  }
}
</script>

<style lang="scss" scoped>
.catalog {
  position: fixed;
  width: 280px;
  top: 150px;
  right: 40px;
}
.article-container {
  // width: 900px;
  margin: 60px auto;
  padding: 30px 40px 40px;

  border-radius: 4px;
  background-color: #fff;
  margin-bottom: 12px;
  .article-header {
    padding-left: 25px;
    .title-container {
      .big-title {
        min-height: 39px;
        font-size: 28px;
        color: #222;
        margin-bottom: 16px;
        font-weight: 700;
        line-height: 1.4;
      }
    }
    .article-read-info {
      color: #999;
      font-weight: 400;
      font-size: 13px;
      margin-bottom: 20px;
      span {
        margin: 0 10px;
      }
    }

    .article-up-info {
      // margin: 10px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      .up-left {
        display: flex;
        align-items: center;
        .avatar-container {
          display: flex;
          width: 44px;
          height: 44px;
          margin-right: 10px;
          img {
            border-radius: 50%;
          }
        }
        .up-name-pannel {
          display: flex;
          font-size: 18px;
          position: relative;
          line-height: 44px;
        }
      }
    }
  }

  .article-content {
    // padding: 30px 40px;

    .v-note-wrapper.shadow {
      box-shadow: none !important;
    }
    .v-note-wrapper
      .v-note-panel
      .v-note-show
      .v-show-content
      .scroll-style
      .scroll-style-border-radius {
      padding: 0 !important;
    }
  }

  .article-footer {
    padding-left: 25px;
    .article-tags {
      .tag-item {
        cursor: pointer;
        font-size: 12px;
        color: #999;
        margin-right: 10px;
        transition: 0.3s;
        &:hover {
          color: #00a1d6;
        }
      }
    }
  }
}
</style>

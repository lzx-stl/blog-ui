import Vue from "vue";
import App from "./App.vue";
import router from '@/router'
import store from "./store";

import '@/permission'
import "element-ui/lib/theme-chalk/index.css";
import ElementUI from "element-ui";
import mavonEditor from "mavon-editor";

import "mavon-editor/dist/css/index.css";
import '@/icons/iconfont'
import '@/icons/iconfont.css'
import '@/styles/index.scss' // global css
import '@/styles/btn.scss' // global css
import '@/styles/variables.scss' // global css


ElementUI.Dialog.props.lockScroll.default = false; //解决页面抖动
// ElementUI.Dialog.props.closeOnClickModal.default = false; //禁止点击遮罩层关闭
// import VueKatex from 'vue-katex'

// Vue.use(VueKatex)

// import "katex/dist/katex.min.css";

// import Highlight from 'vue-markdown-highlight'
// Vue.use(Highlight)

// Vue.directive('highlight',function (el) {
//   let blocks = el.querySelectorAll('pre code');
//   blocks.forEach((block)=>{
//     hljs.highlightBlock(block)
//   })
// })

// var EventBus = new Vue();

// Object.defineProperties(Vue.prototype, {
//     $bus: {
//         get: function () {
//             return EventBus
//         }
//     }
// })

// use
Vue.use(mavonEditor);

// 配置请求根路经
Vue.config.productionTip = false;
Vue.use(ElementUI);

import lazy from '@/directive/lazy-load/index'

new Vue({
  lazy,
  router,
  store,
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this; //安装全局事件总线
  },
}).$mount("#app");

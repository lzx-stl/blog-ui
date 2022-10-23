import lazy from './lazy'
import Vue from 'vue'
const install = function(Vue) {
  Vue.directive('lazy', lazy)
}

Vue.use(install);

// if (window.Vue) {
//   window['lazy'] = lazy
//   Vue.use(install);
// }

// lazy.install = install
export default lazy

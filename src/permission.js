import router from '@/router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'
import { getToken } from './utils/auth';

NProgress.configure({
  showSpinner: false, // 是否显示加载ico    
})

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist


router.beforeEach((to, from, next) => {

  // if (getToken() && to.path == '/login') {
  //   this.$router.replace('home')
  // }
  console.log(`to`, to);
  NProgress.start()
  if (to.meta.title) document.title = to.meta.title
  console.log(from, to);
  const hasToken = getToken();
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    }

    // let token = localStorage.getItem("token");
    // if (to.path === '/back') {
    //     if (!token) return next('/login')
    // }
    next();
  } else {
    if (to.path == '/login') {
      next()
    }
    else next()
  }
});


router.afterEach((to, from, next) => {
  NProgress.done()

})

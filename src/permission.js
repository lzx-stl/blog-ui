import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'

NProgress.configure({ 
  easing: 'ease',  // 动画方式    
  speed: 1000,  // 递增进度条的速度    
  showSpinner: false, // 是否显示加载ico    
  trickleSpeed: 200, // 自动递增间隔    
  minimum: 0.3 // 初始化时的最小百分比
})


router.beforeEach((to, from, next) => {
  if (to.path == '/accountCenter' && !getToken()) next({ path: '/403' });
  // if (getToken() && to.path == '/login') {
  //   this.$router.replace('home')
  // }
  NProgress.start()

  // let token = localStorage.getItem("token");
  // if (to.path === '/back') {
  //     if (!token) return next('/login')
  // }
  next();

});


router.afterEach((to, from, next) => {

  if (to.meta.title)
    document.title = to.meta.title
  NProgress.done()

})

export default router

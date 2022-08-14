import Vue from "vue";
import Router from "vue-router";

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Layout from "@/layout"

Vue.use(Router);

const originalPush = Router.prototype.push;
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch((err) => err);
};

export const constantRoutes = [
  {
    path: "/",
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: "Home",
        component: () => import("@/views/home/index"),
        meta: { title: "主页" },
      },
      {
        path: 'category',
        name: "Category",
        component: () => import("@/views/category/index"),
        meta: { title: "分类" },
      },
      {
        path: "article/:id",
        name: "Article",
        component: () => import("@/views/article/index"),
        meta: { title: "文章" },
      },
      {
        path: "resources",
        name: "Resources",
        component: () => import("../views/resources/index"),
        meta: { title: "图床" },
      },
      {
        path: "eventLine",
        name: "EventLine",
        component: () => import("../views/eventLine/index"),
        meta: { title: "随笔" },
      }
    ]
  },
  {
    path: '/authRedirect',
    name: 'AuthRedirect',
    component: () => import("@/layout/components/Header/components/auth-redirect.vue"),
  },


  {
    path: "/AboutMe",
    name: "aboutMe",
    component: () => import("../views/AboutMe/index"),
    meta: { title: "个人中心" },
  }
];


const createRouter = () => new Router({
  mode: 'history', // require service support
  // scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

router.beforeEach((to, from, next) => {
  NProgress.start()
  // let token = localStorage.getItem("token");
  // if (to.path === '/back') {
  //     if (!token) return next('/login')
  // }
  if (to.meta.title)
    document.title = to.meta.title

  next();
});


router.afterEach((to, from, next) => {
  NProgress.done()
})

export default router

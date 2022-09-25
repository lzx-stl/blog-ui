import Vue from "vue";
import Router from "vue-router";

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Layout from "@/layout"
import { getToken } from "@/utils/auth";

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
        path: '/home',
        name: "home",
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
        path: "imagebed",
        name: "ImageBed",
        component: () => import("@/views/imageBed/index"),
        meta: { title: "图床" },
      },
      {
        path: "eventLine",
        name: "EventLine",
        component: () => import("../views/eventLine/index"),
        meta: { title: "随笔" },
      },
      {
        path: "project",
        name: "Project",
        component: () => import("../views/project/index"),
        meta: { title: "项目" },
      },
      {
        path: "resources",
        name: "Resources",
        component: () => import("../views/resources/index"),
        meta: { title: "资源" },
      },
      {
        path: "article/:id",
        name: "Article",

        component: () => import("@/views/article/index"),
        meta: {
          title: window.location.href
        },
        props: true
      },
      {
        path: "accountCenter/:uuid",
        name: "AccountCenter",
        component: () => import("@/views/accountCenter/index"),
        meta: { title: "个人中心" },
        props: (router) => ({ uuid: router.params.uuid })
      },
    ]
  },

  {
    path: '/login',
    name: 'Login',
    meta: { title: "登录" },
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: '/authRedirect',
    name: 'AuthRedirect',
    component: () => import("@/views/login/components/auth-redirect.vue"),
  },
  {
    path: '/403',
    name: '403',
    component: () => import("@/views/error/403.vue"),
  },
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
  console.log(from);
  if (to.path == '/accountCenter' && !getToken()) next({ path: '/403' });
  // if (getToken() && to.path == '/login') {
  //   // next(from)
  //   // debugger;
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

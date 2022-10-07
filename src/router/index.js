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


export const userRoutes =
{

  path: "/accountCenter",
  name: "AccountCenter",
  hidden: true,
  component: () => import("@/views/accountCenter/index"),
  meta: { title: "个人中心" },
  props: (router) => ({ id: router.query.id }),
  children: [
    {
      path: 'bookList',
      name: 'BookList',
      hidden: false,
      component: () => import('@/views/accountCenter/components/bookList')
      , meta: {
        icon: 'icon-yonghu',
        name: '我的收藏'
      },
      props: (router) => ({ id: router.query.id }),
    },
    {
      path: 'commentList',
      hidden: false,
      component: () => import('@/views/accountCenter/components/CommentList')
      , meta: {
        icon: 'icon-yonghu',

        hidden: false,
        name: '我的评论'
      },
      props: (router) => ({ id: router.query.id }),
    },
    {
      path: 'followList',

      hidden: true,
      component: () => import('@/views/accountCenter/components/followList')
      , meta: {
        icon: 'icon-yonghu',
        name: '我的关注'
      }
    },
    {
      path: 'fanList',

      hidden: true,
      component: () => import('@/views/accountCenter/components/fanList')
      , meta: {
        icon: 'icon-yonghu',
        name: '我的粉丝'
      }
    },

    {
      path: 'edit',
      name: 'Edit',
      hidden: true,
      component: () => import('@/views/accountCenter/components/edit')
      , meta: {
        icon: 'icon-yonghu',
        name: '编辑资料'
      },
      props: (router) => ({ id: router.query.id }),
    }
  ]
}

export const constantRoutes =
  [
    {
      path: '/home',
      name: "home",
      hidden: false,
      component: () => import("@/views/home/index"),
      meta: { title: "主页" },
    },
    {
      path: '/category',
      name: "Category",

      hidden: false,
      component: () => import("@/views/category/index"),
      meta: { title: "分类" },
    },
    {
      path: "/imagebed",
      name: "ImageBed",

      hidden: false,
      component: () => import("@/views/imageBed/index"),
      meta: { title: "图床" },
    },
    {
      path: "/eventLine",
      name: "EventLine",
      hidden: true,
      component: () => import("../views/eventLine/index"),
      meta: { title: "随笔" },
    },
    {
      path: "/project",
      name: "Project",

      hidden: true,
      component: () => import("../views/project/index"),
      meta: { title: "项目" },
    },
    {
      path: "/resources",
      name: "Resources",

      hidden: true,
      component: () => import("../views/resources/index"),
      meta: { title: "资源" },
    },
    {
      path: "/article/:id",
      name: "Article",
      hidden: true,
      component: () => import("@/views/article/index"),

      props: true
    },
    {
      path: '/search',
      name: "Search",
      hidden: true,
      component: () => import("@/components/Search/index"),
      meta: { title: "主页" },
    },
    userRoutes
  ]


export const defaultRoutes = [
  {
    path: "/",
    component: Layout,
    redirect: '/home',
    children: constantRoutes
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
export const asyncRoutes = [
  constantRoutes
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  // scrollBehavior: () => ({ y: 0 }),
  routes: defaultRoutes
})

const router = createRouter()

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

router.beforeEach((to, from, next) => {

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

import Vue from "vue";
import Router from "vue-router";

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Layout from "@/layout"

Vue.use(Router);

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
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
                meta: {title: "主页"},
            },
            {
                path: 'category',
                name: "Category",
                component: () => import("@/views/category/index"),
                meta: {title: "分类"},
            },
            {
                path: "detail/:id",
                name: "Detail",
                component: () => import("../views/article/index"),
                meta: {title: "文章"},
            },
            {
                path: "resources",
                name: "Resources",
                component: () => import("../views/resources/index"),
                meta: {title: "资源"},
            },
            {
                path: "eventLine",
                name: "EventLine",
                component: () => import("../views/eventLine/index"),
                meta: {title: "随笔"},
            }
        ]
    },
    {
        path: '/authRedirect',
        name: 'AuthRedirect',
        component: () => import("../views/login/auth-redirect"),
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/login/index"),
        meta: {title: "登录"},
    },


    {
        path: "/AboutMe",
        name: "aboutMe",
        component: () => import("../views/AboutMe/index"),
        meta: {title: "关于"},
    },
    {
        path: "/editor",
        name: "editor",
        component: () => import("../views/editor/Editor.vue"),
    },
    {
        path: "/edit/:id",
        name: "edit",
        component: () => import("../views/editor/Editor.vue"),
    },
    {
        path: "/back",
        name: "back",
        component: () => import("../views/back/index"),
        meta: {title: "后台"},
        children: [
            {
                path: "articleTable",
                name: "articleTable",
                component: () => import("../views/back/components/ArticleTable"),
            },

            {
                path: "tagTable",
                name: "tagTable",
                component: () => import("../views/back/components/TagTable"),
            },
            {
                path: "commentTable",
                name: "commentTable",
                component: () => import("../views/back/components/CommentTable"),
            },

            {
                path: "eventTable",
                name: "eventTable",
                component: () => import("@/views/back/components/EventTable"),
            },
            {
                path: "pictureTable",
                name: "pictureTable",
                component: () => import("../views/back/components/PictureTable"),
            },
            {
                path: 'personalConfig',
                name: "personalConfig",
                component: () => import("../views/back/components/PersonalConfig"),

            }
        ],
    },
];


const createRouter = () => new Router({
    mode: 'history', // require service support
    // scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
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

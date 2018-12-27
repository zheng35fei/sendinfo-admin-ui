/*import main from 'sendinfo-admin-ui/src/views/main.vue';*/
import main from 'sendinfo-admin-ui/src/views/main.vue';


// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: resolve => {
        require(['sendinfo-admin-ui/src/views/login.vue'], resolve);
    }
};

export const locking = {
    path: '/lock',
    name: 'lock',
    component: resolve => { require(['sendinfo-admin-ui/src/views/layout/lock.vue'], resolve); }
};

export const errorPage = [
    {
        path: '404',
        meta: {
            title: '404-页面不存在'
        },
        component: resolve => require(['sendinfo-admin-ui/src/views/error-page/error'], resolve)
    },
    {
        path: '/401',
        meta: {
            title: '401-权限不足'
        },
        component: resolve => require(['sendinfo-admin-ui/src/views/error-page/error'], resolve)
    },
    {
        path: '/500',
        meta: {
            title: '500-服务端错误'
        },
        component: resolve => require(['sendinfo-admin-ui/src/views/error-page/error'], resolve)
    },
    {
        path: '*',
        meta: {
            title: '404-页面不存在'
        },
        component: resolve => require(['sendinfo-admin-ui/src/views/error-page/error'], resolve)
    },
]

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
/*export const layoutRouter = {
    path: '/wel',
    redirect: '/wel/index',
    component: Layout,
    children: [
        {
            path: '/wel/index', title: '主页', name: 'home_index',
            meta: {
                title: '主页'
            },
            component: resolve => {
                require(['sendinfo-admin-ui/src/views/home/home.vue'], resolve);
            }
        },
    ]
}*/


// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'home',
    redirect: '/index',
    component: main,
    children: [
        {
            path: '', title: 'table', name: 'tableShow',
            meta: {
                title: '表格demo',
            }
        },
        {
            path: '/index', title: '主页', name: 'home_index',
            meta: {
                title: '主页'
            },
            component: resolve => {require(['sendinfo-admin-ui/src/views/home/home.vue'], resolve);}
        },
        {
            path: '/userinfo', name: 'userinfo',
            meta: {
                title: '个人中心',
                cacheName:'userinfo-center'
            },
            component: resolve => require(['sendinfo-admin-ui/src/views/home/userinfo-center'], resolve)
        },
        {
            path: '/message',
            name: 'message',
            meta: {
                title: '消息中心',
            },
            component: resolve => require(['sendinfo-admin-ui/src/views/home/message'], resolve)
        },
        {
            path: '/corp/userManage',
            meta: {
                title: '企业用户管理'
            },
            component: resolve => require(['sendinfo-admin-ui/src/views/admin/corp/userInfo'], resolve)
        },
        {
            path: '/cms/model/item',name:'modelItem',
            meta: {
                title: '模型项管理'
            },
            component: resolve => require(['sendinfo-admin-ui/src/views/cms/cms-model/cms-model-item'], resolve)
        },
    ]
};

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    otherRouter, //位置不能移动 因为首页内容可以从外部传入组件进行自定义
    loginRouter,
    locking,
    ...errorPage
];

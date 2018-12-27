import main from 'sendinfo-admin-ui/src/views/main.vue';

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
const otherRouter = {
    path: '/',
    redirect: '/index',
    component: main,
    children: [{
        path: '/table',
        component: resolve => require(['../views/userInfo.vue'], resolve),
        meta: {
            title: '表格'
        }
    }]
};

// 所有上面定义的路由都要写在下面的routers里
export default [
    otherRouter
]

import Vue from 'vue';
import init from 'sendinfo-admin-ui/src/init.js'
// 加载系统路由
import routers from '@/router'
// 加载spa相关的api定义
import spaApi from './api/spa-api.js'
import proApi from './api/pro-api.js'
//加载公共业务api定义
import comApi from './api/com-api.js'
//加载系统公用service方法
import baseService from './service/commonService.js'

Vue.prototype.baseService = baseService;
Vue.prototype.spaApi = spaApi;
Vue.prototype.proApi = proApi;
Vue.prototype.comApi = comApi;
/*一些配置信息*/
// let defaultGateway = process.env.DEFAULT_GATEWAY ? `/${process.env.DEFAULT_GATEWAY}` : '';
// Vue.prototype.setting = {
//     VERIFY_CODE_URL: `${process.env.BASE_URL}${defaultGateway}/manage/api/`,
// };

// import constant from "sendinfo-admin-ui/src/core/util/constant";

init({
    route: {
        routes: routers,
        config: {mode: 'history'}
    },
    elementUIConfig: {size: 'small', zIndex: 3000},
    axiosConfig: {
        interceptors: []
    }
})

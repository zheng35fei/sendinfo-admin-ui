//api请求前缀--公共业务
const urlPrefix = '/admin';

//仓库
const comWarehouse = urlPrefix + '/commonpart/comWarehouse';
//场所信息
const comLocation = urlPrefix + '/commonpart/comLocation';
//场所支付方案
const comLocationPayScheme = urlPrefix + '/commonpart/comLocationPayScheme';
//客户信息
const comClientInfo = urlPrefix + '/commonpart/comClientInfo';
//客户分组
const comClientGroup = urlPrefix + '/commonpart/comClientGroup';

export default {
    comWarehouse,comLocation,comLocationPayScheme,comClientInfo,comClientGroup,
}

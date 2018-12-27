//api请求前缀
const urlPrefix = '/serverSpa';
//主页
const home = '/home';
//状态颜色管理
const statusColor = urlPrefix + '/basis/statusColor';
//技师基础信息维护
const artsInfo = urlPrefix + '/basis/artsInfo';
//技师值班
const artsWatch = urlPrefix + '/basis/artsWatch';
//匙牌分组
const cardGroup = urlPrefix + '/basis/cardGroup';
//匙牌信息
const cardInfo = urlPrefix + '/basis/cardInfo';
//温泉房间信息
const spaRoomInfo = urlPrefix + '/basis/spaRoomInfo';
//温泉房间类型信息
const spaRoomType = urlPrefix + '/basis/spaRoomType';
//分组票型
const groupTicket = urlPrefix + '/basis/cardGroupTicketModel'
//接待类型
const guestType = urlPrefix + '/basis/guestType';
//接待类型规则
const guestRule = urlPrefix + '/basis/guestRule';
//票型
const ticket = urlPrefix + '/basis/ticketModel'
//仓库
const comWarehouse = '/commonpart/comWarehouse';
//场所信息
const comLocation = '/commonpart/comLocation';
//场所支付方案
const comLocationPayScheme = '/commonpart/comLocationPayScheme';
//景区限流配置
export default {
    home,statusColor,artsInfo,artsWatch,
    cardGroup,cardInfo,
    spaRoomInfo,spaRoomType,
    comWarehouse,comLocation,comLocationPayScheme,
    groupTicket,ticket,guestType,guestRule
}

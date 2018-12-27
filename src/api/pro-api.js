//api请求前缀(产品)
const urlPrefix = '/serverProduct';
// 商品sku
const mdseSku = urlPrefix + '/product/mdseSku';
// 商品信息
const mdseInfo = urlPrefix + '/product/mdseInfo';
// 商品属性
const mdseAttr = urlPrefix + '/product/mdseAttr';
// 商品属性选项
const mdseAttrOption = urlPrefix + '/product/mdseAttrOption';
// 商品品牌
const mdseBrand = urlPrefix + '/product/mdseBrand';
// 商品类目
const mdseCategory = urlPrefix + '/product/mdseCategory';
// 商品规格
const mdseSpec = urlPrefix + '/product/mdseSpec';
// 商品规格选项
const mdseSpecOption = urlPrefix + '/product/mdseSpecOption';

export default {
    mdseInfo,
    mdseSku,
    mdseAttr,
    mdseAttrOption,
    mdseBrand,
    mdseCategory,
    mdseSpec,
    mdseSpecOption,
}

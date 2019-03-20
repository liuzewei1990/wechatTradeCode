import http from "./http.js";
import config from "@/config/index.config.js";

// 用户登录
export const postLogin = (data) => http.POST(`${config.baseUrl}/login`, data);

// 获取短信验证码
export const getMsgCode = (data) => http.GET(`${config.baseUrl}/register/sendMsg`, data);

// 校验注册验证码
export const postRegCode = (data) => http.POST(`${config.baseUrl}/register/verifySMSCode`, data);

// 获取卡片信息
export const getCardBin = (data) => http.GET(`${config.baseUrl}/card/getCardBin`, data);

// 图片上传
export const upload = (data) => http.POST(`${config.baseUrl}/register/upImg`, data);

// 图片下载
export const downloadImg = (data) => http.GET(`${config.baseUrl}/my/downloadImg`, data);

// 获取用户资料
export const getUserInfo = (data) => http.GET(`${config.baseUrl}/my/official`, data);

/* 
 * 商户相关
 */

// 查询商户状态
export const getCustomerStatus = (data) => http.GET(`${config.baseUrl}/my/audit`, data);

// 商户注册
export const postCustomer = (data) => http.POST(`${config.baseUrl}/register/customer`, data);

// 获取商户信息
export const getCustomer = (data) => http.GET(`${config.baseUrl}/my/information`, data);

// 修改商户信息
export const upDateCustomerInfo = (data) => http.POST(`${config.baseUrl}/my/modify`, data);

// 获取我的推广码
export const getPromoCode = (data) => http.GET(`${config.baseUrl}/my/promotionCode`, data);

/* 
 * 信用卡管理
 */

// 信用卡新增
export const postCard = (data) => http.POST(`${config.baseUrl}/card/add`, data);

// 信用卡删除
export const deleteCard = (data) => http.GET(`${config.baseUrl}/card/delete`, data);

// 获取信用卡列表信息
export const getCardList = (data) => http.GET(`${config.baseUrl}/card/list`, data);

/* 
 * 商户收款
 */

// 用户下单路由（此接口上送卡号等信息，获取分配的路由）
export const getPayRoute = (data) => http.GET(`${config.baseUrl}/pay/quickRouteQuery`, data);

// 用户下单
export const postPayOrder = (data) => http.POST(`${config.baseUrl}/pay/init`, data);

// 用户下单确认（路由类别为JSON调用）
export const postPayConfirm = (data) => http.POST(`${config.baseUrl}/pay/verify`, data);

// 获取交易记录
export const getTradeList = (data) => http.GET(`${config.baseUrl}/my/transaction`, data);


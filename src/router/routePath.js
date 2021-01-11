export const BASE_URL = '/'

export const LOGIN = `${BASE_URL}login` // 登录
export const REGISTER = `${BASE_URL}register` // 注册

// 主菜单
export const MAINMENU = `${BASE_URL}mainmenu`

// 物资
export const WZ = `${BASE_URL}wz`
export const WZ_WZLYSQ = `${WZ}/wzlysq` // 物资领用申请
export const WZ_WDWZLYSQ = `${WZ}/wdwzlysq` // 我的物资领用申请
export const WZ_WZTKSQ = `${WZ}/wztksq` // 物资退库
export const WZ_WDWZTK = `${WZ}/wdwztk` // 我的物资退库

export const WZ_WZLYSH = `${WZ}/wzlysh` // 物资领用审核
export const WZ_WZLYSH_DSP = `${WZ}/wzlysh_dsp` // 物资领用审核 - 待审批
export const WZ_WZLYSH_YPZ = `${WZ}/wzlysh_ypz` // 物资领用审核 - 已批准
export const WZ_WZLYSH_YBH = `${WZ}/wzlysh_ybh` // 物资领用审核 - 已驳回



export const WZ_WZTKSH = `${WZ}/wztksh` // 物资退库审核

export const WZ_XZWZ = `${WZ}/xzwz` // 选择物资
export const WZ_WZXQ = `${WZ}/wzxq` // 物资领用详情
export const WZ_WZTKXQ = `${WZ}/wztkxq` // 物资退库详情
export const WZ_WZLYSHXQ = `${WZ}/wzlyshxq` // 物资领用审核详情
export const WZ_WZTKSHXQ = `${WZ}/wztkshxq` // 物资退库审核详情

// 意见
export const YJ = `${BASE_URL}yj`
export const YJ_LIST = `${YJ}/list`
export const YJ_FK = `${YJ}/fk`

// 个人中心
export const ACCOUNT = `${BASE_URL}/account`
export const EDITPWD = `${BASE_URL}/editpwd`
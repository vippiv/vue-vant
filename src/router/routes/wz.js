import * as urls from '../routePath'

const wzlysq = () => import('@/views/wz/wzlysq.vue') // 物资领用申请
const wdwzlysq = () => import('@/views/wz/wdwzlysq.vue') // 我的物资领用申请
const wztksq = () => import('@/views/wz/wztksq.vue') // 物资退库申请
const wdwztk = () => import('@/views/wz/wdwztk.vue') // 我的物资退库

const wzlysh = () => import('@/views/wz/wzlysh.vue') // 物资领用审核
const wzlysh_dsp = () => import('@/views/wz/wzlysh/wzlysh_dsp.vue') // 物资领用审核 - 待审批
const wzlysh_ypz = () => import('@/views/wz/wzlysh/wzlysh_ypz.vue') // 物资领用审核 - 已批准
const wzlysh_ybh = () => import('@/views/wz/wzlysh/wzlysh_ybh.vue') // 物资领用审核 - 已驳回


const wztksh = () => import('@/views/wz/wztksh.vue') // 物资退库审核

const xzwz = () => import('@/views/wz/components/selectGoods.vue') // 选择物资
const wzxq = () => import('@/views/wz/components/goodsDetail.vue') // 物资详情

const routes = [
	{
		name: 'wzlysq',
		path: `${urls.WZ_WZLYSQ}`,
		meta: {
			title: '物资领用申请'
        },
        component: wzlysq
	},
	{
		name: 'wzlysq',
		path: `${urls.WZ_WZLYSQ}/:id`,
		meta: {
			title: '编辑物资领用申请'
        },
        component: wzlysq
	},
	{
		name: 'xzwz',
		path: `${urls.WZ_XZWZ}/:type`,
		meta: {
			title: '选择物资'
        },
        component: xzwz
    },
    {
		name: 'wdwzlysq',
		path: `${urls.WZ_WDWZLYSQ}`,
		meta: {
			title: '我的物资领用申请'
        },
        component: wdwzlysq
	},
	{
		name: 'wzxq',
		path: `${urls.WZ_WZXQ}/:id`,
		meta: {
			title: '物资领用详情'
        },
        component: wzxq
	},
	{
		name: 'wztkxq',
		path: `${urls.WZ_WZTKXQ}/:id`,
		meta: {
			title: '物资退库详情'
        },
        component: wzxq
	},
	{
		name: 'wzlyshxq',
		path: `${urls.WZ_WZLYSHXQ}/:id`,
		meta: {
			title: '物资领用审核详情'
        },
        component: wzxq
    },
    {
		name: 'wztksq',
		path: `${urls.WZ_WZTKSQ}`,
		meta: {
			title: '物资退库申请'
        },
        component: wztksq
	},
	{
		name: 'wztksq',
		path: `${urls.WZ_WZTKSQ}/:id`,
		meta: {
			title: '编辑物资退库申请'
        },
        component: wztksq
    },
    {
		name: 'wdwztk',
		path: `${urls.WZ_WDWZTK}`,
		meta: {
			title: '我的物资退库'
        },
        component: wdwztk
    },
    {
		name: 'wzlysh_dsp',
		path: `${urls.WZ_WZLYSH_DSP}`,
		meta: {
			title: '物资领用审核-待审批'
        },
        component: wzlysh_dsp
	},
	{
		name: 'wzlysh_ypz',
		path: `${urls.WZ_WZLYSH_YPZ}`,
		meta: {
			title: '物资领用审核-已批准'
        },
        component: wzlysh_ypz
	},
	{
		name: 'wzlysh_ybh',
		path: `${urls.WZ_WZLYSH_YBH}`,
		meta: {
			title: '物资领用审核-已驳回'
        },
        component: wzlysh_ybh
    },
    {
		name: 'wztksh',
		path: `${urls.WZ_WZTKSH}`,
		meta: {
			title: '物资退库审核'
        },
        component: wztksh
	},
	{
		name: 'wztkshxq',
		path: `${urls.WZ_WZTKSHXQ}/:id`,
		meta: {
			title: '物资退库审核-详情'
        },
        component: wzxq
    }
]

export default routes

import * as urls from './routePath'
import wzRoutes from './routes/wz' // 物资
import yjRoutes from './routes/yj' // 意见

// 物资中间页
const wzMiddlePage = () => import('@/views/wz/middlePage.vue')

// 意见中间页
const yjMiddlePage = () => import('@/views/yj/middlePage.vue')

// 个人中心
const AccountMiddlePage = () => import('@/views/account/middlePage.vue')
const AccountEditPwd = () => import('@/views/account/editPwd.vue')

const menu = [
	{
		path: urls.WZ,
		meta: {
			title: '物资',
			icon: 'icon-nav-base'
		},
		component: wzMiddlePage,
		children: [
			...wzRoutes
		]
	},
	{
		path: urls.YJ,
		meta: {
			title: '意见',
			icon: 'icon-nav-base'
		},
		redirect: urls.YJ_LIST,
		component: yjMiddlePage,
		children: [
			...yjRoutes
		]
	},
	{
		path: urls.ACCOUNT,
		meta: {
			title: '个人中心',
			icon: 'icon-nav-base'
		},
		component: AccountMiddlePage
	},
	{
		path: urls.EDITPWD,
		meta: {
			title: '修改密码',
			icon: 'icon-nav-base'
		},
		component: AccountEditPwd
	}
]

export default menu

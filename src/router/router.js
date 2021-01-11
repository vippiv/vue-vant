import Vue from 'vue'
import Router from 'vue-router'

import * as urls from './routePath'

import menuRouter from './menuRouter'

const NotFound = () => import('../views/error/404.vue')
const Layout = () => import('../views/layout/index.vue')
const Login = () => import('../views/login/login.vue')

Vue.use(Router)
// 解决Avoided redundant navigation to current location: "/**/**".
//push 
const VueRouterPush = Router.prototype.push 
Router.prototype.push = function push (to) {
		return VueRouterPush.call(this, to).catch(err => err)
}

//replace
const VueRouterReplace = Router.prototype.replace
Router.prototype.replace = function replace (to) {
	return VueRouterReplace.call(this, to).catch(err => err)
}
const vueRouter = new Router({
	mode: 'hash',
	routes: [
		{
			path: urls.BASE_URL,
			redirect: urls.LOGIN
		},
		{
			name: 'login',
			path: urls.LOGIN,
			component: Login,
			meta: { title: '登录' }
		},
		{
			path: urls.MAINMENU,
			meta: { title: '主页' },
			component: Layout,
			children: [...menuRouter]
		},
		{
			path: '*',
			name: 'err',
			component: NotFound
		}
	],
	scrollBehavior (to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		}
		if (from.meta.keepAlive) {
			from.meta.savedPosition = document.body.scrollTop
		}
		return {
			x: 0,
			y: to.meta.savedPosition || 0
		}
	}
})

vueRouter.beforeEach((to, from, next) => {
	if (to.meta.title) {
		document.title = to.meta.title
	}
	// next()
	const whiteList = [urls.LOGIN, urls.REGISTER]// 不重定向白名单
	const accessToken = sessionStorage.getItem('token') // 获取浏览器缓存的用户信息
	if (accessToken) {
		next()
	} else if (whiteList.includes(to.path)) {
		next()
	} else {
		next(urls.LOGIN)
	}
})

export default vueRouter

import fetch from '@/utils/fetch'
import api from '@/global/api'
import router from '@/router/router'
import * as urls from '@/router/routePath'

const keepAlive = sessionStorage.getItem('keepAlive') || []

const global = {
	state: {
		userInfo: null, // 登录账号信息,
		userRole: null, // 用户角色
		routeMatch: null // 保存面包屑导航
	},
	mutations: {
		SET_USER_INFO (state, payload = {}) {
			state.userInfo = payload
		},
		SET_USER_ROLE (state, payload = {}) {
			state.userRole = payload
		},
		SAVE_ROUTE_MATCH (state, payload) {
			state.routeMatch = payload
		}
	},
	// 全局请求(字典项接口，公共接口等)
	actions: {
		async A_SAVE_ROUTE_MATCH ({ commit }, payload) {
			commit('SAVE_ROUTE_MATCH', payload)
		},
		// 用户信息
		async A_SAVE_USER_INFO ({ commit, dispatch }, payload) {
			try {
				// 获取用户信息
				// const { status, data } = await fetch.get(api.global.userInfo)

				// if (status === 0) {
					commit('SET_USER_INFO', payload)
					sessionStorage.setItem('userInfo', JSON.stringify(payload))

					// 进入平台
					router.push(urls.MAINMENU)

					// if (data.companyId) {
					// 	dispatch('A_GET_COMPANY_CODE', { companyId: data.companyId })
					// 	router.push(urls.BASE_SYNCMANAGE)
					// } else {
					// 	Message.warning('登陆失败')
					// }
				// }
			} catch (e) {
				console.log(e)
			}
		},
		// 获取用户角色权限
		async A_GET_USER_ROLE ({ commit, dispatch }, payload) {
			try {
				const url = `${api.global.userRole}`
				const res = await fetch.get(url)
				if (res.code === 1) {
					commit('SET_USER_ROLE', res.values)
				}
				return res
			} catch (e) {
				console.log(e)
			}
		}
	}
}

export default global

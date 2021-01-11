import fetch from '@/utils/fetch'
import api from '@/global/api'

const login = {
	state: {},
	mutations: {},
	actions: {
		async A_LOGIN ({ commit, dispatch }, payload) {
			try {
				// 发送
				// const url = `${api.login.login}`
				// const res = await fetch.get(url, payload)
				// if (res.code === 1) {
					const token = 'jjdhhffjfhfj'
					const loginInfo = {UserId: 11}
					sessionStorage.setItem('token', token)
					dispatch('A_SAVE_USER_INFO', loginInfo) // 存储用户信息并进入站内
					// commit('SET_TOKEN', token)
				// } else {
					// Message.error(res.msg)
				// }
			} catch (e) {
				console.log(e)
			}
		},
		async A_GET_USER_INFO ({commit, dispatch}, payload) {
			try {
				const url = `${api.login.getUserInfo}`
				const res = await fetch.get(url, payload)
				return res
			} catch (e) {
				console.log(e)
			}
		}
	}
}
export default login

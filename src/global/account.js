import request from '@/utils/fetch'
import api from '@/global/api'

// 获取个人中心数据
export function getUserInfo (params) {
	return request({
		url: `${api.login.getUserInfo}`,
		method: 'get',
		params
	})
}

// 修改个人中心数据
export function submitUserInfo (data) {
	return request({
		url: `${api.login.submitUserInfo}`,
		method: 'post',
		data
	})
}

// 修改密码
export function submitPassword (data) {
	return request({
		url: `${api.login.submitPassword}`,
		method: 'post',
		data
	})
}


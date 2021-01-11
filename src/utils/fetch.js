import axios from 'axios'
import router from '../router/router'
import * as urls from '../router/routePath'
import throwErr from './throwErr'
import {
	setBaseUrl,
	setHeaders
} from './utils'

const fetch = axios.create({
	timeout: 50000
})
let check = true

fetch.interceptors.request.use(config => new Promise((resolve) => {
	if (process.env.NODE_ENV === 'prod') {
		config.url = setBaseUrl(config.url) // eslint-disable-line
	}
	config.headers = setHeaders(config.url) // eslint-disable-line
	config.headers['Content-Type'] = 'application/json; charset=utf-8'
	return resolve(config)
}), error => Promise.reject(error))

fetch.interceptors.response.use((res) => {
	const {
		data,
		headers = {}
	} = res
	if (headers.Authorization) {
		sessionStorage.setItem('token', res.headers.Authorization)
	}
	// token失效
	if (data && data.code === -2) {
		alert('登录失效请重新登录')
		setTimeout(() => {
			router.push({
				path: urls.LOGIN
			})
		}, 1000)
		// if (check) {
		// 	Message.error('登录失效请重新登录')
		// 	check = false
		// 	setTimeout(() => {
		// 		check = true
		// 	}, 1000)
		// }
		return res.data
	}
	// 请求失败
	if (data && data.code !== 1) {
		// Message.error(data.message || '请求错误')
		return res.data
	}
	if (data && data.code === 1) {
		return res.data
	}
	return res
}, (err) => {
	const {
		message,
		response
	} = err
	if (err && message && message.includes('timeout')) {
		// Notification.error({
		// 	title: '消息',
		// 	message: '请求超时，请稍后再试'
		// })
	}
	if (err && message && message.includes('Network Error')) {
		// Notification.error({
		// 	title: '消息',
		// 	message: '请求错误'
		// })
	}
	if (err && response) {
		if (check) {
			check = false
			// Notification.error({
			// 	title: '消息',
			// 	message: throwErr(response.status, response)
			// })
			setTimeout(() => {
				check = true
			}, 1000)
		}
	}
	return Promise.reject(err)
})

export default fetch
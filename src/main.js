import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router/router'
import * as filters from './filters'
import './styles/index.scss'
import components from './components'
import Vant from 'vant'
import { Notify } from 'vant'
import 'vant/lib/index.css'

// 使用的组件
Vue.use(components) // 注册的本地的所有的组件
Vue.use(Vant)

Vue.config.productionTip = false
Object.keys(filters).forEach((key) => {
	Vue.filter(key, filters[key])
})

Vue.prototype.$notify = Notify
const vm = new Vue({
	store,
	router,
	render: h => h(App)
}).$mount('#app')
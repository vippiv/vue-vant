import fetch from '@/utils/fetch'
import api from '@/global/api'

const configure = {
    state: {

    },
    mutations: {

    },
    actions: {
        async GetBasicConfiguration ({ commit, dispatch }, payload) { // 获取基本配置
            try {
                const url = `${api.configure.getBasicConfiguration}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async SaveBasicConfiguration ({ commit, dispatch }, payload) { // 保存
            try {
                const url = `${api.configure.saveBasicConfiguration}`
                const res = await fetch.post(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
    }
}
export default configure
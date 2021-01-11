// 全局的计算属性，每一个store需要转化的在此属性中进行转化
const getters = {
  keepAlive: state => state.global.keepAlive
}

export default getters

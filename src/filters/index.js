import moment from 'moment'
import Vue from 'vue'

export const momentTime = (val, type = 'YYYY-MM-DD HH:mm', init = '-') => {
  if (val && (val !== '' || val !== undefined || val !== null)) {
    return val ? moment(val).format(type) : init
  }
  return init
}

/*
@params list 需要过滤的数组
@params val 需要匹配的值
@params id 使用数组里边的哪个key值进行过滤
@params returnValName  过滤后需要返回的name值得key值 名称
*/
//  list 需要过滤的数组  val 需要匹配的值  id 使用数组里边的哪个key值进行过滤  returnValName  过滤后需要返回的name值得key值 名称
export const filterDic = (val = '', list = [], id = 'type', returnValName = 'name') => {
  let temp = []
  if (!val) return ''
  if (val !== '' && list && list.length > 0) {
    temp = list.filter(item => item[id].toString() === val.toString())
  }
  if (temp && temp.length > 0) {
    return temp[0][returnValName]
  }
  return ''
}
export const moduleFil = (list1, list2) => {
  const newList = []
  list1.forEach((item) => {
    newList.push(list2.filter(ele => ele.id === item))
  })
  return newList
}

// 没有数据  展示默认值
export const defaultVal = (val, init = '—') => (!val || val === '' || val === null || val === undefined ? init : val)

// 监听type按钮样式
Vue.filter('className', (val) => {
  if (val === 'detail') {
    return 'tz-btn-add'
  }
  return 'tz-search-submit'
})

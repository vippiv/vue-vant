import axios from 'axios'
// import throwErr from './throwErr'

const fetch = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 10000
})
fetch.interceptors.request.use(config => new Promise((resolve, reject) => {
  const token = sessionStorage.getItem('token') || ''
  // eslint-disable-next-line no-param-reassign
  config.headers = {
    'Content-Type': 'application/json',
    Authorization: token
  }
  return resolve(config)
}), error => Promise.reject(error))
fetch.interceptors.response.use((response) => {
  const { data } = response
  const param = response.config.data ? JSON.parse(response.config.data) : {}
  // 有可能下载失败，返回{code: '500'},但responseType: 'blob'会把data强制转为blob，导致下载undefined.excel
  // 解决：将已转为blob类型的data转回json格式，判断是否下载成功
  const r = new FileReader()
  // eslint-disable-next-line func-names
  r.onload = (function () {
    // 如果JSON.parse(this.result)不报错，说明this.result是json字符串，是下载报错情况的返回值，弹框提示
    // 如果JSON.parse(this.result)报错，说明下载成功，进入catch
    // const resData = JSON.parse(data) // this.result为FileReader获取blob数据转换为json后的数据，即后台返回的原始数据
    if (response && response.status && response.status !== 200) {
      alert('下载失败')
    } else {
      const { fileName } = param
      // 获取文件名
      // if (fileName && fileName.length >= 2) {
      // eslint-disable-next-line prefer-destructuring
      // fileName = fileName.split('=')[1]
      // }
      // fileName = decodeURIComponent(fileName)
      // 兼容ie11
      if (window.navigator.msSaveOrOpenBlob) {
        const blobObject = new Blob([data])
        window.navigator.msSaveOrOpenBlob(blobObject, fileName)
        return
      }
      const url = window.URL.createObjectURL(new Blob([data]))
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
      Promise.resolve(fileName)
    }
  }())
  // if (response.config && response.config.responseType === 'blob') {
  //   const param = response.config.data ? JSON.parse(response.config.data) : {}
  //   const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
  //   if ('download' in document.createElement('a')) {
  //     const downloadElement = document.createElement('a')
  //     let href = ''
  //     if (window.URL) href = window.URL.createObjectURL(blob)
  //     else href = window.webkitURL.createObjectURL(blob)
  //     downloadElement.href = href
  //     downloadElement.download = param.fileName || 'excel.xlsx'
  //     document.body.appendChild(downloadElement)
  //     downloadElement.click()
  //     if (window.URL) window.URL.revokeObjectURL(href)
  //     else window.webkitURL.revokeObjectURL(href)
  //     document.body.removeChild(downloadElement)
  //   } else {
  //     navigator.msSaveBlob(blob, param.fileName || 'excel.xlsx')
  //   }
  // }
  // return Promise.resolve(response.data)
},
(error) => {
  const { response } = error
  let message = '异常'; let
    status
  if (!response) message = '请求超时...'
  else {
    message = response.statusText
    // eslint-disable-next-line prefer-destructuring
    status = response.status
  }
  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject({ message, status })
})

export default fetch


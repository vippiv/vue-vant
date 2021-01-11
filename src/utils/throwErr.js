const errMes = {
  400: '请求错误',
  401: '未授权，请登录',
  403: '拒绝访问',
  404: '请求地址出错',
  408: '请求超时',
  500: '服务器内部错误',
  501: '服务未实现',
  502: '网关错误',
  503: '服务不可用',
  504: '网关超时',
  505: 'HTTP版本不受支持',
  200000: '基础服务异常，请联系管理员',
  200500: '自定义异常，请联系管理员',
  200501: '效验异常，请联系管理员',
  300000: '生产服务异常，请联系管理员',
  300500: '自定义异常，请联系管理员',
  300501: '效验异常，请联系管理员',
  400000: '质检服务异常，请联系管理员',
  500000: '仓库服务异常，请联系管理员'
}

const throwErr = (code, response = {}) => {
  let errMsg = ''
  Object.keys(errMes).forEach((item) => {
    if (String(code) === item) {
      if (code === 404) {
        errMsg = `${errMes[item]}${response.config && response.config.url}`
        return
      }
      errMsg = errMes[item]
    }
  })
  return errMsg
}
export default throwErr

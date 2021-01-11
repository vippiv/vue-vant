import {
  isMobile, checkEmail, checkFax, isNum, checkChinese
} from './utils'

export const checkPhone = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('手机号不能为空'))
  } else if (value && !isMobile(value)) {
    callback(new Error('手机号码格式不正确！'))
  } else {
    callback()
  }
}

// 校验座机和手机
export const checkMobile = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('手机号不能为空'))
  } else if (value && !isMobile(value)) {
    callback(new Error('手机号码格式不正确！'))
  } else {
    callback()
  }
}

export const checkPassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('密码不能为空'))
  } else {
    callback()
  }
}
export const verificationCode = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('验证码不能为空'))
  } else {
    callback()
  }
}

export const verificationEmail = (rule, value, callback) => {
  if (value && !checkEmail(value)) {
    callback(new Error('邮箱格式不正确！'))
  } else {
    callback()
  }
}

export const verificationFax = (rule, value, callback) => {
  if (value && !checkFax(value)) {
    callback(new Error('传真格式不正确！'))
  } else {
    callback()
  }
}

export const checkNum = (rule, value, callback) => {
  if (value && !isNum(value)) {
    callback(new Error('请输入大于等于0数字'))
  } else {
    callback()
  }
}

// 检验中文
export const verChinese = (rule, value, callback) => {
  if (checkChinese(value)) {
    callback(new Error('不能包含中文'))
  } else {
    callback()
  }
}

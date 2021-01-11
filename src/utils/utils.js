import echarts from 'echarts'
import api from '../global/api'

/* eslint-disable */
export const isMobile = (mobile) => { // 校验手机号
    const reg = /^1[356789]\d{9}$/
    return reg.test(mobile)
}
export const isNum = (val) => {
    const reg = /^\d*\.?\d+$/
    return reg.test(val)
}
export const isChinese = (val) => {
    const reg = new RegExp("[\\u4E00-\\u9FFF]+","g")
    return reg.test(val)
}

export const isPhone = (phone) => { // 校验固定电话号码
    const reg = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/
    return reg.test(phone)
}

export const isEmail = (email) => { //校验邮箱
    const reg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/
    return reg.test(email)
}

export const isCreditCode = (code) => { // 校验企业统一社会信用代码
    const reg = /[0-9]{13}$|[0-9]{13}-[0-9]{2}$/g
    return reg.test(code)
}

export const getBase64 = file => new Promise((resolve, reject) => { // 获取base64图片
    const reader = new FileReader()
    let img = ''
    reader.readAsDataURL(file)
    reader.onload = function () {
        img = reader.result
    }
    reader.onerror = function (error) {
        reject(error)
    }
    reader.onloadend = function () {
        resolve(img)
    }
})

export const getLocal = (key, value) => { // 获取 localStorage值
    const len = arguments.length
    if (len === 1 && localStorage.getItem(key)) {
        return JSON.parse(localStorage.getItem(key))
    }
    if (len === 2) {
        localStorage.setItem(key, JSON.stringify(value))
    }
}

export const getSession = (key, value) => { // 获取 sessionStorage值
    const len = arguments.length
    if (len === 1 && sessionStorage.getItem(key)) {
        return JSON.parse(localStorage.getItem(key))
    }
    if (len === 2) {
        sessionStorage.setItem(key, JSON.stringify(value))
    }
}
// 拼接URL
export const jointUrl = (fid, fileName) => {
    const first = fileName.lastIndexOf(".")
    const len = fileName.length
    const fileSuffix = fileName.substring(first, len).toLowerCase()
    return fileName ? `${fid}${fileSuffix}` : `${fid}`
}

// 图片URL
export const picUrl = (fileName) => {
    const first = fileName.lastIndexOf("/")
    const len = fileName.length
    const fileSuffix = fileName.substring(first + 1, len).toLowerCase()
    return fileName ? `${fileSuffix}` : ''
}

// 下载模版
export const downloadFile = (fileName, name) => {
// fileName 下载的文件名  name  下载的文件
// console.log(name)
// console.log('fileName', fileName)
// const a = document.createElement('a')
// a.setAttribute('href', `import/${name}`)
// a.setAttribute('download', `${fileName}.xls`)
// a.download = `${fileName}.xls`
// a.setAttribute('target', '_blank')
// const clickEvent = document.createEvent('MouseEvents')
// clickEvent.initEvent('click', true, true)
// a.dispatchEvent(clickEvent)
a.download = `${fileName}.xls`
a.href = `${process.env.BASE_URL}/import/${name}`
a.click()
}

export const downloadLocalFile = (url, name = 'template.excel') => {
    if ('msSaveOrOpenBlob' in navigator) {
        window.navigator.msSaveOrOpenBlob(url, name);
        if (url.includes('import')) {
            const a = document.createElement('a')
            a.setAttribute('href', url)
            a.setAttribute('download', name)
            a.setAttribute('target', '_self')
            const clickEvent = document.createEvent('MouseEvents')
            clickEvent.initEvent('click', true, true)
            a.dispatchEvent(clickEvent)
        }
    } else {
        const a = document.createElement('a')
        a.setAttribute('href', url)
        a.setAttribute('download', name)
        a.setAttribute('target', '_blank')
        const clickEvent = document.createEvent('MouseEvents')
        clickEvent.initEvent('click', true, true)
        a.dispatchEvent(clickEvent)
    }
}
// base64 转excel文件
export const dataURLtoBlob = (dataUrl) => {
    const raw = window.atob(dataUrl)
    const len = raw.length
    const uint8Array = new Uint8Array(len)
    for (let i = 0; i < len; i++) {
        uint8Array[i] = raw.charCodeAt(i)
    }
    const myBlob = new Blob([uint8Array], { type: 'application/vnd.ms-excel' })
    if ('msSaveOrOpenBlob' in navigator) {
        return myBlob
    } else {
        return URL.createObjectURL(myBlob)
    }

}
// 数组去重
export const unique = (arr) => {
    return Array.from(new Set(arr))
}
// 判断是否是对象
export const isObject = (val) => {
    return val != null && typeof val === 'object' && Array.isArray(val) === false;
}

// 求和
export const sum = (arr, id) => {
    let sum = 0
    if (id) {
        sum = arr.map(item => item[id]).filter(i => i).reduce((prev, cur) => prev + cur, 0)
        return sum
    }
    sum = arr.filter(i => i).reduce((prev, cur) => prev + cur, 0)
    return sum
}
// 去除请求参数中空值
export const removeEmpty = (obj = {}) => {
    if (typeof obj !== 'object') { return }
        const result = Object.keys(obj).filter(it => obj[it] !== '')
    const temp = {}
    result.forEach(it => {
        temp[it] = obj[it]
    })
    return temp
}

// 设置baseUrl
export const setBaseUrl = (url) => {
    if (process.env.NODE_ENV === 'prod' && url.indexOf('api/') === 0) {
        return process.env.VUE_APP_BASE_URL + url
    } else if (process.env.NODE_ENV === 'prod' && url.indexOf('docapi/') === 0) {
        url = url.replace('docapi', 'api')
        return process.env.VUE_APP_BASE_URL_RESIDENT_DOCTOR + url
    } else if (process.env.NODE_ENV === 'prod' && url.indexOf('nurseapi/') === 0) {
        url = url.replace('nurseapi', 'api')
        return process.env.VUE_APP_BASE_URL_NURSE + url
    } else if (process.env.NODE_ENV === 'prod' && url.indexOf('outpatientapi/') === 0) {
        url = url.replace('outpatientapi', 'api')
        return process.env.VUE_APP_BASE_URL_OUTPATIENT + url
    } else {
        return ''
    }
}
// 
export const setHeaders = (url) => {
    const token = sessionStorage.getItem('token') || ''
    const CompanyCode = sessionStorage.getItem('companyCode') || ''
const base =  { // eslint-disable-line
    'Content-Type': 'application/json',
// Authorization: token
}
const apis = Object.values(api.manager || {})
return !apis.includes(url) ? base : { ...base, CompanyCode }
}

// 邮箱正则
export const checkEmail = e => {
    return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(e)
}
// 传真正则
export const checkFax = e => {
    return /^(\d{3,4}-)?\d{7,8}$/.test(e)
}

// 校验中文
export const checkChinese = e => {
    return /[\u4e00-\u9fa5]/gm.test(e)
}

// 传递数据
// obj => string
export const becomeString = (obj) => {
    return encodeURIComponent(JSON.stringify(obj))
}

// string => obj
export const becomeObj = (string) => {
    return JSON.parse(decodeURIComponent(string))
}

// 获取当前日期
export const currentDate = () => {
    function addZero(num) {
        if (num < 10) {
            return `0${num}`
        } else {
            return num
        }
    }
    const date = new Date()
    const year = date.getFullYear()
    const month = addZero(date.getMonth() + 1)
    const day = addZero(date.getDate())
    return `${year}-${month}-${day}`
}

export const rowspan = (tableData = [], name = []) => {
    const spanArr = []
    let position = 0
    if (tableData) {
        tableData.forEach((item, index) => {
            if (index === 0) {
                spanArr.push(1)
                position = 0
            } else if (tableData[index][name] === tableData[index - 1][name]) {
                spanArr[position] += 1
                spanArr.push(0)
            } else {
                spanArr.push(1)
                position = index
            }
        })
    }
    return spanArr
}
export const spanMethod = ({ rowIndex, columnIndex }, spanArr = [], columns = []) => {
    if (columns.includes(columnIndex)) {
        const rows = spanArr[rowIndex]
        const cols = rows > 0 ? 1 : 0
        return { rowspan: rows, colspan: cols }
    }
    return { rowspan: 1, colspan: 1 }
}

// obj => string
export const becomString = (obj) => {
    return encodeURIComponent(JSON.stringify(obj))
}
// string => obj
export const becomObj = (string) => {
    return JSON.parse(decodeURIComponent(string))
}

// 绘制echarts
export const drawEChart = (id, option) => {
    const echart = echarts.init(document.getElementById(id))
    echart.clear()
    echart.setOption(option)
}

// 把对象转换成query字符串
export const convertPostToGet = (payload) => {
    let queryStr = '?'
    if (!payload) {
        return ''
    }
    let i = Object.keys(payload).length
    Object.keys(payload).forEach((key, index) => {
        if ( i === (index + 1)) {
            queryStr += (key + '=' + payload[key])
        } else {
            queryStr += (key + '=' + payload[key] + '&')
        }
    })
    return queryStr
}


// 判断变量的类型
export const getType = (obj) => {
    var str = Object.prototype.toString.call(obj)
    var map = {
        '[object Boolean]'  : 'boolean', 
        '[object Number]'   : 'number', 
        '[object String]'   : 'string', 
        '[object Function]' : 'function', 
        '[object Array]'    : 'array', 
        '[object Date]'     : 'date', 
        '[object RegExp]'   : 'regExp', 
        '[object Undefined]': 'undefined',
        '[object Null]'     : 'null', 
        '[object Object]'   : 'object'
    }
    if(obj instanceof Element){ //判断是否是dom元素，如div等
        return "element"
    }
    return map[str]
}

export const deepCopy = (p) => {
    var obj
    var str = getType(p)
    if (str == 'array') {
        obj = [];
        for (var i = 0; i < p.length; i++) {
            obj.push(deepCopy(p[i]))  //回调自己
        }
    }else if(str == 'object'){
        obj = {};
        for(var i in p){
            obj[i] = deepCopy(p[i])
        }
    }else{
        return p
    }
    return obj
}

export const download = (data, filename) => {
    if (!data) {
        return
    }
    var blob = new Blob([data], {type: 'application/vnd.oasis.opendocument.text'}); //application/vnd.openxmlformats-officedocument.wordprocessingml.document这里表示doc类型
    var url = window.URL.createObjectURL(blob);
    if (window.navigator && window.navigator.msSaveBlob) { // for IE
        // window.navigator.msSaveOrOpenBlob(data,filename);
        // window.navigator.msSaveBlob(blob, filename, true)
        AxNsoControl.OpenDocumentWithString(data, 1);
    } else {
        let link = document.createElement('a');
        link.style.display = 'none';
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
    }
    // let link = document.createElement('a');
    //     link.style.display = 'none';
    //     link.href = 'http://192.168.31.209:8022/DownloadFiles/123.doc';
    //     link.setAttribute('download', filename);
    //     document.body.appendChild(link);
    //     link.click();
}

export const baseSrc2Blob = (img64Str) => {
    // var block = img64Str.split(";"); // Split the base64 string in data and contentType
    // var contentType = block[0].split(":")[1];// In this case "image/gif" //Get the content type
    // var realData = block[1].split(",")[1];// In this case "iVBORw0KGg...." //get the real base64 content of the file
    const realData = img64Str
    const contentType = 'image/png'
    var blob_file = b64toBlob(realData, contentType);// Convert to blob //转成二级制原始文件内容
    return blob_file
}

export const b64toBlob = (b64Data, contentType, sliceSize) => { // base64转成二进制对象函数
	//来源文档：https://ourcodeworld.com/articles/read/322/how-to-convert-a-base64-image-into-a-image-file-and-upload-it-with-an-asynchronous-form-using-jquery
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
}

export const activeXScript = {
    anchor: null,
    script: null,
    insertActiveXScript (id, anchor, evt, content) {
        if (!anchor) return
        const script = document.createElement('script')
        const anchorEle = document.querySelector(anchor)
        script.setAttribute("language", 'javascript')
        if (id) {
            script.setAttribute("FOR", id)
        } else {
            script.setAttribute("type", 'text/javascript')
        }
        if (evt) {
            script.setAttribute("event", evt)
        }
        script.innerHTML = content
        anchorEle.appendChild(script)
        this.anchor = anchorEle
        this.script = script
    },
    destroy () {
        if (!this.anchor) return
        this.anchor.innerHTML = ''
    }
}
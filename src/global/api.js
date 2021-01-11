const platform = 'api/'

const api = {
    // 全局数据
    global: {
        
    },
    // 登录
    login: {
        login: `${platform}Login/GetLogin`, // 登录
        submitUserInfo: `${platform}Login/GetLogin`, // 修改个人中心数据
        getUserInfo: `${platform}Login/GetLogin`, // 获取个人中心数据

        submitPassword: `${platform}Login/GetLogin`, // 修改密码
    }
}

export default api
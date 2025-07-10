import request from './config'

// 用戶登入
export function login(data) {
    return request({
        url: '/user/login',
        method: 'post',
        data
    })
}

// 獲取用戶資料
export function getUserInfo() {
    return request({
        url: '/user/info',
        method: 'get'
    })
}

// 更新用戶資料
export function updateUserInfo(data) {
    return request({
        url: '/user/update',
        method: 'put',
        data
    })
}

// 用戶註冊
export function register(data) {
    return request({
        url: '/user/register',
        method: 'post',
        data
    })
}

// 重設密碼
export function resetPassword(data) {
    return request({
        url: '/user/reset-password',
        method: 'post',
        data
    })
}

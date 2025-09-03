import request from './config'




// 用戶登入
export function login(params) {
    return request({
        url: 'https://preview-inspection.wise-iservice.com/storemonitor/api/v1.0/inspect/remote/authorization',
        method: 'get',
        params: { secretKey: 'testsecret', ...(params || {}) }
    })
}


export function getInspection() {
    return request({
        url: 'https://preview-inspection.wise-iservice.com/storemonitor/api/v1.0/inspect/remote/checkout?isMysteryMode=false',
        method: 'get'
    })
}



export function getInspectToken() {
    return request({
        url: 'https://demo-factory.cupola360.com/1/plugin/iService?key=testsecret3',
        method: 'get',

    })
}


export function submitInspect(data) {
    return request({
        url: 'https://preview-inspection.wise-iservice.com/storemonitor/api/v1.0/inspect/remote/submit',
        method: 'post',
        data
    })
}



// // 獲取用戶資料
// export function getUserInfo() {
//     return request({
//         url: '/user/info',
//         method: 'get'
//     })
// }

// // 更新用戶資料
// export function updateUserInfo(data) {
//     return request({
//         url: '/user/update',
//         method: 'put',
//         data
//     })
// }

// // 用戶註冊
// export function register(data) {
//     return request({
//         url: '/user/register',
//         method: 'post',
//         data
//     })
// }

// // 重設密碼
// export function resetPassword(data) {
//     return request({
//         url: '/user/reset-password',
//         method: 'post',
//         data
//     })
// }

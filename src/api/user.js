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
        url: 'https://demo-factory.cupola360.com/1/plugin/iService?key=testsecret5',
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

// 上傳截圖到 blob storage
export async function uploadScreenshotToBlob(imageData, fileName, onProgress) {
    // 將 base64 圖片數據轉換為 blob
    const byteString = atob(imageData.split(',')[1]);
    const mimeString = imageData.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });

    // Azure Blob Storage SAS token
    const sasToken = "?sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacupitfx&se=2030-03-30T16:13:56Z&st=2022-03-30T08:13:56Z&spr=https&sig=Cab8bPeymLcVk9jmHhekHQqHPzAaaVFfhT%2BnIXmVLZU%3D";

    // 構建完整的 blob URL
    const blobUrl = `https://storevuestorage.blob.core.windows.net/storevue-mgmt-portals/cupola360/image/${fileName}${sasToken}`;

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener('progress', (event) => {
            if (event.lengthComputable && onProgress) {
                const percentComplete = (event.loaded / event.total) * 100;
                onProgress(percentComplete);
            }
        });

        xhr.addEventListener('load', () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                console.log('Upload successful');
                // 返回上傳後的 URL（不包含 SAS token）
                resolve(`https://storevuestorage.blob.core.windows.net/storevue-mgmt-portals/cupola360/image/${fileName}`);
            } else {
                console.log('Upload failed:', xhr.status, xhr.statusText);
                reject(new Error(`Upload failed: ${xhr.status} ${xhr.statusText}`));
            }
        });

        xhr.addEventListener('error', () => {
            console.error('Upload error:', xhr.error);
            reject(new Error('Upload failed'));
        });

        xhr.open('PUT', blobUrl);
        xhr.setRequestHeader('x-ms-blob-type', 'BlockBlob');
        xhr.setRequestHeader('Content-Type', mimeString);
        xhr.send(blob);
    });
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

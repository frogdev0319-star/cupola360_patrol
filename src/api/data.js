import request from './config'

// 獲取表格數據
export function getTableData(params) {
    return request({
        url: '/data/table',
        method: 'get',
        params
    })
}

// 獲取圖表數據
export function getChartData(params) {
    return request({
        url: '/data/chart',
        method: 'get',
        params
    })
}

// 提交表單數據
export function submitFormData(data) {
    return request({
        url: '/data/form',
        method: 'post',
        data
    })
}

// 上傳檔案
export function uploadFile(data) {
    return request({
        url: '/data/upload',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data
    })
}

// 刪除數據
export function deleteData(id) {
    return request({
        url: `/data/${id}`,
        method: 'delete'
    })
}

// 批量刪除數據
export function batchDelete(ids) {
    return request({
        url: '/data/batch-delete',
        method: 'post',
        data: { ids }
    })
}

// 導出數據
export function exportData(params) {
    return request({
        url: '/data/export',
        method: 'get',
        params,
        responseType: 'blob' // 設置響應類型為 blob
    })
}

// 獲取下拉選項數據
export function getOptions(type) {
    return request({
        url: '/data/options',
        method: 'get',
        params: { type }
    })
}

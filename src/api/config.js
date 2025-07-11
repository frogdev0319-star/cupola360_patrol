import axios from 'axios'
import { ElMessage } from 'element-plus'

// 創建 axios 實例
const service = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, // API 基礎路徑
    timeout: 15000 // 請求超時時間
})

// 請求攔截器
service.interceptors.request.use(
    config => {
        // 在發送請求之前做些什麼
        // 例如：添加 token
        const token = localStorage.getItem('token')
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    error => {
        // 處理請求錯誤
        console.error('Request error:', error)
        return Promise.reject(error)
    }
)

// 響應攔截器
service.interceptors.response.use(
    response => {
        // 處理響應數據
        const res = response.data

        // 假設後端返回的數據結構為 { code: number, data: any, message: string }
        if (res.code === 200) {
            return res.data
        } else {
            ElMessage.error(res.message || '發生錯誤')
            return Promise.reject(new Error(res.message || '發生錯誤'))
        }
    },
    error => {
        // 處理響應錯誤
        console.error('Response error:', error)
        const message = error.response?.data?.message || error.message || '網路錯誤'
        ElMessage.error(message)
        return Promise.reject(error)
    }
)

export default service

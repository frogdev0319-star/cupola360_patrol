import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    console.log(`當前運行模式: ${mode}`)

    return {
        plugins: [vue()],
        base: '/cupola360_patrol/',
        server: {
            port: 3000,
            strictPort: false, // 如果端口被占用，嘗試下一個可用端口
            open: true
        },
        define: {
            // 確保環境變數在客戶端可用
            __APP_ENV__: JSON.stringify(mode)
        }
    }
})

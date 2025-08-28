<template>
  <div id="app">
    <el-container>
      <!-- <el-header>
        <h1>Vue 3 + Element Plus 示範專案</h1>
        <el-menu
          :default-active="$route.path"
          mode="horizontal"
          router
          background-color="#409EFF"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="/">首頁</el-menu-item>
          <el-menu-item index="/about">關於我們</el-menu-item>
          <el-menu-item index="/contact">聯絡我們</el-menu-item>
        </el-menu>
      </el-header> -->
      
      <el-main>
        <!-- <div v-if="appEnv === 'development'" class="env-indicator development">
          開發環境
        </div>
        <div v-else-if="appEnv === 'production'" class="env-indicator production">
          生產環境
        </div> -->
        
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      appEnv: import.meta.env.VITE_APP_ENV || 'development',
      appTitle: import.meta.env.VITE_APP_TITLE || 'Cupola360 Patrol'
    }
  },
  created() {
    document.title = this.appTitle
    console.log('當前環境:', this.appEnv)
    // console.log('API 基礎路徑:', import.meta.env.VITE_API_BASE_URL)
  }
}
</script>

<style lang="sass">
@import './assets/reset.css'

#app
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif

.el-header
  background-color: #409EFF
  color: white
  text-align: center
  padding: 0
  
  h1
    margin: 0
    font-size: 24px
    line-height: 60px

.el-menu
  border: none !important

.el-menu--horizontal
  justify-content: center

.el-main
  padding: 20px
  background-color: #f5f7fa
  min-height: calc(100vh - 120px)
  position: relative

.env-indicator
  position: fixed
  top: 10px
  right: 10px
  padding: 5px 10px
  border-radius: 4px
  color: white
  font-size: 12px
  font-weight: bold
  z-index: 9999

.development
  background-color: #67C23A

.production
  background-color: #F56C6C
</style>

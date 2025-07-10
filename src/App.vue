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
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App'
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
</style>

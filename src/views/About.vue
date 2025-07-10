<template>
  <div class="about">
    <el-card class="page-header">
      <h1>關於我們</h1>
      <p>了解更多關於這個 Vue 3 + Element Plus 專案的資訊</p>
    </el-card>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="info-card">
          <template #header>
            <h2>技術棧</h2>
          </template>
          
          <el-timeline>
            <el-timeline-item timestamp="前端框架" placement="top">
              <el-card>
                <h4>Vue 3</h4>
                <p>使用最新的 Vue 3 框架，支援 Composition API</p>
              </el-card>
            </el-timeline-item>
            
            <el-timeline-item timestamp="UI 組件庫" placement="top">
              <el-card>
                <h4>Element Plus</h4>
                <p>基於 Vue 3 的桌面端組件庫</p>
              </el-card>
            </el-timeline-item>
            
            <el-timeline-item timestamp="路由管理" placement="top">
              <el-card>
                <h4>Vue Router 4</h4>
                <p>Vue.js 官方的路由管理器</p>
              </el-card>
            </el-timeline-item>
            
            <el-timeline-item timestamp="建置工具" placement="top">
              <el-card>
                <h4>Vite</h4>
                <p>下一代前端建置工具</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
      
      <el-col :span="12">
        <el-card class="features-card">
          <template #header>
            <h2>專案特色</h2>
          </template>
          
          <el-collapse v-model="activeNames">
            <el-collapse-item title="響應式設計" name="1">
              <div>支援各種螢幕尺寸，提供良好的使用體驗</div>
            </el-collapse-item>
            
            <el-collapse-item title="組件化開發" name="2">
              <div>採用組件化架構，程式碼可重用性高</div>
            </el-collapse-item>
            
            <el-collapse-item title="現代化工具鏈" name="3">
              <div>使用 Vite 建置工具，開發體驗更佳</div>
            </el-collapse-item>
            
            <el-collapse-item title="TypeScript 支援" name="4">
              <div>可選擇性支援 TypeScript，提供更好的開發體驗</div>
            </el-collapse-item>
          </el-collapse>
        </el-card>
        
        <el-card class="stats-card" style="margin-top: 20px;">
          <template #header>
            <h2>專案統計</h2>
          </template>
          
          <el-row :gutter="20">
            <el-col :span="8">
              <el-statistic title="組件數量" :value="25" suffix="個">
                <template #prefix>
                  <el-icon style="vertical-align: -0.125em">
                    <Edit />
                  </el-icon>
                </template>
              </el-statistic>
            </el-col>
            
            <el-col :span="8">
              <el-statistic title="頁面數量" :value="3" suffix="個">
                <template #prefix>
                  <el-icon style="vertical-align: -0.125em">
                    <Document />
                  </el-icon>
                </template>
              </el-statistic>
            </el-col>
            
            <el-col :span="8">
              <el-statistic title="程式碼行數" :value="500" suffix="行">
                <template #prefix>
                  <el-icon style="vertical-align: -0.125em">
                    <Edit />
                  </el-icon>
                </template>
              </el-statistic>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>

    <el-card class="team-card" style="margin-top: 20px;">
      <template #header>
        <h2>開發團隊</h2>
      </template>
      
      <el-row :gutter="20">
        <el-col :span="8" v-for="member in teamMembers" :key="member.id">
          <el-card shadow="hover" class="team-member">
            <div class="member-avatar">
              <el-avatar :size="80" :src="member.avatar">
                <el-icon><User /></el-icon>
              </el-avatar>
            </div>
            <h3>{{ member.name }}</h3>
            <p class="member-role">{{ member.role }}</p>
            <p class="member-description">{{ member.description }}</p>
            
            <div class="member-skills">
              <el-tag v-for="skill in member.skills" :key="skill" size="small" style="margin-right: 5px; margin-bottom: 5px;">
                {{ skill }}
              </el-tag>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { ref } from 'vue'
import { Document, Edit, User } from '@element-plus/icons-vue'

export default {
  name: 'About',
  setup() {
    const activeNames = ref(['1'])
    
    const teamMembers = ref([
      {
        id: 1,
        name: '張開發',
        role: '前端工程師',
        description: '專精於 Vue.js 和現代前端技術',
        avatar: '',
        skills: ['Vue 3', 'JavaScript', 'CSS3', 'Element Plus']
      },
      {
        id: 2,
        name: '李設計',
        role: 'UI/UX 設計師',
        description: '負責使用者介面和體驗設計',
        avatar: '',
        skills: ['UI Design', 'UX Design', 'Figma', 'Sketch']
      },
      {
        id: 3,
        name: '王架構',
        role: '系統架構師',
        description: '負責整體系統架構和技術選型',
        avatar: '',
        skills: ['Vue Router', 'Vite', 'Node.js', 'Architecture']
      }
    ])

    return {
      activeNames,
      teamMembers,
      Document,
      Edit,
      User
    }
  }
}
</script>

<style lang="sass" scoped>
.about
  padding: 20px

.page-header
  margin-bottom: 30px
  text-align: center
  
  h1
    color: #409EFF
    margin-bottom: 10px

.info-card, .features-card, .stats-card, .team-card
  margin-bottom: 20px

.team-member
  text-align: center
  height: 100%

.member-avatar
  margin-bottom: 15px

.member-role
  color: #909399
  font-size: 14px
  margin-bottom: 10px

.member-description
  color: #606266
  font-size: 13px
  margin-bottom: 15px

.member-skills
  margin-top: 10px

:deep(.el-timeline-item__content)
  padding-bottom: 20px

:deep(.el-statistic__content)
  text-align: center
</style>

<template>
  <div class="contact">
    <el-card class="page-header">
      <h1>聯絡我們</h1>
      <p>有任何問題或建議，歡迎與我們聯繫</p>
    </el-card>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="contact-form">
          <template #header>
            <h2>發送訊息</h2>
          </template>
          
          <el-form :model="contactForm" :rules="rules" ref="contactFormRef" label-width="100px">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="contactForm.name" placeholder="請輸入您的姓名"></el-input>
            </el-form-item>
            
            <el-form-item label="電子郵件" prop="email">
              <el-input v-model="contactForm.email" placeholder="請輸入您的電子郵件"></el-input>
            </el-form-item>
            
            <el-form-item label="電話" prop="phone">
              <el-input v-model="contactForm.phone" placeholder="請輸入您的電話號碼"></el-input>
            </el-form-item>
            
            <el-form-item label="主題" prop="subject">
              <el-select v-model="contactForm.subject" placeholder="請選擇主題" style="width: 100%">
                <el-option label="一般詢問" value="general"></el-option>
                <el-option label="技術支援" value="support"></el-option>
                <el-option label="商業合作" value="business"></el-option>
                <el-option label="錯誤回報" value="bug"></el-option>
              </el-select>
            </el-form-item>
            
            <el-form-item label="優先級" prop="priority">
              <el-radio-group v-model="contactForm.priority">
                <el-radio value="low">低</el-radio>
                <el-radio value="medium">中</el-radio>
                <el-radio value="high">高</el-radio>
                <el-radio value="urgent">緊急</el-radio>
              </el-radio-group>
            </el-form-item>
            
            <el-form-item label="訊息內容" prop="message">
              <el-input
                v-model="contactForm.message"
                type="textarea"
                :rows="5"
                placeholder="請輸入您的訊息內容"
              ></el-input>
            </el-form-item>
            
            <el-form-item label="附件">
              <el-upload
                class="upload-demo"
                drag
                action="#"
                :auto-upload="false"
                :on-change="handleFileChange"
                multiple
              >
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">
                  將檔案拖拽到此處，或<em>點擊上傳</em>
                </div>
                <template #tip>
                  <div class="el-upload__tip">
                    支援 jpg/png/pdf 檔案，且不超過 10MB
                  </div>
                </template>
              </el-upload>
            </el-form-item>
            
            <el-form-item>
              <el-button type="primary" @click="submitForm" :loading="submitting">
                <el-icon><Message /></el-icon>
                發送訊息
              </el-button>
              <el-button @click="resetForm">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      
      <el-col :span="12">
        <el-card class="contact-info">
          <template #header>
            <h2>聯絡資訊</h2>
          </template>
          
          <div class="info-item">
            <el-icon class="info-icon"><Location /></el-icon>
            <div class="info-content">
              <h3>地址</h3>
              <p>台北市信義區信義路五段7號</p>
            </div>
          </div>
          
          <div class="info-item">
            <el-icon class="info-icon"><Phone /></el-icon>
            <div class="info-content">
              <h3>電話</h3>
              <p>+886-2-1234-5678</p>
            </div>
          </div>
          
          <div class="info-item">
            <el-icon class="info-icon"><Message /></el-icon>
            <div class="info-content">
              <h3>電子郵件</h3>
              <p>contact@example.com</p>
            </div>
          </div>
          
          <div class="info-item">
            <el-icon class="info-icon"><Clock /></el-icon>
            <div class="info-content">
              <h3>營業時間</h3>
              <p>週一至週五 9:00 - 18:00</p>
              <p>週六 9:00 - 12:00</p>
              <p>週日休息</p>
            </div>
          </div>
        </el-card>
        
        <el-card class="social-media" style="margin-top: 20px;">
          <template #header>
            <h2>社群媒體</h2>
          </template>
          
          <div class="social-links">
            <el-button circle size="large" @click="openSocialLink('facebook')">
              <el-icon><Share /></el-icon>
            </el-button>
            <el-button circle size="large" @click="openSocialLink('twitter')">
              <el-icon><ChatDotRound /></el-icon>
            </el-button>
            <el-button circle size="large" @click="openSocialLink('linkedin')">
              <el-icon><Link /></el-icon>
            </el-button>
            <el-button circle size="large" @click="openSocialLink('github')">
              <el-icon><Platform /></el-icon>
            </el-button>
          </div>
        </el-card>
        
        <el-card class="faq-section" style="margin-top: 20px;">
          <template #header>
            <h2>常見問題</h2>
          </template>
          
          <el-collapse>
            <el-collapse-item title="如何開始使用這個專案？" name="1">
              <p>您可以克隆這個專案到本地，然後執行 npm install 安裝依賴，最後執行 npm run dev 啟動開發伺服器。</p>
            </el-collapse-item>
            
            <el-collapse-item title="支援哪些瀏覽器？" name="2">
              <p>支援所有現代瀏覽器，包括 Chrome、Firefox、Safari 和 Edge 的最新版本。</p>
            </el-collapse-item>
            
            <el-collapse-item title="如何自訂主題？" name="3">
              <p>您可以通過修改 Element Plus 的 CSS 變數來自訂主題，或者使用 Element Plus 提供的主題生成工具。</p>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { 
  Message, 
  Location, 
  Phone, 
  Clock, 
  Share, 
  ChatDotRound, 
  Link, 
  Platform,
  UploadFilled
} from '@element-plus/icons-vue'
import { submitFormData, uploadFile } from '../api/data'

export default {
  name: 'Contact',
  setup() {
    const contactFormRef = ref()
    const submitting = ref(false)
    
    const contactForm = reactive({
      name: '',
      email: '',
      phone: '',
      subject: '',
      priority: 'medium',
      message: '',
      files: []
    })

    const rules = {
      name: [
        { required: true, message: '請輸入姓名', trigger: 'blur' }
      ],
      email: [
        { required: true, message: '請輸入電子郵件', trigger: 'blur' },
        { type: 'email', message: '請輸入正確的電子郵件格式', trigger: 'blur' }
      ],
      phone: [
        { required: true, message: '請輸入電話號碼', trigger: 'blur' }
      ],
      subject: [
        { required: true, message: '請選擇主題', trigger: 'change' }
      ],
      message: [
        { required: true, message: '請輸入訊息內容', trigger: 'blur' },
        { min: 10, message: '訊息內容至少需要 10 個字元', trigger: 'blur' }
      ]
    }

    const submitForm = async () => {
      contactFormRef.value.validate(async (valid) => {
        if (valid) {
          try {
            submitting.value = true
            
            // 如果有檔案，先上傳檔案
            if (contactForm.files.length > 0) {
              const formData = new FormData()
              contactForm.files.forEach(file => {
                formData.append('files', file.raw)
              })
              await uploadFile(formData)
            }
            
            // 提交表單數據
            await submitFormData({
              ...contactForm,
              files: contactForm.files.map(file => file.name)
            })
            
            ElMessage.success('訊息發送成功！我們會盡快回覆您。')
            resetForm()
          } catch (error) {
            console.error('提交失敗:', error)
            ElMessage.error('提交失敗，請稍後再試')
          } finally {
            submitting.value = false
          }
        } else {
          ElMessage.error('請檢查表單內容')
        }
      })
    }

    const resetForm = () => {
      contactFormRef.value.resetFields()
      contactForm.files = []
    }

    const handleFileChange = (file, fileList) => {
      // 檢查檔案類型
      const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf']
      if (!allowedTypes.includes(file.raw.type)) {
        ElMessage.error('只支援 jpg、png 和 pdf 檔案')
        return false
      }
      
      // 檢查檔案大小（10MB）
      const maxSize = 10 * 1024 * 1024
      if (file.raw.size > maxSize) {
        ElMessage.error('檔案大小不能超過 10MB')
        return false
      }
      
      contactForm.files = fileList
      ElMessage.info(`已選擇 ${fileList.length} 個檔案`)
    }

    const openSocialLink = (platform) => {
      ElMessage.info(`開啟 ${platform} 連結`)
    }

    return {
      contactForm,
      contactFormRef,
      rules,
      submitting,
      submitForm,
      resetForm,
      handleFileChange,
      openSocialLink,
      Message,
      Location,
      Phone,
      Clock,
      Share,
      ChatDotRound,
      Link,
      Platform,
      UploadFilled
    }
  }
}
</script>

<style lang="sass" scoped>
.contact
  padding: 20px

.page-header
  margin-bottom: 30px
  text-align: center
  
  h1
    color: #409EFF
    margin-bottom: 10px

.contact-form, .contact-info, .social-media, .faq-section
  margin-bottom: 20px

.info-item
  display: flex
  align-items: flex-start
  margin-bottom: 25px

.info-icon
  font-size: 24px
  color: #409EFF
  margin-right: 15px
  margin-top: 5px

.info-content
  h3
    margin: 0 0 8px 0
    color: #303133
    font-size: 16px
  
  p
    margin: 0
    color: #606266
    line-height: 1.5

.social-links
  display: flex
  gap: 15px
  justify-content: center
  
  .el-button
    width: 50px
    height: 50px

:deep(.el-upload-dragger)
  width: 100%

:deep(.el-form-item__label)
  font-weight: 500
</style>

<template>
  <div class="poster-page-container gradient-bg page-container">
    <div class="poster-header">
      <div class="back-btn" @click="goBack">
        <span class="back-icon">‹</span>
        <span class="back-text">返回</span>
      </div>
      <h3 class="header-title">专属人格海报</h3>
      <div class="placeholder"></div>
    </div>
    
    <div class="poster-preview-section">
      <div class="poster-wrapper">
        <div ref="posterRef" class="poster-container">
          <div class="poster-bg">
            <div class="bg-gradient-1"></div>
            <div class="bg-gradient-2"></div>
            <div class="bg-pattern"></div>
          </div>
          
          <div class="poster-content">
            <div class="poster-header-section">
              <div class="logo-section">
                <span class="logo-icon">🌸</span>
                <span class="logo-text">心灵小站</span>
              </div>
              <div class="date-badge">{{ posterData?.date || '2024.01.01' }}</div>
            </div>
            
            <div class="main-type-section">
              <div class="type-badge">
                <span class="type-code">{{ posterData?.personality?.type || 'INFP' }}</span>
              </div>
              <h2 class="type-name">{{ posterData?.personality?.name || '调停者型' }}</h2>
              <p class="type-quote">"{{ posterData?.personality?.quotes?.[0] || '你的存在，本身就是一种治愈' }}"</p>
            </div>
            
            <div class="tags-section">
              <span 
                v-for="(tag, index) in posterData?.personality?.tags || ['神秘', '温柔']" 
                :key="index"
                class="poster-tag"
              >
                {{ tag }}
              </span>
            </div>
            
            <div class="info-cards">
              <div class="info-card love-card">
                <div class="card-icon">💖</div>
                <div class="card-content">
                  <span class="card-label">恋爱人格</span>
                  <span class="card-value">{{ posterData?.love?.name || '灵魂伴侣型' }}</span>
                </div>
              </div>
              
              <div class="info-card career-card">
                <div class="card-icon">🌟</div>
                <div class="card-content">
                  <span class="card-label">职场人设</span>
                  <span class="card-value">{{ posterData?.career?.name || '创新思想家' }}</span>
                </div>
              </div>
            </div>
            
            <div class="bottom-quote">
              <p class="quote-text">"{{ posterData?.personality?.quotes?.[1] || posterData?.personality?.quotes?.[0] || '你的温柔，是世界的宝藏' }}"</p>
            </div>
            
            <div class="poster-footer">
              <div class="qr-placeholder">
                <div class="qr-inner">
                  <span class="qr-icon">📱</span>
                </div>
              </div>
              <div class="footer-text">
                <p class="footer-title">扫码发现真实的自己</p>
                <p class="footer-desc">心灵小站 - 治愈系心理测试</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="poster-tips">
        <p class="tips-text">长按图片可保存到相册</p>
      </div>
    </div>
    
    <div class="actions-section">
      <button class="action-btn save-btn" @click="savePoster">
        <span class="btn-icon">💾</span>
        <span class="btn-text">保存海报</span>
      </button>
      
      <button class="action-btn share-btn" @click="sharePoster">
        <span class="btn-icon">📤</span>
        <span class="btn-text">分享给好友</span>
      </button>
    </div>
    
    <div class="other-actions">
      <button class="secondary-btn" @click="retakeTest">
        <span class="btn-icon">🔄</span>
        <span class="btn-text">重新测试</span>
      </button>
      <button class="secondary-btn" @click="goToHome">
        <span class="btn-icon">🏠</span>
        <span class="btn-text">返回首页</span>
      </button>
    </div>
    
    <div v-if="showSuccess" class="success-toast">
      <span class="toast-icon">✅</span>
      <span class="toast-text">海报已生成，请长按保存</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getCurrentResult } from '@/utils/storage'
import html2canvas from 'html2canvas'

const router = useRouter()

const posterRef = ref(null)
const posterData = ref(null)
const showSuccess = ref(false)

onMounted(() => {
  loadPosterData()
})

const loadPosterData = () => {
  const savedResult = getCurrentResult()
  if (savedResult) {
    posterData.value = savedResult
  } else {
    posterData.value = generateMockData()
  }
}

const generateMockData = () => {
  return {
    date: new Date().toLocaleDateString('zh-CN'),
    personality: {
      type: 'INFP',
      name: '调停者型',
      tags: ['理想主义', '敏感', '富有创造力', '追求真实'],
      quotes: ['在纷扰中保持内心的宁静', '你的温柔，是世界的宝藏']
    },
    love: {
      name: '灵魂伴侣型'
    },
    career: {
      name: '创新思想家'
    }
  }
}

const savePoster = async () => {
  if (!posterRef.value) return
  
  try {
    const canvas = await html2canvas(posterRef.value, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
      logging: false
    })
    
    const imageData = canvas.toDataURL('image/png')
    
    const link = document.createElement('a')
    link.href = imageData
    link.download = `心灵小站_${posterData.value?.personality?.type || '测试结果'}.png`
    link.click()
    
    showSuccessMessage()
  } catch (error) {
    console.error('生成海报失败:', error)
    showSuccessMessage()
  }
}

const sharePoster = () => {
  if (navigator.share) {
    navigator.share({
      title: '我的专属人格海报',
      text: `我是${posterData.value?.personality?.name || '独特的'}，来看看你的专属人格吧！`,
      url: window.location.href
    }).catch(() => {
      showSuccessMessage()
    })
  } else {
    showSuccessMessage()
  }
}

const showSuccessMessage = () => {
  showSuccess.value = true
  setTimeout(() => {
    showSuccess.value = false
  }, 3000)
}

const goBack = () => {
  router.back()
}

const retakeTest = () => {
  const category = posterData.value?.category || 'personality'
  router.push(`/quiz/${category}`)
}

const goToHome = () => {
  router.push('/')
}
</script>

<style scoped>
.poster-page-container {
  display: flex;
  flex-direction: column;
  padding: 16px 20px;
}

.poster-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.back-btn {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.9);
}

.back-icon {
  font-size: 20px;
  color: #7a6a6a;
  margin-right: 4px;
}

.back-text {
  font-size: 13px;
  color: #7a6a6a;
  font-weight: 500;
}

.header-title {
  font-size: 16px;
  font-weight: 600;
  color: #5a4a4a;
}

.placeholder {
  width: 60px;
}

.poster-preview-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.poster-wrapper {
  padding: 8px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.poster-container {
  position: relative;
  width: 300px;
  height: 533px;
  overflow: hidden;
  border-radius: 12px;
}

.poster-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.bg-gradient-1 {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #fef6f0 0%, #f5e6e0 30%, #e8f4f8 60%, #f0f5e8 100%);
}

.bg-gradient-2 {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 30% 20%, rgba(255, 154, 158, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 70% 80%, rgba(161, 196, 253, 0.15) 0%, transparent 50%);
}

.bg-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(circle, rgba(138, 106, 106, 0.03) 1px, transparent 1px);
  background-size: 20px 20px;
}

.poster-content {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
}

.poster-header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.logo-section {
  display: flex;
  align-items: center;
}

.logo-icon {
  font-size: 20px;
  margin-right: 6px;
}

.logo-text {
  font-size: 14px;
  font-weight: 600;
  color: #7a6a6a;
}

.date-badge {
  padding: 4px 10px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  font-size: 11px;
  color: #8a7a7a;
}

.main-type-section {
  text-align: center;
  margin-bottom: 20px;
}

.type-badge {
  display: inline-block;
  padding: 6px 16px;
  background: linear-gradient(135deg, rgba(255, 154, 158, 0.2), rgba(254, 207, 239, 0.2));
  border-radius: 20px;
  border: 1px solid rgba(255, 154, 158, 0.3);
  margin-bottom: 12px;
}

.type-code {
  font-size: 24px;
  font-weight: 700;
  background: linear-gradient(135deg, #ff9a9e, #fecfef);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.type-name {
  font-size: 18px;
  font-weight: 600;
  color: #5a4a4a;
  margin-bottom: 10px;
}

.type-quote {
  font-size: 12px;
  color: #8a7a7a;
  font-style: italic;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  display: inline-block;
}

.tags-section {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 6px;
  margin-bottom: 24px;
}

.poster-tag {
  display: inline-block;
  padding: 4px 10px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  font-size: 11px;
  color: #7a6a6a;
  border: 1px solid rgba(255, 154, 158, 0.2);
}

.info-cards {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.info-card {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 12px 10px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 12px;
}

.card-icon {
  font-size: 20px;
  margin-right: 8px;
}

.card-content {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.card-label {
  font-size: 10px;
  color: #9a8a8a;
  margin-bottom: 2px;
}

.card-value {
  font-size: 12px;
  font-weight: 600;
  color: #6a5a5a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.bottom-quote {
  text-align: center;
  margin-bottom: auto;
  padding-top: 10px;
}

.quote-text {
  font-size: 12px;
  color: #7a6a6a;
  font-style: italic;
  line-height: 1.6;
}

.poster-footer {
  display: flex;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid rgba(138, 106, 106, 0.1);
}

.qr-placeholder {
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
}

.qr-inner {
  width: 40px;
  height: 40px;
  background: rgba(255, 154, 158, 0.1);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.qr-icon {
  font-size: 20px;
}

.footer-text {
  flex: 1;
}

.footer-title {
  font-size: 11px;
  font-weight: 600;
  color: #6a5a5a;
  margin-bottom: 2px;
}

.footer-desc {
  font-size: 10px;
  color: #9a8a8a;
}

.poster-tips {
  margin-top: 12px;
  text-align: center;
}

.tips-text {
  font-size: 12px;
  color: #9a8a8a;
}

.actions-section {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.action-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px 20px;
  border-radius: 24px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.save-btn {
  background: linear-gradient(135deg, #ff9a9e, #fecfef);
  color: #5a4a4a;
  box-shadow: 0 4px 15px rgba(255, 154, 158, 0.4);
}

.save-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 154, 158, 0.5);
}

.share-btn {
  background: rgba(255, 255, 255, 0.8);
  color: #6a5a5a;
  border: 1px solid rgba(255, 154, 158, 0.3);
}

.share-btn:hover {
  background: rgba(255, 255, 255, 0.95);
}

.other-actions {
  display: flex;
  gap: 12px;
}

.secondary-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 20px;
  font-size: 13px;
  color: #7a6a6a;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.secondary-btn:hover {
  background: rgba(255, 255, 255, 0.8);
}

.success-toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  padding: 16px 24px;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 12px;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

.toast-icon {
  font-size: 20px;
  margin-right: 10px;
}

.toast-text {
  font-size: 14px;
  color: #fff;
}

/* 响应式适配 */
@media (max-width: 320px) {
  .poster-page-container {
    padding: 12px 16px;
  }
  
  .poster-container {
    width: 260px;
    height: 462px;
  }
  
  .poster-content {
    padding: 20px 16px;
  }
}
</style>

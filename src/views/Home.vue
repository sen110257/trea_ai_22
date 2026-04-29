<template>
  <div class="home-container gradient-bg page-container hide-scrollbar">
    <div class="header-section">
      <div class="history-btn" @click="goToHistory">
        <span class="history-icon">📚</span>
        <span class="history-text">历史记录</span>
      </div>
    </div>
    
    <div class="welcome-section">
      <div class="welcome-icon">🌸</div>
      <h1 class="title-primary">心灵小站</h1>
      <p class="text-secondary welcome-subtitle">探索内心深处，遇见更真实的自己</p>
    </div>
    
    <div class="intro-section glass-card">
      <h3 class="title-secondary intro-title">关于测试</h3>
      <p class="text-primary intro-text">
        这是一场温柔的心灵之旅，通过轻松有趣的问答，帮助你更好地了解自己的性格特质、恋爱模式和职场优势。
      </p>
      <div class="intro-tags">
        <span class="tag tag-pink">专业解读</span>
        <span class="tag tag-blue">趣味问答</span>
        <span class="tag tag-green">治愈氛围</span>
      </div>
    </div>
    
    <div class="category-section">
      <h3 class="title-secondary section-title">选择测试类型</h3>
      
      <div 
        v-for="category in categories" 
        :key="category.key"
        class="category-card glass-card-light float-effect"
        @click="startQuiz(category.key)"
      >
        <div class="category-icon">{{ category.info.icon }}</div>
        <div class="category-content">
          <h4 class="category-name">{{ category.info.name }}</h4>
          <p class="category-desc">{{ category.info.description }}</p>
        </div>
        <div class="category-arrow">›</div>
      </div>
    </div>
    
    <div v-if="hasUnfinished" class="unfinished-section glass-card">
      <div class="unfinished-icon">⏰</div>
      <div class="unfinished-content">
        <h4 class="unfinished-title">有未完成的测试</h4>
        <p class="unfinished-desc">继续上次的答题进度</p>
      </div>
      <button class="btn-primary continue-btn" @click="continueQuiz">
        继续答题
      </button>
    </div>
    
    <div class="footer-section">
      <p class="text-secondary footer-text">愿你找到内心的平静与力量 ✨</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getCategoryInfo } from '@/data/questions'
import { hasUnfinishedTest, getProgress } from '@/utils/storage'

const router = useRouter()

const hasUnfinished = ref(false)
const unfinishedProgress = ref(null)

const categories = [
  {
    key: 'personality',
    info: getCategoryInfo('personality')
  },
  {
    key: 'love',
    info: getCategoryInfo('love')
  },
  {
    key: 'career',
    info: getCategoryInfo('career')
  }
]

onMounted(() => {
  checkUnfinished()
})

const checkUnfinished = () => {
  if (hasUnfinishedTest()) {
    const progress = getProgress()
    if (progress) {
      hasUnfinished.value = true
      unfinishedProgress.value = progress
    }
  }
}

const startQuiz = (category) => {
  router.push(`/quiz/${category}`)
}

const continueQuiz = () => {
  if (unfinishedProgress.value) {
    router.push(`/quiz/${unfinishedProgress.value.category}`)
  }
}

const goToHistory = () => {
  router.push('/history')
}
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  padding: 16px 20px;
  padding-bottom: 40px;
}

.header-section {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.history-btn {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.history-btn:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: scale(1.05);
}

.history-icon {
  font-size: 16px;
  margin-right: 6px;
}

.history-text {
  font-size: 13px;
  color: #7a6a6a;
  font-weight: 500;
}

.welcome-section {
  text-align: center;
  margin-bottom: 28px;
}

.welcome-icon {
  font-size: 48px;
  margin-bottom: 12px;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.welcome-subtitle {
  margin-top: 8px;
  font-size: 14px;
}

.intro-section {
  padding: 20px;
  margin-bottom: 28px;
}

.intro-title {
  font-size: 17px;
  margin-bottom: 12px;
}

.intro-text {
  font-size: 14px;
  line-height: 1.7;
  margin-bottom: 16px;
}

.intro-tags {
  display: flex;
  flex-wrap: wrap;
}

.category-section {
  margin-bottom: 24px;
}

.section-title {
  font-size: 17px;
  margin-bottom: 16px;
  padding-left: 4px;
}

.category-card {
  display: flex;
  align-items: center;
  padding: 16px;
  margin-bottom: 12px;
  cursor: pointer;
}

.category-icon {
  font-size: 32px;
  margin-right: 16px;
  flex-shrink: 0;
}

.category-content {
  flex: 1;
  min-width: 0;
}

.category-name {
  font-size: 16px;
  font-weight: 600;
  color: #5a4a4a;
  margin-bottom: 4px;
}

.category-desc {
  font-size: 13px;
  color: #8a7a7a;
  line-height: 1.4;
}

.category-arrow {
  font-size: 24px;
  color: #b8a8a8;
  margin-left: 12px;
}

.unfinished-section {
  display: flex;
  align-items: center;
  padding: 16px;
  margin-bottom: 24px;
}

.unfinished-icon {
  font-size: 28px;
  margin-right: 12px;
}

.unfinished-content {
  flex: 1;
}

.unfinished-title {
  font-size: 15px;
  font-weight: 600;
  color: #5a4a4a;
  margin-bottom: 2px;
}

.unfinished-desc {
  font-size: 13px;
  color: #8a7a7a;
}

.continue-btn {
  padding: 10px 20px;
  font-size: 13px;
  white-space: nowrap;
}

.footer-section {
  text-align: center;
  margin-top: auto;
  padding-top: 16px;
}

.footer-text {
  font-size: 13px;
}

/* 响应式适配 */
@media (max-width: 320px) {
  .home-container {
    padding: 12px 16px;
  }
  
  .welcome-icon {
    font-size: 40px;
  }
  
  .category-icon {
    font-size: 28px;
    margin-right: 12px;
  }
  
  .category-name {
    font-size: 14px;
  }
  
  .category-desc {
    font-size: 12px;
  }
}
</style>

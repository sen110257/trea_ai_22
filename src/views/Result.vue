<template>
  <div class="result-container gradient-bg page-container hide-scrollbar">
    <div v-if="!result" class="loading-section">
      <div class="loading-icon">✨</div>
      <p class="loading-text">正在生成你的专属分析...</p>
    </div>
    
    <template v-else>
      <div class="header-section">
        <h2 class="title-primary">你的专属分析报告</h2>
        <p class="text-secondary date-text">{{ result.date }}</p>
      </div>
      
      <div class="main-type-section glass-card">
        <div class="type-icon">🌟</div>
        <div class="type-info">
          <h3 class="type-code">{{ result.personality?.type || 'INFP' }}</h3>
          <h4 class="type-name">{{ result.personality?.name || '调停者型' }}</h4>
        </div>
        <div class="type-quote">
          {{ result.personality?.quotes?.[0] || '你的存在，本身就是一种治愈' }}
        </div>
      </div>
      
      <div class="tags-section glass-card">
        <h5 class="section-subtitle">性格标签</h5>
        <div class="tags-container">
          <span 
            v-for="(tag, index) in result.personality?.tags || ['神秘', '温柔']" 
            :key="index"
            class="tag"
            :class="getTagClass(index)"
          >
            {{ tag }}
          </span>
        </div>
      </div>
      
      <div class="dimension-section">
        <h3 class="title-secondary section-title">性格维度分析</h3>
        <div class="dimension-cards">
          <div v-for="(dim, key) in result.personality?.dimensions || {}" :key="key" class="dimension-card glass-card-light">
            <div class="dimension-header">
              <span class="dimension-value">{{ dim.value }}</span>
              <span class="dimension-percentage">{{ dim.percentage }}%</span>
            </div>
            <div class="dimension-bars">
              <div class="bar-left" :style="{ width: 100 - dim.percentage + '%' }">
                <span class="bar-label">{{ dim.labels[0] }}</span>
              </div>
              <div class="bar-right" :style="{ width: dim.percentage + '%' }">
                <span class="bar-label">{{ dim.labels[1] }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="strengths-section glass-card">
        <div class="section-header">
          <span class="section-icon">💪</span>
          <h5 class="section-subtitle">你的优势</h5>
        </div>
        <ul class="strengths-list">
          <li v-for="(strength, index) in result.personality?.strengths || ['你的独特之处']" :key="index" class="strength-item">
            <span class="bullet">•</span>
            <span class="strength-text">{{ strength }}</span>
          </li>
        </ul>
      </div>
      
      <div class="weaknesses-section glass-card">
        <div class="section-header">
          <span class="section-icon">🌱</span>
          <h5 class="section-subtitle">成长空间</h5>
        </div>
        <ul class="weaknesses-list">
          <li v-for="(weakness, index) in result.personality?.weaknesses || ['继续探索自己']" :key="index" class="weakness-item">
            <span class="bullet">•</span>
            <span class="weakness-text">{{ weakness }}</span>
          </li>
        </ul>
      </div>
      
      <div class="love-section">
        <h3 class="title-secondary section-title">恋爱人格分析</h3>
        <div class="love-card glass-card">
          <div class="love-header">
            <span class="love-icon">💖</span>
            <h4 class="love-type-name">{{ result.love?.name || '灵魂伴侣型' }}</h4>
          </div>
          <p class="love-description">{{ result.love?.description }}</p>
          
          <div class="love-percentages">
            <div v-for="(percent, type) in result.love?.percentages || {}" :key="type" class="percent-item">
              <span class="percent-label">{{ getLoveTypeLabel(type) }}</span>
              <div class="percent-bar">
                <div class="percent-fill" :style="{ width: percent + '%' }"></div>
              </div>
              <span class="percent-value">{{ percent }}%</span>
            </div>
          </div>
          
          <div class="love-tips">
            <div class="tips-section">
              <h5 class="tips-title">理想伴侣</h5>
              <p class="tips-text">{{ result.love?.idealMatch }}</p>
            </div>
            <div class="tips-section">
              <h5 class="tips-title">相处建议</h5>
              <ul class="tips-list">
                <li v-for="(tip, index) in result.love?.tips || []" :key="index" class="tip-item">
                  <span class="tip-bullet">💡</span>
                  <span class="tip-text">{{ tip }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div class="career-section">
        <h3 class="title-secondary section-title">职场人设分析</h3>
        <div class="career-card glass-card">
          <div class="career-header">
            <span class="career-icon">🌟</span>
            <h4 class="career-type-name">{{ result.career?.name || '创新思想家' }}</h4>
          </div>
          <p class="career-description">{{ result.career?.description }}</p>
          
          <div class="career-percentages">
            <div v-for="(percent, type) in result.career?.percentages || {}" :key="type" class="percent-item">
              <span class="percent-label">{{ getCareerTypeLabel(type) }}</span>
              <div class="percent-bar">
                <div class="percent-fill" :style="{ width: percent + '%' }"></div>
              </div>
              <span class="percent-value">{{ percent }}%</span>
            </div>
          </div>
          
          <div class="career-tips">
            <div class="tips-section">
              <h5 class="tips-title">优势特质</h5>
              <div class="strengths-mini">
                <span 
                  v-for="(str, index) in result.career?.strengths || []" 
                  :key="index"
                  class="tag tag-blue"
                >
                  {{ str }}
                </span>
              </div>
            </div>
            <div class="tips-section">
              <h5 class="tips-title">适配方向</h5>
              <div class="careers-list">
                <span 
                  v-for="(career, index) in result.career?.fitCareers || []" 
                  :key="index"
                  class="career-tag"
                >
                  {{ career }}
                </span>
              </div>
            </div>
            <div class="tips-section">
              <h5 class="tips-title">发展建议</h5>
              <p class="tips-text">{{ result.career?.developmentSuggestions }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="quote-section glass-card">
        <p class="quote-text">"{{ result.personality?.quotes?.[1] || result.personality?.quotes?.[0] || '你的温柔，是世界的宝藏' }}"</p>
      </div>
      
      <div class="actions-section">
        <button class="action-btn primary-btn" @click="generatePoster">
          <span class="btn-icon">🎨</span>
          <span class="btn-text">生成专属海报</span>
        </button>
        
        <div class="secondary-actions">
          <button class="secondary-action-btn" @click="retakeTest">
            <span class="btn-icon">🔄</span>
            <span class="btn-text">重新测试</span>
          </button>
          <button class="secondary-action-btn" @click="goToHome">
            <span class="btn-icon">🏠</span>
            <span class="btn-text">选择其他题库</span>
          </button>
        </div>
      </div>
      
      <div class="footer-section">
        <p class="text-secondary footer-text">愿你继续探索，成为更好的自己 ✨</p>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getCurrentResult, saveCurrentResult, saveHistory } from '@/utils/storage'

const router = useRouter()

const result = ref(null)

onMounted(() => {
  loadResult()
})

const loadResult = () => {
  const savedResult = getCurrentResult()
  if (savedResult) {
    result.value = savedResult
  } else {
    const mockResult = generateMockResult()
    result.value = mockResult
    saveCurrentResult(mockResult)
    saveHistory(mockResult)
  }
}

const generateMockResult = () => {
  return {
    category: 'personality',
    timestamp: Date.now(),
    date: new Date().toLocaleDateString('zh-CN'),
    personality: {
      type: 'INFP',
      name: '调停者型',
      tags: ['理想主义', '敏感', '富有创造力', '追求真实'],
      description: '你是一位深刻的思考者和理想主义者。你内心世界丰富，对真善美有着执着的追求，渴望在生活中找到意义和目标。',
      strengths: ['富有创造力和想象力', '高度的同理心', '坚守价值观', '善于理解深层含义', '适应能力强'],
      weaknesses: ['容易陷入自我怀疑', '可能过于理想化', '对冲突感到不适', '容易被他人情绪影响'],
      suggestions: {
        relationship: '你渴望深度的灵魂连接，记得在寻找完美伴侣的同时，也要欣赏现实中的美好。学会接受不完美是爱的一部分。',
        career: '适合从事艺术、写作、心理咨询、教育等能够表达创造力和帮助他人的工作。你的独特视角是宝贵的财富。'
      },
      quotes: ['在纷扰中保持内心的宁静', '你的温柔，是世界的宝藏'],
      dimensions: {
        EI: { value: 'I', percentage: 65, labels: ['外向型', '内向型'] },
        SN: { value: 'N', percentage: 72, labels: ['实感型', '直觉型'] },
        TF: { value: 'F', percentage: 68, labels: ['思考型', '情感型'] },
        JP: { value: 'P', percentage: 58, labels: ['判断型', '感知型'] }
      }
    },
    love: {
      name: '灵魂伴侣型',
      description: '你追求的是灵魂层面的深度连接。对你们来说，真正的爱情是两个灵魂的相遇，是彼此理解、共同成长的旅程。',
      idealMatch: '同样追求精神共鸣、能够进行深度对话的伴侣',
      tips: [
        '不要过于追求完美，现实中的伴侣可能不是100%的灵魂契合',
        '学会表达自己的情感需求，而不是期望对方"懂"',
        '在追求深度的同时，也享受当下的美好'
      ],
      percentages: {
        soulmate: 75,
        secure: 45,
        romantic: 35,
        playful: 30
      }
    },
    career: {
      name: '创新思想家',
      description: '你是团队中的创新源泉。你善于发现新的可能性、提出独特的见解、打破常规思维，为团队带来新的方向。',
      strengths: ['出色的创造力', '战略远见', '打破常规', '适应变化'],
      fitCareers: ['产品设计', '市场策划', '研发创新', '创业', '战略规划'],
      developmentSuggestions: '继续发挥你的创造力，同时学会将想法落地。与执行者合作，让你的创意变成现实。',
      percentages: {
        leader: 40,
        executor: 30,
        innovator: 70,
        supporter: 45
      }
    }
  }
}

const getTagClass = (index) => {
  const classes = ['tag-pink', 'tag-blue', 'tag-green', 'tag-purple']
  return classes[index % classes.length]
}

const getLoveTypeLabel = (type) => {
  const labels = {
    soulmate: '灵魂伴侣',
    secure: '安全依恋',
    romantic: '浪漫激情',
    playful: '轻松陪伴'
  }
  return labels[type] || type
}

const getCareerTypeLabel = (type) => {
  const labels = {
    leader: '领导者',
    executor: '执行者',
    innovator: '创新者',
    supporter: '支持者'
  }
  return labels[type] || type
}

const generatePoster = () => {
  if (result.value) {
    saveCurrentResult(result.value)
    router.push('/poster')
  }
}

const retakeTest = () => {
  const category = result.value?.category || 'personality'
  router.push(`/quiz/${category}`)
}

const goToHome = () => {
  router.push('/')
}
</script>

<style scoped>
.result-container {
  display: flex;
  flex-direction: column;
  padding: 16px 20px;
  padding-bottom: 40px;
}

.loading-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
}

.loading-icon {
  font-size: 48px;
  margin-bottom: 16px;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
}

.loading-text {
  font-size: 16px;
  color: #7a6a6a;
}

.header-section {
  text-align: center;
  margin-bottom: 24px;
}

.date-text {
  margin-top: 8px;
  font-size: 13px;
}

.main-type-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 28px 20px;
  margin-bottom: 16px;
}

.type-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.type-code {
  font-size: 32px;
  font-weight: 700;
  background: linear-gradient(135deg, #ff9a9e, #fecfef);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 4px;
}

.type-name {
  font-size: 18px;
  font-weight: 600;
  color: #5a4a4a;
  margin-bottom: 16px;
}

.type-quote {
  font-size: 14px;
  color: #8a7a7a;
  font-style: italic;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 12px;
}

.tags-section {
  padding: 20px;
  margin-bottom: 24px;
}

.section-subtitle {
  font-size: 15px;
  font-weight: 600;
  color: #5a4a4a;
  margin-bottom: 12px;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
}

.dimension-section {
  margin-bottom: 24px;
}

.section-title {
  font-size: 17px;
  margin-bottom: 16px;
  padding-left: 4px;
}

.dimension-cards {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.dimension-card {
  padding: 16px;
}

.dimension-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.dimension-value {
  font-size: 16px;
  font-weight: 600;
  color: #ff9a9e;
}

.dimension-percentage {
  font-size: 14px;
  font-weight: 500;
  color: #7a6a6a;
}

.dimension-bars {
  display: flex;
  height: 24px;
  border-radius: 12px;
  overflow: hidden;
}

.bar-left,
.bar-right {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  transition: width 0.5s ease;
}

.bar-left {
  background: rgba(255, 255, 255, 0.6);
}

.bar-right {
  background: linear-gradient(90deg, #ff9a9e, #fecfef);
}

.bar-label {
  font-size: 11px;
  font-weight: 500;
}

.bar-left .bar-label {
  color: #7a6a6a;
}

.bar-right .bar-label {
  color: #5a4a4a;
}

.strengths-section,
.weaknesses-section {
  padding: 20px;
  margin-bottom: 16px;
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.section-icon {
  font-size: 20px;
  margin-right: 8px;
}

.strengths-list,
.weaknesses-list {
  list-style: none;
}

.strength-item,
.weakness-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 8px;
}

.strength-item:last-child,
.weakness-item:last-child {
  margin-bottom: 0;
}

.bullet {
  color: #ff9a9e;
  font-weight: bold;
  margin-right: 8px;
  font-size: 14px;
}

.strength-text,
.weakness-text {
  font-size: 14px;
  color: #5a4a4a;
  line-height: 1.5;
}

.love-section,
.career-section {
  margin-bottom: 24px;
}

.love-card,
.career-card {
  padding: 20px;
}

.love-header,
.career-header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.love-icon,
.career-icon {
  font-size: 24px;
  margin-right: 10px;
}

.love-type-name,
.career-type-name {
  font-size: 17px;
  font-weight: 600;
  color: #5a4a4a;
}

.love-description,
.career-description {
  font-size: 14px;
  color: #6a5a5a;
  line-height: 1.6;
  margin-bottom: 16px;
}

.love-percentages,
.career-percentages {
  margin-bottom: 20px;
}

.percent-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.percent-item:last-child {
  margin-bottom: 0;
}

.percent-label {
  width: 80px;
  font-size: 13px;
  color: #7a6a6a;
  flex-shrink: 0;
}

.percent-bar {
  flex: 1;
  height: 8px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 4px;
  overflow: hidden;
  margin: 0 10px;
}

.percent-fill {
  height: 100%;
  background: linear-gradient(90deg, #ff9a9e, #fecfef);
  border-radius: 4px;
  transition: width 0.8s ease;
}

.percent-value {
  width: 40px;
  text-align: right;
  font-size: 13px;
  font-weight: 500;
  color: #5a4a4a;
  flex-shrink: 0;
}

.love-tips,
.career-tips {
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
}

.tips-section {
  margin-bottom: 16px;
}

.tips-section:last-child {
  margin-bottom: 0;
}

.tips-title {
  font-size: 14px;
  font-weight: 600;
  color: #5a4a4a;
  margin-bottom: 8px;
}

.tips-text {
  font-size: 13px;
  color: #7a6a6a;
  line-height: 1.6;
}

.tips-list {
  list-style: none;
}

.tip-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 8px;
}

.tip-item:last-child {
  margin-bottom: 0;
}

.tip-bullet {
  margin-right: 8px;
  font-size: 14px;
}

.tip-text {
  font-size: 13px;
  color: #6a5a5a;
  line-height: 1.5;
}

.strengths-mini {
  display: flex;
  flex-wrap: wrap;
}

.careers-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.career-tag {
  display: inline-block;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 16px;
  font-size: 12px;
  color: #6a5a5a;
  border: 1px solid rgba(255, 154, 158, 0.3);
}

.quote-section {
  padding: 20px;
  margin-bottom: 24px;
  text-align: center;
}

.quote-text {
  font-size: 16px;
  color: #7a6a6a;
  font-style: italic;
  line-height: 1.6;
}

.actions-section {
  margin-bottom: 24px;
}

.action-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 24px;
  border-radius: 28px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 16px;
}

.primary-btn {
  background: linear-gradient(135deg, #ff9a9e, #fecfef);
  color: #5a4a4a;
  box-shadow: 0 4px 15px rgba(255, 154, 158, 0.4);
}

.primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 154, 158, 0.5);
}

.btn-icon {
  font-size: 20px;
  margin-right: 8px;
}

.secondary-actions {
  display: flex;
  gap: 12px;
}

.secondary-action-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 14px 12px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 20px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.secondary-action-btn:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: translateY(-2px);
}

.secondary-action-btn .btn-icon {
  font-size: 24px;
  margin-right: 0;
  margin-bottom: 4px;
}

.secondary-action-btn .btn-text {
  font-size: 12px;
  color: #7a6a6a;
  font-weight: 500;
}

.footer-section {
  text-align: center;
  margin-top: auto;
}

.footer-text {
  font-size: 13px;
}

/* 响应式适配 */
@media (max-width: 320px) {
  .result-container {
    padding: 12px 16px;
  }
  
  .main-type-section {
    padding: 20px 16px;
  }
  
  .type-code {
    font-size: 26px;
  }
  
  .action-btn {
    padding: 14px 20px;
    font-size: 14px;
  }
  
  .secondary-action-btn {
    padding: 12px 10px;
  }
}
</style>

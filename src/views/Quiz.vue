<template>
  <div class="quiz-container gradient-bg page-container hide-scrollbar">
    <div class="quiz-header">
      <div class="back-btn" @click="handleExit">
        <span class="back-icon">‹</span>
        <span class="back-text">退出</span>
      </div>
      <div class="progress-info">
        <span class="current-page">{{ currentIndex + 1 }}</span>
        <span class="separator">/</span>
        <span class="total-page">{{ totalQuestions }}</span>
      </div>
      <div class="category-label">
        <span class="category-icon">{{ categoryInfo.icon }}</span>
        <span class="category-name">{{ categoryInfo.name }}</span>
      </div>
    </div>
    
    <div class="progress-bar-section">
      <div class="progress-bar">
        <div class="progress-bar-fill" :style="{ width: progressPercentage + '%' }"></div>
      </div>
    </div>
    
    <div class="question-section" :key="currentQuestion.id">
      <div class="question-type-tag">
        {{ currentQuestion.type === 'single' ? '单选题' : '多选题' }}
        <span v-if="currentQuestion.type === 'multiple'" class="select-hint">
          (至少选{{ currentQuestion.minSelect || 2 }}个)
        </span>
      </div>
      
      <div class="question-card glass-card">
        <h3 class="question-text">{{ currentQuestion.question }}</h3>
      </div>
      
      <div class="options-container">
        <div
          v-for="option in currentQuestion.options"
          :key="option.id"
          class="option-card glass-card-light float-effect"
          :class="{ selected: isSelected(option.id) }"
          @click="toggleOption(option)"
        >
          <div class="option-label">{{ option.id }}</div>
          <div class="option-text">{{ option.text }}</div>
          <div class="option-check" v-if="isSelected(option.id)">
            <span class="check-icon">✓</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="nav-section">
      <button
        class="nav-btn prev-btn"
        :class="{ disabled: currentIndex === 0 }"
        @click="prevQuestion"
        :disabled="currentIndex === 0"
      >
        <span class="nav-icon">‹</span>
        <span class="nav-text">上一题</span>
      </button>
      
      <button
        class="nav-btn next-btn"
        :class="{ 
          disabled: !canProceed,
          primary: canProceed
        }"
        @click="nextQuestion"
        :disabled="!canProceed"
      >
        <span class="nav-text">{{ currentIndex === totalQuestions - 1 ? '查看结果' : '下一题' }}</span>
        <span class="nav-icon">›</span>
      </button>
    </div>
    
    <div v-if="showExitModal" class="modal-overlay" @click="closeExitModal">
      <div class="modal-content glass-card" @click.stop>
        <h3 class="modal-title">确认退出？</h3>
        <p class="modal-text">你的答题进度已自动保存，下次可以继续。</p>
        <div class="modal-actions">
          <button class="modal-btn cancel-btn" @click="closeExitModal">
            继续答题
          </button>
          <button class="modal-btn confirm-btn" @click="confirmExit">
            退出测试
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getQuestions, getCategoryInfo } from '@/data/questions'
import { saveProgress, getProgress, clearProgress } from '@/utils/storage'
import { analyzeResult } from '@/utils/resultAnalyzer'

const route = useRoute()
const router = useRouter()

const category = computed(() => route.params.category)
const questions = ref([])
const currentIndex = ref(0)
const answers = ref([])
const showExitModal = ref(false)

const categoryInfo = computed(() => getCategoryInfo(category.value))
const totalQuestions = computed(() => questions.value.length)
const currentQuestion = computed(() => questions.value[currentIndex.value] || null)
const progressPercentage = computed(() => {
  return ((currentIndex.value + 1) / totalQuestions.value) * 100
})

const currentSelectedIds = computed(() => {
  const answer = answers.value[currentIndex.value]
  return answer ? answer.selectedIds : []
})

const canProceed = computed(() => {
  if (!currentQuestion.value) return false
  
  const selectedCount = currentSelectedIds.value.length
  if (currentQuestion.value.type === 'single') {
    return selectedCount === 1
  } else {
    const minSelect = currentQuestion.value.minSelect || 2
    return selectedCount >= minSelect
  }
})

onMounted(() => {
  initQuiz()
})

watch([currentIndex, answers], () => {
  autoSaveProgress()
}, { deep: true })

const initQuiz = () => {
  questions.value = getQuestions(category.value)
  
  if (questions.value.length === 0) {
    router.push('/')
    return
  }
  
  const savedProgress = getProgress()
  if (savedProgress && savedProgress.category === category.value) {
    currentIndex.value = savedProgress.currentIndex || 0
    answers.value = savedProgress.answers || []
  }
}

const isSelected = (optionId) => {
  return currentSelectedIds.value.includes(optionId)
}

const toggleOption = (option) => {
  if (!currentQuestion.value) return
  
  let newSelectedIds = [...currentSelectedIds.value]
  
  if (currentQuestion.value.type === 'single') {
    newSelectedIds = [option.id]
    saveAnswer(option.id, option.score)
  } else {
    const index = newSelectedIds.indexOf(option.id)
    if (index > -1) {
      newSelectedIds.splice(index, 1)
    } else {
      newSelectedIds.push(option.id)
    }
    saveMultiAnswer(newSelectedIds)
  }
}

const saveAnswer = (optionId, score) => {
  answers.value[currentIndex.value] = {
    questionId: currentQuestion.value.id,
    selectedIds: [optionId],
    scores: score
  }
}

const saveMultiAnswer = (selectedIds) => {
  const scores = {}
  selectedIds.forEach(id => {
    const option = currentQuestion.value.options.find(o => o.id === id)
    if (option && option.score) {
      Object.entries(option.score).forEach(([key, value]) => {
        scores[key] = (scores[key] || 0) + value
      })
    }
  })
  
  answers.value[currentIndex.value] = {
    questionId: currentQuestion.value.id,
    selectedIds: selectedIds,
    scores: scores
  }
}

const prevQuestion = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

const nextQuestion = () => {
  if (!canProceed.value) return
  
  if (currentIndex.value < totalQuestions.value - 1) {
    currentIndex.value++
  } else {
    submitQuiz()
  }
}

const submitQuiz = () => {
  const validAnswers = answers.value.filter(a => a && a.selectedIds && a.selectedIds.length > 0)
  const result = analyzeResult(validAnswers, category.value)
  
  clearProgress()
  
  router.push({
    path: '/result',
    query: { from: category.value }
  })
}

const autoSaveProgress = () => {
  const progress = {
    category: category.value,
    currentIndex: currentIndex.value,
    answers: answers.value
  }
  saveProgress(progress)
}

const handleExit = () => {
  showExitModal.value = true
}

const closeExitModal = () => {
  showExitModal.value = false
}

const confirmExit = () => {
  autoSaveProgress()
  router.push('/')
}
</script>

<style scoped>
.quiz-container {
  display: flex;
  flex-direction: column;
  padding: 16px 20px;
}

.quiz-header {
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

.progress-info {
  font-size: 16px;
  font-weight: 600;
  color: #5a4a4a;
}

.current-page {
  font-size: 18px;
  color: #ff9a9e;
}

.separator {
  margin: 0 4px;
  color: #b8a8a8;
}

.total-page {
  color: #8a7a7a;
}

.category-label {
  display: flex;
  align-items: center;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 16px;
}

.category-icon {
  font-size: 16px;
  margin-right: 4px;
}

.category-name {
  font-size: 12px;
  color: #7a6a6a;
  font-weight: 500;
}

.progress-bar-section {
  margin-bottom: 24px;
}

.question-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding-bottom: 20px;
}

.question-type-tag {
  display: inline-flex;
  align-items: center;
  padding: 6px 14px;
  background: linear-gradient(135deg, #ffecd2, #fcb69f);
  border-radius: 20px;
  font-size: 12px;
  color: #8a5a4a;
  font-weight: 500;
  margin-bottom: 16px;
  align-self: flex-start;
}

.select-hint {
  margin-left: 8px;
  opacity: 0.8;
}

.question-card {
  padding: 24px 20px;
  margin-bottom: 20px;
}

.question-text {
  font-size: 18px;
  font-weight: 600;
  color: #5a4a4a;
  line-height: 1.6;
  text-align: center;
}

.options-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.option-card {
  display: flex;
  align-items: center;
  padding: 16px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
}

.option-label {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 154, 158, 0.2);
  border-radius: 50%;
  font-size: 14px;
  font-weight: 600;
  color: #7a5a5a;
  margin-right: 12px;
  flex-shrink: 0;
}

.option-card.selected .option-label {
  background: rgba(255, 255, 255, 0.9);
  color: #5a4a4a;
}

.option-text {
  flex: 1;
  font-size: 15px;
  color: #5a4a4a;
  line-height: 1.5;
  padding-right: 30px;
}

.option-check {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
}

.check-icon {
  font-size: 14px;
  color: #ff9a9e;
  font-weight: bold;
}

.nav-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  padding-bottom: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  margin-top: auto;
}

.nav-btn {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.prev-btn {
  background: rgba(255, 255, 255, 0.7);
  color: #7a6a6a;
}

.prev-btn:hover:not(.disabled) {
  background: rgba(255, 255, 255, 0.9);
}

.prev-btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.next-btn {
  background: rgba(255, 255, 255, 0.7);
  color: #7a6a6a;
}

.next-btn.primary {
  background: linear-gradient(135deg, #ff9a9e, #fecfef);
  color: #5a4a4a;
  box-shadow: 0 4px 15px rgba(255, 154, 158, 0.4);
}

.next-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 154, 158, 0.5);
}

.next-btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.nav-icon {
  font-size: 18px;
}

.nav-text {
  margin: 0 4px;
}

/* 模态框样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  width: 100%;
  max-width: 320px;
  padding: 28px 24px;
  text-align: center;
}

.modal-title {
  font-size: 18px;
  font-weight: 600;
  color: #5a4a4a;
  margin-bottom: 12px;
}

.modal-text {
  font-size: 14px;
  color: #8a7a7a;
  line-height: 1.6;
  margin-bottom: 24px;
}

.modal-actions {
  display: flex;
  gap: 12px;
}

.modal-btn {
  flex: 1;
  padding: 12px 16px;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-btn {
  background: rgba(255, 255, 255, 0.7);
  color: #7a6a6a;
}

.cancel-btn:hover {
  background: rgba(255, 255, 255, 0.9);
}

.confirm-btn {
  background: linear-gradient(135deg, #ff9a9e, #fecfef);
  color: #5a4a4a;
}

.confirm-btn:hover {
  box-shadow: 0 4px 15px rgba(255, 154, 158, 0.4);
}

/* 响应式适配 */
@media (max-width: 320px) {
  .quiz-container {
    padding: 12px 16px;
  }
  
  .question-text {
    font-size: 16px;
  }
  
  .option-text {
    font-size: 14px;
  }
  
  .modal-content {
    padding: 20px 16px;
  }
}
</style>

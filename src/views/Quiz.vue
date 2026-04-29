<template>
  <div class="quiz-container gradient-bg page-container hide-scrollbar">
    <div class="quiz-header">
      <div class="back-btn" @click="handleExit">
        <span class="back-icon">‹</span>
        <span class="back-text">退出</span>
      </div>
      <div class="progress-info">
        <span class="current-page">{{ displayIndex }}</span>
        <span class="separator">/</span>
        <span class="total-page">{{ displayTotal }}</span>
      </div>
      <div class="category-label">
        <span class="category-icon">{{ displayCategoryInfo?.icon }}</span>
        <span class="category-name">{{ displayCategoryInfo?.name }}</span>
      </div>
    </div>
    
    <div class="progress-bar-section">
      <div class="progress-bar">
        <div class="progress-bar-fill" :style="{ width: displayProgress + '%' }"></div>
      </div>
    </div>
    
    <div v-if="!isLoading && currentQ" class="question-section">
      <div class="question-type-tag">
        {{ currentQ.type === 'single' ? '单选题' : '多选题' }}
        <span v-if="currentQ.type === 'multiple'" class="select-hint">
          (至少选{{ currentQ.minSelect || 2 }}个)
        </span>
      </div>
      
      <div class="question-card glass-card">
        <h3 class="question-text">{{ currentQ.question }}</h3>
      </div>
      
      <div class="options-container">
        <div
          v-for="opt in currentQ.options"
          :key="opt.id"
          class="option-card glass-card-light float-effect"
          :class="{ selected: isSelected(opt.id) }"
          @click="selectOpt(opt)"
        >
          <div class="option-label">{{ opt.id }}</div>
          <div class="option-text">{{ opt.text }}</div>
          <div class="option-check" v-if="isSelected(opt.id)">
            <span class="check-icon">✓</span>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="loading-section">
      <div class="loading-icon">✨</div>
      <p class="loading-text">加载中...</p>
    </div>
    
    <div class="nav-section">
      <button
        class="nav-btn prev-btn"
        :class="{ disabled: qIndex === 0 }"
        @click="goPrev"
        :disabled="qIndex === 0"
      >
        <span class="nav-icon">‹</span>
        <span class="nav-text">上一题</span>
      </button>
      
      <button
        class="nav-btn next-btn"
        :class="{ 
          disabled: !canNext,
          primary: canNext
        }"
        @click="goNext"
        :disabled="!canNext"
      >
        <span class="nav-text">{{ isLast ? '查看结果' : '下一题' }}</span>
        <span class="nav-icon">›</span>
      </button>
    </div>
    
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content glass-card" @click.stop>
        <h3 class="modal-title">确认退出？</h3>
        <p class="modal-text">你的答题进度已自动保存，下次可以继续。</p>
        <div class="modal-actions">
          <button class="modal-btn cancel-btn" @click="closeModal">
            继续答题
          </button>
          <button class="modal-btn confirm-btn" @click="doExit">
            退出测试
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getQuestions, getCategoryInfo } from '@/data/questions'
import { saveProgress, getProgress, clearProgress, saveCurrentResult, saveHistory } from '@/utils/storage'
import { analyzeResult } from '@/utils/resultAnalyzer'

const route = useRoute()
const router = useRouter()

const questions = ref([])
const qIndex = ref(0)
const answers = ref({})
const showModal = ref(false)
const isLoading = ref(true)
let saveTimer = null

const category = computed(() => route.params.category || 'personality')

const displayCategoryInfo = computed(() => {
  return getCategoryInfo(category.value)
})

const displayIndex = computed(() => qIndex.value + 1)
const displayTotal = computed(() => questions.value.length)
const isLast = computed(() => qIndex.value >= questions.value.length - 1)

const displayProgress = computed(() => {
  if (questions.value.length === 0) return 0
  return ((qIndex.value + 1) / questions.value.length) * 100
})

const currentQ = computed(() => {
  if (qIndex.value >= 0 && qIndex.value < questions.value.length) {
    return questions.value[qIndex.value]
  }
  return null
})

const currentSelected = computed(() => {
  const key = String(qIndex.value)
  return answers.value[key]?.ids || []
})

const canNext = computed(() => {
  if (!currentQ.value) return false
  
  const count = currentSelected.value.length
  if (currentQ.value.type === 'single') {
    return count === 1
  } else {
    const min = currentQ.value.minSelect || 2
    return count >= min
  }
})

onMounted(() => {
  init()
})

function init() {
  const qs = getQuestions(category.value)
  
  if (!qs || qs.length === 0) {
    router.push('/')
    return
  }
  
  questions.value = qs
  
  const saved = getProgress()
  if (saved && saved.category === category.value) {
    qIndex.value = saved.currentIndex || 0
    if (saved.answers) {
      const map = {}
      saved.answers.forEach((a, i) => {
        if (a) {
          map[String(i)] = a
        }
      })
      answers.value = map
    }
  }
  
  isLoading.value = false
}

function isSelected(id) {
  return currentSelected.value.includes(id)
}

function selectOpt(opt) {
  if (!currentQ.value) return
  
  const key = String(qIndex.value)
  const q = currentQ.value
  let ids = [...currentSelected.value]
  
  if (q.type === 'single') {
    ids = [opt.id]
    saveAnswer(key, ids, opt.score)
  } else {
    const idx = ids.indexOf(opt.id)
    if (idx > -1) {
      ids.splice(idx, 1)
    } else {
      ids.push(opt.id)
    }
    saveMultiAnswer(key, ids)
  }
  
  saveToStorage()
}

function saveAnswer(key, ids, score) {
  answers.value[key] = {
    ids: ids,
    scores: score
  }
}

function saveMultiAnswer(key, ids) {
  const scores = {}
  ids.forEach(id => {
    const opt = currentQ.value.options.find(o => o.id === id)
    if (opt && opt.score) {
      Object.entries(opt.score).forEach(([k, v]) => {
        scores[k] = (scores[k] || 0) + v
      })
    }
  })
  
  answers.value[key] = {
    ids: ids,
    scores: scores
  }
}

function doSave() {
  const arr = []
  for (let i = 0; i < questions.value.length; i++) {
    const key = String(i)
    arr.push(answers.value[key] || null)
  }
  
  const progress = {
    category: category.value,
    currentIndex: qIndex.value,
    answers: arr
  }
  saveProgress(progress)
}

function saveToStorage() {
  if (saveTimer) {
    clearTimeout(saveTimer)
  }
  saveTimer = setTimeout(() => {
    doSave()
  }, 300)
}

function saveImmediate() {
  if (saveTimer) {
    clearTimeout(saveTimer)
    saveTimer = null
  }
  doSave()
}

function goPrev() {
  if (qIndex.value > 0) {
    qIndex.value--
  }
}

function goNext() {
  if (!canNext.value) return
  
  if (!isLast.value) {
    qIndex.value++
    saveImmediate()
  } else {
    finish()
  }
}

function finish() {
  const arr = []
  for (let i = 0; i < questions.value.length; i++) {
    const key = String(i)
    const a = answers.value[key]
    if (a && a.ids && a.ids.length > 0) {
      arr.push({
        questionId: i + 1,
        selectedIds: a.ids,
        scores: a.scores
      })
    }
  }
  
  const result = analyzeResult(arr, category.value)
  
  saveCurrentResult(result)
  saveHistory(result)
  clearProgress()
  
  router.push('/result')
}

function handleExit() {
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

function doExit() {
  saveImmediate()
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

.loading-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

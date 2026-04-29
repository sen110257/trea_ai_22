<template>
  <div class="history-container gradient-bg page-container hide-scrollbar">
    <div class="header-section">
      <div class="back-btn" @click="goBack">
        <span class="back-icon">‹</span>
        <span class="back-text">返回</span>
      </div>
      <h2 class="title-primary header-title">历史记录</h2>
      <div class="placeholder"></div>
    </div>
    
    <div v-if="historyList.length === 0" class="empty-section">
      <div class="empty-icon">📚</div>
      <h3 class="empty-title">暂无测试记录</h3>
      <p class="empty-desc">完成测试后，结果将保存在这里</p>
      <button class="start-btn btn-primary" @click="goToHome">
        开始测试
      </button>
    </div>
    
    <template v-else>
      <div class="info-section">
        <p class="info-text">共 {{ historyList.length }} 条记录，最多保存10条</p>
        <button class="clear-btn" @click="confirmClearAll">
          清空全部
        </button>
      </div>
      
      <div class="history-list">
        <div 
          v-for="record in historyList" 
          :key="record.id"
          class="history-card glass-card float-effect"
          @click="viewRecord(record)"
        >
          <div class="record-main">
            <div class="record-type">
              <span class="type-icon">{{ getCategoryIcon(record.category) }}</span>
              <span class="type-name">{{ getCategoryName(record.category) }}</span>
            </div>
            <div class="record-personality">
              <span class="personality-code">{{ record.personality?.type || '---' }}</span>
              <span class="personality-name">{{ record.personality?.name || '' }}</span>
            </div>
            <div class="record-tags">
              <span 
                v-for="(tag, index) in (record.personality?.tags || []).slice(0, 3)" 
                :key="index"
                class="mini-tag"
              >
                {{ tag }}
              </span>
            </div>
          </div>
          
          <div class="record-meta">
            <span class="record-date">{{ record.date }}</span>
            <button class="delete-btn" @click.stop="confirmDelete(record.id)">
              <span class="delete-icon">×</span>
            </button>
          </div>
          
          <div class="record-arrow">
            <span class="arrow-icon">›</span>
          </div>
        </div>
      </div>
      
      <div class="tip-section glass-card-light">
        <p class="tip-text">
          <span class="tip-icon">💡</span>
          点击记录可查看完整分析报告
        </p>
      </div>
    </template>
    
    <div v-if="showDeleteModal" class="modal-overlay" @click="closeDeleteModal">
      <div class="modal-content glass-card" @click.stop>
        <h3 class="modal-title">确认删除？</h3>
        <p class="modal-text">删除后将无法恢复此测试记录</p>
        <div class="modal-actions">
          <button class="modal-btn cancel-btn" @click="closeDeleteModal">
            取消
          </button>
          <button class="modal-btn delete-confirm-btn" @click="deleteRecord">
            确认删除
          </button>
        </div>
      </div>
    </div>
    
    <div v-if="showClearModal" class="modal-overlay" @click="closeClearModal">
      <div class="modal-content glass-card" @click.stop>
        <h3 class="modal-title">确认清空所有记录？</h3>
        <p class="modal-text">此操作将删除所有历史记录，且无法恢复</p>
        <div class="modal-actions">
          <button class="modal-btn cancel-btn" @click="closeClearModal">
            取消
          </button>
          <button class="modal-btn clear-confirm-btn" @click="clearAllRecords">
            确认清空
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getHistory, deleteHistory, clearHistory, saveCurrentResult } from '@/utils/storage'

const router = useRouter()

const historyList = ref([])
const showDeleteModal = ref(false)
const showClearModal = ref(false)
const selectedRecordId = ref(null)

onMounted(() => {
  loadHistory()
})

const loadHistory = () => {
  historyList.value = getHistory()
}

const getCategoryIcon = (category) => {
  const icons = {
    personality: '✨',
    love: '💖',
    career: '🌟',
    all: '🌈'
  }
  return icons[category] || '✨'
}

const getCategoryName = (category) => {
  const names = {
    personality: '综合人格',
    love: '恋爱专属',
    career: '职场人设',
    all: '综合测试'
  }
  return names[category] || '心理测试'
}

const viewRecord = (record) => {
  saveCurrentResult(record)
  router.push('/result')
}

const confirmDelete = (id) => {
  selectedRecordId.value = id
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  selectedRecordId.value = null
}

const deleteRecord = () => {
  if (selectedRecordId.value) {
    deleteHistory(selectedRecordId.value)
    loadHistory()
  }
  closeDeleteModal()
}

const confirmClearAll = () => {
  showClearModal.value = true
}

const closeClearModal = () => {
  showClearModal.value = false
}

const clearAllRecords = () => {
  clearHistory()
  loadHistory()
  closeClearModal()
}

const goBack = () => {
  router.back()
}

const goToHome = () => {
  router.push('/')
}
</script>

<style scoped>
.history-container {
  display: flex;
  flex-direction: column;
  padding: 16px 20px;
  padding-bottom: 40px;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
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
  font-size: 20px;
}

.placeholder {
  width: 60px;
}

.empty-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 20px;
  opacity: 0.6;
}

.empty-title {
  font-size: 18px;
  font-weight: 600;
  color: #5a4a4a;
  margin-bottom: 8px;
}

.empty-desc {
  font-size: 14px;
  color: #8a7a7a;
  margin-bottom: 24px;
}

.start-btn {
  padding: 14px 32px;
  font-size: 15px;
}

.info-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 0 4px;
}

.info-text {
  font-size: 13px;
  color: #8a7a7a;
}

.clear-btn {
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  font-size: 12px;
  color: #9a5a5a;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.clear-btn:hover {
  background: rgba(255, 154, 154, 0.2);
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.history-card {
  display: flex;
  flex-direction: column;
  padding: 16px;
  position: relative;
  cursor: pointer;
}

.record-main {
  margin-bottom: 12px;
}

.record-type {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.type-icon {
  font-size: 20px;
  margin-right: 8px;
}

.type-name {
  font-size: 13px;
  color: #8a7a7a;
  font-weight: 500;
}

.record-personality {
  display: flex;
  align-items: baseline;
  margin-bottom: 8px;
}

.personality-code {
  font-size: 22px;
  font-weight: 700;
  background: linear-gradient(135deg, #ff9a9e, #fecfef);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-right: 8px;
}

.personality-name {
  font-size: 14px;
  font-weight: 600;
  color: #5a4a4a;
}

.record-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.mini-tag {
  display: inline-block;
  padding: 3px 8px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 8px;
  font-size: 11px;
  color: #7a6a6a;
}

.record-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
}

.record-date {
  font-size: 12px;
  color: #9a8a8a;
}

.delete-btn {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 154, 154, 0.1);
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.delete-btn:hover {
  background: rgba(255, 154, 154, 0.3);
}

.delete-icon {
  font-size: 14px;
  color: #9a5a5a;
  font-weight: 500;
}

.record-arrow {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
}

.arrow-icon {
  font-size: 20px;
  color: #b8a8a8;
}

.tip-section {
  padding: 12px 16px;
  margin-top: auto;
}

.tip-text {
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #8a7a7a;
}

.tip-icon {
  margin-right: 6px;
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

.delete-confirm-btn,
.clear-confirm-btn {
  background: linear-gradient(135deg, #ff9a9e, #fecfef);
  color: #5a4a4a;
}

.delete-confirm-btn:hover,
.clear-confirm-btn:hover {
  box-shadow: 0 4px 15px rgba(255, 154, 158, 0.4);
}

/* 响应式适配 */
@media (max-width: 320px) {
  .history-container {
    padding: 12px 16px;
  }
  
  .history-card {
    padding: 14px;
  }
  
  .personality-code {
    font-size: 18px;
  }
  
  .modal-content {
    padding: 20px 16px;
  }
}
</style>

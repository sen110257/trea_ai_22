const STORAGE_KEYS = {
  HISTORY: 'psychological_test_history',
  CURRENT_PROGRESS: 'psychological_test_progress'
}

// 获取历史记录
export const getHistory = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.HISTORY)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('获取历史记录失败:', error)
    return []
  }
}

// 保存历史记录
export const saveHistory = (result) => {
  try {
    const history = getHistory()
    const newRecord = {
      id: Date.now(),
      ...result
    }
    history.unshift(newRecord)
    
    if (history.length > 10) {
      history.splice(10)
    }
    
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history))
    return newRecord
  } catch (error) {
    console.error('保存历史记录失败:', error)
    return null
  }
}

// 获取特定历史记录
export const getHistoryById = (id) => {
  const history = getHistory()
  return history.find(item => item.id === id)
}

// 删除历史记录
export const deleteHistory = (id) => {
  try {
    const history = getHistory()
    const filteredHistory = history.filter(item => item.id !== id)
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(filteredHistory))
    return true
  } catch (error) {
    console.error('删除历史记录失败:', error)
    return false
  }
}

// 清空所有历史记录
export const clearHistory = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.HISTORY)
    return true
  } catch (error) {
    console.error('清空历史记录失败:', error)
    return false
  }
}

// 保存答题进度
export const saveProgress = (progress) => {
  try {
    const progressData = {
      ...progress,
      timestamp: Date.now()
    }
    localStorage.setItem(STORAGE_KEYS.CURRENT_PROGRESS, JSON.stringify(progressData))
    return true
  } catch (error) {
    console.error('保存答题进度失败:', error)
    return false
  }
}

// 获取答题进度
export const getProgress = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CURRENT_PROGRESS)
    if (!data) return null
    
    const progress = JSON.parse(data)
    const oneDay = 24 * 60 * 60 * 1000
    if (Date.now() - progress.timestamp > oneDay) {
      clearProgress()
      return null
    }
    
    return progress
  } catch (error) {
    console.error('获取答题进度失败:', error)
    return null
  }
}

// 清除答题进度
export const clearProgress = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_PROGRESS)
    return true
  } catch (error) {
    console.error('清除答题进度失败:', error)
    return false
  }
}

// 检查是否有未完成的测试
export const hasUnfinishedTest = () => {
  const progress = getProgress()
  return progress !== null
}

// 保存当前结果（用于海报生成）
export const saveCurrentResult = (result) => {
  try {
    localStorage.setItem('current_test_result', JSON.stringify(result))
    return true
  } catch (error) {
    console.error('保存当前结果失败:', error)
    return false
  }
}

// 获取当前结果
export const getCurrentResult = () => {
  try {
    const data = localStorage.getItem('current_test_result')
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error('获取当前结果失败:', error)
    return null
  }
}

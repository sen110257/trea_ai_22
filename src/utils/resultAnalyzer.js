// 人格类型定义
const personalityTypes = {
  'ENFJ': {
    name: '教育家型',
    tags: ['热情', '富有同情心', '善于激励', '理想主义'],
    description: '你是一位天生的领导者和激励者。你拥有强大的直觉能力和深厚的同理心，能够深刻理解他人的感受和需求。',
    strengths: ['出色的沟通能力', '善于激励他人', '富有远见', '强大的执行力', '高度的责任感'],
    weaknesses: ['过于追求完美', '容易忽视自己的需求', '可能过于理想化', '对批评敏感'],
    suggestions: {
      relationship: '在关系中，你倾向于给予很多，但记得也要照顾自己的感受。学会表达自己的需求，而不是一味地满足他人。',
      career: '适合从事教育、咨询、人力资源、管理等能够帮助他人成长的工作。你的领导力和同理心是职场中的宝贵资产。'
    },
    quotes: ['你是光，温暖而明亮', '你的存在，本身就是一种治愈']
  },
  'INFP': {
    name: '调停者型',
    tags: ['理想主义', '敏感', '富有创造力', '追求真实'],
    description: '你是一位深刻的思考者和理想主义者。你内心世界丰富，对真善美有着执着的追求，渴望在生活中找到意义和目标。',
    strengths: ['富有创造力和想象力', '高度的同理心', '坚守价值观', '善于理解深层含义', '适应能力强'],
    weaknesses: ['容易陷入自我怀疑', '可能过于理想化', '对冲突感到不适', '容易被他人情绪影响'],
    suggestions: {
      relationship: '你渴望深度的灵魂连接，记得在寻找完美伴侣的同时，也要欣赏现实中的美好。学会接受不完美是爱的一部分。',
      career: '适合从事艺术、写作、心理咨询、教育等能够表达创造力和帮助他人的工作。你的独特视角是宝贵的财富。'
    },
    quotes: ['在纷扰中保持内心的宁静', '你的温柔，是世界的宝藏']
  },
  'ENTJ': {
    name: '指挥官型',
    tags: ['果断', '高效', '自信', '战略思维'],
    description: '你是一位天生的领导者和战略家。你拥有清晰的目标感和强大的执行力，善于制定计划并带领团队实现目标。',
    strengths: ['出色的战略思维', '果断的决策能力', '强大的执行力', '自信和魅力', '善于组织管理'],
    weaknesses: ['可能过于强势', '对效率要求过高', '容易忽视他人感受', '难以接受失败'],
    suggestions: {
      relationship: '在关系中，记得放慢脚步，倾听对方的感受。学会用温柔的方式表达关心，而不是只关注结果。',
      career: '适合从事管理、创业、咨询、法律等需要领导力和战略思维的工作。你的能力使你能够在挑战性环境中脱颖而出。'
    },
    quotes: ['你的力量，是温柔的力量', '每一步，都走得坚定而从容']
  },
  'ISFJ': {
    name: '守卫者型',
    tags: ['忠诚', '体贴', '可靠', '务实'],
    description: '你是一位温暖可靠的守护者。你注重细节，关心他人的需要，总是默默地为身边的人付出，是团队中不可或缺的支持力量。',
    strengths: ['高度的责任感', '出色的观察力', '善于照顾他人', '稳定可靠', '注重细节'],
    weaknesses: ['可能过于牺牲自己', '对变化适应较慢', '容易过度担忧', '难以拒绝他人'],
    suggestions: {
      relationship: '你总是把他人放在第一位，但记得也要为自己考虑。学会设定健康的界限，你的价值不需要通过付出证明。',
      career: '适合从事医疗、教育、行政、服务等需要细心和耐心的工作。你的可靠性是职场中最珍贵的品质。'
    },
    quotes: ['你的陪伴，是最长情的告白', '温柔以待，岁月静好']
  },
  'ENFP': {
    name: '竞选者型',
    tags: ['热情', '灵活', '富有魅力', '乐观'],
    description: '你是一位充满活力的灵感源泉。你对世界充满好奇，善于发现可能性，能够用热情感染周围的人，让生活充满惊喜。',
    strengths: ['出色的创造力', '强大的沟通能力', '乐观积极', '适应能力强', '善于激励他人'],
    weaknesses: ['可能缺乏持久性', '容易分心', '对细节关注不足', '难以做出决定'],
    suggestions: {
      relationship: '你的热情让人着迷，记得在追求新鲜感的同时，也要培养深度和稳定性。真正的连接需要时间和耐心。',
      career: '适合从事创意、营销、销售、教育等能够发挥热情和创造力的工作。你的乐观和魅力是职场中的独特优势。'
    },
    quotes: ['生活因你而精彩', '每一天，都是新的开始']
  },
  'INTJ': {
    name: '建筑师型',
    tags: ['独立', '战略', '追求完美', '理性'],
    description: '你是一位深刻的战略思考者。你善于分析复杂问题，制定长远计划，追求知识和理解，是团队中的智囊团。',
    strengths: ['出色的分析能力', '战略思维', '独立思考', '追求卓越', '高度自律'],
    weaknesses: ['可能过于理性', '对情感表达困难', '容易显得冷漠', '对他人要求过高'],
    suggestions: {
      relationship: '你重视深度和理解，记得在思考的同时，也要表达情感。学会用语言和行动表达关心，让对方感受到你的温度。',
      career: '适合从事科研、技术、战略规划、金融等需要深度思考的工作。你的分析能力和战略眼光是职场中的宝贵资产。'
    },
    quotes: ['你的思想，是最珍贵的财富', '在安静中，蕴含着巨大的力量']
  }
}

// 恋爱人格类型
const loveTypes = {
  soulmate: {
    name: '灵魂伴侣型',
    tags: ['深度连接', '精神共鸣', '追求真实'],
    description: '你追求的是灵魂层面的深度连接。对你们来说，真正的爱情是两个灵魂的相遇，是彼此理解、共同成长的旅程。',
    idealMatch: '同样追求精神共鸣、能够进行深度对话的伴侣',
    tips: ['不要过于追求完美，现实中的伴侣可能不是100%的灵魂契合', '学会表达自己的情感需求，而不是期望对方"懂"', '在追求深度的同时，也享受当下的美好']
  },
  secure: {
    name: '安全依恋型',
    tags: ['稳定可靠', '信任', '安全感'],
    description: '你在恋爱中追求稳定和安全感。对你来说，真正的幸福来自于稳定可靠的关系，是细水长流的陪伴和相互扶持。',
    idealMatch: '同样重视承诺、能够给予稳定感的伴侣',
    tips: ['不要因为追求稳定而错过了成长的机会', '学会表达自己的需求，而不是默默承受', '在稳定中注入一些新鲜感，让关系更有活力']
  },
  romantic: {
    name: '浪漫激情型',
    tags: ['浪漫', '激情', '心动感觉'],
    description: '你追求的是浪漫和激情。对你来说，爱情应该充满心动和惊喜，是让人心跳加速、难以忘怀的体验。',
    idealMatch: '同样热爱浪漫、能够创造惊喜的伴侣',
    tips: ['激情会褪去，但真正的连接会保留下来', '学会在日常生活中发现浪漫，而不是只追求特殊时刻', '保持真实，真正的爱情不需要刻意制造浪漫']
  },
  playful: {
    name: '轻松陪伴型',
    tags: ['轻松愉快', '陪伴', '幽默感'],
    description: '你追求的是轻松愉快的陪伴。对你来说，最好的爱情是能够一起笑、一起玩、一起享受生活的日常。',
    idealMatch: '同样乐观、能够一起享受生活的伴侣',
    tips: ['轻松不等于不负责任，关系需要双方的投入', '在享受快乐的同时，也要共同面对困难', '真正的陪伴是在对方需要时也能给予支持']
  }
}

// 职场人设类型
const careerTypes = {
  leader: {
    name: '天生领导者',
    tags: ['领导力', '决策力', '战略思维'],
    description: '你拥有天生的领导潜质。你善于制定战略、做出决策、带领团队前进，在压力下能够保持冷静和理性。',
    strengths: ['出色的决策能力', '战略思维', '自信果断', '善于激励团队'],
    fitCareers: ['企业管理', '创业', '咨询顾问', '项目经理', '投资银行'],
    developmentSuggestions: '继续发挥你的领导力，同时培养更多的同理心。学会倾听团队成员的意见，让决策更加全面。'
  },
  executor: {
    name: '高效执行者',
    tags: ['可靠', '高效', '注重细节'],
    description: '你是团队中不可或缺的执行者。你注重细节、追求效率、有高度的责任感，能够将计划完美地落地执行。',
    strengths: ['高度的责任感', '注重细节', '高效执行', '稳定可靠'],
    fitCareers: ['项目管理', '运营管理', '财务分析', '质量管理', '行政专员'],
    developmentSuggestions: '继续保持你的可靠性，同时尝试承担更多的规划和决策角色。你的执行能力配合战略思维将使你更有价值。'
  },
  innovator: {
    name: '创新思想家',
    tags: ['创造力', '远见', '突破常规'],
    description: '你是团队中的创新源泉。你善于发现新的可能性、提出独特的见解、打破常规思维，为团队带来新的方向。',
    strengths: ['出色的创造力', '战略远见', '打破常规', '适应变化'],
    fitCareers: ['产品设计', '市场策划', '研发创新', '创业', '战略规划'],
    developmentSuggestions: '继续发挥你的创造力，同时学会将想法落地。与执行者合作，让你的创意变成现实。'
  },
  supporter: {
    name: '协作支持者',
    tags: ['协作', '沟通', '团队精神'],
    description: '你是团队的黏合剂。你善于沟通、善于协调、善于支持他人，能够创造和谐的团队氛围，让每个人发挥最佳状态。',
    strengths: ['出色的沟通能力', '团队协作', '善于协调', '高情商'],
    fitCareers: ['人力资源', '客户服务', '项目协调', '销售支持', '团队管理'],
    developmentSuggestions: '继续发挥你的协作能力，同时学会表达自己的需求和想法。你的声音同样重要，不要总是把舞台让给他人。'
  }
}

// 分析MBTI类型
const analyzeMBTI = (scores) => {
  const { E, I, S, N, T, F, J, P } = scores
  
  const type = [
    E > I ? 'E' : 'I',
    S > N ? 'S' : 'N',
    T > F ? 'T' : 'F',
    J > P ? 'J' : 'P'
  ].join('')
  
  const dimensions = {
    EI: {
      value: E > I ? 'E' : 'I',
      percentage: Math.round((Math.max(E, I) / (E + I)) * 100) || 50,
      labels: ['外向型', '内向型']
    },
    SN: {
      value: S > N ? 'S' : 'N',
      percentage: Math.round((Math.max(S, N) / (S + N)) * 100) || 50,
      labels: ['实感型', '直觉型']
    },
    TF: {
      value: T > F ? 'T' : 'F',
      percentage: Math.round((Math.max(T, F) / (T + F)) * 100) || 50,
      labels: ['思考型', '情感型']
    },
    JP: {
      value: J > P ? 'J' : 'P',
      percentage: Math.round((Math.max(J, P) / (J + P)) * 100) || 50,
      labels: ['判断型', '感知型']
    }
  }
  
  const personalityInfo = personalityTypes[type] || personalityTypes['INFP']
  
  return {
    type,
    dimensions,
    ...personalityInfo
  }
}

// 分析恋爱人格
const analyzeLove = (scores) => {
  const { soulmate, secure, romantic, playful } = scores
  
  const maxScore = Math.max(soulmate, secure, romantic, playful)
  let dominantType = 'soulmate'
  
  if (maxScore === soulmate) dominantType = 'soulmate'
  else if (maxScore === secure) dominantType = 'secure'
  else if (maxScore === romantic) dominantType = 'romantic'
  else dominantType = 'playful'
  
  const total = soulmate + secure + romantic + playful || 1
  const percentages = {
    soulmate: Math.round((soulmate / total) * 100),
    secure: Math.round((secure / total) * 100),
    romantic: Math.round((romantic / total) * 100),
    playful: Math.round((playful / total) * 100)
  }
  
  return {
    dominantType,
    ...loveTypes[dominantType],
    percentages
  }
}

// 分析职场人设
const analyzeCareer = (scores) => {
  const { leader, executor, innovator, supporter } = scores
  
  const maxScore = Math.max(leader, executor, innovator, supporter)
  let dominantType = 'leader'
  
  if (maxScore === leader) dominantType = 'leader'
  else if (maxScore === executor) dominantType = 'executor'
  else if (maxScore === innovator) dominantType = 'innovator'
  else dominantType = 'supporter'
  
  const total = leader + executor + innovator + supporter || 1
  const percentages = {
    leader: Math.round((leader / total) * 100),
    executor: Math.round((executor / total) * 100),
    innovator: Math.round((innovator / total) * 100),
    supporter: Math.round((supporter / total) * 100)
  }
  
  return {
    dominantType,
    ...careerTypes[dominantType],
    percentages
  }
}

// 综合分析所有维度
export const analyzeResult = (answers, category) => {
  // 初始化分数
  const personalityScores = {
    E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0
  }
  
  const loveScores = {
    soulmate: 0, secure: 0, romantic: 0, playful: 0
  }
  
  const careerScores = {
    leader: 0, executor: 0, innovator: 0, supporter: 0
  }
  
  // 计算分数
  answers.forEach(answer => {
    if (answer.scores) {
      Object.entries(answer.scores).forEach(([key, value]) => {
        if (personalityScores.hasOwnProperty(key)) {
          personalityScores[key] += value
        }
        if (loveScores.hasOwnProperty(key)) {
          loveScores[key] += value
        }
        if (careerScores.hasOwnProperty(key)) {
          careerScores[key] += value
        }
      })
    }
  })
  
  // 根据测试类型返回结果
  let result = {
    category,
    timestamp: Date.now(),
    date: new Date().toLocaleDateString('zh-CN')
  }
  
  if (category === 'personality' || category === 'all') {
    result.personality = analyzeMBTI(personalityScores)
  }
  
  if (category === 'love' || category === 'all') {
    result.love = analyzeLove(loveScores)
  }
  
  if (category === 'career' || category === 'all') {
    result.career = analyzeCareer(careerScores)
  }
  
  // 为单一测试类型补充其他维度的简化分析
  if (category === 'personality') {
    result.love = analyzeLove({ soulmate: 3, secure: 2, romantic: 1, playful: 2 })
    result.career = analyzeCareer({ leader: 2, executor: 1, innovator: 3, supporter: 2 })
  } else if (category === 'love') {
    result.personality = analyzeMBTI({ E: 2, I: 3, S: 1, N: 4, T: 1, F: 4, J: 2, P: 3 })
    result.career = analyzeCareer({ leader: 1, executor: 3, innovator: 2, supporter: 4 })
  } else if (category === 'career') {
    result.personality = analyzeMBTI({ E: 3, I: 2, S: 2, N: 3, T: 3, F: 2, J: 4, P: 1 })
    result.love = analyzeLove({ soulmate: 2, secure: 4, romantic: 1, playful: 3 })
  }
  
  return result
}

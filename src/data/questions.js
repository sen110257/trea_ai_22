// 综合人格测试题库
export const personalityQuestions = [
  {
    id: 1,
    type: 'single',
    question: '周末你更倾向于如何度过？',
    options: [
      { id: 'A', text: '独自在家阅读、看电影，享受宁静时光', score: { I: 2, E: 0 } },
      { id: 'B', text: '和朋友聚会、参加社交活动', score: { I: 0, E: 2 } },
      { id: 'C', text: '逛书店、咖啡馆，偶尔与人交流', score: { I: 1, E: 1 } },
      { id: 'D', text: '户外探险或运动', score: { I: 0, E: 2 } }
    ]
  },
  {
    id: 2,
    type: 'single',
    question: '做决策时你更依赖？',
    options: [
      { id: 'A', text: '直觉和内心感受', score: { N: 2, S: 0, F: 2, T: 0 } },
      { id: 'B', text: '逻辑分析和事实数据', score: { S: 2, N: 0, T: 2, F: 0 } },
      { id: 'C', text: '他人的建议和感受', score: { F: 2, T: 0, S: 1, N: 1 } },
      { id: 'D', text: '过去的经验和惯例', score: { S: 2, N: 0, T: 1, F: 1 } }
    ]
  },
  {
    id: 3,
    type: 'multiple',
    question: '以下哪些特质更符合你的性格？（可多选）',
    options: [
      { id: 'A', text: '喜欢计划和组织', score: { J: 1, P: 0 } },
      { id: 'B', text: '灵活应变，随遇而安', score: { P: 1, J: 0 } },
      { id: 'C', text: '关注细节，追求完美', score: { J: 1, S: 1 } },
      { id: 'D', text: '富有想象力，追求可能性', score: { N: 1, P: 1 } },
      { id: 'E', text: '善于倾听，体贴他人', score: { F: 1, I: 1 } },
      { id: 'F', text: '直言不讳，追求效率', score: { T: 1, E: 1 } }
    ],
    minSelect: 2
  },
  {
    id: 4,
    type: 'single',
    question: '面对压力和挑战时，你通常会？',
    options: [
      { id: 'A', text: '制定详细计划，一步一步解决', score: { J: 2, T: 1, S: 1 } },
      { id: 'B', text: '寻求他人的支持和帮助', score: { F: 2, E: 1, P: 1 } },
      { id: 'C', text: '独自思考，找到解决方案', score: { I: 2, T: 1, N: 1 } },
      { id: 'D', text: '尝试多种方法，灵活应对', score: { P: 2, N: 1, E: 1 } }
    ]
  },
  {
    id: 5,
    type: 'single',
    question: '你对新环境的适应方式是？',
    options: [
      { id: 'A', text: '先观察了解，慢慢融入', score: { I: 2, S: 1, J: 1 } },
      { id: 'B', text: '主动结交新朋友，快速适应', score: { E: 2, N: 1, P: 1 } },
      { id: 'C', text: '专注于自己的事情，保持独立', score: { I: 2, T: 1, J: 1 } },
      { id: 'D', text: '寻找共同点，建立连接', score: { E: 1, F: 2, S: 1 } }
    ]
  }
]

// 恋爱专属测试题库
export const loveQuestions = [
  {
    id: 1,
    type: 'single',
    question: '在恋爱关系中，你更看重什么？',
    options: [
      { id: 'A', text: '精神共鸣和深度沟通', score: { soulmate: 2, romantic: 1, secure: 0, playful: 0 } },
      { id: 'B', text: '稳定可靠和安全感', score: { secure: 2, soulmate: 0, romantic: 1, playful: 0 } },
      { id: 'C', text: '激情浪漫和心动感觉', score: { romantic: 2, playful: 1, soulmate: 0, secure: 0 } },
      { id: 'D', text: '轻松愉快和陪伴感', score: { playful: 2, romantic: 1, secure: 1, soulmate: 0 } }
    ]
  },
  {
    id: 2,
    type: 'single',
    question: '吵架或发生矛盾时，你通常会？',
    options: [
      { id: 'A', text: '冷静分析，理性沟通解决问题', score: { secure: 2, soulmate: 1, playful: 0, romantic: 0 } },
      { id: 'B', text: '希望对方先哄我，感受被爱', score: { romantic: 2, playful: 1, soulmate: 0, secure: 0 } },
      { id: 'C', text: '选择回避或冷战，等冷静再说', score: { soulmate: 1, secure: 0, romantic: 0, playful: 0 } },
      { id: 'D', text: '用轻松的方式化解，避免冲突', score: { playful: 2, secure: 1, soulmate: 0, romantic: 0 } }
    ]
  },
  {
    id: 3,
    type: 'multiple',
    question: '你理想中的约会场景是？（可多选）',
    options: [
      { id: 'A', text: '深夜长谈，分享内心世界', score: { soulmate: 1, romantic: 0 } },
      { id: 'B', text: '精心准备的惊喜和浪漫', score: { romantic: 1, playful: 0 } },
      { id: 'C', text: '舒适的日常，如一起做饭', score: { secure: 1, soulmate: 0 } },
      { id: 'D', text: '一起尝试新鲜有趣的事', score: { playful: 1, romantic: 0 } },
      { id: 'E', text: '安静的空间，各做各的事', score: { soulmate: 1, secure: 1 } }
    ],
    minSelect: 2
  },
  {
    id: 4,
    type: 'single',
    question: '对于"个人空间"的看法是？',
    options: [
      { id: 'A', text: '需要足够的独立空间，尊重界限', score: { soulmate: 2, secure: 1, playful: 0, romantic: 0 } },
      { id: 'B', text: '希望时刻被关注和陪伴', score: { romantic: 2, playful: 1, soulmate: 0, secure: 0 } },
      { id: 'C', text: '保持适度距离，既亲密又独立', score: { secure: 2, soulmate: 1, romantic: 0, playful: 0 } },
      { id: 'D', text: '喜欢黏在一起，享受亲密感', score: { playful: 1, romantic: 2, secure: 0, soulmate: 0 } }
    ]
  },
  {
    id: 5,
    type: 'single',
    question: '你最欣赏伴侣的哪种特质？',
    options: [
      { id: 'A', text: '理解包容，能读懂我的心', score: { soulmate: 2, secure: 1, romantic: 0, playful: 0 } },
      { id: 'B', text: '温柔体贴，能给我安全感', score: { secure: 2, soulmate: 0, romantic: 1, playful: 0 } },
      { id: 'C', text: '有趣幽默，能让我开心', score: { playful: 2, romantic: 1, soulmate: 0, secure: 0 } },
      { id: 'D', text: '浪漫热情，能点燃激情', score: { romantic: 2, playful: 1, soulmate: 0, secure: 0 } }
    ]
  }
]

// 职场人设测试题库
export const careerQuestions = [
  {
    id: 1,
    type: 'single',
    question: '工作中遇到难题时，你通常会？',
    options: [
      { id: 'A', text: '独立研究，找到解决方案', score: { leader: 0, executor: 1, innovator: 1, supporter: 0 } },
      { id: 'B', text: '请教同事或上级，协作解决', score: { leader: 0, executor: 0, innovator: 0, supporter: 2 } },
      { id: 'C', text: '分析问题根源，系统性解决', score: { leader: 1, executor: 2, innovator: 0, supporter: 0 } },
      { id: 'D', text: '尝试新方法，创造性解决', score: { leader: 1, executor: 0, innovator: 2, supporter: 0 } }
    ]
  },
  {
    id: 2,
    type: 'single',
    question: '你更喜欢什么样的工作环境？',
    options: [
      { id: 'A', text: '有挑战性，能发挥创造力', score: { innovator: 2, leader: 1, executor: 0, supporter: 0 } },
      { id: 'B', text: '稳定有序，流程清晰', score: { executor: 2, supporter: 1, leader: 0, innovator: 0 } },
      { id: 'C', text: '团队协作，氛围融洽', score: { supporter: 2, executor: 1, leader: 0, innovator: 0 } },
      { id: 'D', text: '自主决策，有话语权', score: { leader: 2, innovator: 1, executor: 0, supporter: 0 } }
    ]
  },
  {
    id: 3,
    type: 'multiple',
    question: '你认为工作中最重要的品质是？（可多选）',
    options: [
      { id: 'A', text: '责任感和可靠性', score: { executor: 1, supporter: 0 } },
      { id: 'B', text: '创造力和思维能力', score: { innovator: 1, leader: 0 } },
      { id: 'C', text: '沟通能力和团队协作', score: { supporter: 1, executor: 0 } },
      { id: 'D', text: '决策能力和领导力', score: { leader: 1, innovator: 0 } },
      { id: 'E', text: '适应能力和学习能力', score: { innovator: 1, supporter: 1 } }
    ],
    minSelect: 2
  },
  {
    id: 4,
    type: 'single',
    question: '面对工作中的变化和不确定性，你会？',
    options: [
      { id: 'A', text: '主动适应，寻找新机会', score: { innovator: 2, leader: 1, executor: 0, supporter: 0 } },
      { id: 'B', text: '保持稳定，按原计划执行', score: { executor: 2, supporter: 1, leader: 0, innovator: 0 } },
      { id: 'C', text: '评估风险，谨慎决策', score: { leader: 1, executor: 2, innovator: 0, supporter: 0 } },
      { id: 'D', text: '寻求支持，共同应对', score: { supporter: 2, executor: 1, leader: 0, innovator: 0 } }
    ]
  },
  {
    id: 5,
    type: 'single',
    question: '你对职业发展的期望是？',
    options: [
      { id: 'A', text: '成为管理者，带领团队', score: { leader: 2, executor: 1, innovator: 0, supporter: 0 } },
      { id: 'B', text: '成为专家，深耕专业领域', score: { executor: 2, innovator: 1, leader: 0, supporter: 0 } },
      { id: 'C', text: '持续创新，推动变革', score: { innovator: 2, leader: 1, executor: 0, supporter: 0 } },
      { id: 'D', text: '协调各方，促进协作', score: { supporter: 2, leader: 1, executor: 0, innovator: 0 } }
    ]
  }
]

// 获取题库
export const getQuestions = (category) => {
  switch (category) {
    case 'personality':
      return personalityQuestions
    case 'love':
      return loveQuestions
    case 'career':
      return careerQuestions
    default:
      return []
  }
}

// 获取分类信息
export const getCategoryInfo = (category) => {
  const categories = {
    personality: {
      name: '综合人格',
      description: '探索你的真实性格特质，发现未知的自己',
      icon: '✨',
      color: 'pink'
    },
    love: {
      name: '恋爱专属',
      description: '解读你的恋爱模式，找到最适合的相处方式',
      icon: '💖',
      color: 'purple'
    },
    career: {
      name: '职场人设',
      description: '发现你的职场优势，找到最适合的发展方向',
      icon: '🌟',
      color: 'blue'
    }
  }
  return categories[category] || categories.personality
}

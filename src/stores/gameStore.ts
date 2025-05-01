import { defineStore } from 'pinia'

// 定义游戏状态接口
interface GameState {
  // 游戏是否已开始
  isGameStarted: boolean
  // 当前玩家分数
  score: number
  // 游戏级别
  level: number
  // 游戏中的卡片
  cards: Array<any>
}

// 创建游戏状态管理
export const useGameStore = defineStore('game', {
  // 状态
  state: (): GameState => ({
    isGameStarted: false,
    score: 0,
    level: 1,
    cards: []
  }),
  
  // 计算属性
  getters: {
    // 获取当前游戏状态
    gameStatus: (state) => state.isGameStarted ? '游戏中' : '未开始',
    // 获取当前分数
    currentScore: (state) => state.score,
    // 获取当前级别
    currentLevel: (state) => state.level,
    // 获取所有卡片
    getAllCards: (state) => state.cards,
  },
  
  // 操作方法
  actions: {
    // 开始游戏
    startGame() {
      this.isGameStarted = true
      this.score = 0
      this.level = 1
      this.initCards()
    },
    
    // 结束游戏
    endGame() {
      this.isGameStarted = false
    },
    
    // 增加分数
    addScore(points: number) {
      this.score += points
    },
    
    // 提高级别
    levelUp() {
      this.level += 1
      this.initCards() // 重新初始化卡片
    },
    
    // 初始化卡片
    initCards() {
      // 这里可以根据当前级别生成不同数量和类型的卡片
      this.cards = []
      // 示例：生成与级别相关的卡片数量
      const cardCount = this.level * 4
      for (let i = 0; i < cardCount; i++) {
        this.cards.push({
          id: i,
          value: Math.floor(Math.random() * 10),
          isFlipped: false,
          isMatched: false
        })
      }
    },
    
    // 翻转卡片
    flipCard(cardId: number) {
      const card = this.cards.find(c => c.id === cardId)
      if (card) {
        card.isFlipped = !card.isFlipped
      }
    },
    
    // 设置卡片为已匹配
    setCardMatched(cardId: number) {
      const card = this.cards.find(c => c.id === cardId)
      if (card) {
        card.isMatched = true
      }
    }
  }
})
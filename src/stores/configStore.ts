import { defineStore } from 'pinia'
import cardConfigData from './cardConfig.json'

// 定义卡牌配置接口
interface CardConfig {
  cards: Array<{
    id: number
    name: string
    type: string
    rarity: string
    cost: number
    attack: number
    health: number
    effect: string
    description: string
    image: string
  }>
  cardTypes: string[]
  rarities: string[]
  maxDeckSize: number
  startingHandSize: number
  maxEnergy: number
}

// 定义配置状态接口
interface ConfigState {
  // 主题设置
  theme: 'light' | 'dark'
  // 音效开关
  soundEnabled: boolean
  // 背景音乐开关
  musicEnabled: boolean
  // 游戏难度
  difficulty: 'easy' | 'normal' | 'hard'
  // 语言设置
  language: 'zh-CN' | 'en-US'
  // 自动保存
  autoSave: boolean
  // 卡牌配置
  cardConfig: CardConfig
}

// 创建配置状态管理
export const useConfigStore = defineStore('config', {
  // 状态
  state: (): ConfigState => ({
    theme: 'light',
    soundEnabled: true,
    musicEnabled: true,
    difficulty: 'normal',
    language: 'zh-CN',
    autoSave: true,
    cardConfig: cardConfigData
  }),
  
  // 计算属性
  getters: {
    // 获取当前主题
    currentTheme: (state) => state.theme,
    // 获取音效状态
    isSoundEnabled: (state) => state.soundEnabled,
    // 获取音乐状态
    isMusicEnabled: (state) => state.musicEnabled,
    // 获取当前难度
    currentDifficulty: (state) => state.difficulty,
    // 获取当前语言
    currentLanguage: (state) => state.language,
    // 获取自动保存状态
    isAutoSaveEnabled: (state) => state.autoSave,
    // 获取所有卡牌
    allCards: (state) => state.cardConfig.cards,
    // 获取卡牌类型
    cardTypes: (state) => state.cardConfig.cardTypes,
    // 获取稀有度类型
    rarities: (state) => state.cardConfig.rarities,
    // 获取最大牌组大小
    maxDeckSize: (state) => state.cardConfig.maxDeckSize,
    // 获取起始手牌数量
    startingHandSize: (state) => state.cardConfig.startingHandSize,
    // 获取最大能量值
    maxEnergy: (state) => state.cardConfig.maxEnergy,
  },
  
  // 操作方法
  actions: {
    // 切换主题
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
      this.saveToLocalStorage()
    },
    
    // 设置主题
    setTheme(theme: 'light' | 'dark') {
      this.theme = theme
      this.saveToLocalStorage()
    },
    
    // 切换音效
    toggleSound() {
      this.soundEnabled = !this.soundEnabled
      this.saveToLocalStorage()
    },
    
    // 切换背景音乐
    toggleMusic() {
      this.musicEnabled = !this.musicEnabled
      this.saveToLocalStorage()
    },
    
    // 设置游戏难度
    setDifficulty(difficulty: 'easy' | 'normal' | 'hard') {
      this.difficulty = difficulty
      this.saveToLocalStorage()
    },
    
    // 设置语言
    setLanguage(language: 'zh-CN' | 'en-US') {
      this.language = language
      this.saveToLocalStorage()
    },
    
    // 切换自动保存
    toggleAutoSave() {
      this.autoSave = !this.autoSave
      this.saveToLocalStorage()
    },
    
    // 从本地存储加载配置
    loadFromLocalStorage() {
      const savedConfig = localStorage.getItem('ai-card-game-config')
      if (savedConfig) {
        const config = JSON.parse(savedConfig)
        this.$patch(config)
      }
    },
    
    // 保存配置到本地存储
    saveToLocalStorage() {
      if (this.autoSave) {
        localStorage.setItem('ai-card-game-config', JSON.stringify({
          theme: this.theme,
          soundEnabled: this.soundEnabled,
          musicEnabled: this.musicEnabled,
          difficulty: this.difficulty,
          language: this.language,
          autoSave: this.autoSave
        }))
      }
    },
    
    // 重置为默认配置
    resetToDefaults() {
      this.theme = 'light'
      this.soundEnabled = true
      this.musicEnabled = true
      this.difficulty = 'normal'
      this.language = 'zh-CN'
      this.autoSave = true
      this.saveToLocalStorage()
    },
    
    // 获取指定ID的卡牌
    getCardById(id: number) {
      return this.cardConfig.cards.find(card => card.id === id)
    },
    
    // 按类型过滤卡牌
    getCardsByType(type: string) {
      return this.cardConfig.cards.filter(card => card.type === type)
    },
    
    // 按稀有度过滤卡牌
    getCardsByRarity(rarity: string) {
      return this.cardConfig.cards.filter(card => card.rarity === rarity)
    }
  }
})
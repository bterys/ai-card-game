// 卡牌稀有度配置
export enum CardRarity {
  F = 'common',
  E = 'uncommon',
  D = 'rare',
  C = 'epic',
  B = 'legendary',
  // 新增稀有度
  A = 'mythic',
  S = 'divine',
  SS = 'artifact',
  SSS = 'ethereal',
  SSSS = 'celestial',
  SSSSS = 'transcendent'
}

// 武器类型枚举
export enum WeaponType {
  Sword = 'sword',    // 剑
  Spear = 'spear',    // 枪
  Axe = 'axe',        // 斧
  Staff = 'staff',    // 杖
  Gun = 'gun',        // 铳
  Fist = 'fist',      // 格斗
  Bow = 'bow',        // 弓
  Instrument = 'instrument',  // 乐器
  Blade = 'blade'     // 刀
}

// 卡牌元素枚举
export enum CardElement {
  Fire = 'fire',      // 火
  Water = 'water',    // 水
  Earth = 'earth',    // 土
  Wind = 'wind',      // 风
  Light = 'light',    // 光
  Dark = 'dark'       // 暗
}

// 卡牌原型/职业类型枚举
export enum Archetype {
  Attacker = 'attacker',      // 攻击型
  Defender = 'defender',      // 防御型
  Support = 'support',        // 辅助型
  Healer = 'healer',          // 回复型
  Disruptor = 'disruptor',    // 妨害型
  Tank = 'tank',              // 坦克型
  Specialist = 'specialist',  // 专家型
  Controller = 'controller'   // 控制型
}

// 元素相关配置
export interface ElementConfig {
  name: string;       // 元素名称
  color: string;      // 元素颜色
  icon?: string;      // 元素图标
}

// 游戏卡牌元素配置
export const ELEMENT_CONFIG: Record<CardElement, ElementConfig> = {
  [CardElement.Fire]: {
    name: '火',
    color: '#FF4500',
  },
  [CardElement.Water]: {
    name: '水',
    color: '#1E90FF',
  },
  [CardElement.Earth]: {
    name: '土',
    color: '#8B4513',
  },
  [CardElement.Wind]: {
    name: '风',
    color: '#90EE90',
  },
  [CardElement.Light]: {
    name: '光',
    color: '#FFFF00',
  },
  [CardElement.Dark]: {
    name: '暗',
    color: '#800080',
  }
};

// 稀有度相关配置
export interface RarityConfig {
  name: string;       // 稀有度名称
  color: string;      // 稀有度颜色
  dropRate: number;   // 掉落几率 (百分比)
  powerMultiplier: number;  // 能力倍率
}

// 游戏卡牌稀有度配置
export const RARITY_CONFIG: Record<CardRarity, RarityConfig> = {
  [CardRarity.F]: {
    name: 'F',
    color: '#AAAAAA',
    dropRate: 50,
    powerMultiplier: 1.0
  },
  [CardRarity.E]: {
    name: 'E',
    color: '#2AAA2A',
    dropRate: 30,
    powerMultiplier: 1.2
  },
  [CardRarity.D]: {
    name: 'D',
    color: '#2A7FE5',
    dropRate: 15,
    powerMultiplier: 1.5
  },
  [CardRarity.C]: {
    name: 'C',
    color: '#9933CC',
    dropRate: 4,
    powerMultiplier: 2.0
  },
  [CardRarity.B]: {
    name: 'B',
    color: '#DD9900',
    dropRate: 1,
    powerMultiplier: 3.0
  },
  // 新增稀有度配置
  [CardRarity.A]: {
    name: 'A',
    color: '#FF4500',
    dropRate: 0.5,
    powerMultiplier: 4.0
  },
  [CardRarity.S]: {
    name: 'S',
    color: '#FFFFFF',
    dropRate: 0.3,
    powerMultiplier: 5.0
  },
  [CardRarity.SS]: {
    name: 'SS',
    color: '#00FFFF',
    dropRate: 0.2,
    powerMultiplier: 6.0
  },
  [CardRarity.SSS]: {
    name: 'SSS',
    color: '#7DF9FF',
    dropRate: 0.1,
    powerMultiplier: 7.0
  },
  [CardRarity.SSSS]: {
    name: 'SSSS',
    color: '#E6E6FA',
    dropRate: 0.05,
    powerMultiplier: 8.0
  },
  [CardRarity.SSSSS]: {
    name: 'SSSSS',
    color: '#FFD700',
    dropRate: 0.02,
    powerMultiplier: 10.0
  }
};
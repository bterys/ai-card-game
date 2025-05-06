// 卡牌稀有度配置
export enum CardRarity {
  F = 'common',
  E = 'uncommon',
  D = 'rare',
  C = 'epic',
  B = 'legendary',
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

// 技能类型
export enum SkillType {
  Active = 'active',      // 主动技能
  Passive = 'passive',    // 被动技能
  Ultimate = 'ultimate',  // 终极技能
  Counter = 'counter',    // 反击技能
  Buff = 'buff',          // 增益技能
  Debuff = 'debuff'       // 减益技能
}

// 技能接口
export interface Skill {
  id: string;             // 技能ID
  name: string;           // 技能名称
  description: string;    // 技能描述
  type: SkillType;        // 技能类型
  cooldown?: number;      // 冷却回合数（如果适用）
  energyCost?: number;    // 能量消耗（如果适用）
  effects?: string[];     // 技能效果列表
}

// 原型职业配置接口
export interface ArchetypeConfig {
  name: string;           // 职业名称
  description: string;    // 职业描述
  skills: Skill[];        // 职业技能列表
  bonusStats: {           // 职业加成属性
    hp?: number;
    atk?: number;
    def?: number;
    agi?: number;
    criRate?: number;
    criDmg?: number;
  };
}

// 卡牌原型/职业类型枚举
export enum Archetype {
  Attacker = 'attacker',      // 攻击型
  Defender = 'defender',      // 防御型
  Support = 'support',        // 辅助型
  Healer = 'healer',          // 回复型
  Disruptor = 'disruptor',    // 妨害型
  Tank = 'tank',              // 坦克型
  Controller = 'controller'   // 控制型
}

// 原型职业配置
export const ARCHETYPE_CONFIG: Record<Archetype, ArchetypeConfig> = {
  [Archetype.Attacker]: {
    name: '攻击型',
    description: '擅长造成高伤害，通常拥有高攻击力和暴击属性',
    skills: [
      {
        id: 'attacker_skill_1',
        name: '精准打击',
        description: '对单个目标造成150%攻击力的伤害，并提高15%暴击率，持续2回合',
        type: SkillType.Active,
        cooldown: 3,
        effects: ['damage', 'crit_rate_up']
      },
      {
        id: 'attacker_skill_2',
        name: '暴怒',
        description: '被动效果：攻击力低于30%时，提高25%暴击伤害',
        type: SkillType.Passive,
        effects: ['crit_damage_up']
      },
      {
        id: 'attacker_skill_3',
        name: '连击风暴',
        description: '对所有敌人造成120%攻击力的伤害，有30%几率进行追加攻击',
        type: SkillType.Ultimate,
        cooldown: 5,
        energyCost: 100,
        effects: ['aoe_damage', 'extra_attack']
      }
    ],
    bonusStats: {
      atk: 20,
      criRate: 0.05,
      criDmg: 0.2
    }
  },
  [Archetype.Defender]: {
    name: '防御型',
    description: '擅长减少受到的伤害，通常拥有高防御力和格挡能力',
    skills: [
      {
        id: 'defender_skill_1',
        name: '防御姿态',
        description: '提高50%防御力，持续2回合，并反弹15%受到的伤害',
        type: SkillType.Active,
        cooldown: 3,
        effects: ['defense_up', 'damage_reflect']
      },
      {
        id: 'defender_skill_2',
        name: '铁壁',
        description: '被动效果：每回合开始时，若防御力高于初始值，恢复5%最大生命值',
        type: SkillType.Passive,
        effects: ['hp_regen']
      },
      {
        id: 'defender_skill_3',
        name: '坚不可摧',
        description: '为全队提供护盾，可抵挡相当于使用者防御力200%的伤害，持续3回合',
        type: SkillType.Ultimate,
        cooldown: 5,
        energyCost: 100,
        effects: ['team_shield']
      }
    ],
    bonusStats: {
      hp: 100,
      def: 30
    }
  },
  [Archetype.Support]: {
    name: '辅助型',
    description: '擅长为队友提供增益效果，通常拥有强力的队伍增益技能',
    skills: [
      {
        id: 'support_skill_1',
        name: '鼓舞',
        description: '为全队提升20%攻击力和10%暴击率，持续2回合',
        type: SkillType.Active,
        cooldown: 3,
        effects: ['team_atk_up', 'team_crit_up']
      },
      {
        id: 'support_skill_2',
        name: '战术协同',
        description: '被动效果：队友使用技能时，有25%几率减少该技能1回合冷却时间',
        type: SkillType.Passive,
        effects: ['cooldown_reduction']
      },
      {
        id: 'support_skill_3',
        name: '战场号角',
        description: '立即为所有队友恢复30%能量，并提高所有属性15%，持续3回合',
        type: SkillType.Ultimate,
        cooldown: 6,
        energyCost: 100,
        effects: ['energy_restore', 'team_all_stats_up']
      }
    ],
    bonusStats: {
      hp: 50,
      def: 10,
      agi: 15
    }
  },
  [Archetype.Healer]: {
    name: '回复型',
    description: '擅长恢复队友生命值，通常拥有强力的治疗和净化技能',
    skills: [
      {
        id: 'healer_skill_1',
        name: '治愈之光',
        description: '恢复一名队友25%最大生命值，并清除一个负面效果',
        type: SkillType.Active,
        cooldown: 2,
        effects: ['single_heal', 'cleanse']
      },
      {
        id: 'healer_skill_2',
        name: '生命链接',
        description: '被动效果：每当队友受到致命伤害时，有15%几率使其保留10%生命值',
        type: SkillType.Passive,
        effects: ['death_prevention']
      },
      {
        id: 'healer_skill_3',
        name: '复苏之雨',
        description: '为所有队友恢复40%最大生命值，并提供持续3回合的生命恢复效果',
        type: SkillType.Ultimate,
        cooldown: 5,
        energyCost: 100,
        effects: ['team_heal', 'heal_over_time']
      }
    ],
    bonusStats: {
      hp: 150,
      def: 5
    }
  },
  [Archetype.Disruptor]: {
    name: '妨害型',
    description: '擅长削弱敌人并施加负面效果，通常拥有控制和减益技能',
    skills: [
      {
        id: 'disruptor_skill_1',
        name: '弱化打击',
        description: '对敌人造成伤害并降低其30%攻击力，持续2回合',
        type: SkillType.Active,
        cooldown: 3,
        effects: ['damage', 'atk_down']
      },
      {
        id: 'disruptor_skill_2',
        name: '毒素扩散',
        description: '被动效果：攻击时，有35%几率使目标中毒，每回合损失5%生命值，持续3回合',
        type: SkillType.Passive,
        effects: ['poison']
      },
      {
        id: 'disruptor_skill_3',
        name: '全面瓦解',
        description: '对所有敌人施加随机2-3个负面效果，持续2回合',
        type: SkillType.Ultimate,
        cooldown: 6,
        energyCost: 100,
        effects: ['multiple_debuffs']
      }
    ],
    bonusStats: {
      atk: 10,
      agi: 20
    }
  },
  [Archetype.Tank]: {
    name: '坦克型',
    description: '擅长承受伤害并保护队友，通常拥有高生命值和嘲讽技能',
    skills: [
      {
        id: 'tank_skill_1',
        name: '挑衅',
        description: '嘲讽所有敌人，使其在2回合内只能攻击自己',
        type: SkillType.Active,
        cooldown: 4,
        effects: ['taunt']
      },
      {
        id: 'tank_skill_2',
        name: '铜墙铁壁',
        description: '被动效果：生命值低于30%时，获得30%伤害减免',
        type: SkillType.Passive,
        effects: ['damage_reduction']
      },
      {
        id: 'tank_skill_3',
        name: '守护屏障',
        description: '为所有队友提供一个可抵挡自身最大生命值30%的护盾，并吸引所有敌人的攻击1回合',
        type: SkillType.Ultimate,
        cooldown: 5,
        energyCost: 100,
        effects: ['team_shield', 'forced_taunt']
      }
    ],
    bonusStats: {
      hp: 300,
      def: 20
    }
  },
  [Archetype.Controller]: {
    name: '控制型',
    description: '擅长限制敌人行动，通常拥有昏迷、冰冻等控制技能',
    skills: [
      {
        id: 'controller_skill_1',
        name: '时间停滞',
        description: '使单个敌人昏迷1回合，无法行动',
        type: SkillType.Active,
        cooldown: 4,
        effects: ['stun']
      },
      {
        id: 'controller_skill_2',
        name: '精神干扰',
        description: '被动效果：攻击时，有25%几率使敌人混乱，有50%几率攻击自己的队友',
        type: SkillType.Passive,
        effects: ['confusion']
      },
      {
        id: 'controller_skill_3',
        name: '绝对零度',
        description: '冰冻所有敌人，使其在1回合内无法行动，并在2回合内减少40%速度',
        type: SkillType.Ultimate,
        cooldown: 6,
        energyCost: 100,
        effects: ['freeze', 'speed_down']
      }
    ],
    bonusStats: {
      hp: 80,
      agi: 25,
      atk: 5
    }
  }
};

// 元素相关配置
export interface ElementConfig {
  name: string;       // 元素名称
  color: string;      // 元素颜色
  icon?: string;      // 元素图标
  weakness?: CardElement[]; // 元素克制关系
}

// 游戏卡牌元素配置
export const ELEMENT_CONFIG: Record<CardElement, ElementConfig> = {
  [CardElement.Fire]: {
    name: '火',
    color: '#FF4500',
    weakness: [CardElement.Water, CardElement.Earth],
  },
  [CardElement.Water]: {
    name: '水',
    color: '#1E90FF',
    weakness: [CardElement.Earth, CardElement.Wind],
  },
  [CardElement.Earth]: {
    name: '土',
    color: '#8B4513',
    weakness: [CardElement.Wind, CardElement.Fire],
  },
  [CardElement.Wind]: {
    name: '风',
    color: '#90EE90',
    weakness: [CardElement.Fire, CardElement.Light],
  },
  [CardElement.Light]: {
    name: '光',
    color: '#FFFF00',
    weakness: [CardElement.Dark],
  },
  [CardElement.Dark]: {
    name: '暗',
    color: '#800080',
    weakness: [CardElement.Light],
  }
};

// 稀有度相关配置
export interface RarityConfig {
  name: string;       // 稀有度名称
  color: string;      // 稀有度颜色
  powerMultiplier: number;  // 能力倍率
  growthMultiplier: number; // 成长属性倍率
}

// 游戏卡牌稀有度配置
export const RARITY_CONFIG: Record<CardRarity, RarityConfig> = {
  [CardRarity.F]: {
    name: 'F',
    color: '#AAAAAA',
    powerMultiplier: 1.0,
    growthMultiplier: 1.0
  },
  [CardRarity.E]: {
    name: 'E',
    color: '#2AAA2A',
    powerMultiplier: 1.2,
    growthMultiplier: 1.1
  },
  [CardRarity.D]: {
    name: 'D',
    color: '#2A7FE5',
    powerMultiplier: 1.5,
    growthMultiplier: 1.2
  },
  [CardRarity.C]: {
    name: 'C',
    color: '#9933CC',
    powerMultiplier: 2.0,
    growthMultiplier: 1.3
  },
  [CardRarity.B]: {
    name: 'B',
    color: '#DD9900',
    powerMultiplier: 3.0,
    growthMultiplier: 1.5
  },
  // 新增稀有度配置
  [CardRarity.A]: {
    name: 'A',
    color: '#FF4500',
    powerMultiplier: 4.0,
    growthMultiplier: 1.7
  },
  [CardRarity.S]: {
    name: 'S',
    color: '#FFFFFF',
    powerMultiplier: 5.0,
    growthMultiplier: 2.0
  },
  [CardRarity.SS]: {
    name: 'SS',
    color: '#00FFFF',
    powerMultiplier: 6.0,
    growthMultiplier: 2.3
  },
  [CardRarity.SSS]: {
    name: 'SSS',
    color: '#7DF9FF',
    powerMultiplier: 7.0,
    growthMultiplier: 2.6
  },
  [CardRarity.SSSS]: {
    name: 'SSSS',
    color: '#E6E6FA',
    powerMultiplier: 8.0,
    growthMultiplier: 3.0
  },
  [CardRarity.SSSSS]: {
    name: 'SSSSS',
    color: '#FFD700',
    powerMultiplier: 10.0,
    growthMultiplier: 3.5
  }
};

export const cardData = {
  hp: [1000, 1200, 1500, 1900, 2400],
  atk: [150, 200, 250, 300, 350],
  def: [50, 60, 70, 80, 90],
  agi: [10, 15, 20, 25, 30],
  criRate: [0.05, 0.1, 0.15, 0.2, 0.25],
  criDmg: [1.5, 1.6, 1.7, 1.8, 1.9],
  cost: [1, 2, 3, 4, 5],
  // 其他属性
  // 例如：

};

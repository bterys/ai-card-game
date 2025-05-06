import { CardRarity, RARITY_CONFIG, CardElement, ELEMENT_CONFIG, WeaponType, Archetype } from './config';

// 定义修改器类型（百分比或数值加成）
export enum ModifierType {
  FLAT = 'flat',       // 数值加成
  PERCENTAGE = 'percentage'  // 百分比加成
}

// 定义属性修改器接口
export interface Modifier {
  id: string;                   // 修改器唯一ID
  name: string;                 // 修改器名称
  description: string;          // 修改器描述  
  duration?: number;            // 持续回合数，undefined表示永久
  isStackable?: boolean;        // 是否可叠加
  type: ModifierType;           // 修改器类型（数值加成或百分比加成）
  attribute: 'hp' | 'atk' | 'def' | 'agi' | 'criRate' | 'criDmg';  // 修改的属性
  value: number;                // 修改值（数值或百分比）
  source?: string;              // 修改器来源（如：技能、装备、状态等）
}

export interface CardProps {
  id: string;
  name: string;
  description: string;
  imgUrl: string;
  backgroundUrl?: string; // 背景颜色

  rarity: CardRarity; // 卡牌稀有度
  element?: CardElement; // 卡牌元素类型
  weaponType?: WeaponType; // 武器种类
  archetype: Archetype; // 职业

  atk: number;
  hp: number;
  def: number;
  agi: number;
  criRate: number;
  criDmg: number;

  lv: number; // 等级
  exp: number; // 经验值
  expNext: number; // 下一级经验值
  star: number; // 星级
  starMax: number; // 最大星级

  cost: number;
}

export class Card {
  id: string;
  name: string;
  description: string;
  imgUrl: string;
  backgroundUrl: string; // 背景颜色
  element: CardElement; // 元素
  race: string; // 种族
  weaponType: WeaponType; // 武器种类
  archetype: Archetype; // 职业
  rarity: CardRarity; // 稀有度属性

  hp: number;
  atk: number;
  def: number;
  agi: number;
  criRate: number;
  criDmg: number;
  lv?: number; // 等级
  exp?: number; // 经验值
  expNext?: number; // 下一级经验值
  star?: number; // 星级
  starMax?: number; // 最大星级
  cost: number;
  
  // 添加修改器数组
  modifiers: Modifier[];

  constructor(props: CardProps) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.imgUrl = props.imgUrl;
    this.hp = props.hp;
    this.atk = props.atk;
    this.def = props.def || 0; // 默认防御力为0
    this.agi = props.agi || 0; // 默认敏捷为0
    this.criRate = props.criRate || 0.05; // 默认暴击率为5%
    this.criDmg = props.criDmg || 1.5; // 默认暴击伤害为150%

    this.cost = props.cost;
    this.rarity = props.rarity || CardRarity.F; // 默认为普通稀有度
    this.element = props.element || CardElement.Fire; // 默认为火属性

    // 初始化其他属性
    this.backgroundUrl = props.backgroundUrl || "";
    this.race = "";
    this.weaponType = props.weaponType || WeaponType.Sword; // 默认为剑类武器
    this.archetype = props.archetype || Archetype.Attacker; // 默认为战士职业
    
    // 初始化修改器数组
    this.modifiers = [];
  }

  // 获取卡牌稀有度配置
  getRarityConfig() {
    return RARITY_CONFIG[this.rarity];
  }

  // 获取卡牌稀有度名称
  getRarityName() {
    return this.getRarityConfig().name;
  }

  // 获取卡牌稀有度颜色
  getRarityColor() {
    return this.getRarityConfig().color;
  }

  // 获取卡牌元素配置
  getElementConfig() {
    return ELEMENT_CONFIG[this.element];
  }

  // 获取卡牌元素名称
  getElementName() {
    return this.getElementConfig().name;
  }

  // 获取卡牌元素颜色
  getElementColor() {
    return this.getElementConfig().color;
  }

  // 根据稀有度计算实际攻击力
  getActualAttack() {
    const multiplier = this.getRarityConfig().powerMultiplier;
    return Math.round(this.atk * multiplier);
  }

  // 根据稀有度计算实际生命值
  getActualHealth() {
    const multiplier = this.getRarityConfig().powerMultiplier;
    return Math.round(this.hp * multiplier);
  }

  // 添加属性修改器
  addModifier(modifier: Modifier): void {
    // 检查是否已存在相同ID的修改器
    const existingIndex = this.modifiers.findIndex(m => m.id === modifier.id);
    
    // 如果存在且不可叠加，则替换旧的修改器
    if (existingIndex !== -1 && !modifier.isStackable) {
      this.modifiers[existingIndex] = { ...modifier };
    } 
    // 如果不存在或可叠加，则添加新修改器
    else if (existingIndex === -1 || modifier.isStackable) {
      this.modifiers.push({ ...modifier });
    }
  }

  // 移除属性修改器
  removeModifier(modifierId: string): void {
    this.modifiers = this.modifiers.filter(m => m.id !== modifierId);
  }

  // 减少所有修改器的持续时间并移除已过期的修改器
  updateModifiers(): void {
    this.modifiers = this.modifiers.filter(modifier => {
      // 如果有持续回合，减少一回合
      if (modifier.duration !== undefined) {
        modifier.duration--;
        // 保留未到期的修改器
        return modifier.duration > 0;
      }
      // 没有设置duration的为永久修改器，始终保留
      return true;
    });
  }

  // 计算所有修改器对某一属性的总修改值
  private calculateModifierValue(property: 'hp' | 'atk' | 'def' | 'agi' | 'criRate' | 'criDmg'): number {
    // 分别计算固定值修改和百分比修改
    let flatModifier = 0;
    let percentageModifier = 0;
    
    // 获取属性的基础值
    let baseValue: number;
    if (property === 'hp') {
      baseValue = this.getActualHealth();
    } else if (property === 'atk') {
      baseValue = this.getActualAttack();
    } else {
      baseValue = this[property];
    }
    
    // 计算所有适用的修改器
    this.modifiers.forEach(modifier => {
      if (modifier.attribute === property) {
        if (modifier.type === ModifierType.FLAT) {
          flatModifier += modifier.value;
        } else if (modifier.type === ModifierType.PERCENTAGE) {
          percentageModifier += modifier.value;
        }
      }
    });
    
    // 先应用百分比修改，再应用固定值修改
    return (baseValue * (1 + percentageModifier)) + flatModifier;
  }

  // 获取应用修改器后的攻击力
  getModifiedAttack(): number {
    const baseAtk = this.getActualAttack();
    const modifier = this.calculateModifierValue('atk');
    return Math.max(0, baseAtk + modifier); // 确保不小于0
  }

  // 获取应用修改器后的生命值
  getModifiedHealth(): number {
    const baseHp = this.getActualHealth();
    const modifier = this.calculateModifierValue('hp');
    return Math.max(1, baseHp + modifier); // 确保至少为1
  }

  // 获取应用修改器后的防御力
  getModifiedDefense(): number {
    const baseDef = this.def;
    const modifier = this.calculateModifierValue('def');
    return Math.max(0, baseDef + modifier); // 确保不小于0
  }

  // 获取应用修改器后的敏捷
  getModifiedAgility(): number {
    const baseAgi = this.agi;
    const modifier = this.calculateModifierValue('agi');
    return Math.max(0, baseAgi + modifier); // 确保不小于0
  }

  // 获取应用修改器后的暴击率
  getModifiedCritRate(): number {
    const baseCriRate = this.criRate;
    const modifier = this.calculateModifierValue('criRate');
    return Math.max(0, Math.min(1, baseCriRate + modifier)); // 确保在0-1之间
  }

  // 获取应用修改器后的暴击伤害
  getModifiedCritDamage(): number {
    const baseCriDmg = this.criDmg;
    const modifier = this.calculateModifierValue('criDmg');
    return Math.max(1, baseCriDmg + modifier); // 确保至少为1
  }

  // 获取所有当前的修改器
  getModifiers(): Modifier[] {
    return [...this.modifiers];
  }

  // 清除所有修改器
  clearModifiers(): void {
    this.modifiers = [];
  }

  // 清除特定来源的修改器
  clearModifiersBySource(source: string): void {
    this.modifiers = this.modifiers.filter(modifier => modifier.source !== source);
  }
}
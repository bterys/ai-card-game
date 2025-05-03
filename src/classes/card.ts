import { CardRarity, RARITY_CONFIG, CardElement, ELEMENT_CONFIG } from './config';

export interface CardProps {
  id: string;
  name: string;
  description: string;
  imgUrl: string;
  attack: number;
  health: number;
  cost: number;
  rarity: CardRarity;  // 卡牌稀有度
  element?: CardElement; // 卡牌元素类型
}

export class Card {
  id: string;
  name: string;
  description: string;
  imgUrl: string;
  backgroundColor: string; // 背景颜色
  element: CardElement; // 元素
  race: string; // 种族
  weaponProficiency: string; // 武器熟练度
  archetype: string; // 职业

  hp: number;
  atk: number;
  def: number;
  agi: number;
  criRate: number;
  criDmg: number;

  cost: number;
  rarity: CardRarity; // 稀有度属性

  constructor(props: CardProps) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.imgUrl = props.imgUrl;
    this.atk = props.attack;
    this.hp = props.health;
    this.cost = props.cost;
    this.rarity = props.rarity || CardRarity.F; // 默认为普通稀有度
    this.element = props.element || CardElement.Fire; // 默认为火属性
    
    // 初始化其他属性
    this.def = 0;
    this.agi = 0;
    this.criRate = 0.05; // 基础暴击率5%
    this.criDmg = 1.5;   // 基础暴击伤害150%
    this.backgroundColor = '';
    this.race = '';
    this.weaponProficiency = '';
    this.archetype = '';
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

  // ...existing code...
}
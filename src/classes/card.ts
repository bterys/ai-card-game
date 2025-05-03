import { CardRarity, RARITY_CONFIG, CardElement, ELEMENT_CONFIG, WeaponType, Archetype } from './config';

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
    this.def = 0;
    this.agi = 0;
    this.criRate = 0.05; // 基础暴击率5%
    this.criDmg = 1.5; // 基础暴击伤害150%
    this.backgroundUrl = "";
    this.race = "";
    this.weaponType = props.weaponType || WeaponType.Sword; // 默认为剑类武器
    this.archetype = props.archetype || Archetype.Attacker; // 默认为战士职业
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
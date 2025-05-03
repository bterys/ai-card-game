import { Card, CardProps } from './card';
import { CardRarity, RARITY_CONFIG, CardElement } from './config';

export class CardGenerator {
  // 随机生成卡牌
  static generateRandomCard(): Card {
    // 先随机决定卡牌稀有度
    const rarity = this.getRandomRarity();
    
    // 随机选择元素
    const element = this.getRandomElement();
    
    // 生成基础属性
    const id = `card_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const name = this.generateRandomName(element);
    const description = this.generateRandomDescription(element);
    const imgUrl = `https://picsum.photos/200/300?random=${Math.floor(Math.random() * 1000)}`;
    
    // 根据稀有度调整基础属性值范围
    const basePower = this.getBasePowerByRarity(rarity);
    
    // 随机生成属性
    const atk = Math.floor(Math.random() * basePower) + 1;
    const hp = Math.floor(Math.random() * basePower) + 1;
    const cost = Math.floor((atk + hp) / 3) + 1;
    
    return new Card({
      id,
      name,
      description,
      imgUrl,
      atk,
      hp,
      cost,
      rarity,
      element
    });
  }
  
  // 根据掉落率随机获取稀有度
  private static getRandomRarity(): CardRarity {
    const rand = Math.random() * 100;
    let cumulativeRate = 0;
    
    for (const rarity of Object.values(CardRarity)) {
      cumulativeRate += RARITY_CONFIG[rarity].dropRate;
      if (rand < cumulativeRate) {
        return rarity;
      }
    }
    
    // 默认返回普通稀有度
    return CardRarity.F;
  }
  
  // 随机获取元素类型
  private static getRandomElement(): CardElement {
    const elements = Object.values(CardElement);
    return elements[Math.floor(Math.random() * elements.length)];
  }
  
  // 根据稀有度获取基础能力值范围
  private static getBasePowerByRarity(rarity: CardRarity): number {
    switch(rarity) {
      case CardRarity.F:
        return 5;
      case CardRarity.E:
        return 7;
      case CardRarity.D:
        return 10;
      case CardRarity.C:
        return 15;
      case CardRarity.B:
        return 20;
      case CardRarity.A:
        return 25;
      case CardRarity.S:
        return 30;
      case CardRarity.SS:
        return 35;
      case CardRarity.SSS:
        return 40;
      case CardRarity.SSSS:
        return 45; 
      case CardRarity.SSSSS:
        return 50;
      default:
        return 5;
    }
  }

  // 随机生成卡牌名称
  private static generateRandomName(element: CardElement): string {
    const elementPrefixes = {
      [CardElement.Fire]: ['烈焰', '火焰', '灼热', '熔岩', '炎龙'],
      [CardElement.Water]: ['海洋', '水灵', '冰霜', '深海', '潮汐'],
      [CardElement.Earth]: ['岩石', '大地', '山脉', '森林', '自然'],
      [CardElement.Wind]: ['飓风', '疾风', '风暴', '旋风', '气旋'],
      [CardElement.Light]: ['神圣', '光明', '曙光', '辉煌', '圣洁'],
      [CardElement.Dark]: ['黑暗', '暗影', '虚空', '深渊', '死亡']
    };
    
    const subjects = ['战士', '法师', '猎手', '龙', '巨兽', '守护者', '精灵', '亡灵', '使者', '行者'];
    
    const elementPrefix = elementPrefixes[element][Math.floor(Math.random() * elementPrefixes[element].length)];
    const randomSubject = subjects[Math.floor(Math.random() * subjects.length)];
    
    return `${elementPrefix}${randomSubject}`;
  }
  
  // 随机生成卡牌描述
  private static generateRandomDescription(element: CardElement): string {
    const elementEffects = {
      [CardElement.Fire]: ['燃烧', '灼烧', '爆炸', '烈焰冲击', '熔岩喷射'],
      [CardElement.Water]: ['冻结', '水流冲击', '潮汐涌动', '寒冰护盾', '治愈之水'],
      [CardElement.Earth]: ['岩石护盾', '地刺突袭', '藤蔓缠绕', '泥石流', '地震'],
      [CardElement.Wind]: ['风刃', '暴风', '龙卷风', '快速移动', '风之屏障'],
      [CardElement.Light]: ['神圣惩击', '净化', '治愈', '光明护盾', '圣光闪耀'],
      [CardElement.Dark]: ['暗影打击', '噬魂', '诅咒', '暗黑之云', '虚空吞噬']
    };
    
    const targets = ['敌人', '友方单位', '全场单位', '自身', '随机目标', '所有敌人', '所有友军'];
    const effects = ['造成伤害', '提供护甲', '恢复生命值', '增加攻击力', '减少防御力', '施加持续效果'];
    
    const elementEffect = elementEffects[element][Math.floor(Math.random() * elementEffects[element].length)];
    const randomTarget = targets[Math.floor(Math.random() * targets.length)];
    const randomEffect = effects[Math.floor(Math.random() * effects.length)];
    
    return `释放${elementEffect}，对${randomTarget}${randomEffect}。`;
  }
}
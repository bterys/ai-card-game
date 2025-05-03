import { Card, type CardProps } from './card';
import { CardRarity, RARITY_CONFIG, CardElement, WeaponType, Archetype } from './config';

export class CardGenerator {
  // 随机生成卡牌
  static generateRandomCard(): Card {
    // 随机稀有度、元素、武器、职业
    const rarity = this.getRandomRarity();
    const element = this.getRandomElement();
    const weaponType = this.getRandomWeaponType();
    const archetype = this.getRandomArchetype();

    // 生成基础属性
    const id = `card_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const name = this.generateRandomName(element);
    const description = this.generateRandomDescription(element);
    const imgUrl = `https://picsum.photos/200/300?random=${Math.floor(Math.random() * 1000)}`;
    const backgroundUrl = '';

    // 根据稀有度调整基础属性值范围
    const basePower = this.getBasePowerByRarity(rarity);
    // 属性分布
    const atk = this.randomInt(basePower * 0.8, basePower * 1.2);
    const hp = this.randomInt(basePower * 0.8, basePower * 1.2);
    const def = this.randomInt(basePower * 0.2, basePower * 0.6);
    const agi = this.randomInt(basePower * 0.1, basePower * 0.5);
    const criRate = +(0.03 + Math.random() * 0.07).toFixed(2); // 3%~10%
    const criDmg = +(1.3 + Math.random() * 0.5).toFixed(2); // 130%~180%
    const cost = Math.max(1, Math.floor((atk + hp + def) / 7));

    const cardProps: CardProps = {
      id,
      name,
      description,
      imgUrl,
      backgroundUrl,
      rarity,
      element,
      weaponType,
      archetype,
      atk,
      hp,
      def,
      agi,
      criRate,
      criDmg,
      cost
    };
    return new Card(cardProps);
  }

  private static getRandomRarity(): CardRarity {
    const rand = Math.random() * 100;
    let cumulativeRate = 0;
    // 假设每个稀有度有dropRate字段
    for (const rarity of Object.values(CardRarity)) {
      if (RARITY_CONFIG[rarity] && (RARITY_CONFIG[rarity] as any).dropRate) {
        cumulativeRate += (RARITY_CONFIG[rarity] as any).dropRate;
        if (rand < cumulativeRate) return rarity;
      }
    }
    return CardRarity.F;
  }

  private static getRandomElement(): CardElement {
    const elements = Object.values(CardElement);
    return elements[Math.floor(Math.random() * elements.length)];
  }

  private static getRandomWeaponType(): WeaponType {
    const types = Object.values(WeaponType);
    return types[Math.floor(Math.random() * types.length)];
  }

  private static getRandomArchetype(): Archetype {
    const types = Object.values(Archetype);
    return types[Math.floor(Math.random() * types.length)];
  }

  private static getBasePowerByRarity(rarity: CardRarity): number {
    switch(rarity) {
      case CardRarity.F: return 5;
      case CardRarity.E: return 7;
      case CardRarity.D: return 10;
      case CardRarity.C: return 15;
      case CardRarity.B: return 20;
      case CardRarity.A: return 25;
      case CardRarity.S: return 30;
      case CardRarity.SS: return 35;
      case CardRarity.SSS: return 40;
      case CardRarity.SSSS: return 45;
      case CardRarity.SSSSS: return 50;
      default: return 5;
    }
  }

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

  private static randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + Math.floor(min);
  }
}
import { CardGenerator } from '../../classes/cardGenerator';
import { Card } from '../../classes/card';
import { CardRarity, CardElement, WeaponType, Archetype, RARITY_CONFIG } from '../../classes/config';

// 模拟Math.random以控制随机性
const mockRandom = jest.spyOn(Math, 'random');
// 模拟Date.now以控制ID生成
const mockDateNow = jest.spyOn(Date, 'now');

describe('CardGenerator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // 设置默认的模拟值
    mockRandom.mockReturnValue(0.5);
    mockDateNow.mockReturnValue(1234567890);
  });

  describe('generateRandomCard', () => {
    it('should generate a card with a valid structure', () => {
      const card = CardGenerator.generateRandomCard();
      
      // 验证卡牌是Card类的实例
      expect(card).toBeInstanceOf(Card);
      
      // 验证卡牌拥有所有必要的属性
      expect(card.id).toBeDefined();
      expect(card.name).toBeDefined();
      expect(card.description).toBeDefined();
      expect(card.imgUrl).toBeDefined();
      expect(card.rarity).toBeDefined();
      expect(card.element).toBeDefined();
      expect(card.weaponType).toBeDefined();
      expect(card.archetype).toBeDefined();
      expect(card.atk).toBeDefined();
      expect(card.hp).toBeDefined();
      expect(card.def).toBeDefined();
      expect(card.agi).toBeDefined();
      expect(card.criRate).toBeDefined();
      expect(card.criDmg).toBeDefined();
      expect(card.cost).toBeDefined();
    });

    it('should generate a card with proper ID format', () => {
      mockDateNow.mockReturnValue(1000000);
      mockRandom.mockReturnValue(0.5);
      
      const card = CardGenerator.generateRandomCard();
      
      expect(card.id).toContain('card_1000000_');
      expect(card.id.split('_').length).toBe(3);
    });

    it('should set the cost based on card attributes', () => {
      // 模拟随机值，使得生成的卡有较高的攻击和生命值
      mockRandom
        .mockReturnValueOnce(0.9) // 稀有度
        .mockReturnValueOnce(0.5) // 元素
        .mockReturnValueOnce(0.5) // 武器
        .mockReturnValueOnce(0.5) // 职业
        .mockReturnValueOnce(0.9) // atk上限
        .mockReturnValueOnce(0.9) // hp上限
        .mockReturnValueOnce(0.5) // def上限
        .mockReturnValueOnce(0.5) // agi上限
        .mockReturnValueOnce(0.5) // 暴击率
        .mockReturnValueOnce(0.5); // 暴击伤害
      
      const card = CardGenerator.generateRandomCard();
      
      // 验证cost是基于atk、hp和def计算的
      const expectedCost = Math.max(1, Math.floor((card.atk + card.hp + card.def) / 7));
      expect(card.cost).toBe(expectedCost);
    });
  });

  describe('getRandomRarity', () => {
    it('should return a valid CardRarity', () => {
      // 测试低值随机数和高值随机数都能返回有效的稀有度
      mockRandom.mockReturnValue(0.01);
      const card1 = CardGenerator.generateRandomCard();
      expect(Object.values(CardRarity)).toContain(card1.rarity);
      
      mockRandom.mockReturnValue(0.99);
      const card2 = CardGenerator.generateRandomCard();
      expect(Object.values(CardRarity)).toContain(card2.rarity);
    });
  });

  describe('generateRandomName', () => {
    it('should generate a name related to the element', () => {
      // 设置元素为Fire
      mockRandom
        .mockReturnValueOnce(0.5) // 稀有度
        .mockReturnValueOnce(0) // 元素 (0/6 = Fire)
        .mockReturnValueOnce(0.5) // 武器
        .mockReturnValueOnce(0.5); // 职业
      
      const card = CardGenerator.generateRandomCard();
      
      // 假设Fire元素相关的名称包含这些前缀中的一个
      const fireRelatedPrefixes = ['烈焰', '火焰', '灼热', '熔岩', '炎龙'];
      
      // 检查名称是否包含Fire元素相关的前缀
      const hasFirePrefix = fireRelatedPrefixes.some(prefix => card.name.includes(prefix));
      expect(hasFirePrefix).toBe(true);
    });
  });

  describe('generateRandomDescription', () => {
    it('should generate a description related to the element', () => {
      // 设置元素为Water
      mockRandom
        .mockReturnValueOnce(0.5) // 稀有度
        .mockReturnValueOnce(1/6) // 元素 (1/6 = Water)
        .mockReturnValueOnce(0.5) // 武器
        .mockReturnValueOnce(0.5); // 职业
      
      const card = CardGenerator.generateRandomCard();
      
      // 假设Water元素相关的效果包含这些词汇中的一个
      const waterRelatedEffects = ['冻结', '水流冲击', '潮汐涌动', '寒冰护盾', '治愈之水'];
      
      // 检查描述是否包含Water元素相关的效果
      const hasWaterEffect = waterRelatedEffects.some(effect => card.description.includes(effect));
      expect(hasWaterEffect).toBe(true);
    });
  });

  describe('card attributes calculation', () => {
    it('should calculate attributes based on rarity', () => {
      // 直接比较不同稀有度的基础能力值
      const highRarityBasePower = CardGenerator['getBasePowerByRarity'](CardRarity.SSSSS);
      const lowRarityBasePower = CardGenerator['getBasePowerByRarity'](CardRarity.F);
      
      // 高稀有度卡牌的基础能力值应该高于低稀有度卡牌
      expect(highRarityBasePower).toBeGreaterThan(lowRarityBasePower);
    });
  });
});
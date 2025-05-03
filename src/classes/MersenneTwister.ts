/**
 * 梅森旋转算法(Mersenne Twister)随机数生成器
 * 基于MT19937算法实现
 * import { MersenneTwister } from './classes/MersenneTwister';
 * // 创建一个随机数生成器实例（可选择提供种子）
 * const rng = new MersenneTwister(12345); // 使用固定种子
 * // 或
 * const rng = new MersenneTwister(); // 使用随机种子
 * 
 * // 生成 [0, 1) 之间的随机浮点数
 * const randomFloat = rng.random();
 * 
 * // 生成 [0, 100) 之间的随机整数
 * const randomInt = rng.nextInt(100);
 * 
 * // 生成 [10, 20) 之间的随机整数
 * const randomInRange = rng.nextIntRange(10, 20);
 * 
 * // 从数组中随机选择一个元素
 * const items = ['苹果', '香蕉', '橙子', '葡萄'];
 * const randomItem = rng.nextChoice(items);
 * 
 * // 随机打乱数组
 * const shuffledArray = rng.shuffle([...items]);
 */
export class MersenneTwister {
  // MT19937参数
  private static readonly N = 624;
  private static readonly M = 397;
  private static readonly MATRIX_A = 0x9908b0df;
  private static readonly UPPER_MASK = 0x80000000;
  private static readonly LOWER_MASK = 0x7fffffff;

  // 状态向量
  private mt: number[] = new Array(MersenneTwister.N);
  private mti: number = MersenneTwister.N + 1;

  /**
   * 构造函数，使用提供的种子初始化
   * @param seed 随机数种子
   */
  constructor(seed?: number) {
    this.init(seed ?? Math.floor(Math.random() * 0xffffffff));
  }

  /**
   * 使用种子初始化随机数生成器
   * @param seed 随机数种子
   */
  public init(seed: number): void {
    this.mt[0] = seed >>> 0;
    for (this.mti = 1; this.mti < MersenneTwister.N; this.mti++) {
      const s = this.mt[this.mti - 1] ^ (this.mt[this.mti - 1] >>> 30);
      this.mt[this.mti] = (((((s & 0xffff0000) >>> 16) * 1812433253) << 16) + 
        (s & 0x0000ffff) * 1812433253) + this.mti;
      this.mt[this.mti] >>>= 0;
    }
  }

  /**
   * 使用数组初始化随机数生成器的状态
   * @param array 初始化数组
   */
  public initByArray(array: number[]): void {
    let i = 1, j = 0;
    this.init(19650218);
    
    const k = MersenneTwister.N > array.length ? MersenneTwister.N : array.length;
    
    for (let s = 0; s < k; s++) {
      const val = this.mt[i - 1] ^ (this.mt[i - 1] >>> 30);
      this.mt[i] = (this.mt[i] ^ (((((val & 0xffff0000) >>> 16) * 1664525) << 16) + 
        ((val & 0x0000ffff) * 1664525))) + array[j] + j;
      this.mt[i] >>>= 0;
      i++;
      j++;
      if (i >= MersenneTwister.N) { 
        this.mt[0] = this.mt[MersenneTwister.N - 1]; 
        i = 1; 
      }
      if (j >= array.length) j = 0;
    }
    
    for (let s = 0; s < MersenneTwister.N - 1; s++) {
      const val = this.mt[i - 1] ^ (this.mt[i - 1] >>> 30);
      this.mt[i] = (this.mt[i] ^ (((((val & 0xffff0000) >>> 16) * 1566083941) << 16) + 
        ((val & 0x0000ffff) * 1566083941))) - i;
      this.mt[i] >>>= 0;
      i++;
      if (i >= MersenneTwister.N) { 
        this.mt[0] = this.mt[MersenneTwister.N - 1]; 
        i = 1; 
      }
    }

    this.mt[0] = 0x80000000;
  }

  /**
   * 生成一个随机的32位整数
   * @returns 32位随机整数
   */
  public int32(): number {
    let y: number;
    const mag01 = [0x0, MersenneTwister.MATRIX_A];

    // 生成N个字
    if (this.mti >= MersenneTwister.N) {
      let kk: number;

      // 如果init()没有被调用，使用默认种子
      if (this.mti === MersenneTwister.N + 1) {
        this.init(5489);
      }

      for (kk = 0; kk < MersenneTwister.N - MersenneTwister.M; kk++) {
        y = (this.mt[kk] & MersenneTwister.UPPER_MASK) | (this.mt[kk + 1] & MersenneTwister.LOWER_MASK);
        this.mt[kk] = this.mt[kk + MersenneTwister.M] ^ (y >>> 1) ^ mag01[y & 0x1];
      }
      
      for (; kk < MersenneTwister.N - 1; kk++) {
        y = (this.mt[kk] & MersenneTwister.UPPER_MASK) | (this.mt[kk + 1] & MersenneTwister.LOWER_MASK);
        this.mt[kk] = this.mt[kk + (MersenneTwister.M - MersenneTwister.N)] ^ (y >>> 1) ^ mag01[y & 0x1];
      }
      
      y = (this.mt[MersenneTwister.N - 1] & MersenneTwister.UPPER_MASK) | (this.mt[0] & MersenneTwister.LOWER_MASK);
      this.mt[MersenneTwister.N - 1] = this.mt[MersenneTwister.M - 1] ^ (y >>> 1) ^ mag01[y & 0x1];

      this.mti = 0;
    }

    y = this.mt[this.mti++];

    // 缩减
    y ^= (y >>> 11);
    y ^= (y << 7) & 0x9d2c5680;
    y ^= (y << 15) & 0xefc60000;
    y ^= (y >>> 18);

    return y >>> 0;
  }

  /**
   * 生成 [0, 1) 范围内的随机浮点数
   * @returns [0, 1) 范围内的随机浮点数
   */
  public random(): number {
    return this.int32() * (1.0 / 4294967296.0);
  }

  /**
   * 生成 [0, max) 范围内的随机整数
   * @param max 上限（不包含）
   * @returns [0, max) 范围内的随机整数
   */
  public nextInt(max: number): number {
    return Math.floor(this.random() * max);
  }

  /**
   * 生成 [min, max) 范围内的随机整数
   * @param min 下限（包含）
   * @param max 上限（不包含）
   * @returns [min, max) 范围内的随机整数
   */
  public nextIntRange(min: number, max: number): number {
    return Math.floor(this.random() * (max - min)) + min;
  }

  /**
   * 生成 [min, max) 范围内的随机浮点数
   * @param min 下限（包含）
   * @param max 上限（不包含）
   * @returns [min, max) 范围内的随机浮点数
   */
  public nextFloatRange(min: number, max: number): number {
    return this.random() * (max - min) + min;
  }

  /**
   * 从数组中随机选择一个元素
   * @param array 源数组
   * @returns 随机选择的元素
   */
  public nextChoice<T>(array: T[]): T {
    return array[this.nextInt(array.length)];
  }

  /**
   * 将数组随机打乱（Fisher-Yates 洗牌算法）
   * @param array 要打乱的数组
   * @returns 打乱后的数组（原地修改）
   */
  public shuffle<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = this.nextInt(i + 1);
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
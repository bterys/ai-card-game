import { MersenneTwister } from '../../classes/MersenneTwister';

describe('MersenneTwister性能测试', () => {
  it('测试生成一百万个随机数的性能', () => {
    // 创建固定种子的随机数生成器
    const rng = new MersenneTwister(12345);
    
    console.log('开始性能测试: 生成一百万个随机数');
    
    // 测量不同方法的性能
    const iterations = 1000000; // 一百万次
    
    // 测试 random() 方法
    const startRandom = performance.now();
    for (let i = 0; i < iterations; i++) {
      rng.random();
    }
    const endRandom = performance.now();
    const timeRandom = endRandom - startRandom;
    
    // 测试 nextInt() 方法
    const startNextInt = performance.now();
    for (let i = 0; i < iterations; i++) {
      rng.nextInt(100);
    }
    const endNextInt = performance.now();
    const timeNextInt = endNextInt - startNextInt;
    
    // 测试 nextIntRange() 方法
    const startNextIntRange = performance.now();
    for (let i = 0; i < iterations; i++) {
      rng.nextIntRange(10, 100);
    }
    const endNextIntRange = performance.now();
    const timeNextIntRange = endNextIntRange - startNextIntRange;

    // 输出结果
    console.log(`生成 ${iterations.toLocaleString()} 个 [0,1) 随机浮点数耗时: ${timeRandom.toFixed(2)}ms (${(timeRandom/iterations*1000).toFixed(3)}μs/个)`);
    console.log(`生成 ${iterations.toLocaleString()} 个 [0,100) 随机整数耗时: ${timeNextInt.toFixed(2)}ms (${(timeNextInt/iterations*1000).toFixed(3)}μs/个)`);
    console.log(`生成 ${iterations.toLocaleString()} 个 [10,100) 范围随机整数耗时: ${timeNextIntRange.toFixed(2)}ms (${(timeNextIntRange/iterations*1000).toFixed(3)}μs/个)`);
    
    // 与原生Math.random比较
    const startMathRandom = performance.now();
    for (let i = 0; i < iterations; i++) {
      Math.random();
    }
    const endMathRandom = performance.now();
    const timeMathRandom = endMathRandom - startMathRandom;
    
    console.log(`原生 Math.random() 生成 ${iterations.toLocaleString()} 个随机数耗时: ${timeMathRandom.toFixed(2)}ms (${(timeMathRandom/iterations*1000).toFixed(3)}μs/个)`);
    console.log(`梅森旋转算法比原生Math.random() ${timeMathRandom < timeRandom ? '慢' : '快'} ${(Math.abs(1 - timeRandom/timeMathRandom) * 100).toFixed(2)}%`);
    
    // 测试通过
    expect(true).toBeTruthy();
  });
});
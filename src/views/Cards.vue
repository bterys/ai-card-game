<template>
  <div>
    <h1>我的卡牌</h1>
    <n-grid :x-gap="12" :y-gap="16" :cols="4">
      <n-grid-item v-for="i in 8" :key="i">
        <n-card hoverable>
          <template #cover>
            <img src="https://via.placeholder.com/200x280" alt="Card Image">
          </template>
          <template #header>
            <div style="display: flex; align-items: center; justify-content: space-between">
              <span>卡牌 {{ i }}</span>
              <n-tag type="success">稀有</n-tag>
            </div>
          </template>
          <div>
            <p>攻击力: {{ 5 + i }}</p>
            <p>防御力: {{ 3 + i }}</p>
            <p>生命值: {{ 10 + i * 2 }}</p>
          </div>
          <template #footer>
            <n-button type="primary" size="small" style="margin-right: 8px">
              详情
            </n-button>
            <n-button size="small">
              升级
            </n-button>
          </template>
        </n-card>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script setup lang="ts">
// 这里可以添加卡牌相关的逻辑
</script>

<style scoped>
/* 卡牌页面的样式 */
h1 {
  margin-bottom: 20px;
}
</style>
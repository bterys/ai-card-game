<template>
  <div>
    <h1>商店</h1>
    <n-tabs type="line">
      <n-tab-pane name="cards" tab="卡牌">
        <n-grid :x-gap="12" :y-gap="16" :cols="4">
          <n-grid-item v-for="i in 6" :key="i">
            <n-card hoverable>
              <template #cover>
                <img src="https://via.placeholder.com/200x280" alt="Shop Card">
              </template>
              <template #header>
                <div style="display: flex; align-items: center; justify-content: space-between">
                  <span>商店卡牌 {{ i }}</span>
                  <n-tag type="info">¥{{ i * 100 }}</n-tag>
                </div>
              </template>
              <div>
                <p>攻击力: {{ 8 + i }}</p>
                <p>防御力: {{ 5 + i }}</p>
                <p>生命值: {{ 15 + i * 2 }}</p>
              </div>
              <template #footer>
                <n-button type="primary" block>
                  购买
                </n-button>
              </template>
            </n-card>
          </n-grid-item>
        </n-grid>
      </n-tab-pane>
      <n-tab-pane name="items" tab="道具">
        <n-grid :x-gap="12" :y-gap="16" :cols="4">
          <n-grid-item v-for="i in 4" :key="i">
            <n-card hoverable>
              <template #header>
                <div style="display: flex; align-items: center; justify-content: space-between">
                  <span>强化道具 {{ i }}</span>
                  <n-tag type="warning">¥{{ i * 50 }}</n-tag>
                </div>
              </template>
              <div>
                <p>提升卡牌能力的道具</p>
                <p>数量: {{ i * 3 }}</p>
              </div>
              <template #footer>
                <n-button type="primary" block>
                  购买
                </n-button>
              </template>
            </n-card>
          </n-grid-item>
        </n-grid>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script setup lang="ts">
// 商店相关逻辑
</script>

<style scoped>
h1 {
  margin-bottom: 20px;
}
</style>
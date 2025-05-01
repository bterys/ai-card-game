<template>
  <div>
    <h1>我的阵容</h1>
    <n-space vertical>
      <n-card title="当前阵容">
        <n-grid :x-gap="12" :cols="5">
          <n-grid-item v-for="i in 5" :key="i">
            <n-card hoverable>
              <template #cover>
                <img src="https://via.placeholder.com/150x200" alt="Lineup Card">
              </template>
              <div style="text-align: center">
                <p>卡牌 {{ i }}</p>
                <p>位置: {{ i }}</p>
              </div>
              <template #footer>
                <n-button size="small" type="error" block>
                  移除
                </n-button>
              </template>
            </n-card>
          </n-grid-item>
        </n-grid>
      </n-card>

      <n-card title="可用卡牌">
        <n-grid :x-gap="12" :y-gap="16" :cols="6">
          <n-grid-item v-for="i in 12" :key="i">
            <n-card hoverable size="small">
              <template #cover>
                <img src="https://via.placeholder.com/100x140" alt="Available Card">
              </template>
              <div style="text-align: center; padding: 8px 0">
                <p>卡牌 {{ i + 5 }}</p>
              </div>
              <template #footer>
                <n-button size="tiny" type="primary" block>
                  加入阵容
                </n-button>
              </template>
            </n-card>
          </n-grid-item>
        </n-grid>
      </n-card>

      <div style="text-align: center; margin-top: 20px">
        <n-button type="success" size="large">
          保存阵容
        </n-button>
      </div>
    </n-space>
  </div>
</template>

<script setup lang="ts">
// 阵容相关逻辑
</script>

<style scoped>
h1 {
  margin-bottom: 20px;
}
</style>
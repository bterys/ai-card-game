<template>
  <div>
    <h1>战斗场景</h1>
    
    <n-card title="战斗区域">
      <n-space vertical size="large">
        <div class="battle-field">
          <div class="opponent-side">
            <n-card title="对手" size="small">
              <n-avatar size="large" src="https://via.placeholder.com/100" />
              <div class="player-info">
                <p>等级: 25</p>
                <n-progress type="line" :percentage="75" :height="12" color="#d03050" />
                <p>生命值: 750/1000</p>
              </div>
            </n-card>
            
            <div class="card-row">
              <n-grid :x-gap="12" :cols="5">
                <n-grid-item v-for="i in 5" :key="i">
                  <n-card hoverable class="battle-card opponent-card">
                    <img src="https://via.placeholder.com/120x160" alt="Opponent Card">
                    <div class="card-stats">
                      <p>攻: {{ 8 + i }}</p>
                      <p>防: {{ 6 + i }}</p>
                      <p>血: {{ 25 - i * 3 }}/{{ 25 }}</p>
                    </div>
                  </n-card>
                </n-grid-item>
              </n-grid>
            </div>
          </div>
          
          <div class="battle-info">
            <n-card title="战斗日志" class="battle-log">
              <div class="log-content">
                <p>- 回合 1: 你的卡牌1攻击了敌方卡牌2，造成12点伤害</p>
                <p>- 回合 1: 敌方卡牌3攻击了你的卡牌4，造成9点伤害</p>
                <p>- 回合 2: 你的卡牌2使用了特殊技能，增加了全队2点防御</p>
                <p>- 回合 2: 敌方卡牌1被击败</p>
              </div>
            </n-card>
            
            <div class="battle-actions">
              <n-button type="primary" size="large">
                战斗
              </n-button>
              <n-button type="info" size="large">
                使用技能
              </n-button>
              <n-button type="error" size="large">
                撤退
              </n-button>
            </div>
          </div>
          
          <div class="player-side">
            <div class="card-row">
              <n-grid :x-gap="12" :cols="5">
                <n-grid-item v-for="i in 5" :key="i">
                  <n-card hoverable class="battle-card player-card">
                    <img src="https://via.placeholder.com/120x160" alt="Player Card">
                    <div class="card-stats">
                      <p>攻: {{ 7 + i }}</p>
                      <p>防: {{ 5 + i }}</p>
                      <p>血: {{ 20 - i }}/{{ 20 }}</p>
                    </div>
                  </n-card>
                </n-grid-item>
              </n-grid>
            </div>
            
            <n-card title="你" size="small">
              <n-avatar size="large" src="https://via.placeholder.com/100" />
              <div class="player-info">
                <p>等级: 18</p>
                <n-progress type="line" :percentage="85" :height="12" color="#18a058" />
                <p>生命值: 850/1000</p>
              </div>
            </n-card>
          </div>
        </div>
      </n-space>
    </n-card>
  </div>
</template>

<script setup lang="ts">
// 战斗相关逻辑
</script>

<style scoped>
h1 {
  margin-bottom: 20px;
}

.battle-field {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.opponent-side, .player-side {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.card-row {
  margin: 10px 0;
}

.battle-card {
  position: relative;
  text-align: center;
}

.player-card {
  border: 1px solid #18a058;
}

.opponent-card {
  border: 1px solid #d03050;
}

.card-stats {
  font-size: 12px;
  margin-top: 5px;
}

.player-info {
  margin-top: 10px;
  text-align: center;
}

.battle-info {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 15px 0;
}

.battle-log {
  height: 150px;
  overflow-y: auto;
}

.log-content {
  font-size: 14px;
}

.battle-actions {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
}
</style>
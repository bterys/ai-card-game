<script setup lang="ts">
import { h, ref, watch } from 'vue'
import type { Component } from 'vue'
import { darkTheme, NIcon } from 'naive-ui'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import {
  HomeOutline as HomeIcon,
  InformationCircleOutline as AboutIcon,
  CardOutline as CardsIcon,
  BagHandleOutline as ShopIcon,
  PeopleOutline as LineupIcon,
  FlameOutline as BattleIcon
} from '@vicons/ionicons5'

function renderIcon (icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/'
          }
        },
        { default: () => '首页' }
      ),
    key: 'home',
    icon: renderIcon(HomeIcon)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/cards'
          }
        },
        { default: () => '卡牌' }
      ),
    key: 'cards',
    icon: renderIcon(CardsIcon)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/shop'
          }
        },
        { default: () => '商店' }
      ),
    key: 'shop',
    icon: renderIcon(ShopIcon)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/lineup'
          }
        },
        { default: () => '阵容' }
      ),
    key: 'lineup',
    icon: renderIcon(LineupIcon)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/battle'
          }
        },
        { default: () => '战斗' }
      ),
    key: 'battle',
    icon: renderIcon(BattleIcon)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/about'
          }
        },
        { default: () => '关于' }
      ),
    key: 'about',
    icon: renderIcon(AboutIcon)
  }
]

const collapsed = ref(false)
const activeKey = ref<string | null>(null) // Track active menu item

// Determine active key based on current route
const route = useRoute()

// Function to update active key based on current path
const updateActiveKey = (path: string) => {
  if (path === '/') {
    activeKey.value = 'home'
  } else if (path === '/cards') {
    activeKey.value = 'cards'
  } else if (path === '/shop') {
    activeKey.value = 'shop'
  } else if (path === '/lineup') {
    activeKey.value = 'lineup'
  } else if (path === '/battle') {
    activeKey.value = 'battle'
  } else if (path === '/about') {
    activeKey.value = 'about'
  }
}

// Set initial active key
updateActiveKey(route.path)

// Watch for route changes to update the active menu item
watch(() => route.path, (newPath) => {
  updateActiveKey(newPath)
})
</script>

<template>
  <n-config-provider :theme="darkTheme">
    <n-layout has-sider style="height: 100vh">
      <n-layout-sider bordered collapse-mode="width" :collapsed-width="64" :width="240" :collapsed="collapsed"
        show-trigger @collapse="collapsed = true" @expand="collapsed = false">
        <n-menu v-model:value="activeKey" :collapsed="collapsed" :collapsed-width="64" :collapsed-icon-size="22"
          :options="menuOptions" />
      </n-layout-sider>
      <n-layout-content content-style="padding: 24px;">
        <router-view />
      </n-layout-content>
    </n-layout>
  </n-config-provider>
</template>

<style scoped>
/* Add any additional styles if needed */
.n-layout-sider {
  height: 100vh;
}
.n-layout-content {
  height: 100vh;
  background-color: #f0f2f5; /* Example background color */
}
</style>

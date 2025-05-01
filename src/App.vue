<script setup lang="ts">
import { h, ref, Component } from 'vue'
import { darkTheme } from 'naive-ui'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import {
  HomeOutline as HomeIcon,
  InformationCircleOutline as AboutIcon
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

// Determine active key based on current route initially
const route = useRoute()
if (route.path === '/') {
  activeKey.value = 'home'
} else if (route.path === '/about') {
  activeKey.value = 'about'
}
</script>

<template>
  <n-config-provider :theme="darkTheme">
    <n-layout style="height: 100vh">
      <n-layout-sider
        bordered
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :collapsed="collapsed"
        show-trigger
        @collapse="collapsed = true"
        @expand="collapsed = false"
      >
        <n-menu
          v-model:value="activeKey"
          :collapsed="collapsed"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuOptions"
        />
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

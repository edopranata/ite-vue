<template>
  <router-view v-slot="{ Component, route }">
    <transition name="slide-x" mode="out-in">
      <component :is="Component" :key="route.name" />
    </transition>
  </router-view>
</template>

<script setup>
import { useTheme } from 'vuetify'
import { useAppStore } from "@/store/app";
import {watch} from "vue";

const appStore = useAppStore()
const theme = useTheme()

watch(appStore, (darkModeStatus) => {
  console.log('Trigger')
  theme.global.name.value = darkModeStatus.theme.dark ? 'dark' : 'light'
}, {
  deep: true
})

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
  appStore.toggleTheme()
});


</script>

<style scoped>
.slide-x-enter-active,
.slide-x-leave-active {
  transition: transform .2s cubic-bezier(0.25, 0.8, 0.5, 1), opacity .3s;
  opacity: 1;
}

.slide-x-enter-from,
.slide-x-leave-to {
  opacity: 0;
}

.slide-x-enter-from {
  transform: translateX(100px);
}

.slide-x-leave-to {
  transform: translateX(-100px);
}
</style>

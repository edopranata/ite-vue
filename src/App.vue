<template>
  <router-view v-slot="{ Component, route }">
    <transition name="slide-x" mode="out-in">
      <component :is="Component" :key="route.name" />
    </transition>
    <v-snackbar
      v-model="appStore.snackBar.status"
    >
      {{ appStore.snackBar.text }}

      <template v-slot:actions>
        <v-btn
          color="pink"
          variant="text"
          @click.stop="appStore.closeSnackBar()"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </router-view>
</template>

<script setup>
import { useTheme } from 'vuetify'
import { useAppStore } from "@/stores/app";
import {watch} from "vue";
import { onMounted } from 'vue'
import { useDisplay } from 'vuetify'
const { mdAndUp } = useDisplay()
const appStore = useAppStore()
const theme = useTheme()

onMounted(() => {
  window.addEventListener("resize", () => {
    if(!mdAndUp.value){
      appStore.theme.drawer = mdAndUp.value
    }
  });

})


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

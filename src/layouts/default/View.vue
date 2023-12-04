<template>
  <v-main>
    <router-view v-slot="{ Component, route }">
      <transition name="slide-x" mode="out-in">
        <component :is="Component" :key="route.name" />
      </transition>
    </router-view>
  </v-main>
</template>

<script setup>
  //
</script>

<style scoped>
.slide-x-enter-active,
.slide-x-leave-active {
  transition: transform .6s cubic-bezier(0.25, 0.8, 0.5, 1), opacity .8s;
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

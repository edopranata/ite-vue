<template>
  <v-app>
    <v-layout>
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
      <v-navigation-drawer
        v-model="appStore.theme.drawer"
        :rail="appStore.theme.rail"
        permanent
        app
      >
        <v-list density="compact">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :value="item"
            color="primary"
            :to="item.to"
          >
            <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
            </template>

            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar
        :order="appStore.theme.order"
        fixed
        app
      >
        <v-app-bar-nav-icon @click.stop="appStore.toggleDrawer()" />
        <v-tooltip text="Toggle mini sidebar">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              icon
              @click.stop="appStore.toggleRail()"
            >
              <v-icon>mdi-{{ `chevron-${appStore.theme.rail ? 'right' : 'left'}` }}</v-icon>
            </v-btn>
          </template>
        </v-tooltip>

        <v-tooltip text="Toggle fluid navbar">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              icon
              @click.stop="appStore.toggleOrder()"
            >
              <v-icon>mdi-application</v-icon>
            </v-btn>
          </template>
        </v-tooltip>

        <v-tooltip text="Toggle fixed layout">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              icon
              @click.stop="appStore.toggleFixed()"
            >
              <v-icon>mdi-minus</v-icon>
            </v-btn>
          </template>
        </v-tooltip>
        <v-spacer />
        <v-tooltip text="Toggle dark mode">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              icon
              @click.stop="appStore.toggleTheme()"
            >
              <v-icon>mdi-theme-light-dark</v-icon>
            </v-btn>
          </template>
        </v-tooltip>

      </v-app-bar>
      <v-main>
        <v-container>
          <admin-view />
        </v-container>
      </v-main>
      <v-footer
        :absolute="!appStore.theme.fixed"
        app
      >
        <span>&copy; {{ new Date().getFullYear() }}</span>
      </v-footer>
    </v-layout>
  </v-app>
</template>

<script setup>
import AdminView from "@/layouts/admin/AdminView.vue";
import { useAppStore } from "@/stores/app"
const appStore = useAppStore()

const items = [
  {
    icon: 'mdi-apps',
    title: 'Welcome',
    to: '/'
  },
  {
    icon: 'mdi-chart-bubble',
    title: 'Inspire',
    to: '/login'
  }
]
</script>

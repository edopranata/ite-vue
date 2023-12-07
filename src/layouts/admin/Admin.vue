<template>
  <v-app>
    <v-layout>
      <v-navigation-drawer
        v-model="appStore.theme.drawer"
        :rail="appStore.theme.rail"
        permanent
        app
      >
        <v-list v-if="authenticated">
          <v-list-item
              prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
              title="Sandra Adams"
              subtitle="sandra_a88@gmailcom"
          ></v-list-item>
        </v-list>
        <v-divider v-if="authenticated"></v-divider>
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
        <template v-slot:append>
          <v-list density="compact" v-if="authenticated">
            <v-list-item color="secondary" @click.stop="handleLogout">
              <template v-slot:prepend>
                <v-icon icon="mdi-logout"></v-icon>
              </template>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
<!--          <div class="pt-10 pb-2">-->
<!--            <v-btn block @click.stop="handleLogout" flat>-->
<!--              Logout-->
<!--            </v-btn>-->
<!--          </div>-->
        </template>
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
import {useAuthStore} from "@/stores/auth";
import { storeToRefs } from "pinia";
import router from "@/router";

const appStore = useAppStore()

const {logout} = useAuthStore()
const {authenticated} = storeToRefs(useAuthStore())

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

const handleLogout = () => {
  logout().then(() => {
    router.push({name: 'login'})
  })
}
</script>

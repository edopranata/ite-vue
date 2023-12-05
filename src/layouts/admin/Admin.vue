<template>
  <v-app>
    <v-layout>
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
        <!--      <v-list>-->
        <!--        <v-list-item-->
        <!--          v-for="(item, i) in items"-->
        <!--          :key="i"-->
        <!--          :to="item.to"-->
        <!--        >-->
        <!--          <v-list-item-action>-->
        <!--            <v-icon>{{ item.icon }}</v-icon>-->
        <!--          </v-list-item-action>-->
        <!--          <v-list-item-content>-->
        <!--            <v-list-item-title>{{ item.title }}</v-list-item-title>-->
        <!--          </v-list-item-content>-->
        <!--        </v-list-item>-->
        <!--      </v-list>-->
      </v-navigation-drawer>
      <v-app-bar
        :order="appStore.theme.order"
        fixed
        app
      >
        <v-app-bar-nav-icon @click.stop="appStore.toggleDrawer()" />
        <v-btn
          icon
          @click.stop="appStore.toggleRail()"
        >
          <v-icon>mdi-{{ `chevron-${appStore.theme.rail ? 'right' : 'left'}` }}</v-icon>
        </v-btn>
        <v-btn
          icon
          @click.stop="appStore.toggleOrder()"
        >
          <v-icon>mdi-application</v-icon>
        </v-btn>
        <v-btn
          icon
          @click.stop="appStore.toggleFixed()"
        >
          <v-icon>mdi-minus</v-icon>
        </v-btn>
        <v-btn
          icon
          @click.stop="appStore.toggleTheme()"
        >
          <v-icon>mdi-theme-light-dark</v-icon>
        </v-btn>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer />
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
import { useAppStore } from "@/store/app"
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
const title = 'Page Settings'
</script>



<!--<template>-->

<!--  <v-app>-->
<!--    <v-layout>-->
<!--      <v-navigation-drawer-->
<!--        v-model="drawer"-->
<!--        temporary-->
<!--      >-->
<!--        <v-list-item style="height: 65px"-->
<!--          prepend-avatar="https://randomuser.me/api/portraits/men/78.jpg"-->
<!--          title="John Leider"-->
<!--        ></v-list-item>-->

<!--        <v-divider></v-divider>-->

<!--        <v-list density="compact" nav>-->
<!--          <v-list-item prepend-icon="mdi-view-dashboard" title="Home" value="home"></v-list-item>-->
<!--          <v-list-item prepend-icon="mdi-forum" title="About" value="about"></v-list-item>-->
<!--        </v-list>-->
<!--      </v-navigation-drawer>-->

<!--      <v-app-bar border>-->
<!--        <template v-slot:prepend>-->
<!--          <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>-->
<!--        </template>-->

<!--        <v-app-bar-title>Title</v-app-bar-title>-->

<!--        <v-spacer></v-spacer>-->

<!--        <v-btn icon>-->
<!--          <v-icon @click.stop="appStore.toggleTheme()" >mdi-theme-light-dark</v-icon>-->
<!--        </v-btn>-->

<!--        <v-btn icon>-->
<!--          <v-icon @click.stop="appStore.login()">mdi-heart</v-icon>-->
<!--        </v-btn>-->

<!--        <v-btn icon>-->
<!--          <v-icon>mdi-dots-vertical</v-icon>-->
<!--        </v-btn>-->
<!--      </v-app-bar>-->
<!--      <admin-view />-->
<!--    </v-layout>-->

<!--  </v-app>-->
<!--</template>-->

<!--<script setup>-->
<!--  import AdminView from './AdminView.vue'-->
<!--  import { ref } from "vue";-->
<!--  import { useAppStore } from "@/store/app";-->

<!--  const appStore = useAppStore()-->
<!--  const drawer = ref(null)-->

<!--</script>-->

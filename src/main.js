/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import { App as CapacitorApp } from '@capacitor/app';
import {useAuthStore} from "@/stores/auth";
// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

CapacitorApp.addListener('backButton', ({canGoBack}) => {
  if(!canGoBack){
    CapacitorApp.exitApp();
  } else {
    window.history.back();
  }
});

const app = createApp(App)

import './plugins/axios'
registerPlugins(app)

const {attempt} = useAuthStore();
attempt(localStorage.getItem('token'))
  .then(() => {
    app.mount('#app')
  })

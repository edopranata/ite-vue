/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import { App as CapacitorApp } from '@capacitor/app';
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

registerPlugins(app)


app.mount('#app')

/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '../stores'
import router from '../router'
import "vue-toastification/dist/index.css";
import Toast from "vue-toastification";

export function registerPlugins (app) {
  app
    .use(Toast)
    .use(vuetify)
    .use(router)
    .use(pinia)
}

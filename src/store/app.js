// Utilities
import { defineStore } from 'pinia'
import {reactive, ref} from "vue";

export const useAppStore = defineStore('app', {
  state: () => ({
    theme: reactive({
      dark: false,
      order: 0,
      drawer: false,
      fixed: false,
      rail: false,
    }),

    auth: reactive({
      user: {
        type: Object
      },
      token: {
        type: String,
        default: null,
      }
    })
  }),
  actions: {
    toggleTheme() {
      this.theme.dark = !this.theme.dark
    },
    toggleOrder() {
      this.theme.order = this.theme.order < 0 ? 0 : -1
    },
    toggleDrawer() {
      this.theme.drawer = !this.theme.drawer
    },
    toggleFixed() {
      this.theme.fixed = !this.theme.fixed
    },
    toggleRail() {
      this.theme.rail = !this.theme.rail
    },
    login() {

      let user = {id: 1, name: 'Edo Pranata', email: 'edo.pranata@gmail.com'}
      let token = '1|mzIvVDm499mDry3gMheXBCsSxGlZwpkSSx45963Rf0741765'
      this.auth.user = user
      this.auth.token = token
    }
  },
})

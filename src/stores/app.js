// Utilities
import { defineStore } from 'pinia'
import { reactive } from "vue";

export const useAppStore = defineStore('app', {
  state: () => ({
    theme: reactive({
      dark: false,
      order: 0,
      drawer: false,
      fixed: false,
      rail: false,
    }),
    snackBar: reactive({
      status: false,
      color: 'pink',
      text: 'Default Snackbar Text'
    }),
  }),

  actions: {
    closeSnackBar() {
      this.snackBar.status = false
    },
    openSnackBar(message) {
      this.snackBar.text = message ? message : this.snackBar.text
      this.snackBar.status = true
    },
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
  },
})

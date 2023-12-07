import { defineStore } from 'pinia'
import axios from "axios";
import {reactive} from "vue";
import { useToast } from 'vue-toastification'

const toast = useToast()

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    errors: null,

    snackBar: reactive({
        status: false,
        color: 'pink',
        text: 'Default Snackbar Text'
    }),
  }),


  getters: {
    authenticated() {
      return !!this.token && !!this.user;
    },

    getToken() {
      return this.token;
    },

    getUser() {
      return this.user;
    },

    getErrors() {
      return this.errors;
    }
  },

  actions: {
    closeSnackBar() {
        this.snackBar.status = false
    },
    openSnackBar(message) {
        this.snackBar.text = message ? message : this.snackBar.text
        this.snackBar.status = true
    },
    setToken(token) {
      this.token = token;
    },

    setUser(user) {
      this.user = user;
    },

    async attempt(token) {
      if (token) {
        this.setToken(token);
      }

      if (!this.token) {
        return;
      }

      try {
        let response = await axios.get('/user')

        this.setUser(response.data);
        return response;
      } catch (e) {
        this.setToken(null);
        this.setUser(null);
        localStorage.removeItem('token');
        const httpError = e.message
        this.openSnackBar(httpError)
      }
    },

    async login(credentials) {
      try {
        let response = await axios.post('/auth/login', credentials);
        const token = response?.data?.data?.auth?.token
        if(response){
            await this.attempt(token)
        }

        toast.info('You have been logged in successfully!')
      } catch (err) {
          const httpError = err.message
          const responseMessage = err.response.data.status.message

          toast.error(responseMessage ?? httpError)

      }
    },

    async logout() {
      try {
        let response = await axios.post('/auth/logout');
        this.setToken(null);
        this.setUser(null);
        localStorage.removeItem('token');

        toast.info('You have been logged out successfully!')
        return response;
      } catch (e) {
        this.setToken(null);
        this.setUser(null);
        localStorage.removeItem('token');
      }

    },
  },
})

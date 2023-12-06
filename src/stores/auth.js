import { defineStore } from 'pinia'
import axios from "axios";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    errors: null,
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
        let response = await axios.get('/user', {
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
        this.setUser(response.data);

        return response;
      } catch (e) {
        this.setToken(null);
        this.setUser(null);
        localStorage.removeItem('token');
        // this.openSnackBar('Error')
      }
    },

    async login(credentials) {
      try {
        let response = await axios.post('/auth/login', credentials);
        await this.attempt(response.data.access_token)

        // this.openSnackBar('You have been logged in successfully!')
      } catch (err) {
        let e = err.toArray()
        if (e?.response?.status === 422) {
          console.log(422)
          this.errors = e.response.data.errors
        }

        if (e?.response?.status === 401) {
          console.log(401)
          this.errors = {"email": [e.response.data.message]}
        }

        throw e;
      }
    },

    async logout() {
      try {
        let response = await axios.post('/logout');
        this.setToken(null);
        this.setUser(null);
        localStorage.removeItem('token');

        // this.openSnackBar('You have been logged out successfully!')
        return response;
      } catch (e) {
        this.setToken(null);
        this.setUser(null);
        localStorage.removeItem('token');
      }

    },
  },
})

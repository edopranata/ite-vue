import axios from "axios";
import {useAuthStore} from "@/stores/auth";

axios.defaults.baseURL = "http://api.test/api";

axios.interceptors.request.use(function (config) {
  const { getToken:token } = useAuthStore();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers.Accept = 'application/json'
    localStorage.setItem('token', token);
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

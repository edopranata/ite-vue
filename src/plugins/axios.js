import axios from "axios";
import {useAppStore} from "@/stores/app";

axios.defaults.baseURL = "http://api.test/api";

axios.interceptors.request.use(function (config) {
  const { getToken:token } = useAppStore();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers.setAccept('application/json')
    localStorage.setItem('token', token);
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

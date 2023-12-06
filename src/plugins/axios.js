import axios from 'axios'
const useAxios = axios.create({
  baseURL: 'http://api.ite.test',
})

export default useAxios

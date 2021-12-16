import axios from 'axios'
const http = axios.create({
  timeout: 300000
})
export default http

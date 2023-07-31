import Axios from 'axios'
import { ElMessage } from 'element-plus'

const axios = Axios.create({
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 60000,
})


axios.interceptors.request.use(config => {
  return config
}, error => {
  Promise.reject(error)
})


axios.interceptors.response.use(res => {
  if (res.data.code === 0) {
    return res.data
  } else {
    ElMessage({
      message: res.data.msg,
      type: 'warning',
    })
    return Promise.reject()
  }
},
error => {
  return Promise.reject(error)
}
)


export default axios
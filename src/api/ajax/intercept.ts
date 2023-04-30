import cpcc_fetch from '@/api/fetch'


// 添加一个请求拦截器
cpcc_fetch.interceptors.request.use((request) => {
  return request
})

// 添加一个响应拦截器
cpcc_fetch.interceptors.response.use((response) => {
  return response
})

export default cpcc_fetch

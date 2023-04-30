import { CpccFetch, FetchResponse } from './types.d'
import { createInit } from './createInit'
import { interceptors_req, carryInterceptorsReq } from './interceptors_req'
import { timeout } from './timeout'
import { interceptors_res, carryInterceptorsRes } from './interceptors_res'
import { performOfRes } from './performOfRes'

// 定义要获取的资源。这可能是：一个 USVString 字符串，包含要获取资源的 URL。一些浏览器会接受 blob: 和 data: 作为 schemes.一个 Request 对象。
const cpcc_fetch: CpccFetch = async (req) => {
  // 创建fetch入参
  let init = createInit(req)

  // interceptors_req是拦截请求的拦截处理函数集合
  try {
    init = await carryInterceptorsReq(init)
  } catch (error) {
    return Promise.reject(new Error(error as string))
  }

  return new Promise<FetchResponse>((resolve, reject) => {
    // 设置超时
    const fetch = timeout(init, req)
    fetch.then(async response => {
      // 通过预设获取自定义类型的Response
      let res = await performOfRes(response)
      // interceptors_res是拦截响应结果的拦截处理函数集合
      try {
        res = await carryInterceptorsRes(res)
      } catch (error) {
        return Promise.reject(new Error(error as string))
      }
      // 将拦截器处理后的响应结果resolve出去
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

cpcc_fetch.interceptors = {
  request: {
    use: (interceptorsRequestResolve, interceptorsRequestReject?) => {
      interceptors_req.push({ interceptorsRequestResolve, interceptorsRequestReject })
    }
  },
  response: {
    use: function (interceptorsResponseResolve, interceptorsResponseReject) {
      interceptors_res.push({ interceptorsResponseResolve, interceptorsResponseReject })
    }
  }
}

export default cpcc_fetch

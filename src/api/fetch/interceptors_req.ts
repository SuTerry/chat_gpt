import { InterceptorsRequest } from './types.d'

// 定义用来存储拦截请求的处理函数集合
export const interceptors_req: InterceptorsRequest[] = []

type CarryInterceptorsReq = (init: RequestInit) => Promise<RequestInit>

// 执行请求前的拦截器
export const carryInterceptorsReq: CarryInterceptorsReq = async init => {
  // 创建私有的拦截器集合
  const _interceptors_req = [...interceptors_req]
  // 第一个拦截器
  let firstReq: InterceptorsRequest
  // 请求错误信息
  let reqErr: string | undefined

  while (_interceptors_req.length > 0) {
    // 当请求拦截器有值时，获取当前第一个拦截器
    firstReq = _interceptors_req.shift() as InterceptorsRequest
    // 开始尝试调用拦截器
    try {
      if (reqErr) {
        // 当有请求错误信息时，直接调用error的方法
        if (firstReq.interceptorsRequestReject) firstReq.interceptorsRequestReject(reqErr)
      } else {
        // 获取当前拦截器返回的init
        init = await Promise.resolve(firstReq.interceptorsRequestResolve(init))
      }
    } catch (error) {
      // 失败时，有reject函数时调用，并把error传出去
      if (firstReq.interceptorsRequestReject) firstReq.interceptorsRequestReject(error)
      // 请求错误信息没有值的时候为其赋值
      if (!reqErr) reqErr = error as string
    }
  }
  // 当有请求错误信息时，返回reject
  if (reqErr) return Promise.reject(new Error(reqErr))
  // 拦截器成功时，返回更改后的init
  return init
}


import { InterceptorsResponse, FetchResponse } from './types.d'

// 定义用来拦截响应结果的处理函数集合
export const interceptors_res: InterceptorsResponse[] = []

type CarryInterceptorsRes = (init: FetchResponse) => Promise<FetchResponse>

export const carryInterceptorsRes: CarryInterceptorsRes = async res => {
  // 创建私有的拦截器集合
  const _interceptors_res = [...interceptors_res]
  // 第一个拦截器
  let firstRes: InterceptorsResponse
  // 返回结果错误信息
  let resErr: string | undefined

  while (_interceptors_res.length > 0) {
    // 当请求拦截器有值时，获取当前第一个拦截器
    firstRes = _interceptors_res.shift() as InterceptorsResponse
    // 开始尝试调用拦截器
    try {
      if (resErr) {
        // 当有返回结果错误信息时，直接调用error的方法
        if (firstRes.interceptorsResponseReject) firstRes.interceptorsResponseReject(resErr)
      } else {
        // 获取当前拦截器返回的init
        res = await Promise.resolve(firstRes.interceptorsResponseResolve(res))
      }
    } catch (error) {
      // 失败时，有reject函数时调用，并把error传出去
      if (firstRes.interceptorsResponseReject) firstRes.interceptorsResponseReject(error)
      // 返回结果错误信息没有值的时候为其赋值
      if (!resErr) resErr = error as string
    }
  }
  // 当有返回结果错误信息时，返回reject
  if (resErr) return Promise.reject(new Error(resErr))
  // 拦截器成功时，返回更改后的init
  return res
}

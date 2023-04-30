import { FetchRequest, Method } from './types.d'

export const createInit = (req: FetchRequest): RequestInit => {
  const { method, signal } = req
  let headers = req.headers
  let body = req.body

  // 是否FormData
  const isFormData = req.body instanceof FormData
  // 不是FormData时，处理headers、body
  if (!isFormData) {
    headers = {
      'Content-type': 'application/json; charset=UTF-8',
      ...headers,
    }
    if (body) body = JSON.stringify(body)
  }

  // 处理get
  if (method === Method.GET) {
    // get请求时，请求地址添加参数，并清空原body内容
    if (body) req.url += parseParams(JSON.parse(body as string))
    // 清空原body内容(get请求不能有body体)
    body = undefined
  }

  return { method, headers, body, signal }
}

/**
 * 格式化url传参格式
 * @param params 需要传入的参数
 * @returns 返回格式化后的字符串
 */
function parseParams<T>(params: T): string {
  let urlJson = '?'
  if (typeof params === 'object') {
    for (const key in params) {
      if (typeof params[key] === 'object') {
        urlJson += parseParams(params[key])
      } else {
        const symbol = urlJson.length > 1 ? '&' : ''
        // 非空时才添加
        if (params[key]) {
          urlJson += symbol + key + '=' + params[key]
        }
      }
    }
  }
  return urlJson
}

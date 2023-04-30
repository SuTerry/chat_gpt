
import instance from './intercept'
import { ApiFetchRequest, Method } from '@/api/fetch/types.d'


class Abstract {
  protected baseURL = ''

  private apiFetch<T>({
    baseURL,
    url,
    headers,
    method,
    body,
  }: ApiFetchRequest): Promise<T> {
    return new Promise((resolve, reject) => {
      const baseURLVal = baseURL || this.baseURL
      url = baseURLVal + url
      instance({
        url,
        headers,
        method,
        body,
      })
        .then((response) => {
          const contentType = (response.headers['content-type'] as string)
          const res = response.data
          const returnType = res.type
          const returnCode = res.code
          const returnData = res.data
          if (returnCode === 200) {
            // 成功
            return resolve(returnData)
          } else if (returnType === 'application/octet-stream') {
            // 成功
            return resolve(res)
          } else if (contentType === 'text/event-stream') {
            return resolve(res)
          } else {
           
          }
        })
        .catch((err) => {
          const message = err?.data?.message || err?.message || url + '请求失败'
          reject(new Error(message))
        })
    })
  }

  /**
   * GET类型的网络请求
   */
  protected getReq<T>({
    baseURL,
    url,
    headers,
    body,
  }: ApiFetchRequest): Promise<T> {
    return this.apiFetch({ baseURL, url, headers, method: Method.GET, body })
  }

  /**
   * POST类型的网络请求
   */
  protected postReq<T>({
    baseURL,
    url,
    headers,
    body,
  }: ApiFetchRequest): Promise<T> {
    return this.apiFetch({ baseURL, url, headers, method: Method.POST, body })
  }
}

export default Abstract

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
    signal,
  }: ApiFetchRequest): Promise<T> {
    return new Promise((resolve, reject) => {
      const baseURLVal = baseURL || this.baseURL
      url = baseURLVal + url
      instance({
        url,
        headers,
        method,
        body,
        signal,
      })
        .then((response) => {
          const contentType = (response.headers['content-type'] as string)
          const res = response.data
          const returnType = res.type
          const returnCode = res.code

          if (returnCode === 0) {
            // 成功
            return resolve(res)
          } else if (returnType === 'application/octet-stream') {
            // 成功
            return resolve(res)
          // } else if (contentType === 'text/event-stream') {
          } else if (contentType === 'text/event-stream; charset=utf-8') {
            return resolve(res)
          } else {
            return reject(new Error(res.message))
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
    signal,
  }: ApiFetchRequest): Promise<T> {
    return this.apiFetch({ baseURL, url, headers, method: Method.GET, body, signal })
  }

  /**
   * POST类型的网络请求
   */
  protected postReq<T>({
    baseURL,
    url,
    headers,
    body,
    signal
  }: ApiFetchRequest): Promise<T> {
    return this.apiFetch({ baseURL, url, headers, method: Method.POST, body, signal })
  }
}

export default Abstract

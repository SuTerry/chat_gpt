

/***
 * @description 用户API
 */

import Abstract from '@/api/ajax/index'

import { API_HOST } from '@/api/config'

class Common extends Abstract {
  baseURL = API_HOST

  /**
   * gpt
   * @returns
   */
  login(body: unknown) {
    const url = '/login'
    return this.postReq<ReadableStream<Uint8Array>>({ url, body })
  }
}

// 单列模式返回对象
let instance
export default (() => {
  if (instance) return instance
  instance = new Common()
  return instance
})()

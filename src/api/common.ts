

/***
 * @description 公用API
 */

import Abstract from '@/api/ajax/index'

// import { API_HOST } from '@/api/config'

class Common extends Abstract {
  // baseURL = API_HOST

  /**
   * gpt
   * @returns
   */
  chat(body: unknown) {
    const url = 'https://api.openai.com/v1/chat/completions'
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer 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`,
    }
    return this.postReq<ReadableStream<Uint8Array>>({ url, body, headers })
  }
}

// 单列模式返回对象
let instance
export default (() => {
  if (instance) return instance
  instance = new Common()
  return instance
})()

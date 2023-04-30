import { FetchHeaders, FetchResponse } from './types.d'

/**
 * 设置headers
 * @param headers 原生的Headers
 * @returns 自定义Headers对象
 */
const setHeaders = (headers: Headers): FetchHeaders => {
  const fetchHeaders: FetchHeaders = {}
  headers.forEach((value, key) => {
    fetchHeaders[key] = value
  })
  return fetchHeaders
}

/**
 * 预设
 * @param response 原生的Response
 * @returns 自定义Response对象
 *
 */
export const performOfRes = async (
  response: Response
): Promise<FetchResponse> => {
  const contentType = (response.headers.get('Content-Type') as string).split(
    ';'
  )[0]

  const res: FetchResponse = {
    url: response.url,
    headers: setHeaders(response.headers),
    status: response.status,
    data: null,
  }

  switch (contentType) {
    // json类型
    case 'application/json':
      res.data = await response.json()
      break
    // 下载
    case 'application/octet-stream':
      res.data = await response.blob()
      break
    // 流
    case 'text/event-stream':
      // res.data = response.body?.getReader()
      if (!response.ok) {
        const { error } = await response.json()
        throw new Error(error.message || error.code)
      }
      const reader = response.body?.getReader()

      const decoder = new TextDecoder("utf-8")
      const stream = new ReadableStream({
        start(controller) {
          return pump()
          function pump(): Promise<ReadableStream<Uint8Array> | undefined> | undefined {
            return reader?.read().then(({ done, value }) => {

              if (done) {
                controller.close()
                return
              }

              let text = ""
              const str = decoder.decode(value)
              const strs = str.split("data: ").filter((v) => v)
              for (let i = 0; i < strs.length; i++) {
                const val = strs[i]
                if (val.includes("[DONE]")) {
                  controller.close()
                  return
                }
                const data = JSON.parse(val)
                data.choices[0].delta.content &&
                  (text += data.choices[0].delta.content)
              }
              controller.enqueue(text)
              return pump()
            })
          }
        },
      })
      res.data = stream
      break
    default:
      break
  }

  return res
}

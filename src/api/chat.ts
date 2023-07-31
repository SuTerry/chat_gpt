
/**
  * chat接口
  * @param data 
  * @returns 
  */
export const chatStream = async (body: any): Promise<any> => {
  const response = await fetch('/api/chat_stream', { 
    body: JSON.stringify(body),
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
   })
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
          
          const strs = str.split("data:").filter((v) => v)
          for (let i = 0; i < strs.length; i++) {
            const val = strs[i]
            if (val.includes("[DONE]")) {
              controller.close()
              return
            }
            
            
            const data = JSON.parse(val)
            // data.choices[0].delta.content &&
            //   (text += data.choices[0].delta.content)
            data.content && (text += data.content)
            
            // text += val.trim()
          }
          controller.enqueue(text)
          return pump()
        })
      }
    },
  })
  return stream
  // return response.blob()
}
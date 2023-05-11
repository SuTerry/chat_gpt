
import { Timeout, TimeoutInit, Overtime } from './types.d'

/**
 * 超时需要用到的数据
 * @param init fetch的选项
 * @param req 私有fetch入参
 * @returns url：接口地址；timeout：超时时间；controller：接口控制器
 */
const timeoutInit: TimeoutInit = (init, req) => {
  const { url, signal, timeout = 16000 } = req
  let controller: AbortController | undefined

  if (!signal) {
    controller = new AbortController()
    init.signal = controller.signal
  }

  return { url, timeout, controller }
}

/**
 * 超时方法
 * @param timeout 超时时间
 * @param controller 接口控制器
 * @returns
 */
const overtime: Overtime = (timeout, controller) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (controller) {
        controller.abort()
        reject(new Error(`timeout of${timeout}ms exceeded`))
      }
    }, timeout)
  })
}

export const timeout: Timeout = (init, req) => {
  // 获取url和接口控制器
  const { url, timeout, controller } = timeoutInit(init, req)
  // 超时方法
  const _timeout = overtime(timeout, controller)

  const promises = [fetch(url, init), _timeout]

  return Promise.race(promises)
}

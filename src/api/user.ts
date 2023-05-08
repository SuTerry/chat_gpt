/***
 * @description 用户API
 */

import { Md5 } from 'ts-md5'

import Abstract from '@/api/ajax/index'

import { API_HOST } from '@/api/config'

interface LoginParams {
  email: string
  password: string
}

interface LoginRes {
  code: number
  message: string
  data: {
    userid: string
    username: string
    level: number
  }
}

interface VerifyemailParams {
  email: string
}

interface GeneralRes {
  code: number
  message: string
}

interface RegisterParams {
  email: string
  username: string
  password: string
  verifycode: string
}

class Common extends Abstract {
  baseURL = API_HOST

  /**
   * 登录
   * @returns
   */
  login(body: LoginParams) {
    const url = '/login'
    body.password = Md5.hashStr(body.password)
    return this.postReq<LoginRes>({ url, body })
  }
  /**
   * 发送邮箱验证码
   * @returns
   */
  verifyemail(body: VerifyemailParams) {
    const url = '/verifyemail'
    return this.postReq<GeneralRes>({ url, body })
  }
  /**
   * 注册
   * @returns
   */
  register(body: RegisterParams) {
    const url = '/register'
    body.password = Md5.hashStr(body.password)
    return this.postReq<GeneralRes>({ url, body })
  }
}

// 单列模式返回对象
let instance
export default (() => {
  if (instance) return instance
  instance = new Common()
  return instance
})()

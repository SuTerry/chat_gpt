import { Md5 } from 'ts-md5'
import request from '@/utils/request'

/**
  * 登录接口
  * @param data 
  * @returns 
  */
export const login = (data: any): Promise<any> => {
  data = { ...data }
  // data.password = Md5.hashStr(data.password)
  return request('/api/login', { data, method: 'post' })
}

/**
  * 发送邮箱验证码接口
  * @param data 
  * @returns 
  */
export const verifyemail = (data: any): Promise<any> => {
  return request('/api/verifyemail', { data, method: 'post' })
}

/**
  * 注册接口
  * @param data 
  * @returns 
  */
export const register = (data: any): Promise<any> => {
  data = { ...data }
  // data.password = Md5.hashStr(data.password)
  return request('/api/register', { data, method: 'post' })
}

/**
  * 忘记密码接口
  * @param data 
  * @returns 
  */
export const resetPassword = (data: any): Promise<any> => {
  data = { ...data }
  // data.password = Md5.hashStr(data.password)
  return request('/api/reset-password', { data, method: 'post' })
}
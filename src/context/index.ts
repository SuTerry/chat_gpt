import { createContext } from 'react'

export interface User {
  username: string,
  login: boolean,
  dialog: boolean,
  userid: string
}

export interface HistoryMessage {
  role: 'user' | 'assistant'
  content: string
  time: number
}

export type HistoryMessages = HistoryMessage[]


export interface GptParams {
  chatid: string
  model: string
  topicid: string
}

export const initUser: User = {
  username: '',
  login: false,
  dialog: false,
  userid: '',
}

export const initGptParams: GptParams = {
  chatid: '123',
  model: 'gpt-3.5-turbo',
  topicid: '1-01-01',
}



interface Context {
  openSideNav: boolean
  setOpenSideNav: (openSideNav: boolean) => void
  user: User
  setUser: (user: User) => void
  setLoginOpen: (open: boolean) => void
  signOut: () => void
  historyMessages: HistoryMessages
  setHistoryMessages: (historyMessage: HistoryMessages) => void
  gptParams: GptParams
  setGptParams: (gptParams: GptParams) => void
  select: number[]
  setSelect: (select: number[]) => void
  registerOpen: boolean
  setRegisterOpen: (open: boolean) => void
}

// 初始值
const init: Context = {
  openSideNav: true,
  setOpenSideNav: () => null,
  user: initUser,
  setUser: () => null,
  setLoginOpen: () => null,
  signOut: () => null,
  historyMessages: [],
  setHistoryMessages: () => null,
  gptParams: initGptParams,
  setGptParams: () => null,
  select: [],
  setSelect: () => null,
  registerOpen: false,
  setRegisterOpen: () => null,
}

export default createContext<Context>(init)
import { createContext } from 'react'

export interface User {
  username: string,
  login: boolean,
  dialog: boolean,
}

export const initUser: User = {
  username: '',
  login: false,
  dialog: false,
}

interface Context {
  openSideNav: boolean
  setOpenSideNav: (openSideNav: boolean) => void
  user: User
  setUser: (user: User) => void
  setLoginOpen: (open: boolean) => void
  signOut: () => void
}

// 初始值
const init: Context = {
  openSideNav: true,
  setOpenSideNav: () => null,
  user: initUser,
  setUser: () => null,
  setLoginOpen: () => null,
  signOut: () => null,
}

export default createContext<Context>(init)
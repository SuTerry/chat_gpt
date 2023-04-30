import { useState } from "react"

import { User, initUser } from '@/context'

type userUser = [User, (user: User) => void, (open: boolean) => void, () => void]

const LOCALUSER = 'user'

export default (): userUser => {
  const localUser = localStorage.getItem(LOCALUSER)
  const [user, _setUser] = useState<User>(localUser ? { ...JSON.parse(localUser), dialog: false } : initUser)

  const setUser = (user: User) => {
    localStorage.setItem(LOCALUSER, JSON.stringify(user))
    _setUser(user)
  }

  const setLoginOpen = (open: boolean) => {
    setUser({ ...user, dialog: open })
  }

  const signOut = () => {
    setUser({
      username: '',
      login: false,
      dialog: false,
      id: '',
    })
  }

  return [user, setUser, setLoginOpen, signOut]
}
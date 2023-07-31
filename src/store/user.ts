import { defineStore } from 'pinia'

const userInit = {
  username: '',
  login: false,
  email: '',
  energy: 0,
  level: 0,
}

const initState = localStorage.getItem('chat_gpt_user') || JSON.stringify(userInit)

export default defineStore('userStore', {
  state: () => {
    return JSON.parse(initState)
  },
  getters: {},
  actions: {
    userLogin({ username, email, energy, level }: any) {
      const login = true
      this.username = username
      this.login = login
      this.email = email
      this.energy = energy
      this.level = level
      localStorage.setItem('chat_gpt_user', JSON.stringify({ username, email, energy, level, login }))
    },
    userOut() {
      this.username = userInit.username
      this.login = userInit.login
      this.email = userInit.email
      this.energy = userInit.energy
      this.level = userInit.level
      localStorage.setItem('chat_gpt_user', JSON.stringify({ ...userInit }))
    },
  },
})
import { defineStore } from 'pinia'

const userInit = {
  username: '',
  login: false,
}

const initState = localStorage.getItem('chat_gpt_user') || JSON.stringify(userInit)

export default defineStore('userStore', {
  state: () => {
    return JSON.parse(initState)
  },
  getters: {},
  actions: {},
})
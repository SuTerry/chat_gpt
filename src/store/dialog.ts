import { defineStore } from 'pinia'

export default defineStore('dialogStore', {
  state: () => {
    return {
      loginDialog: false,
      registerDialog: false,
      forgetPWDialog: false,
    }
  },
  getters: {},
  actions: {},
})
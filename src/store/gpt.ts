import { defineStore } from 'pinia'

type Contents = any[]

export default defineStore('gptStore', {
  state: () => {
    return {
      contents: [] as Contents
    }
  },
  getters: {},
  actions: {},
})
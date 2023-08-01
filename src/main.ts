import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import store from '@/store'
import router from './router'
import App from '@/App.vue'

import 'highlight.js/styles/dark.css'

import 'element-plus/theme-chalk/el-message.css'

createApp(App).use(ElementPlus, {locale: zhCn}).use(store).use(router).mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index'
import { i18n } from '@/locales/index'
import pinia from './store/index'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import '@/style/reset.less'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router)
app.use(i18n)
app.use(pinia)
app.use(ElementPlus)
app.mount('#app')

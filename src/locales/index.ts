import { createI18n } from 'vue-i18n'
import { themeConfig } from '@/config'
// element-plus 的ui框架国际化语言配置
import zhCnLocale from 'element-plus/lib/locale/lang/zh-cn'
import enLocale from 'element-plus/lib/locale/lang/en'
// 自定义的语言配置
import ZhCn from './lang/zh-cn'
import En from './lang/en'
// 按照每个页面的语言配置
// import loginZhcn from './pages/login/zh-cn'
// import loginEn from './pages/login/en'

// 定义语言国际化内容 zh-cn en
const messages = {
	[zhCnLocale.name]: {
		...zhCnLocale,
		msg: { ...ZhCn },
	},
	[enLocale.name]: {
		...enLocale,
		msg: { ...En },
	},
}

if(!localStorage.getItem('lang')){
	localStorage.setItem('lang','zh-cn')
}

export const i18n = createI18n({
	legacy: false,
	silentTranslationWarn: true,
	missingWarn: false,
	silentFallbackWarn: true,
	fallbackWarn: false,
	locale: themeConfig.value.globalI18n, // 采用全局参数配置初始化语言 项目中有`zh-cn`、`en`两种
	fallbackLocale: zhCnLocale.name,
	messages,
})

export function t(args:string|number) {
	return i18n.global.t(args)
}
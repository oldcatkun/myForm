<template>
  <el-config-provider :locale="locale">
		<router-view />
	</el-config-provider>
</template>

<script setup lang="ts">
import { themeConfig } from './config';
import { useI18n } from 'vue-i18n';
// 获取实例
const { messages, locale }: any = useI18n();
const localeLang = ref(messages[themeConfig.value.globalI18n]); // 默认语言

// 修改element 和 i18n 默认语言
const changeLanguage = () => {
	locale.value = themeConfig.value.globalI18n;
	localeLang.value = messages.value[locale.value];
};
// 监听修改语言
watchEffect(changeLanguage);
</script>

<style lang="less" scoped>
</style>
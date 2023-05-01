<template>
    <el-dropdown @command="handleCommand">
        <span class="title svgsub">
          {{ lang=="zh-cn"?'简体中文':'English' }}
          <el-icon>
            <ArrowDown/>
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="zh-cn">简体中文</el-dropdown-item>
            <el-dropdown-item command="en">English</el-dropdown-item>
          </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts">
import { themeConfig } from '@/config';
const lang = ref<String>(localStorage.getItem('lang')||'zh-cn')
const handleCommand = (command:string) => {
  lang.value = command
  themeConfig.value.globalI18n=command
  localStorage.setItem('lang',command)
}
</script>

<style lang="less" scoped>
.title{
  line-height: 48px;
  svg{
    vertical-align: sub;
  }
}
</style>

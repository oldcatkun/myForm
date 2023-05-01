<template>
    <div class="container">
        <div class="title">
            <el-icon>
                <SetUp/>
            </el-icon>
            组件库
        </div>
        <div class="content">
            <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item v-for="item in collapses" :key="item.name" :title="item.title" :name="item.name">
                  <widget :widgetData="widgetJson[item.name]"></widget>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script setup lang="ts">
import widget from './widget.vue';
import { widgetJson } from '../../../Json/widgetJson'
const collapses = ref<{title:string,name:string}[]>([
    {title:'容器',name:'container'},
    {title:'基础字段',name:'baseField'},
    {title:'高级字段',name:'seniorField'},
    {title:'自定义扩展字段',name:'customization'}
])
const activeNames = ref<string[]>(collapses.value.map(item=>item.name))
const handleChange = (val:string[])=>{

}
</script>

<style lang="less" scoped>
.container{
    width: 260px;
    height: 100%;
    .title{
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        .el-icon{
            transform: translateY(2px);
        }
    }
    .content{
        height: calc(100% - 40px);
        overflow: auto;
        :deep(.el-collapse-item__header){
            margin-left: 8px;
            font-style: italic;
            font-weight: 700;
        }
        :deep(.el-collapse-item__content){
            padding-bottom: 10px;
        }
        
    }
}
</style>
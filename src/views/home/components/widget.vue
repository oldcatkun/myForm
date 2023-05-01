<template>
    <ul class="widgetList">
        <WidgetItem 
            v-for="(item, index) in widgetData" 
            :key="index"
            :data="item"
        ></WidgetItem>
    </ul>
</template>

<script setup lang="ts">
import WidgetItem from './widgetitem.vue';
import { widgetItem } from '../../../Json/widgetJson'
const props = withDefaults(defineProps<{
    widgetData:widgetItem[]
}>(), {
    widgetData:()=>[]
});
</script>

<style lang="less" scoped>
.widgetList{
    padding-left: 10px;
    display: flex;
    flex-wrap: wrap;
}
</style>
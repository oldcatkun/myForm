<template>
    <li @click="handlerClick" class="container svgsub" :class="data.isProducting?'isProducting':''">
        <el-icon :size="20">
            <component :is="data.icon"></component>
        </el-icon>
        {{ data.title }}
    </li>
</template>

<script setup lang="ts">
import { columnType } from '@/Json/proForm.d';
import useFormDataStore from '@/store/modules/formData' 
const { addItem } = useFormDataStore()
const props = withDefaults(defineProps<{
    data:{
        title?:string,
        icon?:string,
        isProducting?:boolean,
        defaultData?:columnType | any
    }
}>(), {
  data:()=>({})
});
const handlerClick = () => {
    const str = (Date.now()+'').slice(8)
    addItem({...props.data.defaultData,
        prop:props.data.defaultData?.prop + str
    })
}
</script>

<style lang="less" scoped>
.container{
    height: 28px;
    line-height: 28px;
    width: 115px;
    margin: 2px 6px 6px 0;
    cursor: move;
    background: #f1f2f3;
    svg{
        margin-left: 5px;
        color: #409eff;
    }
    .isProducting{
        opacity: 0.5;
        cursor:auto;
    }
}
</style>
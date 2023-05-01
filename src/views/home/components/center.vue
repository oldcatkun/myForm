<template>
    <div class="container">
        <div class="header">
            <div class="btnbox">
                <el-button type="primary" text @click="getJson">导出json</el-button>
            </div>
        </div>
        <div class="content">
            <ProForm 
                :columns="columns"
                :formOptions="formOptions"
                :activeItem="activeItem"
                @moveItem="moveItem"
                @deleteItem="deleteItem"
                @changeActiveItem="changeActiveItem"
            ></ProForm>
        </div>
        <el-dialog
          v-model="dialogVisible"
          title="导出json"
          width="30%"
        >
            <div style="width: 100%;height: 400px;">
                <Ace :Json="Json"></Ace>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="copy(Json)">
                        复制
                    </el-button>
                    <el-button @click="dialogVisible = false">取消</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import ProForm from '@/components/proForm.vue'
import Ace from './ace.vue' 
import { copy } from '@/utils/fun';
import useFormDataStore from '@/store/modules/formData' 
const {
    columns,
    formOptions,
    activeItem,
    moveItem,
    deleteItem,
    changeActiveItem,
} = useFormDataStore()

const dialogVisible = ref<boolean>(false)
const Json = ref<string>('')
const getJson = () => {
    dialogVisible.value = true
    Json.value = JSON.stringify({columns,formOptions},null,2)
}
</script>

<style lang="less" scoped>
.container{
    // background-color: #eeeeee;
    .header{
        height: 40px;
        background-color: #fff;
        border-bottom: 1px dotted #CCCCCC;
        box-sizing: border-box;
        display: flex;
        justify-content: right;
    }
   .content{
        padding: 10px;
        height: calc(100% - 40px);
        box-sizing: border-box;
        padding: 10px;
        ::v-deep(.container){
            background: #fff;
        }
   }
}
</style>
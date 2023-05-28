<template>
    <div class="container">
        <el-row>
            <el-col :span="7">
                <div class="jsonData">
                    <Ace ref="aceRef" />
                    <div class="btnbox">
                        <el-button type="primary" @click="createForm">生成</el-button>
                    </div>
                </div>
            </el-col>
            <el-col :span="17">
                <div class="content">
                    <userForm :options="options"></userForm>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import Ace from '@/components/ace.vue'
import userForm from '@/components/userForm.vue';
import { columnsType } from "@/Json/proForm.d";
import { elFormProps } from "@/Json/elFormJson";
const aceRef = ref()
const options = ref<{
    columns: columnsType;
    formOptions: elFormProps;
}>({
    columns: [],
    formOptions: {}
})
const createForm = () => {
    options.value = JSON.parse(aceRef.value.getValue())
}

</script>

<style lang="less" scoped>
.container {
    height: 100%;

    .el-row {
        height: 100%;
    }

    .jsonData {
        height: 100%;
        position: relative;

        .btnbox {
            position: absolute;
            bottom: 10px;
            right: 20px;
        }
    }

    .content {
        height: 100%;
        box-sizing: border-box;
        border-left: 2px dotted #EBEEF5;
        padding: 10px;
    }
}
</style>
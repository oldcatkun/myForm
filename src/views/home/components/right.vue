<template>
    <div class="container">
        <el-tabs v-model="activeName" class="demo-tabs">
            <el-tab-pane label="组件设置" name="component">
                <el-collapse v-if="componentOptions.prop" v-model="activeNames">
                    <el-collapse-item title="常见" name="1">
                        <el-form  labelPosition="left" labelWidth="100px" size="small">
                            <el-form-item label="字段名">
                                <el-input v-model="componentOptions.prop" />
                            </el-form-item>
                            <el-form-item label="默认值">
                                <el-input v-model="componentOptions.default" />
                            </el-form-item>
                            <el-form-item label="标题">
                                <el-input v-model="componentOptions.labelProps.label" />
                            </el-form-item>
                            <el-form-item label="显示类型">
                                <el-select v-model="componentOptions.itemProps.type">
                                    <el-option
                                        v-for="item in [{label:'text',value:'text'},{label:'password',value:'password'}]"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    />
                                </el-select>
                            </el-form-item>
                            <el-form-item label="占位内容">
                                <el-input v-model="componentOptions.itemProps.placeholder" />
                            </el-form-item>
                            <el-form-item label="是否可清除">
                                <el-switch v-model="componentOptions.itemProps.clearable" />
                            </el-form-item>
                            <el-form-item label="是否禁用">
                                <el-switch
                                    v-model="componentOptions.itemProps.disabled" 
                                />
                            </el-form-item>
                        </el-form>
                        <div class="btnbox">
                            <el-button @click="componentChange" size="small" type="primary">确定</el-button>
                        </div>
                    </el-collapse-item>
                </el-collapse>
                <div v-else>未选择组件</div>
            </el-tab-pane>
            <el-tab-pane label="表单设置" name="form">
                <div class="content">
                    <el-collapse v-model="activeNames">
                        <el-collapse-item title="基础属性" name="1">
                            <el-form labelPosition="left" labelWidth="100px" size="small">
                                <el-form-item label="全局组件大小">
                                    <el-select v-model="options.size">
                                        <el-option label="default" value="default" />
                                        <el-option label="large" value="large" />
                                        <el-option label="small" value="small" />
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="是否行内模式">
                                    <el-switch v-model="options.inline" />
                                </el-form-item>
                                <el-form-item label="标签宽度">
                                    <el-input-number v-model="options.labelWidth" :min="0" />
                                </el-form-item>
                                <el-form-item label="对齐方式">
                                    <el-radio-group v-model="options.labelPosition">
                                        <el-radio-button label="left">居左</el-radio-button>
                                        <el-radio-button label="right">居右</el-radio-button>
                                        <el-radio-button label="top">居上</el-radio-button>
                                    </el-radio-group>
                                </el-form-item>
                            </el-form>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup lang="ts">
import { deepClone } from '@/utils/fun'
import { elFormProps } from '@/Json/elFormJson'
import { columnType, componentProps } from '@/Json/proForm.d';
import useFormDataStore from '@/store/modules/formData' 
const {
    activeItem,
    formOptions,
    changeFormOptions,
    changeItemOptions
} = useFormDataStore()
watch(()=> activeItem,(newval)=>{
    getComponentInfo(newval)
},{deep:true})

const activeName = ref<string>('form')
const changeActiveName = (value:string) => {
    activeName.value = value
}

const activeNames = ref<string[]>(['1'])

const options = reactive<elFormProps>(formOptions)
watch(()=>options,(newval:elFormProps)=>{
    changeFormOptions(newval)
},{deep:true})

const componentOptions = ref<columnType>({prop:'',component:''})
const componentChange = () => {
    changeItemOptions(componentOptions.value)
}
const getComponentInfo = (data:columnType) => {
    componentOptions.value = deepClone(data)
    changeActiveName('component')
}
</script>

<style lang="less" scoped>
.container {
    background: #fff;

    .demo-tabs {
        padding-left: 10px;
        :deep(.el-collapse-item__header){
            font-style: italic;
            font-weight: 700;
        }
        :deep(.el-collapse-item__content){
            padding-right: 10px;
            padding-bottom: 10px;
        }
        .btnbox{
            display: flex;
            justify-content: right;
        }
    }
}
</style>
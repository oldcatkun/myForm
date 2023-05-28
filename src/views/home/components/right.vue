<template>
    <div class="container">
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="组件设置" name="component">
          <el-collapse v-if="componentOptions.prop" v-model="activeNames">
            <el-collapse-item title="常见" name="1">
              <el-form labelPosition="left" labelWidth="100px" size="small">
                <el-form-item label="字段名">
                  <el-input v-model="componentOptions.prop" />
                </el-form-item>
                <el-form-item v-if="componentOptions.component!='el-select'" label="默认值">
                  <el-input v-model="componentOptions.default" />
                </el-form-item>
                <el-form-item label="标题">
                  <el-input v-model="componentOptions.label" />
                </el-form-item>
                <el-form-item
                  v-if="activeItem.type != 'textarea' && componentOptions.hasOwnProperty('type')"
                  label="显示类型"
                >
                  <el-select v-model="componentOptions.type">
                    <el-option
                      v-for="item in [
                        { label: 'text', value: 'text' },
                        { label: 'password', value: 'password' },
                      ]"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="占位内容">
                  <el-input v-model="componentOptions.placeholder" />
                </el-form-item>
                <el-form-item label="是否可清除">
                  <el-switch v-model="componentOptions.clearable" />
                </el-form-item>
                <el-form-item label="是否禁用">
                  <el-switch v-model="componentOptions.disabled" />
                </el-form-item>
                <el-form-item 
                  v-if="componentOptions.hasOwnProperty('rows')" 
                  label="行数"
                >
                  <el-input-number v-model="componentOptions.rows" :min="1" />
                </el-form-item>
                <el-form-item label="是否必填">
                  <el-switch v-model="componentOptions.required" />
                </el-form-item>
                <el-form-item label="必填校验提示">
                  <el-input v-model="componentOptions.requiredStr" />
                </el-form-item>
                <el-form-item
                  v-if="componentOptions.hasOwnProperty('regex')"
                  label="正则表达式"
                >
                  <el-input v-model="componentOptions.regex" />
                </el-form-item>
                <el-form-item
                  v-if="componentOptions.hasOwnProperty('regexStr')"
                  label="校验失败提示"
                >
                  <el-input v-model="componentOptions.regexStr" />
                </el-form-item>
                <el-form-item 
                  v-if="componentOptions.hasOwnProperty('multiple')"
                  label="是否多选"
                >
                  <el-switch v-model="componentOptions.multiple" @change="multipleChange" />
                </el-form-item>
                <el-form-item 
                  v-if="componentOptions.hasOwnProperty('multipleLimit')" 
                  label="多选数量限制"
                >
                  <el-input-number v-model="componentOptions.multipleLimit" :min="1" />
                </el-form-item>
                <div v-if="componentOptions.hasOwnProperty('options')">
                  <el-divider>选项设置</el-divider>
                  <el-checkbox-group v-if="componentOptions.multiple" v-model="componentOptions.default">
                    <el-checkbox
                      v-for="(item, index) in componentOptions.options"
                      :key="item.value"
                      :label="item.value" 
                    >
                      <div class="radioItem">
                        <el-input v-model="item.value"></el-input>
                        <el-input v-model="item.label"></el-input>
                        <el-button @click="delOptionsItem(index)" type="danger" circle><el-icon><Minus /></el-icon></el-button>
                      </div>
                    </el-checkbox>
                  </el-checkbox-group>
                  <el-radio-group v-else v-model="componentOptions.default">
                    <el-radio
                      v-for="(item, index) in componentOptions.options"
                      :key="item.value"
                      :label="item.value" 
                      size="large"
                    >
                      <div class="radioItem">
                        <el-input v-model="item.value"></el-input>
                        <el-input v-model="item.label"></el-input>
                        <el-button @click="delOptionsItem(index)" type="danger" circle><el-icon><Minus /></el-icon></el-button>
                      </div>
                    </el-radio>
                  </el-radio-group>
                  <div>
                    <el-button @click="addOptionsItem" link type="primary">增加选项</el-button>
                    <el-button @click="componentOptions.default=''" link type="primary">重置选中项</el-button>
                  </div>
                </div>
              </el-form>
              <div class="btnbox">
                <el-button @click="componentChange" size="small" type="primary"
                  >确定</el-button
                >
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
  import { deepClone } from "@/utils/fun";
  import { elFormProps } from "@/Json/elFormJson";
  import { columnType } from "@/Json/proForm.d";
  import useFormDataStore from "@/store/modules/formData";
  const store = useFormDataStore()
  const { formOptions, changeFormOptions, changeItemOptions } = store
  const { activeItem } = toRefs(store)
  watch(
    () => activeItem,
    (newval) => {
      getComponentInfo(newval.value);
    },
    { deep: true }
  );
  
  const activeName = ref<string>("form");
  const changeActiveName = (value: string) => {
    activeName.value = value;
  };
  
  const activeNames = ref<string[]>(["1"]);
  
  const options = reactive<elFormProps>(formOptions);
  watch(
    () => options,
    (newval: elFormProps) => {
      changeFormOptions(newval);
    },
    { deep: true }
  );
  
  const componentOptions = ref<columnType>({ prop: "", component: "" });
  const componentChange = () => {
    changeItemOptions(componentOptions.value);
  };
  const getComponentInfo = (data: columnType) => {
    componentOptions.value = deepClone(data);
    console.log({ data });
  
    changeActiveName("component");
  };
  
  const multipleChange = (val:boolean) => {
    componentOptions.value.default = val?[]:''
  }
  //删除options选项
  const delOptionsItem = (index:number) => {
    componentOptions.value.options?.splice(index,1)
    componentOptions.value.default = ''
  }
  //添加options选项
  const addOptionsItem = () => {
    componentOptions.value.options?.push({label:'selectItem',value:componentOptions.value.options.length+1})
  }
  </script>
  
  <style lang="less" scoped>
  .container {
    background: #fff;
  
    .demo-tabs {
      padding-left: 10px;
      :deep(.el-collapse-item__header) {
        font-style: italic;
        font-weight: 700;
      }
      :deep(.el-collapse-item__content) {
        padding-right: 10px;
        padding-bottom: 10px;
      }
      .btnbox {
        display: flex;
        justify-content: right;
      }
    }
    .el-radio{
      margin-right: 32px;
    }
    .el-checkbox{
      margin-right: 30px;
      margin-bottom: 10px;
    }
    .radioItem{
      display: flex;
    }
  }
  </style>
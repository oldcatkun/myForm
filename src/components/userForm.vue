<template>
    <div class="container">
        <el-form v-bind="options.formOptions" ref="form" class="form" :class="options.formOptions.inline ? 'inline' : ''">
            <el-form-item v-for="(item, index) in options.columns" :key="item.prop" :prop="item.prop"
                v-bind="item.labelProps">
                <component :is="item.component" v-bind="item.itemProps" v-model="data[item.prop]"></component>
            </el-form-item>
        </el-form>
    </div>
</template>
  
<script setup lang="ts">
import { columnType, columnsType, componentName } from "@/Json/proForm.d";
import { elFormProps } from "@/Json/elFormJson";
const props = withDefaults(
    defineProps<{
        options: {
            columns: columnsType;
            formOptions: elFormProps;
        }
    }>(),
    {
        options: () => ({
            columns: [],
            formOptions: {}
        })
    }
);
const emit = defineEmits(["moveItem", "deleteItem", "changeActiveItem"]);

// 以json创建表单数据对象
const createData = (columns: columnsType) => {
    const obj: { [key: string]: any } = {};
    columns.forEach((item: columnType) => {
        obj[item.prop] = item.default || "";
    });
    return obj;
};
const data = reactive(createData(props.options.columns));

</script>
  
<style lang="less" scoped>
.container {
    padding: 10px;
    height: calc(100% - 20px);

    .inline {
        display: flex;
        flex-wrap: wrap;
    }

    .itemContainer {
        position: relative;
        border: 2px solid transparent;
        margin-bottom: 18px;

        &.active {
            border: 2px solid #409eff;

            .itemTitle {
                display: block;
            }

            .operate {
                display: block;
            }
        }

        .operate {
            display: none;
            height: 19px;
            line-height: 19px;
            background: #409eff;
            position: absolute;
            right: 0;
            bottom: 0;
            padding-top: 3px;

            .el-icon {
                margin: 0 3px;
                cursor: pointer;
            }
        }

        .itemTitle {
            display: none;
            color: #fff;
            font-size: 12px;
            height: 20px;
            line-height: 20px;
            background: rgba(64, 158, 255, 0.6);
            position: absolute;
            top: 0;
            padding: 0 5px;
            cursor: crosshair;

            .el-icon {
                transform: translateY(1px);
            }

            &:hover {
                background: #409eff;
            }
        }

        .el-form-item {
            margin: 0;
        }
    }
}
</style>
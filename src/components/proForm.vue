<template>
  <div class="container">
    <el-form
      :model="data"
      v-bind="formOptions"
      ref="form"
      class="form"
      :class="formOptions.inline ? 'inline' : ''"
    >
      <div
        v-for="(item, index) in processedColumns"
        :key="item.prop"
        class="itemContainer"
        :class="activeItem.prop == item.prop ? 'active' : ''"
        @click="handlerClick(item, index)"
      >
        <el-form-item v-bind="item">
          <component
            :is="item.component"
            v-bind="item"
            v-model="data[item.prop]"
          >
            <template v-if="item.component=='el-select'">
              <el-option
                v-for="option in item.options"
                :key="option.value"
                v-bind="option"
              />
            </template>
          </component>
        </el-form-item>
        <div class="itemTitle">
          <el-icon size="small" color="#fff">
            <Plus />
          </el-icon>
          {{ item.componentName }}
        </div>
        <div class="operate">
          <el-icon color="#fff" @click.stop="moveItem('up', index)">
            <Top />
          </el-icon>
          <el-icon color="#fff" @click.stop="moveItem('down', index)">
            <Bottom />
          </el-icon>
          <el-icon color="#fff" @click.stop="deleteItem(index)">
            <Delete />
          </el-icon>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { columnType, columnsType } from "@/Json/proForm.d";
import { elFormProps } from "@/Json/elFormJson";
import { debounce } from "@/utils/fun";
const props = withDefaults(
  defineProps<{
    columns: columnsType;
    formOptions: elFormProps;
    activeItem: columnType;
  }>(),
  {
    columns: () => [],
    formOptions: () => ({}),
    activeItem: () => ({ prop: "", component: "" }),
  }
);
const emit = defineEmits(["moveItem", "deleteItem", "changeActiveItem"]);
//处理props传来的数据
const processedColumns = computed(() => {
  return props.columns.map((item) => {
    const { required, requiredStr, regex, regexStr } = item;
    if (required || regex) {
      const obj = { ...item };
      obj.rules = {
        required,
        validator: (rule: any, value: any, callback: any) => {
          if (!value.trim() && required) {
            callback(new Error(requiredStr));
          } else if (!new RegExp(regex ? regex : "").test(value)) {
            callback(new Error(regexStr));
          } else {
            callback();
          }
        },
        trigger: ["blur", "change"],
      };
      return obj;
    } else {
      return item;
    }
  });
});
//选中组件(防抖解决点击label触发两次函数的问题)
const handlerClick = debounce((item: columnType, index: number) => {
  if (index == props.activeItem.index) return;
  item.index = index;
  emit("changeActiveItem", item);
}, 0);

// 以json创建表单数据对象
const createData = (columns: columnsType) => {
  const obj: { [key: string]: any } = {};
  columns.forEach((item: columnType) => {
    obj[item.prop] = item.default || "";
  });
  return obj;
};

const data = reactive(createData(props.columns));
//监视activeItem数据改变重新生成data对象
watch(
  () => props.activeItem,
  () => {
    Object.assign(data, createData(props.columns));
  },
  { deep: true }
);
//上下移动
const moveItem = (direction: string, index: number) => {
  emit("moveItem", direction, index);
};
//删除
const deleteItem = (index: number) => {
  emit("deleteItem", index);
};
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
import { defineStore } from 'pinia';
import { computed, ref, reactive } from "vue";
import { deepClone } from '@/utils/fun';
import { elFormProps } from '@/Json/elFormJson'
import { columnType, columnsType, componentProps } from '@/Json/proForm.d'
import { ElMessage } from 'element-plus'
//以json创建表单数据对象
const createData = (columns:columnsType) => {
  const obj:{[key:string]:any} = {}
  columns.forEach((item:columnType)=>{
    obj[item.prop]= item.default || ''
  })
  return obj
}
const useFormDataStore = defineStore('formData',() => {
    //item列表
    const columns = reactive<columnsType>([
        {
          prop:'name',
          component:'el-input',
          default:'',
          itemProps:{
            type:'test',
            placeholder:'',
            clearable:false,
            disabled:false
          },
          labelProps:{
            label:'姓名'
          }
        },
        {
          prop:'age',
          component:'el-input',
          default:'',
          itemProps:{
            type:'test',
            placeholder:'',
            clearable:false,
            disabled:false
          },
          labelProps:{
            label:'年龄'
          }
        }
    ])
    //表单配置
    const formOptions = reactive<elFormProps>({
        inline: false,
        size: 'default',
        labelPosition: 'right',
        labelWidth: 120
    })
    //选中状态的item
    const activeItem = reactive<columnType>({prop:'',component:''})
    //改变选中item
    const changeActiveItem = (data:columnType) => {
        Object.assign(activeItem,deepClone(data))
    }
    //添加item
    const addItem = (data:columnType) => {
        columns.push(data)
    }
    //移动item
    const moveItem = (direction:string,index:number) => {
        if(direction=='up'){
          if(index==0) return ElMessage('已移动到最上面');
          [columns[index-1],columns[index]]=[columns[index],columns[index-1]]
        }else{
          if(index==columns.length-1) return ElMessage('已移动到最下面');
          [columns[index],columns[index+1]]=[columns[index+1],columns[index]]
        }
    }
    //删除item
    const deleteItem = (index:number) => {
        columns.splice(index,1)
        Object.assign(activeItem,{prop:'',component:'',index:-1})
    }
    //改变表单配置
    const changeFormOptions = (data:elFormProps) => {
        Object.assign(formOptions,data)
    }
    //改变item配置
    const changeItemOptions = (data:columnType) => {
        const index:any = data.index
        Object.assign(columns[index],data)
        Object.assign(activeItem,data)
    }
    //导出json
    const getJson = () => {
      
    }

    return {
        columns,
        formOptions,
        activeItem,
        changeActiveItem,
        addItem,
        moveItem,
        deleteItem,
        changeFormOptions,
        changeItemOptions,
        getJson
    }
})
export default useFormDataStore
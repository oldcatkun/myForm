export interface columnType {
    prop:string,
    component:string,
    itemProps?:any
    labelProps?:any,
    default?:any //初始数据类型
    index?:number //用于通讯
}
export type columnsType = columnType[]

export const componentName:{[key:string]:string} = {
    'el-input':'单行输入'
}

export const componentProps:{[key:string]:any} = {
    'el-input':{
        prop:'input',
        component:'el-input',
        default:'',
        itemProps:{
            type:'test',
            placeholder:'',
            clearable:false,
            disabled:false
        },
        labelProps:{
            label:'',
            labelWidth:'',
            rules:''
        }
    }
}
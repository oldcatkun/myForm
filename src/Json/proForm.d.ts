export interface columnType {
    prop:string,
    component:string,
    componentName?:string
    default?:any //初始数据类型
    //item
    type?:string,
    rows?:number
    placeholder?:string,
    clearable?:boolean,
    disabled?:boolean,
    multiple?:boolean,
    multipleLimit?:number,
    options?:any[]
    //label
    label?:string,
    labelWidth?:string | number,
    rules?:any
    required?: boolean
    requiredStr?:string
    regex?:string
    regexStr?:string
    //other
    index?:number //用于通讯
}
export type columnsType = columnType[]

export const componentProps:{[key:string]:columnType} = {
    'input':{
        prop:'input',
        component:'el-input',
        componentName:'单行输入',
        default:'',
        //item
        type:'test',
        placeholder:'',
        clearable:false,
        disabled:false,
        //label
        label:'input',
        labelWidth:'',
        required: false,
        requiredStr:'',
        regex:'',
        regexStr:''
    },
    'textarea':{
        prop:'textarea',
        component:'el-input',
        componentName:'多行输入',
        default:'',
        //item
        type:'textarea',
        rows:3,
        placeholder:'',
        clearable:false,
        disabled:false,
        //label
        label:'textarea',
        labelWidth:'',
        required: false,
        requiredStr:'',
        regex:'',
        regexStr:''
    },
    'select':{
        prop:'select',
        component:'el-select',
        componentName:'下拉选项',
        //item
        placeholder:'',
        clearable:false,
        disabled:false,
        multiple:false,
        multipleLimit:3,
        options:[
            {
                label:'select1',
                value:'1'
            },
            {
                label:'select2',
                value:'2'
            },
            {
                label:'select3',
                value:'3'
            }
        ],
        //label
        label:'select',
        labelWidth:'',
        required: false,
        requiredStr:'',
    }
}

// const publicProps:columnType = {
//     prop:'',
//     component:'el-input',
//     default:'',
//     type:'test',
//     placeholder:'',
//     clearable:false,
//     disabled:false,
//     label:'姓名',
//     labelWidth:'',
//     required: false,
//     requiredStr:'',
//     regex:'',
//     regexStr:''
// }

// export const proFormJson:{[key:string]:columnsType} = {
//     'el-input':[
//         {
//             ...publicProps,
//             prop:'prop',
//             label:'字段名',
//             required:true
//         },
//         {
//             ...publicProps,
//             prop:'prop',
//             label:'字段名',
//             required:true
//         }
//     ]
// } 
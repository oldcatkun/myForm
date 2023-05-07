import { ElMessage } from 'element-plus'
//深克隆
export const deepClone = (obj:any) => {
    return JSON.parse(JSON.stringify(obj))
} 
//防抖
export const debounce = (fun:Function,time:number=0) => {
    let timer:any = null
    return (...arg:any)=>{
        clearTimeout(timer)
        timer = setTimeout(()=>{
            fun(...arg)
        },time)
    }
}
//复制
export const copy = (val:string) => {
    let input:any = document.createElement('textarea')
    input.value = val
    document.body.appendChild(input)
    input.select()
    if(document.execCommand('copy')){
        ElMessage({
            showClose: true,
            message: '复制成功',
            type: 'success',
        })
    }else{
        ElMessage({
            showClose: true,
            message: '复制失败',
            type: 'error',
        })
    }
    document.body.removeChild(input)
    input = null
}
<template>
    <div id="editor"></div>
</template>

<script lang="ts" setup>
import ace from "ace-builds";
import workerJavascriptUrl from "ace-builds/src-noconflict/worker-javascript?url";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/ext-searchbox";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/snippets/javascript"

const props = withDefaults(defineProps<{
    Json:string
}>(),{
    Json:''
})
onMounted(() => {
    init()
})
// const transform = (Json:string) => {
//     return Json.split('{').join('{\n  ').split('[').join('[\n  ').split(',').join(',\n  ').split('}').join('\n}').split(']').join('\n]  ')
// }

const editor = ref<any>(null)

const init = () => {
    // https://github.com/ajaxorg/ace/wiki/Configuring-Ace
    ace.config.setModuleUrl('ace/mode/javascript_worker', workerJavascriptUrl);
    editor.value = ace.edit("editor", {
        mode: 'ace/mode/javascript'
    })
    editor.value.setValue(props.Json) // 设置内容
    editor.value.setOptions({
        readOnly:false,
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true
    })
    
}

//获取编辑器代码
const getValue = () => {
    return editor.value.getValue()
}
//设置编辑器内容
const setValue = () => {
    console.log(123123);
    editor.value.setValue(props.Json)
}
watch(()=>props.Json,()=>{
    setValue()
})

defineExpose({
    getValue
})


</script>

<style lang="less" scoped>
#editor{
    width: 100%;
    height: 100%;
}
</style>
<template>
    <div class="container">
        <el-container>
            <el-aside width="260px">
                <Left></Left>
            </el-aside>
            <el-main>
                <Center></Center>
            </el-main>
            <el-aside width="300px">
                <Right></Right>
            </el-aside>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import Left from './components/left.vue'
import Center from './components/center.vue'
import Right from './components/right.vue'
</script>

<style lang="less" scoped>
.container{
    width: 100%;
    height: 100%;
    .el-container{
        height: 100%;
        .el-main{
            min-width: 680px;
            border-left: 2px dotted #EBEEF5;
            border-right: 2px dotted #EBEEF5;
            background-color: #eeeeee;
            padding: 0;
        }
    }
}
</style>
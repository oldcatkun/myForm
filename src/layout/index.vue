<template>
    <div class="common-layout">
      <el-container>
        <el-header height="48px">
            <div class="left">
                <img src="@/assets/images/logo.jpg" alt="img">
                <span class="title">MyVForm</span>
                <span class="name">{{ $t("msg.layout.title") }}</span>
                <span class="version">Ver 1.0</span>
            </div>
            <div class="center">
                <ul class="list">
                    <li class="item" v-for="item in indexRoutes" :key="item.name" @click="handlerClick(item.name)">
                        {{ $t(`msg.routes.${item.name}`) }}
                    </li>
                </ul>
            </div>
            <div class="right">
                <ChangeLang/>
            </div>
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
      </el-container>
    </div>
</template>

<script setup lang="ts">
import ChangeLang from './components/changeLang.vue';
import { useRouter } from "vue-router";
import { routes } from '@/router';
const router = useRouter();
const indexRoutes = routes[1].children
const handlerClick = (name:string) => {
    router.push({name})
}
</script>

<style lang="less" scoped>
.common-layout{
    .el-header{
        display: flex;
        border-bottom: 2px dotted #EBEEF5;
        .left{
            min-width: 330px;
            height:48px;
            line-height:48px;
            // background-color: aqua;
            color: #242424;
            font-size: 18px;
            img{
                width: 36px;
                height: 36px;
                vertical-align: middle;
                margin-top: -6px;
                margin-right: 6px;
            }
            .title{
                color: #242424;
                font-size: 20px;
                font-weight: 700;
            }
            .name{
                margin: 0 6px;
            }
            .version{
                font-size: 14px;
                color: #101f1c;
            }
        }
        .center{
            width: calc(100% - 410px);
            .list{
                line-height: 48px;
                display: flex;
                padding: 0 20px;
                .item{
                    cursor: pointer;
                    text-align: center;
                    width: 100px;
                    &:hover{
                        background-color: rgb(163, 163, 163);
                    }
                }
            }
        }
        .right{
            flex-grow: 1;
        }
    }
    .el-main{
        height: calc(100vh - 48px);
        padding: 0;
    }

}
</style>
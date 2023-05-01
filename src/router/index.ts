import { createRouter, createWebHashHistory } from 'vue-router';

export const routes = [
    {
        path:'/',
        redirect:'/index'
    },
    {
        path:'/index',
        name:'index',
        component: () => import('@/layout/index.vue'),
        redirect:'/index/home',
        children:[
            {
                path:'home',
                name:'home',
                component: () => import('@/views/home/index.vue'),
            },
            {
                path:'test',
                name:'test',
                component: () => import('@/views/test/index.vue'),
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(), 
    routes
})

export default router
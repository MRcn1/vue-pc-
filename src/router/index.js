import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'home',
            component(resolve) {
                require(['../page/layout/layout'], resolve)
            },
            meta: {
                title: 'DEMO'
            },
            children: [
                {
                    path: '',
                    redirect: '/home/home2'
                },
                {
                    path: '/home/home2',
                    name: 'HTML',
                    component(resolve) {
                        require(['../page/home/home2'], resolve)
                    },
                    meta: {
                        top: "HTML"
                    },
                },
                {
                    path: '/home/home3',
                    name: 'CSS',
                    component(resolve) {
                        require(['../page/home/home3'], resolve)
                    },
                    meta: {
                        top: "CSS"
                    },
                },
                {
                    path: '/home/home4',
                    name: 'JS',
                    component(resolve) {
                        require(['../page/home/home4'], resolve)
                    },
                    meta: {
                        top: "JS"
                    },
                },
                {
                    path: '/home/loading',
                    name: 'laoding',
                    component(resolve) {
                        require(['../page/home/loading/loading'], resolve)
                    },
                    meta: {
                        top: "VUE"
                    },
                },
            ]
        },
        {
            path: '/Merchantmanagement',
            name: 'Merchantmanagement',
            component(resolve) {
                require(['../page/layout/layout'], resolve)
            },
            meta: {
                title: '基础信息'
            },
            children: [
                {
                    path: '',
                    redirect: '/Merchantmanagement/Merchantmanagement1'
                },
                {
                    path: '/Merchantmanagement/Merchantmanagement1',
                    name: '区域列表',
                    component(resolve) {
                        require(['../page/Merchantmanagement/Merchantmanagement1'], resolve)
                    },
                    meta: {
                        top: "店铺管理"
                    },
                }
            ]
        }
    ]
})

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            redirect: '/index'
        },
        {
            path: '/index',
            name: 'index',
            component(resolve) {
                require(['../page/index'], resolve)
            },
            meta: {
                title: 'DEMO'
            },
        },
        {
            path: '/imageUpload',
            name: 'imageUpload',
            component(resolve) {
                require(['../page/imageUpload'], resolve)
            },
        },
        {
            path: '/imagefloat',
            name: 'imagefloat',
            component(resolve) {
                require(['../page/imagefloat'], resolve)
            },
        },
        {
            path: '/toolstorage',
            name: 'toolstorage',
            component(resolve) {
                require(['../page/toolstorage'], resolve)
            },
        },
    ]
})

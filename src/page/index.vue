<template>
    <div class="home">
        <router-link class="link"  to="/imageUpload">上传文件</router-link>
        <router-link class="link"  to="/imagefloat">图片裁剪</router-link>
        <router-link class="link"  to="/toolstorage">工具类</router-link>
    </div>
</template>

<script>
export default {
    data() {
        return {

        };
    },
    components: {

    },
    created() {

    },
    mounted() {

    },
    methods: {

    },
};
</script>

<style scoped lang="less">
.home{
    padding: 20px;
    .link{
        display: block;
    }
}
</style>

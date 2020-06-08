<template>
    <div class="imageUpload">
        <uploadFile ref="uploadFile" :headers='headers' :action='action' :downloadUrl='downloadUrl' @upload='successupload'></uploadFile>
        <el-button @click="Echo">回显</el-button>
        <el-button @click="empty">清空</el-button>
    </div>
</template>

<script>
    import uploadFile from '@/components/uploadFile'
    export default {
        data() {
            return {
                headers: {
                    'X-Auth0-Token': sessionStorage.token
                }, //请求头
                action: '/djysit/api/djy-digital/dsf/gfs/uploadFile', //上传地址
                downloadUrl: 'https://desyb2.do1.net.cn:8888/djysit', //下载地址
            };
        },
        components: {
            uploadFile
        },
        created() {

        },
        mounted() {

        },
        methods: {
            successupload(val) { //上传成功返回值
                
            },
            Echo() {
                this.$refs.uploadFile.setFileList([{
                    fileName: '要回显的文件名',
                    fileSize: '',
                    url: '要回显的地址',
                }])
            },
            empty() {
                this.$refs.uploadFile.setFileList([])
            },
        },
    };

</script>

<style scoped lang="less">

</style>

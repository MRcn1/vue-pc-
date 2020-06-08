<template>
    <div class="imagefloat">
        <getimagesize @successUpload='successUpload'></getimagesize>
        <div class="img_div" v-for="(item,index) in imgList" :key="index" >
            <img :src="downloadUrl+item" alt="" width="150px">
            <div>
                <div class="mask">
                    <i @click="delImg(index)" class="el-icon-delete"></i>
                    <i @click="amplification(item)" class="el-icon-zoom-in"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import getimagesize from '../components/getimagesize'
    export default {
        data() {
            return {
                imgList: [],
                downloadUrl: 'https://desyb2.do1.net.cn:8888/djysit', //预览地址
            };
        },
        components: {
            getimagesize
        },
        created() {

        },
        mounted() {

        },
        methods: {
            successUpload(val) {
                this.imgList = val
            },
            delImg(index){
                this.imgList.splice(index,1)
            },
            amplification(url){
                window.open(this.downloadUrl + url)
            }
        },
    };

</script>

<style scoped lang="less">
    .img_div {
        position: relative;
        display: inline-block;
    }

    .mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(101, 101, 101, 0.6);
        color: #ffffff;
        opacity: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        i{
            font-size: 25px;
            margin: 0 10px;
        }
    }

    .mask h3 {
        text-align: center;
    }

    .img_div div:hover .mask {
        opacity: 1;
    }

</style>

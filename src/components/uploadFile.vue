<!--
  上传附件组件
    headers                      请求头，{token:token}
    action                       上传地址 '/xxxxx/api/djy-digital/dsf/gfs/uploadFile' 
    downloadUrl                  下载地址 'https://desyb2.do1.net.cn:8888/xxxx' 
    butHide                      是否隐藏上传按钮  默认显示         传true为不可以
    deleteHide                   是否隐藏删除按钮  默认显示         传true为不可以
    downLoadHide                 是否隐藏下载按钮  默认显示         传true为不可以
    accept                       上传文件类型     默认不限制    例如： .jpg,.jpeg,.png,.gif
    maxNum                       最大上传数   默认不限制
    maxSize                      最大上传大小   默认最大 音视频 500M   文档 30M   数值单位为k
    params                       上传附带的参数
    width                        组件宽度，如果是具体数值，记得传单位   默认 400px
    事件
    setFileList                  重置文件列表  传入：[{fileName: '', fileSize: '', url: ''}]  --主动来触发该事件，用于回显 例：this.$refs.xxx.setFileList(arr)  arr 为要回显的文件列表
    upload                       返回所有文件列表  格式： [{fileName: '', fileSize: '', url: '', fileExt: '', fileSizeStr: ''}] -- 上传后的返回事件
    数据
    fileName                     文件名称     必传
    fileSize                     文件大小
    url                          文件相对路径  必传
    tips                         提示
-->
<template>
    <div class="upload-file" :style="width ? {'width': `${width}`} : {'width': '450px'}">
        <div class="upload-file-top">
            <el-upload ref="upload" name="file" :headers="headers" :action="action" :before-upload="before_upload"
                :on-success="on_success" :on-error="on_error" :on-exceed="on_exceed" :limit="maxNum"
                :accept="acceptType" :multiple="false" :show-file-list="false" v-if="handleShowBtn()" :data="postData">
                <el-button icon="el-icon-upload2">
                    上传文件
                </el-button>
            </el-upload>
            <div class="tips">{{tips}}</div>
        </div>

        <div :class="[butHide?'upload-file-main2':'upload-file-main']" v-if="fileList && fileList.length > 0">
            <div class="upload-file-item" v-for="(item, index) in fileList" :key="index">
                <div class="upload-file-mid">
                    <div class="upload-file-name" v-text="item.fileName"></div>
                </div>
                <div class="upload-file-right" v-if="!downLoadHide" @click="downloadFile(item)">
                    <span>下载</span>
                </div>
                <div class="upload-file-right" v-if="!deleteHide" @click="delFile(item, index)">
                    <span>删除</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "",
        props: [
            'headers',
            'action',
            'downloadUrl',
            'module',
            'butHide',
            'deleteHide',
            'downLoadHide',
            'accept',
            'maxNum',
            'maxSize',
            'types',
            'tips',
            'params',
            'width',
        ],
        components: {

        },
        data() {
            return {
                postData: {},
                isViewing: false,
                isUploading: null,
                uploadApi: '',
                // 音视频格式，用于判断是否音视频
                mediaList: ['mp3', 'mp4'],
                fileList: [] // url:上传返回的路径  fileName：本地文件获取的文件名
            }
        },
        computed: {
            // 文件类型
            acceptType() {
                return this.accept || ''
            }
        },
        methods: {
            handleShowBtn() {
                if (this.butHide) {
                    return false
                } else {
                    if (this.maxNum && this.fileList.length >= this.maxNum) {
                        return false
                    }
                    return true
                }
            },
            setFileList(arr) {
                this.fileList = arr
            },
            on_exceed(files, fileList) {
                this.$message.warning(`最多允许上传${this.maxNum}个文件`)
            },
            //通过a标签实现文件下载
            downloadFile(file) {
                if (!this.downLoadHide) {
                    let f1 = document.createElement('a')
                    f1.setAttribute('href', this.downloadUrl + file.url)
                    f1.setAttribute('target', '_blank')
                    f1.setAttribute('download', file.fileName)
                    document.body.appendChild(f1)
                    f1.click()
                    document.body.removeChild(f1)
                }
            },
            //上传文件前判断大小
            before_upload(file) {
                let loc = file.name.lastIndexOf('.')
                let fileType = file.name.slice(loc + 1).toLowerCase()
                let maxSize = this.maxSize ? this.maxSize * 1024 : 0

                //判断文件类型
                if (this.types && this.types.length > 0) {
                    if (this.types.indexOf(fileType) == -1) {
                        this.$message.warning('文件格式不正确')
                        return false
                    }
                }
                if (maxSize && file.size / 1024 > maxSize) {
                    this.$message.warning('文件不能大于' + this.maxSize + 'M')
                    return false
                }

                this.isUploading = this.$loading({
                    lock: true,
                    text: '上传中',
                    spinner: 'el-icon-loading',
                    background: 'rgba(255, 255, 255, 0.7)'
                })
                return true
            },

            // 上传失败
            on_error(err, file, fileList) {
                this.isUploading.close()
                alert('上传失败，请重试')
            },
            // 上传成功回调
            on_success(response, file, fileList) {
                if (
                    response.code == 0 &&
                    response.data.url &&
                    response.data.url.length > 0
                ) {
                    let obj = {
                        fileName: response.data.fileName,
                        fileSize: response.data.fileSize,
                        fileSizeStr: response.data.fileSizeStr,
                        fileExt: response.data.fileExt,
                        dcsUrl: response.data.dcsUrl,
                        url: response.data.url
                    }
                    this.fileList.push(obj)
                } else {
                    this.$message(response.msg)
                }
                this.isUploading.close()
                this.$emit('upload', this.fileList)
            },
            // 移除文件
            delFile(item, index) {
                let _this = this
                _this
                    .$confirm('确定要移除该文件吗', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    })
                    .then(() => {
                        let url = _this.fileList[index].url
                        _this.fileList.splice(index, 1)
                        _this.$emit('upload', _this.fileList)
                    })
            }
        },
        mounted() {
            this.postData = {
                module: 54,
                appendPath: 'test',
                isTransform: 1,
                downloadHide: 1
            }
        }
    }

</script>
<style lang="less">
    .upload-file {
        .upload-file-top {
            justify-content: space-between;
            align-items: center;

            .upload-file-title {
                font-size: 24px;
                font-weight: 500;
                color: rgba(40, 40, 40, 1);
            }
        }

        .upload-file-item {
            display: flex;
            align-items: center;
            margin-top: 10px;
            border: 1px solid #b7b7b7;

            .upload-file-pic {
                width: 48px;
                height: 48px;
                margin-right: 15px;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .upload-file-mid {
                min-width: 100px;
                flex: 1;

                .upload-file-name {
                    font-size: 12px;
                    font-weight: 400;
                    color: rgba(40, 40, 40, 1);
                    overflow: hidden;
                    width: 85%;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    margin-bottom: 5px;
                }

                .upload-file-size {
                    font-size: 14px;
                    font-weight: 400;
                    color: rgba(146, 146, 146, 1);
                }
            }

            .upload-file-right {
                height: 40px;
                width: 40px;
                line-height: 40px;
                text-align: center;
                font-size: 12px;
                color: #ca313f;

                span {
                    cursor: pointer;
                }

                img {
                    width: 24px;
                    height: 24px;
                    animation: rotate 1.1s linear infinite;

                    @keyframes rotate {
                        from {
                            transform: rotate(0deg);
                        }

                        to {
                            transform: rotate(360deg);
                        }
                    }
                }
            }
        }

        .tips {
            font-size: 14px;
            color: #c3c3c3;
            margin-top: 10px;
        }
    }

</style>

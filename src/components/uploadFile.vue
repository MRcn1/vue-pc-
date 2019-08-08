<!--
  上传附件组件
    module                       文件所属的模块名称  用于后端保存 默认为common  也可传模块拼音 例如：三会一课 -- sanhuiyike
    isBut                        是否隐藏上传按钮  默认显示         传true为不可以
    isView                       是否可以点击来预览  默认可以  传true为不可以
    isDelete                     是否隐藏删除按钮  默认显示         传true为不可以
    isDownLoad                   是否隐藏下载按钮  默认显示         传true为不可以
    defaultFileList              回显  传入：[{fileName: '', fileSize: '', url: '', dcsUrl: ''}]
    accept                       上传文件类型     默认不限制    例如： .jpg,.jpeg,.png,.gif
    maxNum                       最大上传数   默认不限制
    maxSize                      最大上传大小   默认最大 音视频 500M   文档 30M   数值单位为k
    params                       上传附带的参数
    title                        标题  不传不显示
    width                        组件宽度，如果是具体数值，记得传单位   默认 400px

    事件
    setFileList                  重置文件列表  传入：[{fileName: '', fileSize: '', url: '', dcsUrl: ''}]  --主动来触发该事件，用于回显
                                 例：this.$refs.xxx.setFileList(arr)  arr 为要回显的文件列表
    upload                       返回所有文件列表  格式： [{fileName: '', fileSize: '', url: '', dcsUrl: '', fileExt: '', fileSizeStr: ''}] -- 上传后的返回事件

    数据
    fileName                     文件名称     必传
    fileSize                     文件大小
    url                          文件相对路径  必传
    dcsUrl                       文件预览路径
-->

<template>
    <div class="upload-file" :style="width ? {'width': `${width}`} : {'width': '400px'}">
        <div class="upload-file-top">
            <div class="upload-file-title" v-if="title" v-text="title"></div>
            <el-upload ref="upload" name="file" :headers="headers" :action="uploadApi" :before-upload="validDoc"
                :on-success="uploadFileCallback" :on-error="uploadError" :on-exceed="handleExceed" :limit="maxNum"
                :accept="acceptType" :multiple="false" :show-file-list="false" v-if="handleShowBtn()" :data="postData">
                <el-button icon="el-icon-upload2">上传文件</el-button>
            </el-upload>
        </div>
        <div class="upload-file-main" v-if="fileList && fileList.length > 0">
            <div class="upload-file-item" v-for="(item, index) in fileList" :key="index">
                <div class="upload-file-pic" :style="!isView ? {'cursor': 'pointer'} : {}" @click="viewFile(item)">
                    <img v-if="handleFileIcon(item) === 'doc'" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563963574438&di=f7a262f6312e785eb3ff222daff7fd7b&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F3a1a789117521c5e7c701289d7e3b02fa57092e12fab-MKPVGF_fw658">
                    <img v-if="handleFileIcon(item) === 'xls'" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563963574438&di=f7a262f6312e785eb3ff222daff7fd7b&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F3a1a789117521c5e7c701289d7e3b02fa57092e12fab-MKPVGF_fw658">
                    <img v-if="handleFileIcon(item) === 'ppt'" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563963574438&di=f7a262f6312e785eb3ff222daff7fd7b&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F3a1a789117521c5e7c701289d7e3b02fa57092e12fab-MKPVGF_fw658">
                    <img v-if="handleFileIcon(item) === 'pdf'" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563963574438&di=f7a262f6312e785eb3ff222daff7fd7b&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F3a1a789117521c5e7c701289d7e3b02fa57092e12fab-MKPVGF_fw658">
                    <img v-if="handleFileIcon(item) === 'txt'" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563963574438&di=f7a262f6312e785eb3ff222daff7fd7b&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F3a1a789117521c5e7c701289d7e3b02fa57092e12fab-MKPVGF_fw658">
                    <img v-if="handleFileIcon(item) === 'media'" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563963574438&di=f7a262f6312e785eb3ff222daff7fd7b&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F3a1a789117521c5e7c701289d7e3b02fa57092e12fab-MKPVGF_fw658">
                    <img v-if="handleFileIcon(item) === 'other'" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563963574438&di=f7a262f6312e785eb3ff222daff7fd7b&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F3a1a789117521c5e7c701289d7e3b02fa57092e12fab-MKPVGF_fw658">
                </div>
                <div class="upload-file-mid" :style="!isView ? {'cursor': 'pointer'} : {}" @click="viewFile(item)">
                    <div class="upload-file-name" v-text="item.fileName"></div>
                    <div class="upload-file-size" v-show="item.fileSize">{{(item.fileSize / 1024).toFixed(1)}}k</div>
                </div>
                <div class="upload-file-right" v-if="!isDownLoad" @click="downloadFile(item)">
                    <span>下载</span>
                </div>
                <div class="upload-file-right" v-if="!isDelete" @click="delFile(item, index)">
                    <span>删除</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import baseUploadFile from '../../api/upload/uploadFile'    //接口地址
    export default {
        name: 'upload-file',
        props: [
            'module',
            'isBut',
            'isView',
            'isDelete',
            'isDownLoad',
            'accept',
            'maxNum',
            'maxSize',
            'tips',
            'params',
            'title',
            'defaultFileList',
            'width'
        ],
        data() {
            return {
                headers: {
                    'X-Auth0-Token': this.$store.state.token
                }, // 默认带token
                postData: {},
                isViewing: false,
                isUploading: null,
                uploadApi: '',
                // 音视频格式，用于判断是否音视频
                mediaList: [
                    'mp3', 'aac', 'mp4', 'ape', 'flac', 'wav', 'wma', 'amr', 'mid', 'm4v', '3gp', 'mpg',
                    'flv', 'f4v', 'swf', 'avi', 'wmv', 'rmvb', 'mov', 'mts', 'm2t', 'webm', 'ogg', 'mkv'
                ],
                fileList: [] // url:上传返回的路径  fileName：本地文件获取的文件名
            };
        },
        computed: {
            // 文件类型
            acceptType() {
                return this.accept || '';
            }
        },
        methods: {
            handleShowBtn() {
                if (this.isBut) {
                    return false
                } else {
                    if (this.maxNum && this.fileList.length >= this.maxNum) {
                        return false
                    }
                    return true
                }
            },
            setFileList(arr) {
                this.fileList = arr;
            },
            handleFileIcon(item) {
                if (item && item.fileName) {
                    let loc = item.fileName.lastIndexOf('.');
                    let fileType = item.fileName.slice(loc + 1).toLowerCase();
                    if (['doc', 'docx'].includes(fileType)) {
                        return 'doc';
                    } else if (['xls', 'xlsx'].includes(fileType)) {
                        return 'xls';
                    } else if (['ppt', 'pptx'].includes(fileType)) {
                        return 'ppt';
                    } else if (['pdf'].includes(fileType)) {
                        return 'pdf';
                    } else if (['txt'].includes(fileType)) {
                        return 'txt';
                    } else if (this.mediaList.includes(fileType)) {
                        return 'media';
                    } else {
                        return 'other';
                    }
                } else {
                    return 'other';
                }
            },
            handleExceed(files, fileList) {
                this.$message.warning(`最多允许上传${this.maxNum}个文件`);
            },
            // 点击预览文件
            viewFile(file) {
              console.log(1)
                if (this.isViewing) {
                    return false
                }
                if (this.isView) {
                    return false
                }
                if (!file.url) {
                    this.msgAlert('文件出错，请重新上传')
                    return false
                }
                this.isViewing = true
                if (file.dcsUrl) {
                    this.isViewing = false
                    window.open(filePath + file.dcsUrl)
                } else {
                    let data = {
                        filePath: file.url,
                        isTransform: 1
                    };
                    this.simplePost(baseUploadFile.viewFile, data, (result) => {
                        if (result.code === 0) {
                            file['dcsUrl'] = result.data;
                            this.isViewing = false
                            window.open(filePath + result.data);
                        } else {
                            this.isViewing = false
                            this.msgAlert(result.msg);
                        }
                    });
                }
            },
            //通过a标签实现文件下载
            downloadFile(file) {
                if (!this.isDownLoad) {
                    let f1 = document.createElement('a')
                    f1.setAttribute('href', filePath + file.url)
                    f1.setAttribute('target', '_blank')
                    f1.setAttribute('download', file.fileName)
                    document.body.appendChild(f1)
                    f1.click()
                    document.body.removeChild(f1)
                }
            },
            //上传文件前判断大小
            validDoc(file) {

                let loc = file.name.lastIndexOf('.');
                let fileType = file.name.slice(loc + 1).toLowerCase();
                let maxSize = this.maxSize ? this.maxSize : 0;
                //判断文件类型
                if (this.mediaList.indexOf(fileType) < 0) {
                    // 文件最大30M
                    if (maxSize > 30720) {
                        maxSize = 30720
                    }
                } else {
                    // 音视频最大500M
                    if (maxSize > 512000) {
                        maxSize = 512000
                    }
                }

                if (maxSize && (file.size / 1024) > maxSize) {
                    this.msgAlert(`文件大小超出限制！限制大小为${(maxSize / 1024).toFixed(2)}M`);
                    return false;
                }
                this.isUploading = this.$loading({
                    lock: true,
                    text: '上传中',
                    spinner: 'el-icon-loading',
                    background: 'rgba(255, 255, 255, 0.7)'
                });

                return new Promise((resolve, reject) => {
                    this.$nextTick(() => {
                        if (this.mediaList.indexOf(fileType) < 0) {
                            // 文件  gfs上传
                            this.uploadApi = baseURL + baseUploadFile.baseUploadFile
                        } else {
                            // 音视频  华为obs上传
                            this.uploadApi = baseURL + baseUploadFile.baseUploadMedia
                        }
                        resolve()
                    })
                })
            },
            // 上传失败
            uploadError(err, file, fileList) {
                this.isUploading.close();
                this.msgAlert('上传失败，请重试');
            },
            // 上传成功回调
            uploadFileCallback(response, file, fileList) {
                if (response.code == 0 && response.data.url && response.data.url.length > 0) {
                    let obj = {
                        fileName: response.data.fileName,
                        fileSize: response.data.fileSize,
                        fileSizeStr: response.data.fileSizeStr,
                        fileExt: response.data.fileExt,
                        dcsUrl: response.data.dcsUrl,
                        url: response.data.url
                    };
                    this.fileList.push(obj)
                } else {
                    this.$message(response.msg)
                }
                this.isUploading.close();
                this.$emit('upload', this.fileList);
            },
            deleteFile(url) {
                this.simplePost(`${baseUploadFile.deleteFile}?filePath=${url}`, {}, (result) => {
                    console.log('result: ', result);
                });
            },
            // 移除文件
            delFile(item, index) {
                let _this = this;
                _this.$confirm(
                    '确定要移除该文件吗', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                    let url = _this.fileList[index].url
                    _this.fileList.splice(index, 1)
                    _this.$emit('upload', _this.fileList)
                })
            }
        },
        mounted() {
            if (this.defaultFileList && this.defaultFileList.length > 0) {
                this.fileList = this.defaultFileList
            }
            if (this.params) {
                this.postData = this.params;
            } else {
                this.postData = {
                    module: this.module,
                    isTransform: 1,
                    isDownload: 1
                }
                if (!this.module) {
                    delete this.postData.module
                }
            }
        },
    };

</script>

<style lang="less" scoped>
    .upload-file {
        .upload-file-top {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .upload-file-title {
                font-size: 24px;
                font-weight: 500;
                color: rgba(40, 40, 40, 1);
            }
        }

        .upload-file-main {
            margin-top: 20px;

            .upload-file-item {
                display: flex;
                align-items: center;
                margin-bottom: 15px;

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
                    min-width: 0;
                    flex: 1;

                    .upload-file-name {
                        font-size: 16px;
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
                    color: #CA313F;

                    span {
                        cursor: pointer;
                    }

                    img {
                        width: 24px;
                        height: 24px;
                        animation: rotate 1.1s linear infinite;

                        @keyframes rotate {
                            from {
                                transform: rotate(0deg)
                            }

                            to {
                                transform: rotate(360deg)
                            }
                        }
                    }
                }
            }
        }
    }

</style>

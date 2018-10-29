<template>
<div class="crop" v-loading="loading">

    <div class="upload-view" style="max-width:320px;height:300px;margin:0 auto;border-radius:5px;">
        <vueCropper
        ref="cropper"
        :img="baseImgURL"
        :outputSize="0.1"
        :outputType="'jpg'"
        :fixedBox="true"
        :autoCrop="true"
        :autoCropWidth="196"
        :autoCropHeight="196"
        @realTime="realTime"
        @canMove="false"
        ></vueCropper>
    </div>
    <div style="color:red;height:25px;line-height:25px;font-size:13px;text-align:center"><i v-if="fileTypeErr" class="el-icon-warning" style="color:#f16a6e"></i> {{fileTypeErr}}</div>
    <!--预览视图-->
    <!--<div class="show-preview">
        <div :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden', 'margin': '5px'}">
            <img :src="baseImgURL" :style="previews.img">
        </div> 
    </div>-->
    <div class="btns">
        <!--<button v-if="!readyUpload" type="button" class="btn" disabled style="margin-right:12px">头像保存</button> 
        <button v-if="readyUpload" type="button" class="btn btn-primary" @click="save()" style="margin-right:12px">头像保存</button>
        <button type="button" class="btn " @click="callClose()">取 消</button>-->
        <el-button size="" type="success" class="file-btn btn">选择文件
            <input type="file" name="" id="" @change="readImage" ref="upload">
        </el-button>
        <el-button size="" v-if="readyUpload" type="primary" @click="save()">头像保存</el-button>
        <el-button size="" type="info" plain @click="callClose()">取 消</el-button>
    </div>

</div>
  
</template>


<script>
import VueCropper from 'vue-cropper'
export default {
  data(){
      return{
            previews:{},
            baseImgURL:'',
            loading:false,
            readyUpload:false,
            fileTypeErr:''

      }
  },
  components:{
      VueCropper
  },
  methods:{
    readImage(){
        const reader = new FileReader();
        reader.onload = (e) => {
            const src = e.target.result;
            this.baseImgURL = src
        };
        if (this.$refs.upload.files && this.$refs.upload.files[0]) {
            let fileType = this.$refs.upload.files[0].type
            if(!/image\/\w+/.test(fileType)){
                this.fileTypeErr = '不支持此格式文件！'
                this.readyUpload = false
            }else{
                this.fileTypeErr = ''
                this.readyUpload = true
            }
            
            reader.readAsDataURL(this.$refs.upload.files[0]);
        }
    },
    realTime (data) {
        this.previews = data
    },
    save(){
        this.loading = true
        this.$refs.cropper.getCropBlob((data) => { 
            let uploadData = new FormData();
            uploadData.append('file', data,'avatar.jpg');

            this.$axios.uploadPhoto(uploadData).then(res=>{
                this.loading = false;
                if(res.data.success){
                    this.$message({
                        message: '保存成功！',
                        type: 'success'
                    });
                    this.callClose(true)
                }else{
                    this.$message({
                        showClose: true,
                        message: '上传失败',
                        type: 'error',
                        duration:2500
                    });
                }
            }).catch(res=>{
                this.loading = false;
            })

        })
    },
    callClose(success=false){
        this.$emit('closeMe',success)
    },
      
  },
  mounted(){
  }

}
</script>
<style lang="less">
.crop {
    margin:0 auto;
    background-color: #fff;
    margin-top:-5% auto;
    position: relative;
    min-height:400px;
    max-width:320px;
    border-radius:3px;
    overflow: hidden;
    .show-preview {
        position: absolute;
        right:30px;
        top:30px;
    }
    .btns {
        text-align: center;
    }
    .vue-cropper {
        background: #7a7a7a;
        border:1px solid #999;

    }
    .file-btn {
        position: relative;
        display: inline-block;
        // background: #D0EEFF;
        // border: 1px solid #99D3F5;
        // border-radius: 4px;
        // padding: 4px 12px;
        overflow: hidden;
        // color: #1E88C7;
        text-decoration: none;
        text-indent: 0;
    }
    .file-btn input {
        position: absolute;
        font-size: 100px;
        right: 0;
        top: 0;
        opacity: 0;
        cursor: pointer;
    }

}
</style>



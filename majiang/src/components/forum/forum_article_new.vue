<template>
<div class="forum-new">
    <NavMain></NavMain>
    <!-- <NavSub :data="navData" placeholder="输入内容搜索"></NavSub>  -->
    <div class="title">
        <!--<i class="icon iconfont icon-brush" style="font-size:22px"></i>-->
        <div>
            <font class="nav-title">论坛</font>
            <font class="point">·</font>
            <font  v-if="aid">编辑文档</font>
            <font v-else>创建文档</font>
        </div>
    </div>
    <div class="main-box">
        <div class="my-editor">
            <el-form ref="form" :model="form">
                <div class="f-items">
                    <label for="">标题：</label>
                    <!-- <el-input v-model="form.title" spellcheck="false" @blur="verify('title')"></el-input> <br> -->
                    <div :class="'t-input '+(tFocus?'focus':'')" >
                        <input v-model="form.title" spellcheck="false" @blur="verify('title');tFocus=false" @focus="tFocus=true">
                    </div>
                    <!--<div class="err-message" >*文章標題要求為10~96字節</div>-->
                </div>
                <div class="err-message" v-if="ver.title==='empty'">*请输入标题</div>
                <div class="err-message" v-if="ver.title==='notPass'">*标题字数需在2-120个之间</div>
                <!-- <div class="f-items">
                    <label for="">分类：</label>
                    <el-radio-group v-model="form.category" @change="verify('category')">
                        <el-radio label="share">分享</el-radio>
                        <el-radio label="ask">问答</el-radio>
                    </el-radio-group>
                </div> -->
                <div class="f-items">
                    <label for="">标签：</label>
                    <Tags @currentTags="changeCurrentTags" :tags="initData.tagsList"></Tags>
                </div>
                
                <div class="err-message" v-if="ver.tagsList==='empty'">*请至少输入一个标签</div>
                <div class="err-message two" v-if="ver.category==='empty'">*请选择分类</div>
                <div class="f-items ed">
                    <label for="" style="vertical-align: middle">内容：</label>
                    <!--<el-input v-model="form.title"></el-input>-->
                    <div class="html5-editor" stylel="width:600px" >
                    
                        <!--<vue-html5-editor :content="form.content" :height="200" width="100%" spellcheck="false" @change="updateData" ></vue-html5-editor>-->
                        <wangEditor @changeContent="getContent" :articleContent="initData.content"></wangEditor>
                
                    </div>
                </div>
                <div class="err-message" v-if="ver.content==='empty'">*请输入内容</div>
                <div class="err-message" v-if="ver.content==='isMin'">*内容不可小于140个字符</div>
                <div class="err-message" v-if="ver.content==='isMax'">*内容已超长最大限度</div>
                <div class="f-items" style="padding-top:20px">
                    <label for=""></label>
                    <el-form-item>
                        <el-button type="primary" @click="submitArticle()">提 交</el-button>
                        <el-button @click="$router.go(-1)">取 消</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </div>
        <div class="editor-base-style" v-html="this.form.content">

        </div>
        <div class="my-count">
            <p>已发表</p>
            <h2>50</h2>
        </div>
    </div>
</div> 
</template>
<script>
import wangEditor from './editor/wEditor'
import Tags from '@/components/common/tags.vue'
import NavMain from '@/components/common/nav_main'
// import fEditor from 'froala-editor'
export default {
    data(){
        return {
            form:{
                title:'',
                category:'',
                content:'',
                tagsList:''
            },
            initData:{
                title:'',
                category:'',
                content:'',
                tagsList:''
            },
            loading:false,
            aid:'',
            editAid:'',
            editContent:'',
            // 输入验证
            ver:{
                title:'',
                category:'',
                content:'',
                all:'',
                tagsList:''
            },
            tagErrMsg:''    ,
            navData:{
                title:'M论坛',
                list:[
                    {
                        value:'全部',
                        link:'/forum'
                    },
                ]
            },
            tFocus:false
        }
    },
    components: {
        wangEditor,
        Tags,
        NavMain
        // quillEditor,
        // 'editor1' : new VueHtml5Editor(this.options1)
    },
    mounted(){
    },
    methods:{  
        // 获取最新的标签
        changeCurrentTags(tags){
            this.form.tagsList = tags
            this.verify('tagsList')
        },
        verify(type){
            if(type==='title' || type==='all'){
                this.form.title = this.$utill.strTrim(this.form.title)
                if(!this.form.title){
                    this.ver.title = 'empty'
                }else{
                    let len = this.form.title.length
                    if(len<2 || len>120){
                        this.ver.title = 'notPass'
                    }else{
                        this.ver.title = 'pass'
                    }
                }
            }
            // if(type==='category' || type==='all'){
            //     if(!this.form.category){
            //         this.ver.category = 'empty'
            //     }else{
            //         this.ver.category = 'pass'
            //     }
            // }
            if(type==='content' || type==='all'){
                this.form.content = this.form.content.trim()
                let len = this.form.content.length
                let text = this.form.content.replace(/<\/?.+?\/?>/g,'').trim()
                if( !text ){
                    this.ver.content = 'empty'
                }else if( text.length<140 ){
                    this.ver.content = 'isMin'
                }else  if( this.$utill.strLength(this.form.content)>16777215 ){
                    this.ver.content = 'isMax'
                }else{
                    this.ver.content = 'pass'
                }
            }
            if(type==='tagsList' || type==='all'){
                if(!this.form.tagsList || this.form.tagsList.length < 1){
                    this.ver.tagsList = 'empty'
                }else{
                    this.ver.tagsList = 'pass'
                }
            }
            if(this.ver.title==='pass' && this.ver.content==='pass' && this.ver.tagsList === 'pass'){
                this.ver.all='pass'
            }else{
                this.ver.all='notPass'
            }

        },
        submitArticle(){
            this.verify('all')
            if(this.ver.all!=='pass') return
            let content = this.form.content
            if(process.env.NODE_ENV === "development"){
                // content = content.replace(new RegExp('^'+process.env.API_HOST+'/upload','g'),'/upload')
                content = content.replace(new RegExp(process.env.API_HOST,'g'),'')
            }
            this.loading = true
            this.$axios.articlePublish({
                title:this.form.title.trim(),
                // category:this.form.category.trim(),
                content:content,
                tags:this.form.tagsList.join(','),
                aid:this.editAid
            }).then(res=>{
                this.loading = false
                if(res.data.success){
                    this.form.title = ''
                    this.form.category = ''
                    this.form.content = ''
                    this.aid = ''
                    this.$message({
                        message: '操作成功！',
                        type: 'success',
                        // showClose:true,
                        duration:2000
                    });
                    // if(this.editAid){
                    //     this.$router.go(-1)
                    // }
                    this.$router.push({
                        path:'/forum'
                    })
                }else{
                    this.$message({
                        message: '操作失败！',
                        type: 'error',
                        showClose:true,
                        duration:2500
                    });
                }
            }).catch(err=>{
                this.loading = false
            })
        },

        getArticleById(){
            this.loading = true
            this.$axios.getArticleById({aid:this.aid}).then(res=>{
                this.loading = false
                if(res.data.success){
                    this.editAid = this.aid
                    this.form.title = res.data.data.title
                    this.form.category = res.data.data.category
                    this.form.tagsList = res.data.data.tags.split(',')
                    this.form.content = res.data.data.content
                    // this.editContent = this.form.content = res.data.data.content
                    this.initData  = JSON.parse(JSON.stringify(this.form))
                     
                }
            }).catch(err=>{
                this.loading = false
            })
        },
        getContent(c){
            this.form.content = c
            this.verify('content')
        }

    },
    created(){
        if(this.$route.path.indexOf('/article/edit/')>-1){
            this.aid = this.$route.path.split('/')[4]
            this.getArticleById()
        }
        // 切割指定字节长度的字符串
        function splitStr(s,bytes=1000){
            if(typeof s !=='string') return
            var totalLength = 0; 
            var charCode; 
            for (let i = 0; i < s.length; i++) { 
                charCode = s.charCodeAt(i); 
                if (charCode <= 127) { 
                    totalLength = totalLength + 1; 
                } else if ((charCode>127) && (charCode <= 2047)) { 
                    totalLength += 2; 
                } else if ((charCode>2047) && (charCode <= 65535)) { 
                    totalLength += 3; 
                } else if ((charCode>65535) && (charCode <= 2097152)) { 
                    totalLength += 4; 
                }  
                if(totalLength>bytes){
                    return s.substr(0,i) + '.....'
                }
            } 
            return s; 

        }


        
    }
    
};
</script>
<style lang="less">
.forum-new {
    .title {
        background-color: #f0f3ef;
        &>div {
            max-width:970px;
            margin:0 auto;
            height:42px;
            font-size:17px;
            display:flex;
            align-items:center; 
            .nav-title {
                color:#0e959d;
                position: relative;
                // &:after {
                //     content: "";
                //     display: block;
                //     width: 2px;
                //     height: 14px;
                //     background-color: #0e959d;
                //     position: absolute;
                //     top: 5px;
                //     right: -1px;
                // }
            }
            .point {
                padding:0 4px;
            }
            font {            
                font-size:16px;
                white-space: nowrap;
                position:relative;
                color:#bdbdbd;
                em {
                    font-size:28px;
                }
            }
        }
    }
    .main-box {
        max-width:970px;
        margin:15px auto;
        background-color: #fff;
        margin-bottom:12px;
        width:100%;
        padding-right:200px;
        position:relative;
        .my-editor {
            // ul, ol ,li,ol { list-style:square; }
            ol {
                    // list-style-type: disc !important;
                    // list-style-position:outside !important;
            }
            form {
                .f-items {
                    flex-wrap:wrap;
                    &>label {
                        flex:0 0 100%;
                        text-align:left;
                        padding-top:10px;
                        margin-bottom:4px;
                        display:block;
                        color:rgba(33, 32, 36, 0.66);
                    }
                }
                .el-radio-group {
                    padding:2px 0px 0px 5px;
                }
                .el-input__inner {
                    height:36px;
                    
                }
                div.t-input {
                    border-radius:4px;
                    border:1px solid #dcdfe6;
                    overflow: hidden;
                    input {
                        color:rgba(33, 32, 36, 0.9);
                        font-size:15px;
                        height:36px;
                        width:100%;
                        border:0;outline:none; //去除蓝色框
                        padding-left:10px;
                        &:focus {
                            box-shadow: none;
                        }
                    }
                }
                div.t-input.focus {
                    border-color:#9ebeca;
                }
            }
        }
        .my-count {
            width:140px;
            height:150px;
            position: absolute;;
            top:30px;
            right:12px;
            background-color: #f0f3ef;
            color:#fff;
            border-radius:4px;
            padding-top:22px;
            text-align: center;
            h2 {
                font-size:44px;
            }
        }
    }
    a:hover {
        text-decoration:none;
    }
    .err-message {
      display:block;
      padding-top:4px;
      color: #f43232;
      line-height: 14px;;
      font-size: 13px;
      margin-bottom:0px;
      padding-left:0px;
    }
    .err-message.two {
      position: relative;
      top:-7px;
      margin-bottom:5px;
    }
    @media screen and (max-width:992px){
        .title>div,.main-box {
            padding-left:12px;
        }

    }
    @media screen and (max-width:768px){
        .main-box {
            padding:0 15px;
            .my-count {
                display:none;
            }
        }


    }
    @media screen and (max-width:525px) {
        .main-box {
            .my-editor {
                form {
                    // .f-items {
                    //     flex-wrap:wrap;
                    //     &>label {
                    //         flex:0 0 100%;
                    //         text-align:left;
                    //         padding-top:10px;
                    //     }
                    // }
                    // .el-radio-group {
                    //     padding:2px 0px 0px 5px;
                    // }
                    // .el-input__inner {
                    //     height:36px;
                    // }
                }
            }
        }
        // .err-message {
        //     padding-left:0px;
        // }
        // .err-message.two {
        // top:0px;
        // margin-bottom:0px;
        // }
    }
}

</style>
    
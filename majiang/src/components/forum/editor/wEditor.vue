<template>
    <!--编辑器-->
    <div id="editor" class="" spellcheck="false" >
        <!--<p>Welcome!</p>-->
    </div>
</template> 
<script>
import E from './wangEditor.js'
export default{
    data(){
        return{

        }
    },
    props:[
        // 所需编辑内容
        'articleContent'
    ],
    watch:{
        'articleContent':function(){
            if(this.articleContent){
                this.editor.txt.html(this.articleContent)
            }
        }
    },
    methods:{
        verifyImage(link){
            return new Promise((resolve,reject)=>{
                var img = new Image();  
                img.onload=function(){
                    resolve('onload')
                    
                };  
                img.onerror=function(){
                    console.log('error')
                    reject('无效的图片路径')
                };  
                img.src=link  
            })
        },
        initEditor(){
            let e = E()
            this.editor = new e('#editor') 
            this.editor.customConfig.networkImgHandler = (link,cmd) =>{
                // 服务器下载返回
                if( /^\/upload\//.test(link) || new RegExp('^'+process.env.API_HOST+'/upload').test(link) ){
                    cmd.do('insertHTML','<img src="' + link + '">')
                }else if(/^\/static\/img/.test(link)){
                    cmd.do('insertHTML','<img src="' + link + '">')
                }else{
                    this.verifyImage(link).then(res=>{
                        // 通知服务器下载
                        this.$axios.uploadNetworkImage({url:link}).then(res=>{
                            if(res.data.success){
                                // 插入页面
                                cmd.do('insertHTML','<img src="' + res.data.url + '">')
                            }
                        }).catch(err=>{
                            this.$message({
                                showClose: true,
                                message: '图片上传错误！',
                                type: 'error'
                            });
                        })
                    }).catch(err=>{
                        this.$message({
                            showClose: true,
                            message: err,
                            type: 'error'
                        });
                    })
                }
                // return 
            }
            this.editor.customConfig.customUploadImg = (files, insert)=> {
                    // if(files[0].size/1000/1024>0.8){    //不大於0.8M
                    if(files[0].size/1000>500){    //不大於500kb
                        return this.$message({
                            showClose: true,
                            message: '图片不可大于500KB',
                            type: 'warning'
                        });
                    }
                    console.log(files[0]);
                    // return;
                    // insert 是获取图片 url 后，插入到编辑器的方法
                    let uploadData = new FormData();
                    uploadData.append('file', files[0],files[0].name);
                    uploadData.append('type', 'article');
                    console.log(uploadData);
                    this.$axios.uploadImage(uploadData).then(res=>{
                        if(res.data.success){
                            insert(res.data.url)
                        }
                    }).catch(err=>{

                    })




                // 上传代码返回结果之后，将图片插入到编辑器中
                // insert('/static/img/ni.jpg')
            }


            this.editor.create()
            let weText = document.querySelector('.w-e-text')
            weText.classList.add('editor-base-style')
            weText.blur()
            weText.addEventListener('blur',()=>{
                document.querySelector('.w-e-text-container').classList.remove('focus')
            })
            weText.addEventListener('focus',()=>{
                document.querySelector('.w-e-text-container').classList.add('focus')
            })
            weText.addEventListener('input',()=>{
                let content = this.editor.txt.html()
                // content = content.replace(new RegExp(process.env.API_HOST,'g'),'')
                this.$emit('changeContent',content)
            })
            // 如父组件有内容（即编辑）
            if(this.articleContent){
                this.editor.txt.html(this.articleContent)
            }
            // let toolbar = document.querySelector('.w-e-toolbar')
            // let trad = toolbar.firstChild.cloneNode()
            // trad.innerHTML = `<i>繁</i>`
            // toolbar.appendChild(trad)
            // let simp = toolbar.firstChild.cloneNode()
            // simp.innerHTML = `<i>简</i>`
            // toolbar.appendChild(simp)
            // trad.addEventListener('click',this.s2t)
            // simp.addEventListener('click',this.t2s)

        },
        // //   简体转繁体
        // s2t(){
        //     this.editor.txt.html(Chinese.s2t(this.editor.txt.html())) 
        //     this.article.title = Chinese.s2t(this.article.title) 
        // },
        // //   繁体转简体
        // t2s(){
        //     this.editor.txt.html(Chinese.t2s(this.editor.txt.html())) 
        //     this.article.title = Chinese.t2s(this.article.title) 
        // },
    },
    mounted(){
        this.initEditor()
    },
    created(){
    }
}
</script>  
<style lang="less">
    #editor {
        // border:1px solid #dcdfe6;
        // border-radius:4px;
        text-align:left;
    }
</style>
<style>
    .w-e-text-container {
        z-index:0 !important;
        height:auto !important;
        min-height:300px;
        max-height:620px;
        border-radius:0 0 3px 3px;
        overflow: hidden;
        border:1px solid #dcdfe6 !important;
    }
    .w-e-text-container.focus {
        border:1px solid #bcdae5 !important;
    }
    .w-e-text-container .w-e-text {
        min-height:300px;
        max-height:620px;
        padding:10px;
        height:auto;
        overflow-y: auto;
        background-color: #fff;
    }
    .w-e-toolbar .w-e-menu {
        z-index:1 !important;
        margin-right: 2px;
        line-height: 30px;
        /* font-size:14px; */
    }
    .w-e-droplist {
        /* z-index:10002 !important;
        background-color: lime !important; */
    }
    .w-e-toolbar {
        display:flex !important;
        flex-wrap:wrap;
        border-radius:3px 3px 0 0 ;
        border:1px solid #dcdfe6 !important;
        border-bottom:none !important;
        background-color: #fafafa !important;
    }
    /*隱藏 插入代碼 表情  链接*/
    /* .w-e-toolbar>div:nth-last-child(3),
    .w-e-toolbar>div:nth-last-child(7),
    .w-e-toolbar>div:nth-last-child(11) { */

    /* .w-e-toolbar>div:nth-of-type(10),
    .w-e-toolbar>div:nth-of-type(14),
    .w-e-toolbar>div:nth-of-type(18){
        display:none !important;
    } */

    .w-e-toolbar .w-e-droplist ul.w-e-block{
        display:flex;
        justify-content: center;
        flex-wrap:wrap;
        padding:6px 0px;
    }
    .w-e-toolbar .w-e-droplist ul.w-e-block li.w-e-item {
        border:1px solid #eee;
        margin:2px;
        padding:3px;
        height:24px;
    }
    .w-e-toolbar .w-e-droplist ul.w-e-block li.w-e-item:hover {
    }
    .w-e-toolbar h1,.w-e-toolbar h2,.w-e-toolbar h3 {
        line-height: 0.8 !important;
        text-align:left;
        padding-left:.3em;
        color:#333;
    }
    .w-e-toolbar .w-e-droplist ul.w-e-list li.w-e-item {
        padding-left:12px !important;
    }
</style>

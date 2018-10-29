<template>
  <div class="article-tags">
        <div id="tags-container"  :class="tFocus?'focus':''" ref="tagsContainer" autocomplete="off">
            <div class="tag-item" ref="tagItem" contenteditable="false" v-for="(v,i) in article.tagsList" :key="i">
                <span>{{v}}</span>
                <i class="el-icon-error" @click="delTags(i)"></i>
            </div>
            <div  class="tag-input" ref="tagInput" style="display:inline-block;width:100%">
                <div class="tag-err-msg" v-if="tagErrMsg"><i class="el-icon-warning" style="color:#e94242"></i> {{tagErrMsg}}</div>
                <input
                @focus="tFocus=true"
                placeholder="输入标签"
                v-model="inputTag"
                @input="querySearch"
                @blur="inputBlur();tFocus=false"
                @keydown.delete="deleteTagsByBtn"
                @keydown.down="downBtnHandler"
                @keydown.up="upBtnHandler"
                @keyup.space="spaceBtnHandler"
                @keydown.enter="enterBtnHandler"
                spellcheck="false"
                >

                            <div :class="'btn-add '+(showAddBtn?'active':'')" ref="btnAdd" v-if="true"  @click="tagsCheck(inputTag,'btn')">
                                <i class="el-icon-plus"></i>
                            </div>
                <!-- <ul v-if="searchTagsList.length>0" style="min-width:155px;max-width:240px" class="search-items-box">
                    <li v-if="searchTagsList[0]['empty']" class="tag-empty-show">無匹配數據</li>
                    <li v-else @click="tagsCheck(v.TagName,'select')"  v-for="(v,i) in searchTagsList" :key="i" ref="searchItem" :class="searchActiveIndex===i?'active':''">{{v.TagName}}</li>
                </ul> -->
                <ul v-if="searchTagsList.length==0 && requestTags" style="width:145px;">
                    <li ><i class="el-icon-loading"></i></li>
                </ul>
            </div>
        </div>
        <div class="define-tags" v-if="defineTagsList.length>0">
            <span>热门标签：</span>
            <span class="d-items" v-for="(v,i) in defineTagsList" :key="i" @click="tagsCheck(v)">{{v}}</span>
        </div>
  </div>
</template>
<script>
export default {
    data(){
        return {
            selectTag:'',
            inputTag:'', //标签输入
            defineTagsList:[], //预定义标签
            searchTagsList:[], //搜索备选标签
            timeId:'',
            timeId1:'', //標籤錯誤顯示時間定時
            showAddBtn:false, //显示添加标签按钮
            tagErrMsg:'', //標籤輸入錯誤
            requestTags:false, //请求匹配的标签
            searchActiveIndex:'null', //搜索標籤選中角標
            Grade:2,
            article:{
                tagsList:[]
            },
            defineTagsList:[],
            tFocus:false,
        }
    },
    props:[
        'tags'
    ],
    watch:{
    "article.tagsList":function(){
        // this.verify('tagsList')
        this.setInputWidth()
        this.$emit('currentTags',this.article.tagsList)
    },
    "tags":function(){
        if(this.tags){
            this.article.tagsList = this.tags
        }
    }
    },
    methods:{
            //   刪除鍵刪除事件
            deleteTagsByBtn(){
                if(this.inputTag.length==0 && this.article.tagsList.length>0){
                    this.article.tagsList.pop(this.article.tagsList.length-1)
                }
            },
            delTags(index){
                this.article.tagsList.splice(index,1)
            },
            //   輸入標籤處理函數
            querySearch() {
                    this.searchTagsList = []
                    this.searchActiveIndex = 'null'
                    clearTimeout(this.timeId)
                    let len = this.$utill.strLength(this.inputTag.trim())
                    if(len>24){
                        setTimeout(()=>{
                            // 对超出长度的裁剪
                            this.inputTag = this.$utill.tooLongTrim(this.inputTag,24)
                        },28)
                        this.tagErrMsg = '标签长度过长'
                        clearTimeout(this.timeId1)
                        this.timeId1 = setTimeout(()=>{
                            this.tagErrMsg = ''
                        },2500)
                        return
                    }

                    // this.inputTag = this.$utils.strTrim(this.inputTag)
                    if(this.inputTag){
                        if(this.Grade && this.Grade>=0){  //判定等級，符合等級后添加
                            this.showAddBtn = true
                            // 根據文字設置按鈕left距離
                            // setTimeout(()=>{
                            //     let w = this.inputTag.length * 15 + 22
                            //     w = w>145? 145:w
                            //     w = w<70? 70:w
                            //     if(this.$refs.btnAdd){
                            //         this.$refs.btnAdd.style.left = w +'px' 
                            //     }
                            // },32)
                        }
                        this.timeId = setTimeout(()=>{
                            // cb([{"TagName": "人物"}])
                            // 标签搜索
                            if(this.inputTag){
                                // this.requestTags = true
                                // axios.account.getTags({
                                //     Tag:this.inputTag
                                // }).then(res=>{
                                //     this.requestTags = false
                                //     if(res.data.ResultCode==200){
                                //         this.searchTagsList = res.data.Data
                                //     }else if(res.data.ResultCode==201){
                                //         this.searchTagsList = [{'empty':true}]
                                //     }
                                // }).catch(err=>{
                                //     // this.requestTags = false
                                //     console.log('error!',err);
                                // })
                            }
                        },1200)
                    }else{
                        this.showAddBtn = false
                    }
            },
            //   選擇添加標籤處理函數
            tagsCheck(tag,flag){
                    tag = tag.replace(/[\s\r\n]+/g,'')
                    if(flag==='btn'){ //通過按鍵添加
                        // if(this.searchTagsList.length>0){
                        //     tag = this.searchTagsList[0].TagName
                        // }
                        if(this.Grade && this.Grade>=0){  //判定等級，符合等級后添加

                        }else{
                            return this.$message({
                            showClose: true,
                            message: '等級'+0+'級以上可創建標籤',
                            type: 'warning'
                            });
                        }
                        if(!this.showAddBtn) return;

                    }
                    let len = this.$utill.strLength(tag)
                    if(len<1 || len>24){
                        this.tagErrMsg = len>24?'标签长度过长':'标签不可为空'
                        clearTimeout(this.timeId1)
                        this.timeId1 = setTimeout(()=>{
                            this.tagErrMsg = ''
                        },2200)
                        return
                    }
                    
                    let reg = /^[\u4e00-\u9fa5A-Za-z0-9]+$/
                    if(!reg.test(tag)){
                        this.tagErrMsg = '标签只允许中文、英文或数字'
                        clearTimeout(this.timeId1)
                        this.timeId1 = setTimeout(()=>{
                            this.tagErrMsg = ''
                        },2200)
                        return

                    }

                    if(tag && this.article.tagsList.indexOf(tag)==-1 ){
                        if(this.article.tagsList.length>=9){
                            this.tagErrMsg = '最多允许添加9个标签'
                            clearTimeout(this.timeId1)
                            this.timeId1 = setTimeout(()=>{
                                this.tagErrMsg = ''
                            },2200)
                            return
                        }
                        this.article.tagsList.push(tag)
                        this.searchTagsList=[]
                        if(flag==='btn' || flag==='select'){ //点击按钮或下拉添加
                            this.inputTag = ''
                            this.showAddBtn = false
                        }
                    }else{
                        this.tagErrMsg = '标签重复!'
                        clearTimeout(this.timeId1)
                        this.timeId1 = setTimeout(()=>{
                            this.tagErrMsg = ''
                        },2200)
                    }
                    this.requestTags = false
                    clearTimeout(this.timeId)
            },
            //   標籤輸入失去焦點
            inputBlur(){
                    setTimeout(()=>{
                        this.searchTagsList=[]
                        this.searchActiveIndex = 'null'
                    },220)
            },
            //   设置tag输入框宽度
            setInputWidth(){
                    let parent = this.$refs.tagsContainer
                    let tagInput = this.$refs.tagInput
                    tagInput.style.width = 140+'px'
                    setTimeout(()=>{
                            if(this.$refs.tagItem.length==0){
                                tagInput.style.width = parent.offsetWidth-5 +'px'
                                return
                            }
                            let lastItem = this.$refs.tagItem[this.$refs.tagItem.length-1]
                            let remWidth = parent.offsetWidth - (lastItem.offsetLeft+lastItem.offsetWidth-parent.offsetLeft)
                            if(remWidth<150){
                                tagInput.style.width = parent.offsetWidth-5 +'px'
                            }else{
                                tagInput.style.width = remWidth-5+'px'
                            }
                    },30)
            },
            //   標籤輸入回車鍵
            enterBtnHandler(){
                if(this.searchActiveIndex!=='null' && this.searchTagsList.length>this.searchActiveIndex){
                    this.tagsCheck(this.searchTagsList[this.searchActiveIndex].TagName,'btn')
                }else{
                    this.tagsCheck(this.inputTag,'btn')
                }
                return
            },
            //   標籤輸入上鍵
            downBtnHandler(){
                if(this.$refs.searchItem){
                    let len = this.searchTagsList.length
                    if(!this.searchActiveIndex === 'null'){
                        this.searchActiveIndex = 0
                    }else{
                        if(this.searchActiveIndex<(len-1)){
                            this.searchActiveIndex += 1
                        }else{
                            this.searchActiveIndex = 0
                        }
                    }
                }
            },
            //   標籤輸入下鍵
            upBtnHandler(){
                    if(this.$refs.searchItem && this.searchActiveIndex !== 'null'){
                        let len = this.searchTagsList.length
                        if(this.searchActiveIndex>0){
                            this.searchActiveIndex -= 1
                        }else{
                            this.searchActiveIndex = len-1
                        }
                    }
                
            },
            //   標籤輸入空格鍵事件
            spaceBtnHandler(){
                //   末尾是空白，添加標籤
                let t = this.inputTag.trim()
                let last = this.inputTag[this.inputTag.length-1];
                if( t && /[\s\r\n]/.test(last)){
                    this.tagsCheck(this.inputTag,'btn')
                }
            },
    },
    created(){
        if(this.tags){
            this.article.tagsList = this.tags
        }
        this.defineTagsList = this.defineTags || ['ENTJ','INTP','NT']
    }
}
</script>
<style lang="less" scoped>
.article-tags {
    width:100%;
    // display:flex;
    // min-height:120px;
    // overflow: hidden;
    // border-top:1px solid #f1f1f1;
    // padding: 8px 0;

    #tags-container.focus {
        border-color:#9ebeca;
    }
    #tags-container {
        min-height:34px;
        width:100%;
        border:1px solid #dcdfe6;
        display:flex;
        flex-wrap:wrap;
        border-radius:4px;
        .tag-item {
            height:26px;
            line-height: 26px;
            display:inline-block;
            margin:5px;
            margin-right:0px;
            margin-bottom:0px;
            padding:0 7px;
            padding-right:24px;
            position: relative;
            background: #30bd9c;
            color:#fff;
            font-size:14px;
            border-radius:3px;
            cursor:default;
            user-select: none;
            &>i {
                position: absolute;
                top:8px;
                right:5px;
                font-size:12px;
                cursor: pointer;
                color:#f8f8f8;
                &:hover {
                    color:#fff;
                }
            }
        }
    }
    .define-tags {
        display:flex;
        flex-wrap:wrap;
        padding:6px 0 0;
        color:#ccc;
        font-size:14px;
        .d-items {
            margin-right:10px;
            margin-bottom:5px;
            border-radius:3px;
            padding:0px 4px;
            border:1px solid #f0f0f0;
            font-size:14px;
            cursor:pointer;
            &:hover {
                // color:#777;
                color:#fff;
                border-color:#87d2e8;
                background-color: #87d2e8;
                // border-color:#bbb;
                // background-color: #bbb;
            }
        }
    }
    .tag-input {
        position: relative;
        padding-left:27px;
        ul {
            position: absolute;
            top:38px;
            left:0px;
            background-color: #fff;
            // border:1px solid #63c1dd;
            box-shadow: 0 0 4px #aaa;
            padding:3px 0;
            z-index:2 ;
            max-height:300px;
            // overflow-y: scroll;
            // border-radius:2px;
            li {
                height:26px;
                line-height:26px;
                padding:0 22px 0 7px;
                cursor:pointer;
                &:hover {
                    background-color: #e7e7e7;
                }
            }

            li.tag-empty-show {
                cursor:auto;
                color:#aaa;
                &:hover {
                    background-color: transparent;
                }
            }

        }
        input {
            line-height: 36px;
            height: 36px;
            padding-left:12px;
            display: inline-block;
            width:100%;
            border:0;outline:none; //去除蓝色框
            font-size:15px;
            border-radius:5px;
            color:rgba(33, 32, 36, 0.9);
        }
        .search-items-box {
            li.active {
                background-color: #e7e7e7;
            }
        }
        .btn-add {
            position: absolute;
            top:5px;
            left:5px;
            border-radius:4px;
            transition: all .1s;
            width:26px;
            height:26px;
            background-color: #bbc3cb;
            text-align: center;
            line-height: 26px;
            i {
                color:#ffffff;
                font-weight:700;
            }
        }
        .btn-add.active {
            background-color: #3ebe9c;
            cursor:pointer;
        }
        .tag-err-msg {
            position: absolute;
            left:2px;
            top:-20px;
            font-size:13px;
            color:red;
            background-color: #fdebeb;
            padding:1px 3px;
            border-radius:3px;
        }
    }
    
}
</style>



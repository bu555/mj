<template>
    <div class="my-comment">
         <div class="comment" v-if="!accountComment && (this.aid || this.eid)" v-loading="loading2">
            <div class="c-header" > 
                  <h2>评论</h2>
                  <ul>
                      <li :class="commentActive==='hot'?'active':''" @click="commentActive='hot'">热门</li>
                      <li :class="commentActive==='time'?'active':''" @click="commentActive='time'">时间顺序</li>
                      <li :class="commentActive==='time-reverse'?'active':''" @click="commentActive='time-reverse'">时间倒序</li>
                  </ul>
             </div>
             <div class="c-body">
                <div v-if="commentList && !loading2 && commentList.length<1" class="if-comment-empty">暂无评论</div>
                <div v-if="commentList && commentList.length>0" class="c-list" v-for="(v,i) in commentList" :key="i">
                    <div class="photo">
                        <Avatar :src="v.avatar" :uid="v.uid" size="small-x"></Avatar>
                        <!-- <router-link :to="'/info/'+v.uid">
                            <img v-if="v.avatar" :src="$pathAvatar+v.avatar" alt="">
                            <img v-else src="/static/img/logo_a.png" alt="">
                        </router-link> -->
                    </div>
                    <div class="c-name">
                        <em v-if="v.uid" class="overflow-row-1">
                            <router-link :to="'/info/'+v.uid">
                                {{v.r_name}}
                            </router-link>
                        </em>
                        <em v-else class="overflow-row-1">
                                {{v.r_name}}
                        </em>
                        <span>{{$moment(v.c_time).startOf().fromNow()}}</span> 
                    </div>
                    <!-- 新回复的评论 -->
                    <div class="c-content overflow-row-5" @click="showAllComment($event)" >
                        <span class="details">{{v.content}}</span>
                    </div>
                    <!-- 点赞与回复 -->
                    <div class="zan c-c">
                        <i :class="'zan-zan fa ' + (v.isZaned?'fa-thumbs-up active':'fa-thumbs-o-up')"  @click="zan($event,v.cid,v.zans)" style="min-width:45px;"><span>赞</span><em style="padding-left:2px">{{v.zans>999?'999+':v.zans}}</em> </i> 
                        <!-- 借用zan字段控制评论（服务端统一返回的是null） -->
                        <i :class="'comment fa '+ (v.zan?' active fa-comment':'fa-comment-o')" @click="v.zan=!v.zan;v.repContent=''"><span>评论</span><em style="padding-left:2px">{{v.replay.length}}</em></i> 
                        <i><span>更多</span><span class="fa fa-angle-down" style="font-size:16px"></span></i>
                    </div>

                    <div class="reply" v-if="v.zan">
                        <el-input
                        spellcheck="false"
                        type="textarea"
                        autosize
                        placeholder="回复内容："
                        :autosize="{ minRows: 2, maxRows: 4}"
                        @keydown.enter.native="ctrlAndEnter(reply(v.cid,v.repContent,()=>{v.zan=false;v.comment=''}))"
                        v-model="v.repContent">
                        </el-input>
                        <div class="reply-btn">
                            <span>Ctrl+Enter 发表</span>
                            <div>
                                <button class="bu-button bu-default" size="mini" @click="v.zan=!v.zan;v.repContent=''">取消</button>
                                <button class="bu-button bu-gblue" size="mini" @click="reply(v.cid,v.repContent,()=>{v.zan=false;v.comment=''})">发送</button>
                                <!-- <div style="text-align: right; padding-top: 10px;"><button class="bu-button bu-default">取 消</button> <button class="bu-button bu-gblue">发 表</button></div> -->
                            </div>
                        </div>
                    </div>
                       <!--回复用户的评论-->
                    <div v-if=" (v.replay instanceof Array) && v.replay.length>0" v-for="(v1,i1) in v.replay" :key="i1" class="c-content c-replay overflow-row-5" @click="showAllComment($event)" >
                        <span>
                            <router-link :to="'/info/'+v1.uid">
                                {{v1.r_name}}
                            </router-link>
                        <em style="color:#9a9a9a;font-size:14px;padding-top:9px"> {{$moment(v1.c_time).format('YYYY.MM.DD HH:mm')}} 回复</em>：</span>
                        <span class="details">{{v1.content}} </span>
                    </div>
                </div>

                <div class="load-more" v-if="!loading2 && currentCommentList.length==size" @click="moreComment">
                或许还有更多...
                </div>
             </div>
         </div>
        <!-- 来自account的评论展示 -->
        <div class="comment" v-else-if="(accountComment instanceof Array) && accountComment.length>0 " style="margin-top:15px;min-height:100px">
            <div class="c-header" > 
                  <h2>我的评论</h2>
                  <!-- <ul>
                      <li>热门</li>
                      <li>时间顺序</li>
                      <li>时间倒序</li>
                  </ul> -->
             </div>
            <div class="c-body">
                <div class="c-list" v-for="(v,i) in accountComment" :key="i">
                        <div class="photo">
                            <Avatar :src="v.avatar" :uid="v.uid" size="small"></Avatar>
                            <!-- <router-link :to="'/info/'+v.uid">
                                <img :src="$store.state.userInfo.avatar?$pathAvatar +$store.state.userInfo.avatar:'/static/img/logo_a.png'" alt="">
                            </router-link> -->
                        </div>
                        <div class="c-name">
                            <em class="overflow-row-1">{{$store.state.userInfo.r_name}}</em>
                            <span>{{$moment(v.c_time).startOf().fromNow()}}</span> 
                        </div>
                        <!-- <div v-if="v.rep" class="c-content overflow-row-5" @click="showAllComment($event)" style="background:#eee;padding-left:5px">
                            <span style="color:#5e8dd0">{{v.rep.r_name}}：</span>
                            {{v.rep.content}}
                        </div> -->
                        <div class="c-content overflow-row-5" @click="showAllComment($event)" >
                            <span class="details">{{v.content}}</span>
                        </div>
                        <!-- 点赞与回复 -->
                        <div class="zan c-c">
                            <i :class="v.isZaned?'fa fa-thumbs-up active':'fa fa-thumbs-up'"  style="cursor:auto"><em style="padding-left:2px">{{v.zans>999?'999+':v.zans}}</em> </i> 
                            <i class="fa fa-comment" style="cursor:auto"></i> 
                        </div>
                        <!-- <div class="reply" v-if="v.zan">
                            <el-input
                            type="textarea"
                            autosize
                            placeholder="回复内容："
                            v-model="v.repContent">
                            </el-input>
                            <div class="reply-btn">
                                <el-button type="primary" size="mini" @click="reply(v.cid,v.repContent,()=>{v.zan=false;v.comment=''})">发送</el-button>
                            </div>
                        </div> -->
                        <!--回复用户的评论-->
                        <div v-if=" (v.replay instanceof Array) && v.replay.length>0" v-for="(v1,i1) in v.replay" :key="i1" class="c-content c-replay overflow-row-5" @click="showAllComment($event)" >
                            <span>
                                <router-link :to="'/info/'+v1.uid">
                                    {{v1.r_name}}
                                </router-link>
                            <em style="color:#9a9a9a;font-size:14px;padding-top:9px"> {{$moment(v1.c_time).format('YYYY.MM.DD HH:mm')}} 回复</em>：</span>
                            <span class="details">{{v1.content}} </span>
                        </div>
                </div>
            </div>
        </div> <!--来自account的评论 end-->
        
    </div>
</template>
<script>
import Avatar from './avatar'
import { setTimeout } from 'timers';
export default {
    data(){
        return {
            commentActive:'hot',
            loading2:false,
            zaning:false,
            commentList:'',
            // commentList:[
            //     {
            //         avatar:"/5b5eddfab0d08d195c8be81b.jpg",
            //         c_time:"2018-08-15T01:07:37.684Z",
            //         cid:"lgbyD2f",
            //         content:"spaceX??",
            //         isZaned:false,
            //         r_name:"盖茨先生",
            //         rep:{content: "特斯拉的市值约为720亿美元", r_name: "C1046835", uid: "5b6a677d19fe6c35cc71df3c"},
            //         replay:"wyRAyi5",
            //         uid:"5b5eddfab0d08d195c8be81b",
            //         zan:null,
            //         zans:0,
            //         _id:"5b737cd9528891378c64056c"
            //     },
            // ],
            currentCommentList:'',
            size:3,
            commentPage:1,
            accountComment:'',
            tabList:[
                {
                    val:'热门',
                    key:'hot'
                },
                {
                    val:'时间',
                    key:'time'
                }
            ],
            firstClick:false
        }
    },
    components:{
        Avatar,
    },
    props:[
        'aid',
        'eid',
        'accountCommentList', //用户评论
    ],
    watch:{
        'commentActive':function(){
            this.commentPage = 1
            this.getCommentByAid()
        },
        'aid':'getCommentByAid',
        'eid':'getCommentByAid',
        'accountCommentList':'getCommentByAid'
    },
    computed:{
        
    },
    methods:{
        ctrlAndEnter(callback){
            if(window.event.ctrlKey){
                callback&&callback()
            }
        },
        zan(e,cid,zans){
            let pro 
            let params = {
                cid:cid
            }
            if(this.aid){
                params.aid = this.aid
                pro = this.$axios.clickArticleCommentZan(params)
            }else if(this.eid){
                params.eid = this.eid
                pro = this.$axios.clickExampleCommentZan(params)
            }else{
                return
            }
            if(this.zaning) return
            this.zaning = true
            let d = e.currentTarget.querySelector('em')
            let iTag = e.currentTarget
            let count = d.innerHTML
            pro.then(res=>{
                this.zaning = false
                if(res.data.success){
                    if(/^\d+$/.test(count)){
                        d.innerHTML = Number(count)+res.data.result.count
                    }else{
                        console.log('非数字');
                    }
                    if(res.data.result.count==1){
                        iTag.classList.add('active')
                        iTag.classList.add('fa-thumbs-up')
                        iTag.classList.remove('fa-thumbs-o-up')
                    }else if(res.data.result.count==-1){
                        iTag.classList.remove('active')
                        iTag.classList.remove('fa-thumbs-up')
                        iTag.classList.add('fa-thumbs-o-up')
                    }
                }
            }).catch(err=>{
                this.zaning = false
            })

        },
        getCommentByAid(){
            let pro
            let params = {
                page:this.commentPage,
                size:this.size,
                type:this.commentActive
            }
            if(this.aid){
                params.aid = this.aid
                pro = this.$axios.getCommentByAid(params)
            }else if(this.eid){
                params.eid = this.eid
                pro = this.$axios.getComment(params)
            }else{
                return
            }

            this.loading2 = true
            pro.then(res=>{
                this.loading2 = false
                if(res.data.success){
                    this.currentCommentList = res.data.data
                    if(this.commentPage===1){
                        this.commentList = []
                    }
                    let list = res.data.data.map((v,i)=>{
                        v.showMore = false
                        v.showComment = false
                        return v
                    })
                    this.commentList = this.commentList.concat(list)
                }
            }).catch(err=>{
                this.loading2 = false
            })
        },
        reply(cid,repContent,callback){
            repContent = repContent?repContent:''
            if(!repContent.trim()){
                // this.$message.error('请输入回复内容！');
                return 
            }
            this.loading = true
            let pro 
            let params = {
                cid:cid,
                content:repContent
            }
            if(this.aid){
                params.aid = this.aid
                pro = this.$axios.articleAddComment( params )
            }else if(this.eid){
                params.eid = this.eid
                pro = this.$axios.addComment( params )
            }
            pro.then(res=>{
                this.loading = false
                if(res.data.success){
                    this.$message({
                        message: '回复成功！',
                        type: 'success'
                    });
                    callback && callback()
                }
            }).catch(err=>{
                this.loading = false
            })
        },
        moreComment(){
            this.commentPage = this.commentPage-0+1  //页数加1
            this.getCommentByAid()  //获取下一页评论
        },
        // 显示所有评论
        showAllComment(e){
            if(this.firstClick){
                e.currentTarget.classList.toggle('overflow-row-5')
            }
            this.firstClick = true
            setTimeout(()=>{
                this.firstClick = false
            },400)
        },
        init(){
            if(this.accountCommentList){
                this.accountComment = this.accountCommentList
            }else if(this.aid || this.eid){
                this.getCommentByAid()
            }
        }

    },
    mounted(){
    },
    created(){
        this.init()
    }
}
</script>
<style lang="less" scoped>
.my-comment {
    .comment {
        // box-shadow: 0 2px 3px #cacaca;
        // border-radius:4px 4px 0 0;
        overflow: hidden;
        .c-header {
            display:flex;
            justify-content: space-between;
            align-items:flex-end;
            padding:12px 0 5px;
            border-bottom:1px solid #f0f0f0;
            // color:#0e959d;
            color:#555;
            h2 {
                // background: linear-gradient(#7d90a1, #6e8294);
                font-weight:700;
                font-size:20px;
            }
            ul {
                display:flex;
                align-items:center;
                li {
                    color:#aaa;
                    margin-left:1em;
                    font-size:15px;
                    cursor:pointer;
                    &:hover {
                        // color:#3e73b2;
                    }
                }
                li.active {
                    color:#3e73b2;
                    // text-shadow: 1px 0px 1px blue;
                    font-weight:600;
                }
            }
        }
        .if-comment-empty {
            width:100%;
            text-align:center;
            height:100px;
            line-height: 100px;
            color:#ccc;
        }
        .c-body {
            // padding:1% 4.5% 5% 4%;
            min-height:220px;
            background-color: #fff;
            .c-list {
                // background: pink;
                padding:12px 0px 3px 64px;
                border-bottom:1px solid #f7f7f7;
                position: relative;
                color:#3c3c3c;
                .photo {
                    // width:38px;
                    // height:38px;
                    // border:1px solid #eee;
                    position: absolute;
                    top:15px;
                    left:0px;
                    border-radius:2px;
                    img {
                        width:100%;
                        height:100%;
                    }
                }
                .c-name {
                    font-size:15px;
                    display:flex;
                    align-items:center;
                    color:#7f7d7d;
                    position: relative;
                    margin-bottom: 2px;
                    a {
                        color:#3e73b2;
                    }
                    &>em {
                        display:inline-block;
                        max-width:120px;
                        color:#555;
                        // font-weight:700;
                    }
                    &>span {
                        padding-left:10px;
                        font-weight:400;
                        font-size:14px;
                    }
                }
                .c-content {
                    padding:2px 0 2px;
                    font-size:15px;
                    word-break:break-all; //英文换行
                    margin-bottom:6px;
                    cursor:default;
                    .details {
                        font-family:'Microsoft Yahei';
                    }
                    em>a {
                         
                    }
                }
                .c-content.c-replay {
                    border-left:3px solid #d9d9d9;
                    background:#fff;
                    padding:6px;
                    padding-left:15px;
                    padding-bottom:10px;
                    margin-bottom:0px;
                    border-bottom:1px solid #f1f1f1;
                    position: relative;
                    a {
                         color:#3e73b2;
                    }
                    &:after {
                        content:"";
                        display:block;
                        height:10px;
                        width:100%;
                        position:absolute;
                        left:0 ;
                        bottom:0;
                        background-color: #fff;
                    }
                }
                // 点赞与回复
                .zan.c-c {
                    line-height: 20px;;
                    // vertical-align: middle;
                    display:flex;
                    align-items: center;
                    min-width:55px;
                    // max-width:82px;
                    // margin-right:42px;
                    // color:#8590a6;
                    color:#999999;
                    margin-bottom:12px;
                    padding-left:3px;
                    i {
                        cursor:pointer;
                        font-size:20px;
                    }
                    i+i {
                        margin-left:1em;
                    }
                    i.active {
                        color:#409eff;
                    }
                    i.active:hover {
                        color:#409eff;
                    }
                    i:hover {
                        // color:#aaa;
                    }
                    span {
                        margin-left:3px;
                    }
                    em,span {
                        font-size:13px;
                        position: relative;
                        top:1px;
                    }
                    i.comment {
                        font-size:18px;
                    }
                    i.zan-zan {
                        position:relative;
                        top:1px;
                        span,em {
                            position:relative;
                            top:-1px;
                        }
                    }
                }
                // 回复文本框
                .reply {
                    border-left:3px solid #d9d9d9;
                    position: relative;
                    padding:10px 0;
                    // border-top:1px dotted #eee;
                    padding-left:15px;
                    // background-color: #f5f5f5;
                    .reply-btn {
                        // position: absolute;
                        // top:10px;
                        // right:0px;
                        display:flex;
                        justify-content:space-between;
                        padding-top:5px;
                        span {
                            font-size:13px;
                            color:#ccc;
                        }
                        button {
                            // background-color: #2885cc;
                        }
                    }
                    .el-button--mini, .el-button--mini.is-round {
                        padding: 7px 15px;
                    }
                    .el-textarea  {
                        min-height:56px;
                    }
                }
            }
            .load-more {
                max-width:365px;
                margin:0 auto;
                text-align:center;
                padding:10px 0;
                cursor:pointer;
                color:#598dd3;
                &:hover {
                    color:#456ea5;
                }
            }
        }
    }
    .overflow-row-1 {
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .overflow-row-5 {
        display: -webkit-box;    
        -webkit-box-orient: vertical;    
        -webkit-line-clamp: 5;    
        overflow: hidden;
    }
    a:hover {
        text-decoration:none;
    }
    @media screen and (max-width:768px){
        flex-wrap:wrap;
        .main-box {

        }
    }
    @media screen and (max-width:525px) {
            .comment {
                // padding:2% 2.5% 2% 3%;
                padding:0;
                .c-body {
                    .c-list {
                        padding-left:58px;
                        .c-content {
                        }
                    }
                }

            }
    }
}
</style>



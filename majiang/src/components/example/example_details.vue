<template>
<div class="examp-details">
    <NavMain></NavMain>
    <NavSub :data="data"  @submitSearch="search"></NavSub>
    <!-- <div class="crumbs">
        <ul>
            <li>
                <router-link to="/example">名人汇</router-link>
            </li>
            <li class="fa fa-angle-right"></li>
            <li class="overflow-row-1-x">
                <span v-if="exampleItem">{{exampleItem.name}}</span>
            </li>
        </ul>
    </div> -->
        <div class="main-box "  v-loading="loading3">
            <!--人物详情-->
            <div class="example-box">
                    <div class="e-info">
                        <div  class="font overflow-row-13">{{exampleItem.info}}
                        </div>
                        <div class="item">
                            <!--<img :src="exampleItem.img_url" alt="">-->
                            <div class="photo">
                                <img v-if="exampleItem" :src="exampleItem.img_url" alt="">
                            </div>
                            <div class="e-more" v-if="0">
                                <a href="" target="_blank">[维基百科]</a>
                                <a href="" target="_blank">[百度百科]</a>查看更多
                            </div>
                        </div>
                    </div>
                    <!--投票-->
                    <div class="vote-box" v-if="!isVote">
                            <div class="info">
                            </div>
                            <div class="vote-title">
                                <p class="tit overflow-row-1">{{exampleItem.name}}</p>
                                <p>( {{exampleItem.type?exampleItem.type.toUpperCase():''}} )</p>
                                
                            </div>
                            <div class="figure"></div>
                            <div class="vote-result">
                                <!--<voteResult v-if="exampleItem" :example="exampleItem"></voteResult>-->
                                <div class="r-item" v-for="(v,i) in voteArr.slice(0,6)" :key="i">
                                    <div class="type">{{v.type?v.type.toUpperCase():''}}</div>
                                    <div class="prog">
                                        <div :style="'width:'+v.perce">
                                        </div>
                                    </div>
                                    <div class="count">{{v.count}}</div>
                                    
                                </div>
                                <!-- <div v-if="isRepeat">你已参与</div> -->
                            </div>
                            <div style="padding-top:14px">
                                <!--<el-button type="primary" @click="goVote()">投票</el-button>-->
                                <!--<el-button type="primary" @click="isVote=true" style="height:34px;padding:0 22px">去投票</el-button>-->
                                <!--<button class="cupid-green" @click="goVote()" v-if="!isRepeat">去投票</button>-->
                                <!--<button class="clean-gray-nohover" v-if="isRepeat" style="color:#aaa">已投票</button>-->

                            </div>
                    </div>
            </div>
            <div class="main-ctrl">
                <div>
                    <span  :class="'a-like btns2 '+ (exampleItem.isLiked?'active':'')"  @click="clickLike"><i :class="exampleItem.isLiked?'fa fa-star':'fa fa-star-o'"></i><br/>关注 <em>({{exampleItem.likes}})</em></span>
                    
                </div>
                <div>
                    <span  :class="'a-vote btns2 '+ (exampleItem.isVoted?'active':'')" :style="exampleItem.isVoted?'cursor:auto':''" @click="!exampleItem.isVoted?showVote=!showVote:showVote=showVote"><i class="fa fa-bar-chart"></i><br/>投票 <em>({{exampleItem.total}})</em></span>
                    
                </div>
                <div>
                    <span  @click="showComment=true"><i class="fa fa-pencil-square-o"></i><br/>写评论</span>
                </div>
            </div>
            
            <!-- <div class="a-vote-view" v-if="showVote && !exampleItem.isVoted"> -->
            <div class="a-vote-view" v-if="showVote">
                <div>
                    <h2><i class="fa fa-bar-chart"></i> 投 票</h2>
                    <div style="text-align:right;" class="v-bar">
                        <div class="vote-info">
                            <div class="photo">
                                <img :src="exampleItem?exampleItem.img_url:''" alt="">
                            </div>
                            <p class="overflow-row-1">{{exampleItem?exampleItem.name:''}}</p>
                        </div>
                        <el-select v-model="myVote" filterable placeholder="请输入或选择类型">
                            <el-option
                            v-for="(item,i) in $mbti.types"
                            :key="i"
                            :label="item.toUpperCase()"
                            :value="item">
                            </el-option>
                        </el-select>
                        <button class="bu-button bu-green" @click="vote()">投 票</button>
                        <!-- <el-button size="small" type="primary" @click="comment()">发 表</el-button> -->
                    </div>
                    <ul>
                        <li>投票须知：</li>
                        <li>1、投票结果不允许二次修改</li>
                        <li>2、此投票旨在为用户提供一个最接近真实的参考数据，因此我们希望您的投票行为是建立在对该人物有所了解基础之上的</li>
                        <li>3、请遵从您最真实的看法（勿受到高票结果的影响）</li>
                        <li>4、您可以在评论区中发起讨论，有必要也可进行更多的补充说明</li>
                    </ul>
                    <span class="close-btn"  @click="showVote=false;myVote=''">关闭</span>
                </div>
                
            </div>
            <div :class="'a-publish-comment '+(showComment?'mobile-show':'')">
                <p style="margin-bottom:5px">发表评论：</p>
                <el-input type="textarea" v-model="myComment" placeholder="写下你的观点....." :rows="3" 
                        spellcheck="false"></el-input><br>
                <div style="text-align:right;padding-top:10px">
                    <button class="bu-button bu-default" @click="showComment=false;myComment=''">取 消</button>
                    <!-- <el-button size="small" type="primary" @click="comment()">发 表</el-button> -->
                    <button class="bu-button bu-gblue" style="margin-left:7px;" @click="comment()">发 表</button>
                </div>
            </div>
            
            <!-- 推荐的内容 -->

            <div class="recommend" >
                <section class="relation" >
                    <h2>更多</h2>
                    <ul>

                        <li v-for="(v,i) in relationList" :key="i">
                            <router-link :to="'/example/'+v._id">
                                <div class="photo">
                                    <img :src="v.img_url" alt="">
                                </div>
                                <span>{{v.name}}</span>
                            </router-link>
                        </li>
                    </ul>
                </section>
            </div> 

            <!--评论区-->
            <Comment v-if="eid" :eid="eid"></Comment>


            
        </div>
</div> 
</template>
<script>
import Comment from '../common/comment'
import NavMain from '@/components/common/nav_main'
import NavSub from '@/components/common/nav_sub'
export default {
    data(){
        return {
            exampleItem:'',
            isVote:false,
            isGetDate:true,
            isRepeat:false,
            fromPath:'',
            voteArr:[],
            myComment:'',
            myVote:'',
            typeList:[],
            tabFixed:false, //tab定位
            eid:'',
            loading2:false,
            loading3:false,
            showVote:false,
            showComment:false,            
            data:{
                title:{
                    value:'名人汇',
                    link:'/example?type=all'
                },
                // items:[
                //     {
                //         value:'',
                //         link:''
                //     }
                // ],
                search:{
                    placeholder:'输入名字搜索',
                    value:''
                },
                // maxWidth:970,
            },
            relationList:[]

        }
    },
    components:{
        Comment,
        NavMain,
        NavSub,
    },
    watch:{
        // 监控登录成功
        '$store.state.userInfo':function(){
            if(this.$store.state.userInfo){
                this.initData()
            }
        },
        '$route.path':function(){
            this.initData()
        }
    },
    computed:{
    },
    methods:{
        myVote2chinese(type){
            if(type){
                let str = ''
                for(let i=0;i<type.length;i++){
                    str += this.$mbti.e2c[type[i].toLowerCase()]
                }
                return str+"型"
            }
        },
        search(value){
            if(!value) return //清空 不处理
            this.$router.push({
                path:'/example',
                query:{
                    s:value
                }
            })

        },
        //投票
        vote(){
            if(!this.myVote){
                this.$message({
                    showClose: true,
                    message: '请先选择类型',
                    type: 'warning'
                });
                return;
            }
            this.$confirm('确定选择<span style="font-weight:600;color:#0e959d"> '+this.myVote.toUpperCase() +' '+this.myVote2chinese(this.myVote)+' </span>?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            dangerouslyUseHTMLString: true,
            type: 'warning'
            }).then(() => {
                this.$axios.goVote({
                    eid:this.eid,
                    result:this.myVote
                }).then(res=>{
                    if(res.data.success){
                        // this.exampleHandle(res.data.example)
                        this.showVote = false
                        this.$message({
                            showClose: true,
                            message: '操作成功！',
                            type: 'success'
                        });
                        this.getExampleById()
                        this.exampleItem.isVoted = true
                    }
                }).catch(err=>{
                })
            }).catch(() => {
        
            });
        },
        // 提交评论
        comment(){
            if(!this.myComment){
                this.$message({
                    showClose: true,
                    message: '请输入评论内容',
                    type: 'warning'
                });
                return;
            }
            this.$axios.addComment({
                eid:this.eid,
                content:this.myComment
            }).then(res=>{
                if(res.data.success){
                    this.myComment=''
                    // this.commentPage = 1
                    // this.getComment()
                    this.$message({
                        showClose: true,
                        message: '操作成功！',
                        type: 'success'
                    });
                }
            }).catch(error=>{
                console.log(error);
            })
        },
        clickLike(){
                this.loading3 = true
                this.$axios.clickExampleLike( {eid: this.eid }).then(res=>{
                    this.loading3 = false
                    if(res.data.success){
                        this.exampleItem.likes = this.exampleItem.likes+res.data.result.count
                        if(res.data.result.count>0){
                            this.exampleItem.isLiked = true
                        }else{
                            this.exampleItem.isLiked = false
                        }
                    }
                }).catch(err=>{
                    this.loading3 = false
                })
        },

        // 返回名人庫
        back(){
            this.$router.push({path:this.fromPath})
        },
        //监听子组件传话
        lestionSon(data){
            this.isVote = false;
            if(data){
                // 子组件传递过来的更新后数据
                this.exampleItem = '';
                this.exampleItem = data;
            }
        },
        exampleHandle(example){
                this.exampleItem = example;
                this.isRepeat = example.isVoted
                // this.showVote = !example.isVoted

                // 类型排序
                let vote = []
                let total = 0
                for(let key in this.exampleItem.vote){
                    total += Number(this.exampleItem.vote[key])
                }
                for(let key in this.exampleItem.vote){
                    vote.push({
                        type:key,
                        count:this.exampleItem.vote[key],
                        perce:total===0?'0%':this.exampleItem.vote[key]/total*100 + '%'
                    })
                }
                for(let i=0;i<vote.length-1;i++){
                    for(let j=0;j<vote.length-1-i;j++){
                        if(vote[j].count < vote[j+1].count){
                            let temp = vote[j+1]
                            vote[j+1] = vote[j]
                            vote[j] = temp
                        }
                    }
                }
                //如果最大与type相等
                if(this.exampleItem.type!=='****' &&vote[0].type!=this.exampleItem.type){
                    let temp;
                    for(let i=0;i<vote.length;i++){
                        if(vote[i].type==this.exampleItem.type){
                            temp = vote[i]
                            vote.splice(i,1)
                            break;
                        }
                    }
                    vote.unshift(temp)
                }
                this.voteArr = vote
        },
        //id精确查询example
        getExampleById(){
                this.exampleItem = '';
                this.$axios.getExampleById({
                    params:{
                        eid:this.eid
                    }
                }).then(res=>{
                    if(res.data.success){
                        this.exampleHandle(res.data.example)
                    }else{
                    }
                }).catch(res=>{})

        },
        handleScroll () {
            this.tabFixed = window.scrollY>102;
            // console.log(window.scrollY);
        },
        initData(){
            this.eid = this.$route.path.split('/')[2]
            this.commentList=[]
            this.commentPage=1
            this.currentCommentList = []
            this.getExampleById()
        },
        getRelationExamp(option){ //name(模糊),id,type（模糊）
            this.$axios.searchExample({
                params:{
                    size:9,
                }
            }).then(res=>{
                if(res.data.success){
                        this.relationList = res.data.result.example;
                        console.log('rela:',this.relationList);
                }else{
                }
            }).catch(res=>{
            })

        },
    },
    mounted(){
        // window.addEventListener('scroll', this.handleScroll);

        // navigator.serviceWorker.addEventListener('message', function (event) {
        //     if (e.data === 'sw.update') {
        //         console.log('接收到',e.data);
        //         // 此处可以操作页面的 DOM 元素啦
        //     }
        // });
    },
    created(){
        this.initData()

        //处理typeList数据
        this.$mbti.types.forEach((v,i)=>{
            this.typeList.push({
                value:v,
                label:v.toUpperCase()
            })
        })

        let fromPath = localStorage.getItem('fromPath')
        if(fromPath && /^\/example\/$/.test(fromPath) ){
            this.data.title.link = ''
        }

        this.getRelationExamp()

    },
    beforeRouteEnter (to, from, next) {
        localStorage.setItem('fromPath',from.fullPath)
        next()
    },
}
</script>
<style lang="less">
.examp-details {
    width:100%;
        .main-box {
            max-width:970px;
            margin:25px auto;
            width:100%;
            background-color: rgba(255,255,255,.75);
            padding-right:290px;
            position: relative;
            // 人物详情
            .example-box {
                position: relative;
                padding-right:50%;
                overflow: hidden;
                color:#777;
                word-break: break-all; //英文换行
                margin-bottom:15px;
                .e-info {
                    height:250px;
                    padding-right:180px;
                    position: relative;

                    .font {
                        height:236px;
                        line-height: 18px;
                        font-size:14px;
                    }
                }
                a {
                    color:#70a9e5;
                }
                .item {
                    // flex:1 0 46%;
                    box-sizing: border-box;
                    width:165px;
                    position: absolute;
                    right:4px;
                    top:0px;
                    .photo {
                        width:100%;
                        height:220px;
                        overflow: hidden;
                        background-color: #aaa;
                        border-radius:3px;
                    }
                    img {
                        display:block;
                        width:100%;
                        object-fit: cover; //居中
                        // object-fit:fill; //占满 拉伸或压缩 ===img实际设定
                        // object-fit:contain;   //最小方向占满(如果没设高度则按比例)
                        // object-fit:scale-down; //最中间按实际高度 （有宽高则图片大的一侧向占满）
                        height:100%;
                    }
                    .e-more {
                        padding:7px 0;
                    }
                }
                // 投票结果
                .vote-box {
                    height:252px;
                    position: absolute;
                    top:0;
                    right:0px;
                    width:48%;
                    border-left:1px solid #eee;
                    padding-bottom:15px;
                    text-align: center;
                    color:#777;
                    .vote-title {
                        padding:5px 0 8px;
                        p {
                            font-size:15px;
                            line-height: 18px;
                            margin:0;
                            font-weight: 700;
                        }
                        p.tit {
                            font-size:17px;
                            // font-weight: 500;
                            height:19px;
                            margin-bottom:4px;
                            color:#666;
                        }
                        // font-weight:700;
                        margin:0 28px;
                        // border-bottom:1px solid #f8f8f8;
                    }
                    .figure {
                        // margin:4px auto 10px;
                        height:18px;
                        width:255px;
                        // background:url('/static/img/figure.png');
                        background-size:cover;
                        opacity:0.2;
                    }
                    .vote-result {
                        padding:0px;
                        &>.r-item {
                            margin:0 auto;
                            display: flex; display: -webkit-flex;display: -ms-flex;display: -o-flex;
                            max-width:232px;
                            position: relative;
                            left:6px;
                            &>div {
                                height:16px;
                                line-height: 16px;
                                margin:5px 0;
                                color:#9b9b9b;
                            }
                            .type{
                                font-size:15px;
                                // font-weight:600;
                                flex:0 0 44px;
                                text-align:left;
                            }
                            .prog{
                                flex:1;
                                border-radius:8px;
                                display:flex;
                                align-items:center;
                                background-color: #f2f2f2;
                                &>div {
                                    height:16px;
                                    background-color: #6ac342;
                                    // background-image: linear-gradient(to bottom, #aed5ed 0%, #7bbbe2 70%, #5aaadb 100%);
                                    background:#2ecc71;
                                    box-shadow: 0 0 2px #2ecc71;
                                    width:100%;
                                    // border-radius:0px 8px 8px 0px;
                                    border-radius:8px;
                                    position: relative;
                                }
                            }
                            .count{
                                text-align:left;
                                padding-left:4px;
                                font-size:14px;
                                flex:0 0 34px;

                            }
                        }
                        
                    }


                }

            }   
            .main-ctrl {
                padding:.5em 16px;
                border-top:1px solid #f2f2f2;
                background-color: #fefefe;
                display:flex;
                justify-content: space-between;
                position:fixed;
                bottom:0;
                left:0;
                width:100%;
                z-index:2;
                display:none; //pc端隐藏
                &>div {
                    height:36px;
                    text-align:center;
                    em {
                        font-size:14px;
                    }
                    i {
                        font-size:19px;
                    }
                    >span {
                        color:#8590a6;
                        // line-height: 18px;
                        border-radius:2px;
                        cursor:pointer;
                        display:inline-block;
                        font-size:14px;
                        &:hover {
                            color:#409eff;
                        }
                    }
                    &>span.active {
                        color:#409eff;
                    }
                }
                .a-like {}
                .a-vote.active {
                    position: relative;
                    &:after {
                        content:'已参与';
                        display: block;
                        height: 17px;
                        width: 42px;
                        color: #fff;
                        font-size: 11px;
                        position: absolute;
                        top: 0px;
                        right: -38px;
                        background-color: #7db3f6;
                        border-radius: 6px 6px 6px 0;
                    }
                }
                // .a-like.active {
                //     &:after {
                //         content:'已关注';
                //     }
                // }
                @media screen and (min-width:769px){
                    display:flex;
                    position:relative;
                    justify-content: space-around;
                    padding:1.2em 16px;
                    &>div:last-child {
                        display:none;
                    }
                    .a-like {   
                        i {
                            font-size:22px;
                        }
                    }
                }


            }

            .a-vote-view {
                position:fixed;
                left:0;
                top:0;
                width:100%;
                height:100%;
                z-index:5;
                background-color: rgba(0,0,0,.8);
                
                &>div {
                    max-width:370px;
                    background-color: #fefefe;
                    padding:16px;
                    border-top:1px solid #eee;
                    margin:30px auto;
                    border-radius:3px;
                    position: relative;
                    min-height:370px;
                    h2 {
                        display:block;
                        text-align: left;
                        font-size:20px;
                        color:#444;
                        margin-bottom:16px;
                        height:38px;
                        border-bottom:1px solid #eee;
                        margin-left:-16px;
                        margin-right:-16px;
                        padding-left:16px;
                    }
                    .v-bar {
                        padding-right:16px;
                        position: relative;
                        padding-top:0;
                        height:155px;
                        padding-left:120px;
                        .el-select {
                            width:100%;
                        }
                        .bu-button {
                            padding:9px 20px;
                            margin:25px auto 0;
                            display:block;
                            width:100%;
                        }
                        .bu-button.bu-green{
                            right:82px;
                        }
                        @media screen and (max-width:400px) {
                            // padding-right:135px;
                            // margin-bottom:30px;
                            .bu-button {
                                // top:50px;
                                padding:9px 14px;
                            }
                            .bu-button.bu-green{
                                right:67px;
                            }
                        }
                        div.vote-info {
                            text-align: center;
                            position:absolute;
                            left:0px;
                            top:0px;
                            width:118px;
                            .photo {
                                height:118px;
                                width:92px;
                                overflow: hidden;
                                margin:0 auto;
                                img {
                                    display:block;
                                    width:100%;
                                    object-fit: cover;
                                }
                            }
                            p {
                                font-size:14px;
                                padding-left:8px;
                            }
    
                        }
                    }
                    ul {
                        border-top:1px dotted #eee;
                        padding-top:5px;
                        padding-bottom:12px;
                        li {
                            font-size:13px;
                            color:#999;
                            font-weight:400;
                        }
                        li:first-child {
                            font-size:15px;
                            color:#888;
                            font-weight:600;
                            margin-bottom:5px;
                        }
                        
                    }
                }
                span.close-btn{
                    color:#bbb;
                    position:absolute;
                    right:16px;
                    top:13px;
                    cursor:pointer;
                    padding:2px 3px;
                    &:hover {
                        color:#999;
                    }
                }
        
            }
            .a-publish-comment {
                border-top:1px solid #eee;
                padding:29px 0;
            }
            // 右侧推荐区
            .recommend {
                width:252px;
                // border:1px solid #f7f7f7;
                position:absolute;
                right:0px;
                top:0;
                // padding:0 12px 12px;
                section {
                    margin-bottom:22px;
                    >ul {
                        display:flex;
                        justify-content: space-between;
                        flex-wrap:wrap;
                        li {
                            flex: 0 0 30%;
                            overflow: hidden;
                            margin-bottom:12px;
                            text-align: center;
                            .photo {
                                height:98px;
                                overflow: hidden;
                                img {
                                    display:block;
                                    width:100%;
                                    height:100%;;
                                    object-fit: cover;
                                }
                            }
                            span {
                                font-size:13px;
                                text-align: center;
                                color:#117d84;
                                &:hover {
                                    color:#117d84;
                                }
                            }
                        }
                    }
                }
                h2 {
                    font-size:16px;
                    font-weight:600;
                    margin-bottom:12px;
                    padding-bottom:4px;
                    color:#117d84;
                    // font-weight:600;
                    border-bottom:1px solid #f1f1f1;
                }
            }
        } 
        @media screen and (max-width:992px){
            .crumbs {
                ul {
                    padding:0 16px;
                }
            }
            .main-box {
                padding:0 16px;  
                
// 右侧推荐区
                .recommend {
                    width:100%;
                    position:relative;
                    right:0px;
                    top:0;
                    padding:0;
                    section {
                        >ul {
                            overflow-x: scroll;
                            width:auto;
                            flex-wrap: nowrap;
                            li {
                                flex: 0 0 78px;
                                margin-right:12px;
                                margin-bottom:12px;
                                .photo {
                                    height:95px;
                                    overflow: hidden;
                                    img {
                                    }
                                }
                                span {
                                }
                            }
                        }
                    }
                }
            }
            .a-vote-view .vote-16 .v-item>div {
                flex:0 0 100%;
            }
        }
        @media screen and (max-width:768px){
            .main-box .a-publish-comment.mobile-show {
                position:fixed;
                width:100%;
                height:100%;
                left:0;
                top:0;
                background-color: #fff;
                padding-left:16px;
                padding-right:16px;
                z-index:1;
            }
            .main-box .main-ctrl {
                display:flex;
            }
        }   
        @media screen and (max-width:525px){
            .main-box {
                .a-vote-view>div {
                    // margin-left: 6px;
                    // margin-right: 6px;
                }
                .example-box {
                    padding-right:0;
                    .e-info {
                        
                        border-bottom:1px solid #ccc;
                    }
                    // 投票结果
                    .vote-box {
                        position: relative;
                        width:100%;
                        border-left:none;
                        margin-top:15px;
                    }
                    .item {
                        right:0;
                    }
                }

            }
        }   
        @media screen and (max-width:380px){
            .main-box {
                .a-vote-view>div {
                    margin-left: 6px;
                    margin-right: 6px;
                }

            }
        }   

    

    
}

</style>
    
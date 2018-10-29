<template>
<div class="show" v-loading="loading">
    <NavMain></NavMain>
    <div class="m-header">
        <div class="m-header-inner">
            <p>{{userInfo.r_name}}的主页</p>
            <div class="photo">
                <!-- <img :src="userInfo.avatar?$pathAvatar +userInfo.avatar:'/static/img/logo_a.png'" alt=""> -->
                <Avatar :src="userInfo.avatar" :uid="''" size="big-x" round="" class="big-photo"></Avatar>
                <Avatar :src="userInfo.avatar" :uid="''" size="" round="" class="small-photo"></Avatar>
            </div>
            <div class="m-info">
                <div class="overflow-row-1" style="padding-bottom:1px;"><span  class="r-name">{{userInfo.r_name}}</span> <span class="sex"></span></div>
                <div class="overflow-row-2" style="font-size:14px;line-height:15px;padding-right:5px;height:30px;max-width:370px;width:92%;color:#4c4c4c;">{{userInfo.profile?userInfo.profile:''}}</div>
                <div class="follow-ctrl" style="">
                    <!--<el-button type="primary" size="mini" v-if="!userInfo.isFollow" @click="followUser('1')"><i class="el-icon-plus" style="margin:0 -1px 0 -2px"></i> 关注Ta</el-button>
                    <el-button type="primary" plain size="mini"  @click="followUser('0')" v-else style="background:#eee"> 
                        <span><i class="el-icon-remove-outline" style="margin:0 -1px 0 -2px"></i> 已关注</span> 
                    </el-button>-->
                    <!-- <span class="c1" v-if="!userInfo.isFollow&&!loading1" @click="followUser('1')"><i class="el-icon-plus"></i> 关注Ta</span>
                    <span class="c2" v-if="userInfo.isFollow&&!loading1" @click="followUser('0')">已关注</span>
                    <span class="c3" v-if="loading1"><i class="el-icon-loading"></i></span> -->
                    <!--<el-button type="primary" size="mini" v-if="!userInfo.isFollow" @click="followUser('1')"><i class="el-icon-plus" style="margin:0 -1px 0 -2px"></i> 关注Ta</el-button>
                    <el-button type="primary" plain size="mini"  @click="followUser('0')" v-else> 
                        <span><i class="el-icon-remove-outline" style="margin:0 -1px 0 -2px"></i> 已关注</span> 
                    </el-button>-->
                            
                    <!-- 关注按钮 -->
                    <followBtn :isFollow="userInfo.isFollow" :uuid="this.uid" v-if="userInfo"></followBtn>
                    
                </div>
            </div>
        </div>
    </div>
    <div class="main-box">
        <div class="m-body">
            <div class="m-content" v-if="userInfo.r_name">
                <div class="m-tabs">
                    <div :class="typeActive==='info'?'active':''" @click="typeActive='info'">个人信息</div>
                    <div :class="typeActive==='publish'?'active':''" @click="typeActive='publish'">Ta的发表</div>
                    <div style="flex:1"></div>
                </div>
                <!--子组件-->
                <Info :userInfo="userInfo" v-if="typeActive==='info'&&userInfo"></Info>
                <Publish :userInfo="userInfo" :uid="uid" v-if="typeActive==='publish'&&userInfo"></Publish>
                
            </div>
        </div>
    </div>
    <!--<div class="aside-box">
        <div class="aside-items" v-for="i in 3" style="color:#fefefe">
            <p>INTJ和INTP测试</p>
            <p>INTJ和INTP测试</p>
            <p>INTJ和INTP测试</p>
        </div>
    </div>-->
</div> 
</template>
<script>
import Info from './show_info'
import Publish from './show_publish'
import followBtn from '@/components/common/follow_btn'
import NavMain from '@/components/common/nav_main'
export default {
    data(){
        return {
            loading:false,
            uid:'',
            userInfo:'',
            typeActive:'info',
        }
    },
    components:{
        Info,Publish,followBtn,NavMain
    },
    watch:{
        'typeActive':function(){
            if(this.typeActive){
                this.$router.push({query:{tab:this.typeActive}})
            }
        }
    },
    methods:{
        getUserInfoShow(){
            this.loading = true
            // 修改账户信息
            this.$axios.getUserInfoShow({uid:this.uid}).then(res=>{
                this.loading = false
                if(res.data.success){
                    this.userInfo = res.data.data
                }
            }).catch(err=>{
                this.loading = false
            })
        }
    },
    mounted(){
    },
    created(){
        this.uid = this.$route.path.split('/')[2]
        // 如果是当前登录用户，转到个人中心
        if(this.$store.state.userInfo){
            if(this.uid===this.$store.state.userInfo._id){
                this.$router.replace({path:'/my'})
                return;
            }
        }
        if(this.uid){
            this.getUserInfoShow()
        }
        if(this.$route.query.tab){
            this.typeActive = this.$route.query.tab
        }
    },
    
};
</script>
<style lang="less">
.show {
    .m-header {
        padding-top:52px;
        background:url('/static/img/my_bg.jpg') no-repeat;
        background-size:cover;
        position: relative;
        margin-bottom:5px;
        top:0px;
        left:0px;
        width:100%;
        &:after {
            content:"";
            display:block;
            position:absolute;
            bottom:0px;
            left:0px;
            width:100%;
            height:102px;
            background-color: rgba(255,255,255,.8);
        }
        .m-header-inner {
            max-width: 970px;
            margin:0 auto;
            position: relative;
            display:flex;
            align-items: flex-end;
            padding-bottom:10px;
            z-index: 1;
            &>p {
                position:absolute;
                top:-42px;
                left:0px;
                font-size:16px;
                color:#bbb;
                font-style:italic;
                text-shadow: 0 0 2px #fff;
            }
        }
        .photo {
            background-color: #ccc;
            border:1px solid #aaa;
            box-shadow: 0 0 12px #70a9e5 inset;
            border-radius:4px;
            .small-photo {
                display:none
            }
        }
        .m-info {
            height:100%;
            padding-left:1.2em;
            width:100%;
            white-space:normal; word-break:break-all;
            min
            span.r-name {
                font-weight:700;
                margin-bottom:7px;
                font-size:16px;
            }
            span.sex {
                color:#555;
                font-size:14px;
                padding-left:15px;
            }
            &>div:last-child {
            }
            &>div:first-child {
            }
            .follow-ctrl {
                font-size:14px;
                position:relative;
                top:0px;
                &>span {
                    text-align:center;
                    display:inline-block;
                    width:78px;
                    height:30px;
                    line-height:30px;
                    border-radius:3px;
                    cursor: pointer;
                    background-color: #eee;
                }
                &>span.c1 {
                    background-color: #409eff;
                    color:#fff;
                }
                &>span.c2 {
                    background-color: #acacac;
                    color:#fff;
                }
            }
        }
    }
    .main-box {
        margin:0 auto 12px;
        max-width:970px;
        width:100%;
        .m-body {
            min-height:300px;
            width:100%;
            background-color: rgba(255,255,255,.8);
            .menu {
                display:flex;
                flex-wrap:wrap;
                background-color: #f7f7f7;
                border:1px solid #fff;
                &>div {
                    flex:0 0 33.3%;
                    height:50px;
                    // border:1px solid blue;
                    line-height: 50px;;
                    text-align:center;
                }
            }

            .m-content {
                border:1px solid #f0f3ef;
                .m-tabs {
                    display:flex;
                    font-size:15px;
                    // border-bottom:1px solid #eee;
                    &>div {
                        padding:15px 15px;
                        text-align: center;
                        border-bottom:1px solid #eee;
                        border-right:1px solid transparent;
                        cursor:pointer;
                        background-color: #fbfbfb;
                    }
                    &>div:last-child {
                        cursor:default;
                    }
                    &>div.active {
                        cursor:default;
                        // border-bottom:1px solid transparent;
                        color:#496ea3;
                        // background-color: transparent;
                    }
                }
                // padding:12px;
                width:100%;
                // border-top:1px solid #cee1f5;
                // border-radius:1px 1px 0 0 ;
                min-height:420px;
                background-color: #fdfdfd;
                
            }
        }
    }
    .aside-box {
        width:320px;
        position: absolute;
        right: 0;
        top: 170px;
        .aside-items {
            width:100%;
            min-height:150px;
            background-color: #fff;
            padding:2.5%;
            margin:0 0 10px;
        }
    }
    .upload-avatar {
        position: fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background-color: rgba(0,0,0,.5);
        .inner-box {
            width:320px;
            margin:70px auto 0;
            background-color: red;
            // top:100px;
            // left:50%;
            // transform:translate(-50%);
            border:1px solid #777;
        }

        // margin:0 auto;
    }
    @media screen and (max-width:992px){
        .m-header .m-header-inner {
            padding-left: 12px;
            padding-right: 5px;
            &>p {
                left:15px;
            }
        }
    }
    @media screen and (max-width:768px){
        padding-right:0;
        .aside-box {
            position: relative;
            width:100%;
            top:0;
        }
    }
    @media screen and (max-width:525px){
        .m-header {
            padding-top:50px;
            .photo {
                // width:85px;
                // height:85px;
                // left:15px;
                // bottom:10px;
                // img {
                //     width:100%;
                //     height:100%;
                // }
                .big-photo {
                    display:none
                }
                .small-photo {
                    display:block;
                }
            }
            .m-info {
                // padding-left:115px ;

                .follow-ctrl {
                    // top:5px;
                }
                span.r-name {
                }
                span.sex {
                }
            }
        }
        .main-box {
            .m-body {
                .m-tab {
                    &>div {
                        padding:7px 0;
                    }
                }
            }
        }
    }
}

</style>
    
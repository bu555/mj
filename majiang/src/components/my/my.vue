<template>
<div class="my" v-if="isLogin" v-loading="loading">
    <NavMain></NavMain>
    <div class="m-header">
        <div class="m-header-inner">
            <div class="photo" @click="showUploadAvatar=true">
                <img :src="$store.state.userInfo.avatar?$store.state.userInfo.avatar:'/static/img/logo_a.png'" alt="">
                <div class="a-cover">更改头像</div>
            </div>
            <div class="edit-photo">
                <!--<button>上传封面照片</button>-->
            </div>
            <div class="edit-info">
                <!--<button>编辑个人资料</button>-->
            </div>
            <div class="m-info">
                <div class="overflow-row-1" style="padding-bottom:5px;"><span  class="r-name">{{$store.state.userInfo.r_name}}</span> <span  class="sex"></span></div>
                <div class="overflow-row-2" style="font-size:13px;line-height:15px;padding-right:5px;max-width:500px;color:#444">{{$store.state.userInfo.profile?$store.state.userInfo.profile:'未設置'}}</div>
            </div>
        </div>
    </div>
    <!-- 大于786显示区 -->
    <div class="min-768" ref="min768">
        <Home></Home>
        <div class="main-box ">
            <router-view></router-view>
        </div>
    </div>
    <!-- 小于768显示区 -->
    <div class="main-box max-768">
        <div class="m-body">
            <div class="m-content" ref="mContent">
                <div class="">
                    <Home></Home>
                </div>
                <div>
                    <div class="m-title" style="padding:12px 20px;margin-bottom:10px;border-bottom:1px solid #f0f3ef">
                        <!-- <i class="fa fa-reply" style="font-size:17px;margin-left:-2px;padding:5px 10px 5px 5px;color:#777;cursor:pointer" @click="$delayPush('/my')"></i>  -->
                        <i class="el-icon-arrow-left" style="font-size:22px;margin-left:0px;font-weight:700;padding:5px 18px 5px 7px;color:#555;cursor:pointer" @click="delayPush()"></i> 
                        <span style="padding:0 10px 0 0px;border-left:1px solid #ddd;padding-left:.7em">{{$store.state.myTabName}} </span>
                        
                    </div>
                    <router-view></router-view>
                </div>
            </div>
        </div>
        <div class="aside-box">
            <div class="aside-items" v-for="i in 3" style="color:#fefefe">
                <p>INTJ和INTP测试</p>
                <p>INTJ和INTP测试</p>
                <p>INTJ和INTP测试</p>
            </div>
        </div>
    </div>
    <div class="upload-avatar" v-if="showUploadAvatar" >
        <div class="inner-box">
            <!--头像上传组件-->
            <uploadAvatar @closeMe="listenSon"></uploadAvatar>
        </div>
    </div>
</div> 
</template>
<script>
import Home from './my_home'
import uploadAvatar from './upload_avatar'
import NavMain from '@/components/common/nav_main'
export default {
    data(){
        return {
            loading:false,
            showUploadAvatar:false,
            isLogin:false,
            accountInfo:'',
            delayTime:300, //滚动过度时间
        }
    },
    components:{
        uploadAvatar,
        Home,
        NavMain,
    },
    watch:{
        // '$store.state.modalLoginSuccess':'getAccount',
        // 刷新用户信息
        '$store.state.refUser':function(){
            if(this.$store.state.refUser){
                this.$store.state.userInfo.avatar = ''
                this.getUser()
            }
        },
        // 刷新用户账户信息
        // '$store.state.refAccount':function(){
        //     if(this.$store.state.refAccount){
        //         this.getAccount()
        //         this.$store.state.refAccount=false
        //     }
        // },
        '$route.path':function(){
            if(/^\/my$/.test(this.$route.path)){
                this.$refs.mContent.style.left = "0";
            }else if(/^\/my\//.test(this.$route.path)){
                this.$refs.mContent.style.left = "-100%"
            }
            
            if(this.$route.path==='/my'){
                // 在PC端，转到个人信息页
                if(document.body.clientWidth>768 && this.$route.path==='/my'){
                    this.$router.replace({path:'/my/info'})
                }
            }
        }
    },
    methods:{
        delayPush(){
            this.$refs.mContent.style.left = "0";
            setTimeout(()=>{
                this.$router.push({path:'/my'})
            },this.delayTime)
        },
        listenSon(success){
            this.showUploadAvatar = false; //关闭模态框
            if(success){
                // 修改成功,通知刷新
                this.$store.state.refUser ++ 
            }
        },
        getUser(){
            this.loading = true
            // 获取用户信息
            this.$axios.getUserInfo().then(res=>{
                this.loading = false
                if(res.data.success){
                    localStorage.setItem('USER',JSON.stringify(res.data.data));
                    this.$store.commit('setUserInfo',res.data.data)
                }
            }).catch(err=>{
                this.loading = false
            })
        },
        init(){
            if(localStorage.getItem('USER')){
                this.isLogin = true;
            }else{
                // this.$store.state.modalLogin = true
                this.$router.push({
                    path:'/'
                })
            }
        }
    },
    mounted(){
        if(/^\/my\//.test(this.$route.path)){
            this.$refs.mContent.style.left = "-100%"
        }
        this.$refs.mContent.style.transitionDuration = this.delayTime/1000 + 's'
    },
    created(){
        this.init()
        this.getUser()
        // this.getAccount()
        // 在PC端，转到个人信息页
        if(document.body.clientWidth>768 && this.$route.path==='/my'){
            this.$router.replace({path:'/my/info'})
        }
    },
    
};
</script>
<style lang="less">
.my {
    .m-header {
        padding-top:15px;
        background:url('/static/img/my_bg.jpg') no-repeat;
        background-size:cover;
        position: relative;
        margin-bottom:2px;
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
            height:77px;
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
        }
        .photo {
            width:120px;
            height:120px;
            flex:0 0 120px;
            background-color: #ccc;
            border:1px solid #aaa;
            box-shadow: 0 0 12px #70a9e5 inset;
            border-radius:4px;
            position: relative;
            overflow: hidden;
            cursor:pointer;
            img {
                width:100%;
                height:100%;
            }
            .a-cover {
                  font-size:15px;
                  width:100%;
                  padding:2px 0 2px;
                  position: absolute;
                  bottom:0;
                  left:0;
                  text-align: center;
                  background-color: rgba(0,0,0,.5);
                  color:#fff;
                //   display:none;
                  opacity: 0;
                  transition:opacity 0.5s;
              }
              &:hover {
                  .a-cover {
                    opacity:1;
                  }
              }
        }
        .edit-info,.edit-photo {
            // position: absolute;
            // right:2%;
            // top:98px;
        }
        .edit-photo {
            top:20px;
        }
        .m-info {
            padding-left:20px;
            height:57px;
            span.r-name {
                // font-size:15px;
                font-weight:700;
                margin-bottom:9px;
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
        }
    }
    .main-box {
        margin-bottom:12px;
        width:100%;
        max-width:970px;
        margin:0 auto;
        padding-right:300px;
        position: relative;
        .m-body {
            min-height:300px;
            width:100%;
            overflow: hidden;
            // background-color: rgba(255,255,255,.8);
            .menu {
                display:flex;
                flex-wrap:wrap;
                background-color:#f0f3ef;;
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
                // padding:12px;
                width:200%;
                // border-top:5px solid #cee1f5;
                border-radius:3px 3px 0 0 ;
                min-height:420px;
                // background-color: #fdfdfd;
                display:flex;
                position: relative;
                left:-0;
                transition: all 0s;
                &>div {
                    flex:0 0 50%;
                    // border:1px solid #f0f3ef;
                    .m-title {
                        display:flex;
                        align-items: center;
                    }
                }
                
            }
        }
    }
    .aside-box {
        width:280px;
        position: absolute;
        right: 0;
        top: 0px;
        .aside-items {
            width:100%;
            min-height:150;
            background-color: #eee;
            padding:2.5%;
            margin:0 0 10px;
        }
    }
    .upload-avatar {
        position: fixed;
        z-index:3;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background-color: rgba(0,0,0,.5);
        .inner-box {
            width:320px;
            margin:15vh auto 0;
            // top:100px;
            // left:50%;
            // transform:translate(-50%);
            // border:1px solid #777;
        }

        // margin:0 auto;
    }
    @media screen and (max-width:992px){
        .m-header .m-header-inner {
            padding-left: 18px;
            padding-right: 5px;
            padding-bottom:8px;
        }
    }
    @media screen and (max-width:768px){
        padding-right:0;
        .main-box {
            padding-right:0;
        }
        .aside-box {
            position: relative;
            width:100%;
            top:0;
            display:none;
        }
    }
    @media screen and (max-width:525px){
        .m-header {
            padding-top:12px;
            &:after {
                height:70px;
            }
            .m-info {
                height:58px;
                padding-left:2.5vw;
            }
        }
        .m-header {
            .photo {
                flex:0 0 85px;
                width:85px;
                height:85px;
                img {
                }
            }
            .edit-info {
                top:90px;
            }
            .edit-photo {
                top:15px;
            }
            .m-info {
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
    
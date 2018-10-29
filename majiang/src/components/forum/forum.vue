<template>
<div class="forum">
    <NavMain></NavMain>

    <!--<div style="width:2rem;height:2rem;background:#ccc">rem测试</div>-->
    <!-- <NavSub :data="data"  @inputSearch="currentSearch" @submitSearch="searchSubmit()"></NavSub> -->
    <NavSub :data="navSubData" @submitSearch="searchSubmit"></NavSub>
    <div class="forum-index" v-loading="loading">
        <div class="main-box">
            <router-view></router-view>
            <div class="recommend"  v-if=" (articleList instanceof Array) && articleList.length>0">
                <div class="ctrl-board">
                    <router-link to="/forum/article/new"  style="">
                        <!-- <button class="bu-button bu-black">发帖</button> -->
                        发文章
                    </router-link>
                </div>
                <section class="relation" v-if="$route.path.split('/').length===3">
                    <h2>关联阅读</h2>
                    <ul>
                        <li v-for="(v,i) in articleList" :key="i">
                            <router-link :to="'/forum/'+v._id"><i class="">{{i+1}}</i> {{v.title}}</router-link>
                        </li>
                    </ul>
                </section>
                <section>
                    <h2>推荐点阅</h2>
                    <ul>
                        <li v-for="(v,i) in articleList" :key="i">
                            <router-link :to="'/forum/'+v._id"><i class="">{{i+1}}</i> {{v.title}}</router-link>
                        </li>
                    </ul>
                </section>
            </div>    
        </div>
    </div>     
</div>
</template>
<script>
import NavSub from '@/components/common/nav_sub'
import NavMain from '@/components/common/nav_main'
export default {
    data(){
        return {  
            // list页面导航      
            data1:{
                title:{
                    value:'论坛',
                    link:'/forum'
                },
                items:[
                    {
                        value:'全部',
                        link:'/forum',
                        reg:/^(\/forum$)|(\/forum\?page)/
                    },
                    {
                        value:'精华',
                        link:'/forum?good=good',
                        reg:/good=good/
                    },
                    {
                        value:'分享',
                        link:'/forum?category=share',
                        reg:/category=share/
                    },
                    {
                        value:'问答',
                        link:'/forum?category=ask',
                        reg:/category=ask/
                    },
                ],
                search:{
                    placeholder:'搜索',
                    value:''
                },
                // maxWidth:970,
            },
            // item页面导航
            data2:{
                title:{
                    value:'论坛',
                    link:'/forum'
                },
                search:{
                    placeholder:'搜索',
                    value:''
                },
                // maxWidth:970,
            },
            articleList:[],
            loading:false,
            navSubData:null,//当前navsubdata
            prevFullPath:''

        }
    },
    components:{
        NavMain,
        NavSub,
    },
    watch:{
        '$route.fullPath':'setSubNavData'
    },
    methods:{
        searchSubmit(keyword){
            console.log('点击搜索',keyword);
            if(keyword){
                this.$router.push({
                    path:'/forum',
                    query:{
                        s:keyword
                    }
                })
            }else{
                // 用户清空input
                if(this.$route.path.split('/').length===2){
                    console.log('sss');
                    this.$router.push({
                        path:'/forum'
                    })
                }
            }
        },
        currentSearch(val){
            this.search = val
        },
        setSubNavData(){
            // forum 主页
            if(this.$route.path.split('/').length===2){
                this.navSubData = this.data1
                this.prevFullPath = this.$route.fullPath
            // 详情页
            }else{     
                if(this.prevFullPath ){
                    this.data2.title.link = this.prevFullPath
                }
                this.navSubData = this.data2
                this.prevFullPath = ''
            }
        },
        // 获取文章 options {keyword:'',category:'ask',likes:'Number',good:boolean}
        getArticleTop(){
            this.loading = true
            this.$axios.getArticle({
                category:'', //''即获取全部
                page:'1',
                good: '',
                size:8
            }).then(res=>{
                this.loading = false
                if(res.data.success){
                    this.articleList = res.data.data
                }
            }).catch(err=>{
                this.loading = false
            })
        },

    },
    beforeMount(){
        this.setSubNavData()
    },
    created(){
        this.getArticleTop()
        console.log(this.$router);
    },
    beforeRouteEnter (to, from, next) {
        // localStorage.setItem('fromPath',from.fullPath)
        next()
    },
    
};
</script>
<style lang="less">
@bg:rgba(255,255,255,.75);
.forum-index {
    max-width:970px;
    margin:25px auto;
    position: relative;
    display:flex;
    border-radius:4px 4px 0 0;
    padding-right:338px;
    .main-box {
        flex:1;
        background-color: #fff;
        margin-bottom:12px;
        width:100%;
        min-height:370px;
        // 右侧推荐区
        .recommend {
            width:272px;
            // border:1px solid #f7f7f7;
            position:absolute;
            right:0px;
            top:0;
            // padding:0 12px 12px;
            div.ctrl-board {
                background-color: #f2f7f2;
                padding:25px 12px;
                border-radius:3px;
                margin-bottom:15px;
                a {
                    background-color: #42adac;
                    padding:7px 15px;
                    border-radius:4px;
                    color:#fff;
                    font-weight:600;
                    &:hover {
                        background-color: #0e959d;
                        text-shadow:0 0 3px #fff;
                    }
                }
            }
            section {
                margin-bottom:22px;
            }
            h2 {
                font-size:16px;
                font-weight:600;
                margin-bottom:7px;
                padding-bottom:4px;
                color:#117d84;
                // font-weight:600;
                border-bottom:1px solid #f1f1f1;
            }
            ul{
                li {
                    text-overflow:ellipsis;
                    white-space: nowrap;
                    overflow:hidden;
                    margin-bottom:5px;
                    a {
                        color:#3aa7a2;
                        font-size:15px;
                        &:hover {
                            color:#117d84;
                        }
                        i {
                            color:#fff;
                            background-color: #48c4cc;
                            font-size:.8em;
                            border-radius:3px;
                            padding:0px 4px;
                        }
                    }
                }
                li:nth-of-type(1) a i{
                    background-color: #f54545;
                }
                li:nth-of-type(2) a i{
                    background-color: #ff8547;
                }
                li:nth-of-type(3) a i{
                    background-color: #ffac38;
                }
            }
            section.relation ul{
                li {
                    a {
                        &:hover {
                        }
                        i {
                            background-color: #c6d6c6;
                        }
                    }
                }
            }
        }
    }
    @media screen and (max-width:992px){
        .main-box {
            padding:0 16px;
        }
    }
    @media screen and (max-width:768px){
        padding-right:0vw;
        .main-box {
            .recommend {
                width:100%;
                position: relative;;
                div.ctrl-board {
                    display:none;
                }
                h2 {
                }
                ul{
                    li {
                        a {
                            &:hover {
                            }
                            i {

                            }
                        }
                    }
                }
            }
        }
    }
    @media screen and (max-width:600px) {
        padding-right:0px;
        .main-box {
            .recommend {
                position: relative;;
            }
        }
    }
}

</style>
<style>
    .forum .x-nav-sub ul.nav-list li a {
        font-size: 16px;
        padding: 0px 7px 2px !important;
    }

</style>

    
<template>
<div class="example " v-loading="loading">
    <NavMain></NavMain>

    <!--<div style="width:2rem;height:2rem;background:#ccc">rem测试</div>-->
    <NavSub :data="data"  @submitSearch="search"></NavSub>
    <div class="bx">
        <!--在线数据-->
        <div class="example-list"  v-if="exampleList_bk"> 
                <!--无数据--><!--无数据-->
                <p v-if=" (exampleList_bk instanceof Array) && exampleList_bk.length===0"  class="if-data-empty">暂无数据("▔□▔)</p>
                <!--有数据-->
                <div class="item" v-for="(v,i) in exampleList_bk" :key="i">
                    <!--<router-link :to="'/example/'+v._id">-->
                    <div class="item-box" style="padding-top:18px">
                        <div class="photo">
                            <img :src="v.imgURL" alt="">
                        </div>
                        <div class="name overflow-row-1">{{v.name}}</div>
                        <div class="info overflow-row-5" style="margin-bottom:8px">{{v.name1?v.name1:''}}{{v.info}}</div>
                        <div class=""  style="padding-top:5px;padding-bottom:18px">
                            <!-- <el-button type="success" size="small" @click="addExample(i)" >加入名人汇</el-button> -->
                        <button class="bu-button bu-green" @click="addExample(i)">加入名人汇</button>
                        </div>
                    </div>
                    <!--</router-link>-->
                </div>
        </div>
        <!--数据库的数据-->
        <div class="example-list"  v-if="exampleList"> 
                <div class="item" v-for="(v,i) in exampleList" :key="i">
                    <div class="item-box">
                        <div class="type">{{v.type.toUpperCase()}}</div>
                    <router-link :to="'/example/'+v._id">
                        <div class="photo">
                            <img :src="v.img_url" alt="">
                        </div>
                        <div class="name overflow-row-1">{{v.name}}</div>
                    </router-link>
                        <div class="info overflow-row-5">{{v.name1?v.name1:''}}{{v.info}}</div>
                        <div style="height:1px"></div>
                    </div>
                </div>
                 <p v-if=" (exampleList instanceof Array) && exampleList.length===0" class="if-data-empty">暂无数据("▔□▔)</p>
                <!--<div class="item" v-if="(exampleList instanceof Array)&&exampleList.length>0&&$route.query.s">查看更多同名名人</div>-->

        </div>
        <!--分页-->
        <div class="m-auto t-center pagi" style="padding:20px 0" v-if="exampleList.length>0">
            <el-pagination
            background
            :page-size="size"
            :pager-count="count"
            :total="total"
            :current-page="currentPage"
            @current-change="changePage($event)"
            layout="prev, pager, next"
            >
            </el-pagination>
        </div> 

        <div class="r-side col-xs-0 col-sm-0 col-md-3 col-lg-3">

        </div>
    </div>
</div> 
</template>
<script>
import NavSub from '@/components/common/nav_sub'
import NavMain from '@/components/common/nav_main'
export default {
    data(){
        return{
            exampleList:'',
            exampleList_bk:'',
            detailsData:{}, //
            showDetails:false,
            searchName:'',
            setSearch:'',
            sName:'',
            size:12, //每页条数
            count:0,//总页数
            total:0,//总条数
            currentPage:1,
            loading:false,
            
            data:{
                title:{
                    value:'名人汇',
                    link:'/example?type=all'
                },
                items:[
                    // {
                    //     value:'',
                    //     link:''
                    // }
                ],
                search:{
                    placeholder:'输入名字搜索',
                    value:''
                },
                // maxWidth:970,
            }

        }
    },
    watch:{
        '$route.query':'getExamp',
    },
    components:{
        NavSub,
        NavMain
    },
    methods:{
        search(value){
            console.log('value:',value);
            this.searchName = value
            if(this.searchName){
                this.$router.push({query:{s:this.searchName}})
                // let search = this.$route.query.s
                // this.$router.push({query:{s:this.searchName}})
                // if(search===this.searchName){
                //     this.getExamp({ name:search,page:1 })
                // }
            //  清空输入框
            }else{
                this.$router.push({query:{type:'all'}})
            }
        },
        changePage(e){
            let query = JSON.parse(JSON.stringify(this.$route.query))
            query.page = e
            this.$router.push({query:query})
        },
        getExamp(){ //name(模糊),id,type（模糊）
            // if(!option.name || !option.type || !option.id) return;

            let type = this.$route.query.type || ''
            type = type==='all'?'':type
            let page = this.$route.query.page || '1'
            this.currentPage = Number(page)
            this.loading = true;
            this.$axios.searchExample({
                params:{
                    name:this.$route.query.s || '',
                    type:type,
                    page:page,
                    size:this.size,
                    strict:false, //非严格搜索
                }
            }).then(res=>{
                this.loading = false;
                if(res.data.success){
                    this.exampleList_bk = ''
                    this.exampleList = ''
                    //返回百科数据
                    if(res.data.result.baike){
                        this.exampleList_bk = res.data.result.example
                            this.sName = res.data.result.sName
                        if(!this.exampleList_bk){
                            this.exampleList_bk = []
                        }
                    }else{
                        this.exampleList = res.data.result.example;
                        this.count = res.data.result.count
                        this.total = res.data.result.total
                    }
                    // let query = this.$route.query
                    // query.page = res.data.result.page
                    // console.log(query);
                    // this.$router.push({query:query})
                }else{
                    this.$message({
                        showClose: true,
                        message: res.data.message,
                        type: 'error',
                        duration:2500
                    });
                }
            }).catch(res=>{
                this.loading = false;
            })

        },
        //添加人物到名人汇
        addExample(index){
                
                if(this.exampleList_bk || this.exampleList_bk.length>0){
                    this.loading = true;
                    this.$axios.addExample({
                        // 列表数据
                        baikeList:this.exampleList_bk,
                        // 当前点击的索引
                        currentIndex:index,
                        sName:this.sName
                    }).then(res=>{
                        this.loading = false;
                        if(res.data.success){
                            this.exampleList = [res.data.example];
                            this.exampleList_bk = ''

                        }else{
                            console.log(res.data)
                        }
                    }).catch(res=>{
                        this.loading = false;
                    })
                }

        },
    },
    created(){
        // 设置菜单数据
        this.$mbti.types.forEach((v,i)=>{
            this.data.items.push({
                link:'/example?type='+v,
                value:v.toUpperCase(),
                reg:new RegExp('type='+v)
            })
        })

        // let search = this.$route.query.s?this.$route.query.s:''
        // let type = this.$route.query.type?this.$route.query.type:'';
        // if(!type){ //赋予默认type
        //     this.$router.replace({query:{type:'all'}})
        // }else{
        //     this.getExamp()
        // }
        this.getExamp()

        // hex转rgba
        for(var key in this.color){
            this.rgba[key] = this.colorFormat.hex2rgb(this.color[key]);
        }
    },
    mounted(){
    },
    
};
</script>
<style lang="less">
.example {
    margin:0 auto;
    .x-nav-sub ul.nav-list.in-bottom li {
        padding-left: 0px;
        flex:1;
    }
    .bx {
        max-width:970px;
    }
    //名人列表
    .example-list {
        background-color: rgba(255,255,255,.72);
        margin:4px auto 0;
        display: flex; display: -webkit-flex;display: -ms-flex;display: -o-flex;
        flex-wrap:wrap; //让弹性盒元素在必要的时候拆行
        padding:15px 0;
        padding-top:20px;
        text-align: center;
        box-sizing: border-box;
        min-height:370px;
        .item {
            flex:0 0 24.8%;
            margin-bottom:22px; 
            // background-color: red;
            .item-box {
                overflow: hidden; text-overflow:ellipsis;
                margin:0 auto;
                padding:0 3px;
                width:90%;
                height:auto;
                border-radius:3px;
                // cursor:pointer;
                position: relative;
                background-color: #f2f2f2;
                &:hover {
                    box-shadow: 0 0 5px #ccc;
                }
            }
            .type {
                font-size:18px;
                height:42px;
                line-height: 42px;
                font-weight:600;
            }
            .name {
                font-size:15px;
                padding:6px 0 6px;
                font-weight:600;
            }
            .photo {
                height:200px;
                width:150px;
                margin:0 auto;
                overflow: hidden;
                // position: relative;
                // background-color: #666;
                border-radius:1px;
                img {
                    display:block;
                    width:100%;
                    object-fit: cover; //居中
                    // object-fit:fill; //占满 拉伸或压缩 ===img实际设定
                    // object-fit:contain;   //最小方向占满(如果没设高度则按比例)
                    // object-fit:scale-down; //最中间按实际高度 （有宽高则图片大的一侧向占满）
                    height:100%;
                }

            }
            .info {
                font-size:14px;
                height:97px;
                text-align:left; 
                padding:0 2%; 
                margin-bottom:15px;
                color:#777;
            }

        }
    }
    @media screen and (max-width:768px){
        .x-nav-sub ul.nav-list.in-bottom {
            flex-wrap:wrap;
            padding-bottom:5px;
            padding-top:5px;
            li {
                flex:0 0 12.2%;
            }
        }
        .example-list {
            padding-left:5px;
            padding-right:5px;
        }
        .example-list .item {
            flex:0 0 33.33%;
            .item-box {
                width:90%;
            }
            .photo {
                width:20vw;
                height:25vw;
            }
        }
    }
    @media screen and (max-width:500px){
        .x-nav-sub ul.nav-list.in-bottom {
            li {
                flex:0 0 25%;
                // text-align:center;
                padding-left:0.95em;
            }
        }
        .example-list .item {
            flex:0 0 50%;
            .item-box {
                width:94%;
            }
            .photo {
                width:32vw;
                height:42vw;
            }
            .name {
                // width:134px
            }
        }
        .input-with-select {
            width:100% !important;
        }
        .types-box {
            &>div {
                flex:0 0 25% !important;
            }
        }
        .search-bar .btn-all {
            flex:0 0 25% !important;
        }
    }
    // 分页
    .pagi{
        background-color: rgba(255,255,255,.72);
    }
    a:hover {color: #1a1a1a;text-decoration:none} 
    .router-link-active,a {
        text-decoration: none;
    }
}

</style>
<style>
.example .x-nav-sub ul.nav-list.in-bottom li {
    margin-right: 0em;
} 
</style>

    
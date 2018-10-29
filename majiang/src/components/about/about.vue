<template>
    <div class="about">
        <NavMain></NavMain>
        <NavSub :data="data"  @submitSearch="searchSubmit"></NavSub>

        <div class="main-box">
            <router-view></router-view>
        </div>


    </div>
</template>
<script>
import NavSub from '@/components/common/nav_sub'
import NavMain from '@/components/common/nav_main'
export default {
    data(){
        return {   
            data:{
                title:{
                    value:'关于',
                    link:'/about'
                },
                items:[
                    {
                        value:'关于XMBI',
                        link:'/about',
                        reg:/^\/about$/
                    },
                    {
                        value:'用户协议',
                        link:'/about/agreement',
                        reg:/agreement/
                    },
                    {
                        value:'隐私政策',
                        link:'/about/privacy',
                        reg:/privacy/
                    },
                    {
                        value:'免责声明',
                        link:'/about/disclaimer',
                        reg:/disclaimer/
                    },
                    {
                        value:'联系我们',
                        link:'/about/contactus',
                        reg:/contactus/
                    },
                    {
                        value:'帮助中心',
                        link:'/about/help',
                        reg:/help/
                    },
                ],
                search:{
                    placeholder:'搜索',
                    value:''
                },
                // maxWidth:970,
            }
        }
    },
    components:{
        NavMain,
        NavSub,
    },
    watch:{
    },
    methods:{
        searchSubmit(value){
            console.log('点击搜索:',value);
        },
    },
    mounted(){
        // this.$message({
            //   message: '恭喜你，这是一条成功',
        //   type: 'warning',
        //   showClose: true,
        //   duration:9922222
        // });




    },
    created(){

    },
    beforeRouteEnter (to, from, next) {
        // localStorage.setItem('fromPath',from.fullPath)
        next()
    },
    
};
</script>
<style lang="less">
.about {
    position: relative;
    .main-box {
        padding-right:255px;
        max-width:970px;
        margin:0 auto;
        position: relative;
        .recommend {
            border:1px solid pink;
            position:absolute;
            right:0px;
            top:10px;
        }
    }
    @media screen and (max-width:992px){
        .main-box {
            padding:0 16px;
            .recommend {
                position: relative;
                right:0px;
                top:0px;
            }
        }
    }
    @media screen and (max-width:768px){

    }
    @media screen and (max-width:525px) {

    }
    .about-comp {
        padding:15px 0;
            // color:#eee;
        h1 {
            margin-bottom:15px;
            font-size:30px;
            font-weight:600;
        }
        &>h3 {
            font-size:19px;
            font-weight:600;
            margin-bottom:4px;
            margin-top:15px;
        }
        &>p {
            font-size:16px;
        }
        em {
            display:block;
            font-size:16px;
            padding-left:16px;
            font-style:italic;
            color:#555;
        }
        @media screen and (max-width:992px){

        }
        @media screen and (max-width:768px){
            &>p {
                // font-size:17px;
            }
        }
        @media screen and (max-width:525px) {

        }
    }

}

</style>
<style>
  @media screen and (max-width:768px) {
        .about .x-nav-sub ul.nav-list.in-bottom li {
            margin-right: 2vw;
        }
        .about .x-nav-sub ul.nav-list.in-bottom {
            flex-wrap: wrap;
            padding-top: 6px;
            padding-bottom: 6px;
        }
  }
</style>

    
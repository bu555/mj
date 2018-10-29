<template>
<div class="mbti">
    <NavMain></NavMain>
    <NavSub :data="data"></NavSub>
    <div class="main-box">
        <router-view></router-view>
        <!-- 推荐的内容 -->
        <div class="recommend">
            <Aside></Aside>
        </div>
        
    </div>
</div> 
</template>
<script>
import NavMain from '@/components/common/nav_main'
import NavSub from '@/components/common/nav_sub'
import Aside from '@/components/common/aside/aside'
export default {
    data(){
        return {
            data:{
                title:{
                    value:'MBTI',
                    link:'/mbti/theory'
                },
                items:[
                    {
                        value:'人格理论',
                        link:'/mbti/theory',
                        reg:/\/mbti\/theory/
                    },
                    {
                        value:'人格类型',
                        link:'/mbti/personality/entp',
                        reg:/\/mbti\/personality/
                    },
                    {
                        value:'认知功能',
                        link:'/mbti/function/ni',
                        reg:/\/mbti\/function/
                    },
                ],
                // search:{
                //     placeholder:'',
                //     value:''
                // },
                // maxWidth:970,
            }



        }
    },
    components:{
        NavMain,
        NavSub,
        Aside
    }
    
};
</script>
<style lang="less">
.mbti {
    .main-box {   
        max-width:970px;
        margin:15px auto;
        padding-right:300px;
        position: relative;   
        // 右侧推荐区
        .recommend {
            // border:1px solid pink;
            position:absolute;
            right:0px;
            top:10px;
        }

    }
    @media screen and (max-width:992px){
        .main-box {
            padding:0 16px;            // 右侧推荐区
            .recommend {
                width:100%;
                position:relative;
                right:0px;
                top:0;
                padding:0;
            }
        }
    }
    @media screen and (max-width:500px){
        // .x-nav-sub ul.nav-list.in-top li {
        //     position: relative;
        //     &:after {
        //         content:"";
        //         display:block;
        //         height:3px;
        //         width:3px;
        //         background-color: #aaa;
        //         position: absolute;
        //         top:11px;
        //         left:-10px;
        //         border-radius:50%;
        //     }
        // }
    }

}

</style>
    
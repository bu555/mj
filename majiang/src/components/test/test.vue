<template>
<div class="x-test">
    <NavMain></NavMain>
    <NavSub :data="data"></NavSub>
    <div class="main-box">
        <router-view></router-view>
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
    components:{
        NavMain,
        NavSub,
        Aside
    },
    data(){
        return{
            data:{
                title:{
                    value:'测试',
                    link:'/test'
                },
                items:[
                    {
                        value:'MBTI职业性格测试',
                        link:'/test/mbti',
                        reg:/mbti/
                    },
                    {
                        value:'八维功能测试',
                        link:'/test/function',
                        reg:/function/
                    },
                ]

            }
        } 
    },
    methods:{
        getSearch(val){
            console.log(val);
        }
    }
    
};
</script>
<style lang="less">
.x-test {
    .main-box {
        padding-right:305px;
        max-width:970px;
        margin:0 auto;
        position: relative;
        padding-top:15px;
        padding-bottom:15px;
        .recommend {
            // border:1px solid pink;
            position:absolute;
            right:0px;
            top:10px;
        }

    }
    @media screen and (max-width:992px){
        .main-box {
            padding:15px 16px;
            .recommend {
                position: relative;
                right:0px;
                top:0px;
            }
        }
    }
    @media screen and (max-width:520px){


    }

}

</style>
    
<template>
<div class="my-tab clearfix">
    <div class="tabs-blank-start"></div>
    <div class="tabs" v-for="(v,i) in tabs" :key="i" :data-type="v.type" @click="clickHandle(v.type)">
        <!--<router-link :to="query:{type:v.type}">-->
        <router-link :to="$route.path+'?type='+v.type">
            <div>{{v.title}}</div>
        </router-link>
    </div>
    <div class="tabs-blank-end"></div>
</div> 
</template>
<script>
export default {
    data(){
        return {
            // activeIndex:'0',
            // tab导航条内容
            // tabs:[
            //     {
            //         type:'16type',
            //         title:'16Test'
            //     },
            //     {
            //         type:'rg',
            //         title:'RGTest'
            //     },
            //     {
            //         type:'functions',
            //         title:'Function'
            //     },
       
            // ],
            
        }
    },
    props:['tabs'],
    methods:{
        //設置激活样式
        setActiveStyle(type){
            document.querySelectorAll('.tabs').forEach(v=>{
                if(v.getAttribute('data-type')===type){
                    v.classList.add('active');
                }else{
                    v.classList.remove('active');
                }
            })
        },
        clickHandle(type){
            let currentType = this.$route.query.type;
            // if(type!=this.$route.query.type){
                // this.$router.push({query:{type:type}});
                this.setActiveStyle(type);
            // }
        },

    },
    watch:{
        '$route.query':function(){
            this.setActiveStyle(this.$route.query.type)
        }
    },
    mounted(){
        this.setActiveStyle(this.$route.query.type);
    }
};
</script>
<style lang="less">
@tabHeight:20px;
.my-tab {
    padding-top:6px;
    display: flex;
    display: -webkit-flex;
    flex-wrap:wrap; //让弹性盒元素在必要的时候拆行
    // background-color: #f7f7f7;
    background-color: #fcfcfc;
    border-top: 1px solid #f9f9f9;
    
    &>div {
        // flex:0 0 auto;
    }
    .tabs {
        flex:1;
        height:@tabHeight;
        line-height:@tabHeight+4px ;
        text-align: center;
        font-size:13px;
        border-radius: 14px 14px 0 0;
        border:1px solid #d8d9db;
        position: relative;
        background-color: #f5f7fa;
        color:#72748a;
        cursor:pointer;
        margin:0 3px;
        // margin-bottom:10px;
        &:after {
            content:'';
            width:5px;
            border-bottom:1px solid #d8d9db;
            position: absolute;
            bottom:-1px;
            left:-5px;

        }
        &:before {
            content:'';
            width:5px;
            border-bottom:1px solid #d8d9db;
            position: absolute;
            bottom:-1px;
            right:-5px;

        }
        &:hover {
            background-color: #fefefe;
            border-bottom:none;
        }
        div {
            background-color: transparent;
        }
    }
    .tabs.active {
        background-color: #fdfdfd;
        border-bottom:1px solid #fdfdfd;
        color:#1c2633;
    }
    .tabs-blank-start {
        width:5px;
        height:@tabHeight+1px;
        border-bottom:1px solid #d8d9db;
    }
    .tabs-blank-end {
        flex-basis:1px;
        height:@tabHeight+1px;
        border-bottom:1px solid #d8d9db;
    }
    

}

</style>
    
<template>
<div class="person-type">
    <div class="main-box">
        <!--<div class="types-animation">
            16类型旋转动图
        </div>-->
        <div class="types-menu">
            <!--NT NF SP SJ-->
            <div v-for="(v,i) in $mbti.kTypes">
                <div class="head">
                    <!--<router-link to="">NT</router-link>-->
                    {{v.t.toUpperCase()}}
                </div>
                <div :class="$route.path.split('/')[2]===v.t4[0]?'item active':'item'">
                    <router-link :to="'/type/'+v.t4[0]">{{v.t4[0].toUpperCase()}}</router-link>
                </div>
                <div :class="$route.path.split('/')[2]===v.t4[1]?'item active':'item'">
                    <router-link :to="'/type/'+v.t4[1]">{{v.t4[1].toUpperCase()}}</router-link>
                </div>
                <div :class="$route.path.split('/')[2]===v.t4[2]?'item active':'item'">
                    <router-link :to="'/type/'+v.t4[2]">{{v.t4[2].toUpperCase()}}</router-link>
                </div>
                <div :class="$route.path.split('/')[2]===v.t4[3]?'item active':'item'">
                    <router-link :to="'/type/'+v.t4[3]">{{v.t4[3].toUpperCase()}}</router-link>
                </div>
            </div>

        </div>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
    <div class="aside-box">
        <div class="aside-items" v-for="i in 3">
            <p>INTJ和INTP测试</p>
            <p>INTJ和INTP测试</p>
            <p>INTJ和INTP测试</p>
        </div>
    </div>
</div> 
</template>
<script>
export default {
    data(){
        return {
        }
    },
    components:{
    },
    methods:{

    },
    watch:{

    },
    mounted(){

    },
    created(){
    },
    
};
</script>
<style lang="less">
.person-type {
    max-width:1100px;
    margin:12px auto;
    position: relative;
    box-sizing: border-box;
    padding-right:332px;
    padding-top:0px;
    // display:flex;
    .main-box {
        margin-bottom:12px;
        width:100%;
        .types-menu {
            display:flex;
            justify-content: space-around;
            padding:20px 10px ;
            border-top:5px solid #598dd5;
            background-color: #fff;
            // border-bottom:1px solid #598dd5;
            margin-bottom:10px;
            &>div {
                flex:0 0 22%;
                .head {
                    font-size:20px;
                    font-weight:700;
                    border-bottom:1px solid #f29899;
                    margin-bottom:5px;
                    color:#555;
                }
                .item {
                    height:27px;
                    line-height: 27px;
                    padding-left:5px;
                    &>a:hover {
                        color:#598dd3;
                        // font-size:18px;
                    }
                }
                .item.active a {
                    color:#598dd3;
                    font-weight:700;

                }
            }
        }
        .content {
            padding:7%;
            padding-top:5%;
            background-color: #fff;
        }
    }
    .aside-box {
        width:320px;
        position: absolute;
        right: 0;
        top: 0;
        .aside-items {
            width:100%;
            min-height:150;
            background-color: #fff;
            padding:2.5%;
            margin:0 0 10px;
        }
    }
    @media screen and (max-width:768px){
        padding-right:0;
        .aside-box {
            position: relative;
            width:100%;
        }
        .main-box {
            .content {
                padding:4%;
                padding-top:0;
            }
        }
    }
    @media screen and (max-width:525px){

        .main-box {

        }
    }
    @media screen and (max-width:333px){
        .main-box {
            .types-menu {
                &>div {
                    padding-left:4%;
                }
            }
        }
    }
}

</style>
    
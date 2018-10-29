<template>
<div class="person-type">
        <div class="types-menu">
            <!--NT NF SP SJ-->
            <!-- <div v-for="(v,i) in $mbti.kTypes">
                <div class="head"  :style="'background:'+$mbti.color_k[v.t]">
                    {{v.t.toUpperCase()}}
                </div>
                <div :style="'background:'+$mbti.color_k[v.t]+';border-color:'+$mbti.color_k[v.t]" :class="'item one '+($route.path.split('/')[2]===v.t4[0]?'active':'')">
                    <div>
                        <router-link :to="'/type/'+v.t4[0]">{{v.t4[0].toUpperCase()}}</router-link>
                    </div>
                </div>
                <div :style="'border-color:'+$mbti.color_k[v.t]" :class="'item '+($route.path.split('/')[2]===v.t4[1]?'active':'')">
                    <router-link :to="'/type/'+v.t4[1]">{{v.t4[1].toUpperCase()}}</router-link>
                </div>
                <div :style="'border-color:'+$mbti.color_k[v.t]" :class="'item '+($route.path.split('/')[2]===v.t4[2]?'active':'')">
                    <router-link :to="'/type/'+v.t4[2]">{{v.t4[2].toUpperCase()}}</router-link>
                </div>
                <div :style="'border-color:'+$mbti.color_k[v.t]" :class="'item '+($route.path.split('/')[2]===v.t4[3]?'active':'')">
                    <router-link :to="'/type/'+v.t4[3]">{{v.t4[3].toUpperCase()}}</router-link>
                </div>
            </div> -->
            <div class="list">
                <div v-for="(v,i) in $mbti.kTypes">
                    <div class="head">
                        <!--<router-link to="">NT</router-link>-->
                        {{v.t.toUpperCase()}}
                    </div>
                    <div :class="'item one '+($route.path.split('/')[2]===v.t4[0]?'active':'')">
                        <div>
                            <router-link :to="'/personalities/'+v.t4[0]">{{v.t4[0].toUpperCase()}}</router-link>
                        </div>
                    </div>
                    <div :class="'item '+($route.path.split('/')[2]===v.t4[1]?'active':'')">
                        <router-link :to="'/personalities/'+v.t4[1]">{{v.t4[1].toUpperCase()}}</router-link>
                    </div>
                    <div :class="'item '+($route.path.split('/')[2]===v.t4[2]?'active':'')">
                        <router-link :to="'/personalities/'+v.t4[2]">{{v.t4[2].toUpperCase()}}</router-link>
                    </div>
                    <div :class="'item '+($route.path.split('/')[2]===v.t4[3]?'active':'')">
                        <router-link :to="'/personalities/'+v.t4[3]">{{v.t4[3].toUpperCase()}}</router-link>
                    </div>
                </div>
            </div>


            <div class="bu-font-test type">
                <!-- {{$route.path.split('/')[2].toUpperCase()}} -->
            </div>

        </div>
        <div class="content">
            <router-view></router-view>
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
    position: relative;
    .types-menu {
        .list {
            display:flex;
            flex-wrap:wrap;
            // padding:0 .8em;
        }
        .list>div {
            display:flex;
            // justify-content: space-around;
            // text-align: center;
            margin-bottom:7px;
            margin-right:1em;
            font-size:17px;
            flex:0 0 45%;
            &>div {
                height:24px;
                line-height: 24px;
                padding-left:1em;
                flex:0 0 20%;
            }
            .head {
                // font-size:18px;
                // font-weight:700;
                padding:0;
                text-align: center;
                background: linear-gradient(#c2ccd4, #4b647b);
                // width:62px;
                border-radius:12px 12px 0 12px;
                color:#fff;
            }
            .item {
                color:#3e4652;
                // width:65px;
                border-color:#fff;
                border-bottom:1px solid #576e84;
                a:hover {
                    text-shadow:1px 1px 1px #4b647b
                    // font-size:18px;
                }
            }
            .item.one{
                background: linear-gradient(#c2ccd4, #4b647b);
                padding-left:0;
                &>div {
                    padding-left:1em;
                    width:100%;
                    height:100%;
                    background-color: #fff;
                    border-bottom-left-radius: 10px;
                }
            }
            .item.active a {
                text-shadow:1px 1px 1px #4b647b;

            }
        }
        .type {
            flex:1;
            text-align: center;
            font-size:52px;
        }
    }
    .content {
        padding:7%;
        padding-top:5%;
        background-color: #fff;
    }
    @media screen and (max-width:768px) {
        .types-menu {
            .list>div {  
                flex:0 0 100%;
            }
        }
    }
}

</style>
    
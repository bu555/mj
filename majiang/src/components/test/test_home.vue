<template>
  <div class="test-home">
        <ul class="test-list">
            <li class="mbti">
                <router-link to="/test/mbti">
                    <div>
                        <p>MBTI职业性格测试</p>
                    </div>
                    <div>
                        <!-- <span>前往</span> -->
                        <i class="el-icon-d-arrow-right"></i>
                    </div>
                </router-link>
            </li>
            <li class="function">
                <router-link to="/test/function">
                    <div>
                        <p>八维功能测试</p>
                    </div>
                    <div>
                        <!-- <span>前往</span> -->
                        <i class="el-icon-d-arrow-right"></i>
                    </div>
                </router-link>
            </li>

        </ul>
  </div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    methods:{

    },
    watch:{

    },
    mounted(){

    },
    components:{

    },
    created(){
    },
    
};
</script>
<style lang="less">
.test-home {
    ul.test-list {
        display: flex; 
        min-height:230px;
        justify-content: space-between;
        flex-wrap:wrap;
        li {
            flex:0 0 48%;
            height:82px;
            border-radius:6px;
            overflow: hidden;
            a {
                height:100%;
                display:flex;
                &>div {
                    display:flex;
                    align-items: center;
                    P {
                        // flex:1;
                        // padding-left:10%;
                    }
                }
                &>div:first-child {
                    flex:1;
                    font-size:18px;
                    padding-left:6%;
                }
                &>div:last-child {
                    flex:0 0 92px;
                    text-align: center;
                    justify-content: center;
                    i {
                        font-size:32px;
                        color:#eee;
                    }
                }
            }
        }
        li.mbti {
            background-color: #c3e4de;;
            &:hover {
                background-color: #baded8;
            }
            a {
                &>div {
                    color:#62968e;
    
                }
                &>div:last-child {
                    border-left:2px solid #baded8;
                }
            }
        }
        li.function {
            background-color: #f3e0bf;
            &:hover {
                background-color: #ead8b9;
            }
            a {
                &>div {
                    color:#c09550;
                }
                &>div:last-child {
                    border-left:2px solid #ead8b9;
                }
            }
        }

    }
    @media screen and (max-width:768px){
        ul.test-list {
            display: flex; 
            min-height:230px;
            flex-wrap:wrap;
            li {
                // flex:0 0 100%;
            }
        }
    }
    @media screen and (max-width:622px){
        ul.test-list {
            display: flex; 
            min-height:230px;
            flex-wrap:wrap;
            li {
                flex:0 0 100%;
            }
        }
    }
}

</style>
    
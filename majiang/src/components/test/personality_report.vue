<template>
<div class="test-result bx">
    <div class="main">
        <!--头部-->
        <div class="header">
            <h4 class="tit">INTJ (专家型)</h4>
            <p class="sub-tit">—— 追求能力与独立</p>
        </div>
        <!--图表-->
        <h4>——倾向图表——</h4>
        <div class="chart">
            

            <div class="m-chart">
                <div class="my-tit">功能</div>
                <div class="mid">
                    <div class="type">E 外倾</div>
                    <div class="prog l">
                        <div class="e" :style="'width:'+ (Res.e>Res.i? Res.e/(Res.e+Res.i)*100+'%': '0%')">
                            <div class="val">{{Res.e>Res.i? (Res.e/(Res.e+Res.i)*100).toString().substr(0,4)+'%': ''}}</div>
                        </div>
                    </div>
                    <div class="prog r">
                        <div class="i" :style="'width:'+ (Res.e<Res.i? Res.i/(Res.e+Res.i)*100+'%': '0%')">
                            <div class="val">{{Res.i>Res.e? (Res.i/(Res.e+Res.i)*100).toString().substr(0,4)+'%':''}}</div>
                        </div>
                    </div>
                    <div class="type">I 内倾</div>
                </div>
                <div class="mid">
                    <div class="type">S 感觉</div>
                    <div class="prog l">
                        <div class="s" :style="'width:'+ (Res.s>Res.n? Res.s/(Res.s+Res.n)*100+'%': '0%')">
                            <div class="val">{{Res.s>Res.n? (Res.s/(Res.s+Res.n)*100).toString().substr(0,4)+'%': ''}}</div>
                        </div>
                    </div>
                    <div class="prog r">
                        <div class="n" :style="'width:'+ (Res.n>Res.s? Res.n/(Res.s+Res.n)*100+'%': '0%')">
                            <div class="val">{{Res.n>Res.s? (Res.n/(Res.s+Res.n)*100).toString().substr(0,4) +'%': ''}}</div>
                        </div>
                    </div>
                    <div class="type">N 直觉</div>
                </div>
                <div class="mid">
                    <div class="type">T 思考</div>
                    <div class="prog l">
                        <div class="t" :style="'width:'+ (Res.t>Res.f? Res.t/(Res.t+Res.f)*100+'%': '0%')">
                            <div class="val">{{Res.t>Res.f? (Res.t/(Res.t+Res.f)*100).toString().substr(0,4)+'%': ''}}</div>
                        </div>
                    </div>
                    <div class="prog r">
                        <div class="f" :style="'width:'+ (Res.f>Res.t? Res.f/(Res.t+Res.f)*100+'%': '0%')">
                            <div class="val">{{Res.f>Res.t? (Res.f/(Res.t+Res.f)*100).toString().substr(0,4)+'%': ''}}</div>
                        </div>
                    </div>
                    <div class="type">F 情感</div>
                </div>
                <div class="mid">
                    <div class="type">J 判断</div>
                    <div class="prog l">
                        <div class="j" :style="'width:'+ (Res.j>Res.p? Res.j/(Res.j+Res.p)*100+'%': '0%')">
                            <div class="val">{{Res.j>Res.p? (Res.j/(Res.j+Res.p)*100).toString().substr(0,4)+'%': ''}}</div>
                        </div>
                    </div>
                    <div class="prog r">
                        <div class="p" :style="'width:'+ (Res.p>Res.j? Res.p/(Res.j+Res.p)*100+'%': '0%')">
                            <div class="val">{{Res.p>Res.j? (Res.p/(Res.j+Res.p)*100).toString().substr(0,4)+'%': ''}}</div>
                        </div>
                    </div>
                    <div class="type">P 感知</div>
                </div>
                <!--<div class="e">
                    <div class="type"></div><div class="prog"></div>
                </div>
                <div class="i">
                    <div class="type"></div><div class="prog"></div>
                </div>
                <div class="s">
                    <div class="type"></div><div class="prog"></div>
                </div>
                <div class="n">
                    <div class="type"></div><div class="prog"></div>
                </div>
                <div class="t">
                    <div class="type"></div><div class="prog"></div>
                </div>
                <div class="f">
                    <div class="type"></div><div class="prog"></div>
                </div>
                <div class="j">
                    <div class="type"></div><div class="prog"></div>
                </div>
                <div class="p">
                    <div class="type"></div><div class="prog"></div>
                </div>-->
            </div>
            <div class="f-chart">
                <div class="my-tit">功能</div>
                <div class="f-f">
                    <div class="f1">内向直觉</div>
                    <div class="f2">外向思维</div>
                    <div class="f3">内向情感</div>
                    <div class="f4">外向感觉</div>                    
                </div>

            </div>
        </div>
        <!--描述-->
        <div class="details">
            <h4>——基本描述——</h4>
            <h5>——特征——</h5>
            <h5>——优势和劣势——</h5>
            <div class="my-tit">标题样式测试</div>
        </div>
    </div>
    <div class="aside"></div>
</div> 
</template>
<script>
export default {
    data(){
        return {
            Res:{

            }
        }
    },
    methods:{

    },
    components:{

    },
    created(){
        console.log(JSON.parse(this.$route.query.result));
        this.Res = JSON.parse(this.$route.query.result);
        console.log(this.Res.e>this.Res.i? this.Res.e/(this.Res.e+this.Res.i)*100+'%':'0');
    },
    
};
</script>
<style lang="less">
.test-result {
    display:flex;
    .main {
        // width:70%;
        flex:1;
        text-align:center;
        background-color: #eee;
        .header {
        }
        .chart {
            display:flex;
            justify-content:center;
            .m-chart {
                width:300px;
                .mid {
                    text-align:left;
                    box-sizing: border-box;
                    display: flex; display: -webkit-flex;display: -ms-flex;display: -o-flex;
                    justify-content: center;
                    margin:8px 0;
                    font-size:13px;
                    .type {
                        // flex-basis:0;
                        width:50px;
                        text-align: center;
                        // background-color: pink;
                    }
                    .prog.l {
                        border-right:none;
                    }
                    .prog {
                        // flex-basis:0;
                        width:90px;
                        border:1px solid #80c342;
                        padding:1px;
                        &>div {
                            height:15px;
                            background-color: #80c342;
                            // width:33%;
                            .val {
                                padding:0 1px;
                                font-size:12px;
                            }
                        }
                        .e,.s,.t,.j {
                            float:right;
                        }
                        .i,.n,.f,.p {
                            float:left;
                            .val {
                                float:right;
                            }
                        }
                    }
                }

                // &>div {
                //     margin:3px 0px;
                //     border:1px solid #80c342;
                //     flex-basis:48%;
                //     flex-shrink:0;
                //     display: flex; display: -webkit-flex;display: -ms-flex;display: -o-flex;
                //     .type {
                //         flex-basis:20%;
                //     }
                //     .prog {
                //         flex-basis:80%;
                //         height:14px;
                //         margin:1px;
                //         width:33%;
                //         background-color: #80c342;
                //     }
                // }
                // .e,.s,.t,.j {
                //     .prog {
                //         float:right;
                //     }
                // }
            }
            .f-chart {
                .f-f{
                margin:0 auto;
                width:190px;
                background: #fff;
                padding:6px;
                    &>div {
                        border-radius:50%;
                        color:#fff;
                    }
                    .f1 {
                        height:60px;
                        line-height:60px;
                        width:146px;
                        background-color:skyblue;
                        margin-left:30px;
                        font-size:15px;

                        }
                    .f2 {
                        height:48px;
                        line-height:48px;
                        width:116px;
                        margin:-9px 0 0 0;
                        background-color: #f77;
                        font-size:14px;
                    }
                    .f3 {
                        height:38px;
                        line-height:38px;
                        width:96px;
                        margin:-18px 0 0 45%;
                        background-color: blue;
                        font-size:13px;
                    }
                    .f4 {
                        height:23px;
                        line-height: 23px;
                        width:62px;
                        margin:-6px auto;
                        background-color: hotpink;
                        font-size:12px;
                    }

                }
            }
        }
        .details {

        }

    }
    .aside{
        width:30%;
        background-color: #ddd;
        @media screen and (max-width:768px){
            display:none;
        }
    }

}

</style>
    
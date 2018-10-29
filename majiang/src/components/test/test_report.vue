<template>
<div class="test-result">
    <div class="main"  v-if="mbtiRes">
        <!--<h4>MBTI 测试报告</h4>-->
        <div class="line1">REPORT</div>
        <!--头部-->
        <div class="header">
            <!--<h2>测试报告</h2>-->
            <h3 class="tit">{{mbtiRes.type}}<span> ({{mbtiRes.type_ch}})</span></h3>
            <p class="sub-tit">—— {{mbtiRes.subTitle}}</p>
            <div class="test-msg">
                <!-- <span>报告接收者：user00mmm</br> -->
                测试日期：{{$moment(time).format('YYYY-MM-DD')}}</span>
            </div>
        </div>
        <div class="line2"></div>
        <!--描述-->
        <div class="list list-details">
            <div class="content feature txt-left">
                <h5>MBTI倾向与功能</h5>
            <div class="chart">
                <div class="m-chart">
                    <mbtiChart :Res="Res" :type="type"></mbtiChart>
                </div>
                <div class="f-chart">
                    <!-- <div class="chart-tit">{{mbtiRes.type}} 功能</div> -->
                    <funcChart :type="type"></funcChart>
                    <!-- <div class="f-f txt-center">
                        <div class="f1">{{mbtiRes.f[0]}}
                            <div class="f2">{{mbtiRes.f[1]}}
                                <div class="f3">{{mbtiRes.f[2]}}
                                    <div class="f4"><span>{{mbtiRes.f[3]}}</span></div>                    
                                </div>
                            </div>
                        </div>
                        <div class="info">
                            <div>
                                <p>主导功能：{{mbtiRes.f[0].substr(0,2)}}（{{mbtiRes.f_ch[0]}} {{mbtiRes.f_en[0]}}）</p>
                                <p>辅助功能：{{mbtiRes.f[1].substr(0,2)}}（{{mbtiRes.f_ch[1]}} {{mbtiRes.f_en[1]}}）</p>
                                <p>次等功能：{{mbtiRes.f[2].substr(0,2)}}（{{mbtiRes.f_ch[2]}} {{mbtiRes.f_en[2]}}）</p>
                                <p>劣等功能：{{mbtiRes.f[3].substr(0,2)}}（{{mbtiRes.f_ch[3]}} {{mbtiRes.f_en[3]}}）</p>
                            </div>
                        </div>
                    </div> -->

                </div>
            </div>
            </div>
            <div class="content feature txt-left">
                <h5>性格特征</h5>
                <p>{{mbtiRes.feature}}</p>
            </div>
            <div class="content feature txt-left">
                <h5>优势</h5>
                <p v-html="mbtiRes.advantage"></p>
            </div>
            <div class="content feature txt-left">
                <h5>劣势</h5>
                <p v-html="mbtiRes.shortcoming"></p>
            </div>
            <div class="content feature txt-left">
                <h5>擅长领域</h5>
                <p v-html="mbtiRes.domain"></p>
            </div>
            <div class="content feature txt-left">
                <h5>职业</h5>
                <p v-html="mbtiRes.job"></p>
            </div>
        </div>
    </div>
    <!--<div class="aside"></div>-->
</div> 
</template>
<script>
import funcChart from '../common/func_chart'
import mbtiChart from '../common/mbti_chart'
export default {
    data(){
        return {
            mbtiRes:'',
            Res:'',
            type:'',
            time:''
        }
    },
    components:{
        funcChart,mbtiChart
    },
    methods:{
        getResult(){
            this.$axios.getTestById({tid:this.tid}).then(res=>{
                if(res.data.success){
                    let d = res.data.data
                    this.Res = d.res
                    this.type = d.type
                    this.time = d.c_time
                    this.mbtiRes = d.doc
                }
            }).catch(err=>{ })
        }

    },
    created(){
        this.tid = this.$route.path.split('/')[3]
        // 请求数据
        this.getResult()
        window.scrollTop = 0
    },
    
};
</script>
<style lang="less">
.test-result {
    margin:0 auto;
    max-width:900px;
    font-size:15px;
    background-color: #fff;
    .main {
        text-align:center;
        padding:4% 5%;
        &>h4 {
            // display:inline-block;
            background-color: #70a9e5;
            border-bottom:2px solid rgba(69,110,165,.4);
            color:#fff;
            padding:12px;
            padding-bottom:15px;
            font-size:28px;
            
        }
        .line1 {
            color:#fff;
            font-style: italic;
            margin:0px 0 5px;
            height:20px;
            background-color: #f8f8f8;
        }
        .line2 {
            border-bottom:1px dotted #f5f5f5;
            margin:5px 0 20px;
        }
        .header {
            background-color: #fafafa;
            padding:30px 5px 10px;
            h3.tit {
                margin-bottom:3px;
                font-size:24px;
                font-weight:700;
                color:#111;
                span {
                    font-weight:400;
                    font-size:.8em;
                    // height:25px;
                    // font-size:18px;
                }
                
            }
            .sub-tit {
                font-size:15px;
                color:#444;
                margin-bottom:18px;
            }
            .test-msg {
                text-align:right;
                color:#777;
                font-size:14px;
                span{
                    display: inline-block;
                    text-align:left;
                    min-width:128px;
                }
            }
        }
        .list {
            padding:3%;
            border:1px solid #fafafa;
            .content {
                // padding:5px;
                padding-bottom:8px;
                h5 {
                    font-size:17px;
                    font-weight:700;
                    margin-bottom:8px;
                }
                p {
                    // padding-left:5px;
                }


            }
        }
        .chart {
            display:flex;
            justify-content:space-between;
            .chart-tit {
                font-size:15px;
                text-align:center;
                height:28px;
                line-height: 28px;
                font-weight:600;
                position: absolute;
                width:100%;
                top:7px;
                left:0;
            }
            .m-chart {
                flex:0 0 49%;
                margin-bottom:10px;
            }

            .f-chart {
                // min-width:300px;
                flex:0 0 49%;
                margin-bottom:10px;

            }
        }
        .details {

        }

    }
    @media screen and (max-width:768px){
        .main {
            padding:0.5%;
        }
        .chart {
            flex-wrap: wrap;
            .m-chart,.f-chart {
                flex:0 0 100% !important;
                
            }
        }
    }

}

</style>
    
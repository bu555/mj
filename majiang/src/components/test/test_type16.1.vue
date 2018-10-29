<template>
<div class="test-16type">
            <div class="left-box">
                <div class="test-list">
                    <!--<div class="t-items" v-for="(v,i) in questionList" :key="i">
                        <div class="question">
                            {{i+1}}、{{v.question}}{{v.qid}}
                        </div>
                        <div class="answer">
                            <template>
                                <el-radio v-model="result[i].res" label="a">{{v.l}}</el-radio><br/>
                                <el-radio v-model="result[i].res" label="b">{{v.r}}</el-radio>
                            </template>
                        </div>
                    </div>-->


                
                </div>
                <div class="btn">
                    <el-button type="primary" round @click="submitTest()">提 交</el-button>
                </div>
            </div>
            <Result ></Result>

</div> 
</template>
<script>
import questionType16 from './subject/type16.js'
import Result from './result'
import mySelect from "./select"
export default {
    data(){
        return {
            questionList:[
                {
                    qid:'jp5',
                    question:'你习惯于：',
                    l:'A．及时处理不愉快的事情，务求把它们抛诸脑后。',
                    r:'B．暂时放下不愉快的事情，直至有心情时才处理。',
                    remark:28
                },
                {
                    qid:'jp6',
                    question:'你喜欢的工作是：',
                    l:'A．需要定出目标，然后逐步实现，井井有条的。',
                    r:'B．需要迅速和即时做出反应，没有过多约束的。',
                    remark:28
                },
            ],
            // 提交的结果
            result:[

            ],
            res1:'[{"id":"ei1","res":"b"},{"id":"ei2","res":"b"},{"id":"ei3","res":"b"},{"id":"ei4","res":"b"},{"id":"ei5","res":"b"},{"id":"ei6","res":"b"},{"id":"ei7","res":"b"},{"id":"sn1","res":"b"},{"id":"sn2","res":"b"},{"id":"sn3","res":"b"},{"id":"sn4","res":"b"},{"id":"sn5","res":"b"},{"id":"sn6","res":"b"},{"id":"sn7","res":"b"},{"id":"sn8","res":"a"},{"id":"tf1","res":"a"},{"id":"tf2","res":"a"},{"id":"tf3","res":"a"},{"id":"tf4","res":"a"},{"id":"tf5","res":"a"},{"id":"tf6","res":"a"},{"id":"tf7","res":"a"},{"id":"tf8","res":"a"},{"id":"jp1","res":"a"},{"id":"jp2","res":"a"},{"id":"jp3","res":"a"},{"id":"jp4","res":"a"},{"id":"jp5","res":"a"},{"id":"jp6","res":"a"}]',
            calcRes:null,
            showRes:false
        }
    },
    methods:{
        submitTest(){
            console.log(JSON.stringify(this.result));
            this.calc();

        },
        calc(){
            this.calcRes = {e:0,i:0,s:0,n:0,t:0,f:0,j:0,p:0};
            let res = this.result;
            // let res = JSON.parse(this.res1);
            res.forEach(v=>{
                if(v.res){
                    if(v.res==='a'){
                        this.calcRes[v.id[0]] = this.calcRes[v.id[0]] +1;
                    }else if(v.res==='b'){
                        this.calcRes[v.id[1]] = this.calcRes[v.id[1]] +1;
                    }
                }
            })
            this.showRes = true;
            
            
        }
    },
    created(){
        this.questionList = questionType16;
        //将qid添加到result,和res映射，统计时使用
        this.questionList.forEach(v=>{
            this.result.push({
                id:v.qid,
                res:''
            })
        })

    },
    components:{
        Result
    }
    
};
</script>
<style lang="less">
.test-16type {
        max-width:960px;
        margin:0 auto;
        .left-box {
            flex-grow:1;
            flex-basis:70%;
            min-height:255px;
            border:1px solid #eee;
            .test-list {
                padding:15px 40px;
                .answer {
                    padding-left:20px;
                    padding-top:5px;
                }
                .el-radio {
                    margin:5px;
                }
                .t-items {
                    padding:6px 0;
                }
                // .el-radio__input.is-checked+.el-radio__label {
                //     color: #538dd5;
                // }
                // .el-radio__input.is-checked .el-radio__inner {
                //     background: #538dd5;
                // }
            }
            .btn {
                text-align:center;
                margin:20px;
                .el-button.is-round {
                    padding:10px 32px;
                }
            }
            
        }
        .right-box {
            flex-grow:1;
            flex-basis:30%;
            min-height:255px;
            border:1px solid #eee;

        }
        .el-radio__label {
            font-size: 13px;
        }
        
}

</style>
    
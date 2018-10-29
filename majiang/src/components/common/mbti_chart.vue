<template>
    <div class="my-mbti-chart">
        <div class="f-title">MBTI 倾向</div>
        <div class="mids">
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
                <div class="type">T 思维</div>
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
            <div class="info">
                <span>类 型：<em>{{type.toUpperCase()}}</em></span></br>
                <span>倾向度：<em>{{clacDegree(Res)}}</em></span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data(){
      return{
      }
  },
  methods:{
      clacDegree(res){
          return ((clac(res.i,res.e)+clac(res.s,res.n)+clac(res.t,res.f)+clac(res.j,res.p))/4*100).toFixed(1) +'%'
          
          function clac(a,b){
              return a>b?a/(a+b) : b/(a+b)
          } 
      }
  },
  filters:{
  },
  props:{
      Res:{
          default: ''
      },
      type:''
  },
  created(){
  }
}
</script>

<style lang="less" scoped>
    .my-mbti-chart {
        position: relative;
        border:1px solid #f0f5f5;
        background-color: #fff;
        border-radius:8px;
        height:100%;
        padding:12px 0;
        .f-title {
            height:30px;
            font-weight:700;
            font-size:16px;
            margin:0 20%;
            border-bottom:1px dotted #f2f2f2;
            color:#444;
            text-align: center;
        }
        .mids {
            height:275px;
            margin:0 auto;
            // max-width:320px;
            padding-top:25px;
            .info {
                width:158px;
                margin:0 auto;
                padding:7px 0 0 33px;
                em {
                    font-weight:700;
                }
            }
        }
        .mid {
            text-align:left;
            box-sizing: border-box;
            display: flex; display: -webkit-flex;display: -ms-flex;display: -o-flex;
            justify-content: center;
            margin:12px 0;
            // font-size:13px;
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
                width:80px;
                border:1px solid #bcc5bb;
                padding:1px;
                &>div {
                    height:17px;
                    background-color: #4ac555;
                    // width:33%;
                    .val {
                        padding:0 1px;
                        font-size:13px;
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

    }
</style>


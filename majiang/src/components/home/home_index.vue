<template>
<div class="home-index">
    <!-- <div class="top-bg"></div> -->
    <div class="h-body">
            <div class="item-t" style="">
                <div class="h-title">M的初衷</div>
            </div>
            <div class="my-info">
                <h2>我们希望通过人格类型的镜头提供变革性的见解，将自我意识视为个人成长的重要先导，我们努力阐明读者可能无法看到或理解的心理现实。</h2>
                <h2>我们认为社会的每个阶层都应该有权利去定位自我、发掘自身的潜力、实现自我价值。</h2>
                <h2>我们相信，了解自身的人格类型以及功能对于以下几个方面至关重要：</h2>
                <p>1、澄清自身的优点，身份和人生目标</p>
                <p>2、开发心智，寻找到与“心流”伴随的成长之路</p>
                <p>3、认识到自身的价值观、信仰、兴趣和动机可能会被你的类型塑造和影响</p>
                <!--通过洞察力和意识的力量，使真正成长的潜力成为可能。-->
            </div>
            <div class="item-t" style="">
                <div class="h-title">在M能得到什么?</div>
            </div>
            <ul class="my-tasks">
                <!--<li  v-for="(v,i) in 5" :style="'background:'+(i%2==0?'#fff':'#f2f2f2')" :key="i">-->
                <li>
                    <div class="li-left">
                        <img src="/static/img/home_items_1.png" alt="">
                    </div>
                    <div class="li-right">
                        <h2>找到自己的人格类型</h2>
                        <h3>在线提供全面的测试评估，致力为你提供最具价值的测试结果。</h3> 
                        <!--<h4>人格类型测试：</h4>-->
                        <!--<p>此更新和扩展我们的畅销TypeFinder评估版本的不断深入比你以前参加过的性格测试。基于对个性类型细微差别的原始研究，TypeFinder不仅揭示了您的四字母个性类型代码，还揭示了您的独特个性概况如何适合该类型。你的结果回答如下问题：</p>-->
                        <p>人格类型测试：提供最符合场景的题型来找准你的类型</p>
                        <p>八维功能测试：通过评估行为方式来校正您的性格类型</p>
                        <p>相似类型测试：作为附加测试，必要时厘清模糊界限</p>
                        <p>名人汇：建立一个样本平台来深入对人格类型的理解</p>
                        <p>M论坛：采用社区形式，集众人之力创造更具价值的资讯</p>
                    </div>
                </li>
                <li>
                    <div class="li-left">
                        <img src="/static/img/home_items_2.png" alt="">
                    </div>
                    <div class="li-right">
                        <h2>发现你的理想职业</h2>
                        <h3>找出能最大限度地发挥你的内在潜力、天赋，并遵从你内在核心价值的职业</h3> 
                        <p>定位自己擅长的事业领域</p>
                        <p>找到内在动力、激励和焦虑的源泉</p>
                        <p>从人性的视角去促进团队的协作</p>
                        <p>最大限度地发挥自己的优势，正确审视自己的劣势</p>
                    </div>
                </li>
                <li>
                    <div class="li-left">
                        <img src="/static/img/home_items_3.png" alt="">
                    </div>
                    <div class="li-right">
                        <h2>使人格作用充分发挥</h2>
                        <h3>可以促进个人天赋的发挥，让心流相随，效益最大化。</h3> 
                        <p>建立更有价值与意义的联系</p>
                        <p>辨清优势，发现合适的事业伙伴</p>
                        <p>促进理解与信任，助力亲密关系的发展</p>
                        <p>提升心智、发现兴趣，专注于自己所擅长</p>
                        <p>洞察个体差异的本质，更好的驾驭人际网络</p>
                    </div>
                </li>



                <!--<li>
                    <div class="li-left">
                        <img src="/static/img/home_items_3.png" alt="">
                    </div>
                    <div class="li-right">
                        <h2>发现你的理想职业</h2>
                        <h3>寻找你完美的职业？职业个性分析工具测量您的兴趣和个性，全面评估您的兴趣，才能和潜力。</h3> 
                        <h4>职业个性分析器</h4>
                        <p>职业个性分析器是一项全面的，经过科学验证的职业测试，可以衡量您的兴趣和性格特征，从而为您找到合适的职业。你会发现：</p>
                    </div>
                </li>
                <li>
                    <div class="li-left">
                        <img src="/static/img/home_items_4.png" alt="">
                    </div>
                    <div class="li-right">
                        <h2>发现你的理想职业</h2>
                        <h3>寻找你完美的职业？职业个性分析工具测量您的兴趣和个性，全面评估您的兴趣，才能和潜力。</h3> 
                        <h4>职业个性分析器</h4>
                        <p>职业个性分析器是一项全面的，经过科学验证的职业测试，可以衡量您的兴趣和性格特征，从而为您找到合适的职业。你会发现：</p>
                    </div>
                </li>-->
            </ul>
            <!--<bu-alert></bu-alert>-->
    </div>
</div> 
</template>
<script>
export default {

    components:{
        
    },
    created(){
    }
};
</script>
<style lang="less">
.home-index {
   .top-bg {
       max-width:997px;
       height:15vw;
       margin:0 auto;
    //    width:100%;
       background: lime;
       background-image:url('/static/img/yssl_bg.png');
       background-repeat:no-repeat;
       background-size:cover;
   }
   .h-body {
        max-width: 997px;
        margin:0 auto;
        .my-info {
            background-color: #fff;
        }
        .item-t {
            // background:rgba(255,255,255,.7);
            // background:#70a9e5;
            // background:url('/static/img/bg_1.png');
            background-color: #fff;
            text-align:center;
            padding-top:2.5%;
        }
        .h-title {
            // text-align: center;
            display:inline-block;
            font-size:28px;
            // padding:30px 0 10px;
            height:70px;
            line-height: 70px;
            color:#456ea5;
            position: relative;
            &:after,&:before {
                content:"";
                display:block;
                height:25px;
                width:25px;
                border:1px solid #75a9de;
                position:absolute;
                top:12px;
                left:-40px;
            }
            &:before {
                height:18px;
                width:18px;
                border:1px solid #ffaf4b;
                top:26px;
                left:-25px;
            }
            
        }
        .my-info {
            padding:1px 4% 5%;
            margin:0;
            // background-color: #fdfdfd;
            background-color: #fff;
            border-bottom:1px solid #f2f2f2;
            h2 {
                font-size:19px;
                margin:10px 0;
            }
            p {
                font-size:16px;
                margin-bottom:5px;
            }
        }
        ul.my-tasks {
            &>li{
                display:flex;
                padding:4% 0 ;
                .li-left{
                    flex:0 0 40%;
                    display:flex;
                    justify-content:center;
                    align-items: center;
                    img {
                        // width:30%;
                        width:310px;
                        height:310px;
                        border-radius:50%;
                    }
                }
                .li-right{
                    flex:0 0 60%;
                    padding-right:5%;
                    padding-top:2%;
                    font-size:15px;
                    h2 {
                        position: relative;
                        font-size:23px;
                        margin-bottom:15px;
                        &:after {
                            content:"";
                            display:block;
                            height:3px;
                            width:70px;
                            background: #ffaf4b;
                            position:absolute;
                            bottom:-7px;
                            left:0px;
                        }
                    }
                    h3 {
                        font-size:18px;
                        margin-bottom:15px;
                    }
                    h4 {
                        font-size:16px;
                        margin-bottom:5px;
                    }
                    p {
                        padding-left:10px;
                        margin-bottom:4px;
                        position: relative;
                        color:#555;
                        &:after {
                            content:"";
                            display:block;
                            height:4px;
                            width:4px;
                            background: #ffaf4b;
                            position:absolute;
                            top:8px;
                            left:0px;
                        }
                    }
                }
                &:nth-child(2n+1){
                    background-color: #fff;
                }
                &:nth-child(2n+0){
                    background-color: #fcfcfc;
                    // background-color: #fdfdfd;
                    // background-color: #fafafa;
                }
            }
        }
   }

   @media screen and (max-width:768px) {
        .h-body {

            ul.my-tasks {
                li{
                    padding:4% 0 ;
                    flex-wrap:wrap;
                    .li-left{
                        flex:0 0 100%;
                        img {
                            width:232px;
                            height:232px;
                            object-fit: cover;
                        }
                    }
                    .li-right{
                        flex:0 0 100%;
                        padding:2% 4%;
                        h2 {
                            position: relative;
                            font-size:23px;
                            &:after {
                            }
                        }
                        h3 {
                            font-size:18px;
                        }
                    }
                }
            }
    }
   }
}

</style>
    
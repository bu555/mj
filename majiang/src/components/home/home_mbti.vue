<template>
<div class="home-mbti">
    <section>
        <h2 class=''>MBTI <span>是什么？</span></h2>
        <p>MBTI的全名是Myers-Briggs Type Indicator。它是一种迫选型、自我报告式的性格评估理论模型，用以衡量和描述人们在获取信息、作出决策、对待生活等方面的心理活动规律和性格类型。</p>
    </section>
    <section>
        <h2 class=''>MBTI <span>发展历程</span></h2>
        <p>1913年，瑞士心理学家C. G. Jung在慕尼黑国际精神分析会议上提出了内向型性格与外向型性格，揭开了现代性格类型研究的序幕。</p>
        <p>1921年，Jung发表《心理类型学》（德文版）；1923年H. G. Baynes将其译为英文，并由纽约的Harcourt Brace Jovanovich Company出版。该书是公认的现代性格类型理论的奠基之作。</p>
        <p>1942年，美国的Katherine C Briggs和Isabel Briggs Myers母女在Jung理论的基础上，开发了MBTI的第一张量表——量表A。当时正值第二次世界大战，Isabel母女希望通过MBTI增进人与人之间的相互理解和欣赏，从而避免战争。</p>
        <p>1957年，MBTI升级到量表D，增设“词对问题”。</p>
        <p>1962年，MBTI由新泽西普林斯顿的教育测试服务机构（ETS）出版，但ETS规定它只能被用于研究领域。
同年，Isabel Briggs Myers出版了她的研究手册，这是有关MBTI的第一个正式文献。她还应邀在美国心理学学会发言，标志着MBTI获得了当时心理学界的正式认可。</p>
        <p>1962年~1970年，MBTI升级到量表E，开始关注性格类型的性别差异。</p>
        <p>1972年，“心理类型应用中心”（CAPT）在佛罗里达大学成立，它保存有心理类型研究所需的主要材料，并于1975年发起了第一次“类型测量学会议”。</p>
        <p>1975年，咨询心理学出版社（CPP）成为MBTI的正式出版者；MBTI在专业圈内得到进一步普及，并且第一次获准为普通大众提供服务。</p>
        <p>1977年~1978年，MBTI升级到量表K；开发出“MBTI第二步”（StepⅡ），把每个维度进一步细分为5个子维度，通过复杂的计算机计分程序产生结果——“扩展解释报告”（EIR）——大大提升了性格类型评估的精度和深度。</p>
        <p>1979年，心理类型学学会（APT）在CAPT会议上诞生。它的宗旨是促进MBTI的专业化和标准化，鼓励各种类型学派的多样化发展。</p>
        <p>1998年，在量表研究中引入“项目特征曲线”（ICC），进一步加强了MBTI评估的科学性。
同年，MBTI升级到量表N（1998-N），增加测谎量表和一致性指数，这也是目前使用中的MBTI的最新版本。。</p>
    </section>
</div>
</template>
<script>
export default {
    components:{

    }
}
</script>
<style lang="less">
.home-mbti {
    section {
        padding:2% 0;
        h2 {
            font-size:27px;
            text-align: center;
            margin-bottom:8px;
            // margin: 50px auto 100px;
            // font-size: 100px;
            // background: -webkit-linear-gradient(top,#fc0,#f30 50%,#c00 51%,#600);
            // background: -webkit-linear-gradient(top, #403e35, #f30 50%, #1d4475 51%, #042335);
            // -webkit-background-clip: text;
            // -webkit-text-fill-color: transparent;
            color:#3b434f;
            span {
                font-size:25px;
                position: relative;
                top:-2px;
            }
        }
    }

.hsl{color:hsl(183, 80%, 16%);text-shadow:0 0 1px currentColor,
/*highlight*/
-1px -1px 1px rgb(11, 64, 112),
0 -1px 1px hsl(11, 64, 112),
1px -1px 1px hsl(11, 64, 112),
/*light shadow*/
1px 1px 1px hsl(184,80%,10%),
0 1px 1px hsl(184,80%,10%),
-1px 1px 1px hsl(184,80%,10%),
/*outline*/
-2px -2px 1px hsl(184,80%,15%),
-1px -2px 1px hsl(184,80%,15%),
0 -2px 1px hsl(184,80%,15%),
1px -2px 1px hsl(184,80%,15%),
2px -2px 1px hsl(184,80%,15%),
2px -1px 1px hsl(184,80%,15%),
2px 0 1px hsl(184,80%,15%),
2px 1px 1px hsl(184,80%,15%),
-2px 0 1px hsl(184,80%,15%),
-2px -1px 1px hsl(184,80%,15%),
-2px 1px 1px hsl(184,80%,15%),
/*dark shadow*/
2px 2px 2px hsl(184,80%,5%),
1px 2px 2px hsl(184,80%,5%),
0 2px 2px hsl(184,80%,5%),
-1px 2px 2px hsl(184,80%,5%),
-2px 2px 2px hsl(184,80%,5%)
}


}
</style>



<template>
    <div class="footer">
        <div class="f-body">
            <!-- <ul class="f-info pc" >
                <li>© 2005－2018 douban.com, all rights reserved 北京豆网科技有限公司 </li>
                <li><span>京ICP证090015号</span> 京ICP备11027288号 网络视听许可证0110418号 </li>
                <li>京网文[2015]2026-368号  京公网安备11010502000728  新出网证(京)字129号 </li>
                <li>违法和不良信息举报电话：4008353331-9  </li>
                <li>中国互联网举报中心 电话：12377 <span>《食品流通许可证》许可证：SP1101051510347287</span> </li>
                <li><span>新出发京批字第直160029号</span></li>
            </ul> -->
            <div class="f-links">
                <ul>
                    <li>
                        <router-link to="/about">
                            关于XMBTI
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/about/contactus">
                            联系我们
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/about/disclaimer">
                            免职声明
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/about/help">
                            帮助中心
                        </router-link>
                    </li>
                    <!-- <li>
                        <router-link to="/">
                            合作伙伴
                        </router-link>
                    </li> -->
                </ul>
                <!-- 举报按钮 -->
                <!-- <router-link to="/" class="tip-off">
                </router-link> -->
            </div>
            <ul class="f-info ">
                <li>© 2017－2018 广州捷蟒科技有限公司 <span>粤ICP证090015号</span></li>
            </ul>
        </div>
    </div>
</template>
<style lang="less">
.footer{
    // background-color: #456ea5;
    background-color: #fff;
    border-top:1px dotted #eee;
    text-align: center;
    min-height:70px;
    margin-top:32px;
    .f-body {
        max-width:970px;
        margin:0 auto;
        font-size:13px;
        padding-top:22px;
        .f-links {
            padding-left:0em;
            margin-bottom:6px;
            ul{
                display:flex;
                justify-content:center;
                align-items:center;
                li{
                    // padding:0 10px;
                    a {
                        color:#999;
                    }
                    a:hover {
                        color:#3a77a8;
                    }
                }
                li+li {
                    padding-left:15px;
                    position: relative;
                    &:after {
                        content:"";
                        display:block;
                        position: absolute;
                        top:8px;
                        left:7px;
                        width: 2px;
                        height: 2px;
                        border-radius:50%;
                        background-color: #aaa;
                    }
                }
            }
            a.tip-off {
                display:block;
                border-radius:4px;
                overflow: hidden;
                width:143px;
                height:60px;
                background: url(/static/img/tip-off.jpg) no-repeat;
                background-size:cover;
            }
        }
        ul.f-info {
            text-align: left;
            font-size:12px;
            text-align: center;
            margin-bottom:10px;
            li {
                color:#b2b2b2;
                span {
                    color:#37a;
                }
            }

        }

    }
    @media screen and (max-width:992px){
        padding: 0 15px;
    }
    @media screen and (max-width:768px){

    }
}
</style>

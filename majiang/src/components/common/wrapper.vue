<template>
    <div class="wrapper-1">
        <div class="bg-icon"></div>
        <div class="bg-icon"></div>
        <div class="bg-icon"></div>
        <img src="/static/img/banner_5.png" alt="">
        <div class="bg-font">
            <span>人生</span><span>需要一个锚</span>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less">
.wrapper-1 {
    max-width:720px;
    width:100%;
    height:100%;
    max-height:202px;            
    position: relative;
            img {
                display: block;
                width:232px;
                height:auto;
                // object-fit: contain;
                position: absolute;
                top:-38%;
                left:22%;

                transform:rotate(25deg);
                -ms-transform:rotate(25deg); 	/* IE 9 */
                -moz-transform:rotate(25deg); 	/* Firefox */
                -webkit-transform:rotate(25deg); /* Safari 和 Chrome */
                -o-transform:rotate(25deg); 	/* Opera */
            }
            div.bg-icon {
                display:block;
                position:absolute;
                border-radius:50%;
            }
            div.bg-icon:nth-of-type(1) {
                left:0;
                top:150px;
                width:130px;
                height:130px;
                background-color: #9cdcf7;
            }
            div.bg-icon:nth-of-type(2) {
                right:5%;
                top:165px;
                width:100px;
                height:100px;
                background-color: #dae83a;
            }
            div.bg-icon:nth-of-type(3) {
                right:30%;
                top:120px;
                width:50px;
                height:50px;
                background-color: #f7df2d;
            }
            div.bg-icon:nth-of-type(4) {
                // left:30%;
                // top:-10%;
                // width:50px;
                // height:50px;
                // background-color: #59e8e4;
            }
            div.bg-font {
                display:block;
                position:absolute;
                right:50px;
                top:50px;
                font-size:20px;
                color:#fff;
                span:nth-of-type(1){
                    // color:#c22cb9;
                    font-size:25px;
                    padding-right:.2em;
                }
                span:nth-of-type(2){
                    // color:#fb8822;
                }

            }
    
    @media screen and (max-width:768px){
        
        height:29vw; 
        
            img {
                width:34vw;
            }
            div.bg-icon:nth-of-type(1) {
                left:0;
                top:19vw;
                width:20vw;
                height:20vw;
                background-color: #9cdcf7;
            }
            div.bg-icon:nth-of-type(2) {
                right:5%;
                top:22vw;
                width:12vw;
                height:12vw;
                background-color: #dae83a;
            }
            div.bg-icon:nth-of-type(3) {
                right:38%;
                top:15vw;
                width:8vw;
                height:8vw;
                background-color: #f7df2d;
            }
            div.bg-icon:nth-of-type(4) {
                // left:30%;
                // top:-10%;
                // width:50px;
                // height:50px;
                // background-color: #59e8e4;
            }
            
            div.bg-font {
                display:block;
                position:absolute;
                right:5vw;
                top:5vw;
                font-size:4vw;
                color:#fff;
                span:nth-of-type(1){
                    font-size:6vw;
                }
                span:nth-of-type(2){
                    // color:#fb8822;
                }

            }
    }
    
}
</style>



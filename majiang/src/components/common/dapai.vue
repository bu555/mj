<template>
    <div class="da-pai-comp">
        <div class="center">

            <ul class="player-1 x-axis">
                <li v-for="(v,i) in player_1" :key="i">
                    <!-- {{v}} -->
                    <img :src="'/static/img/'+v+'.gif'">
                </li>
            </ul>
            <ul class="player-3 x-axis">
                <li v-for="(v,i) in player_3" :key="i">
                    <!-- {{v}} -->
                    <img :src="'/static/img/'+v+'.gif'">
                </li>
            </ul>
            <ul class="player-2 y-axis">
                <li v-for="(v,i) in player_2" :key="i">
                    <!-- {{v}} -->
                    <img :src="'/static/img/'+v+'.gif'">
                </li>
            </ul>
            <ul class="player-4 y-axis">
                <li v-for="(v,i) in player_4" :key="i">
                    <!-- {{v}} -->
                    <img :src="'/static/img/'+v+'.gif'">
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    props:[
        'p1', // {pai:['p']}
        'p2', // {pai:['p']}
        'p3', // {pai:['p']}
        'p4', // {pai:['p']}
    ],
    computed:{
        player_1(){
            return this.p1 || ['p1','p1','p1','p1','p1','p1','p1','p1','p1','p1','p1','p1','p1','p1','p1','p1','p1','p1']
        },
        player_2(){
            return this.p2 || ['p2','p1','p1','p1','p1','p1','p1','p1','p1','p1','p1','p1','p1','p1','p1','p1','p1','p1']
        },
        player_3(){
            return this.p3 || ['p3','p1','p1','p1','p1','p1','p1','p1','p1','p1','p1','p1','p1','p1','p1','p1','p1','p1']
        },
        player_4(){
            return this.p4 || ['p4','p1','p1','p1','p1','p1','p1','p1','p1','p1','p1','p1','p1','p1','p1','p1','p1','p1']
        },
    }
    
}
</script>
<style lang="less">
.da-pai-comp {
    @setWidth: 400px;
    @setHeight:@setWidth*0.65;
    @centerSize: @setHeight/3;
    @mjW: @centerSize * 2.5 / 10;
    @mjH: @mjW*1.3;
    @mjOffset: 6px;
    max-width:@setWidth;
    height:@setWidth*0.7;
    background-color: #eee;
    &>div.center {
        width: @centerSize;
        height: @centerSize;
        background-color: #ddd;
        position: relative;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%)
    }
    &>div.center ul {
        display:flex;
        justify-content: flex-start;
        width:@centerSize * 2.5;
        background-color: #e7e7e7;;
        flex-wrap:wrap;
        position:absolute;
        li {
            flex:0 0 @mjW;
            background-color: #ddd;
            height:@mjH;
            // border:1px solid #bbb;
            img {
                display:block;
                width:100%;
                opacity: .051;
            }
        }
    }
    ul.player-1 {
        left: -@centerSize/1.33 ;
        bottom: -@mjOffset;
        transform: translateY(102%);
    }
    ul.player-3 {
        right: -@centerSize/1.33;
        top:-@mjOffset;
        transform: translateY(-102%) rotate(180deg);
    }
    ul.player-2 {
        bottom: -@centerSize/1.5;
        right: -( @centerSize + @mjOffset * 2 ) / 1.33;
        transform: translate(100%,100%) rotate(270deg) ;
        transform-origin: left top;
    }
    ul.player-4 {
        top: -@centerSize/1.5;
        left: -( @centerSize + @mjOffset * 2 ) / 1.33;
        transform: rotate(90deg) ;
        transform-origin: left top;
    }

}
</style>



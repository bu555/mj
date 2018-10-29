<template>
    <div class="sub-comp">
        <ul class="item">
            <li>MBTI大学堂</li>
            <li>MBTI大学堂</li>
            <li>MBTI大学堂</li>
            <li>MBTI大学堂</li>
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
    }
}
</script>
<style lang="less">
.sub-comp{
    ul.item {
        li {
            margin-bottom:10px;
            height:44px;
            line-height:44px;
            border-radius:5px;
            padding-left:1.8em;
        }
        li:nth-of-type(1){
            background-color: #f39483;
            color:#fff;
        }
        li:nth-of-type(2){
            background-color: #f3e0bf;
            color:#bd9041;
        }
        li:nth-of-type(3){
            background-color: #c3e4de;
            color:#5f968e;
        }
        li:nth-of-type(4){
            background-color: #b9d6eb;
            color:#4e86a7;
        }
    }
}
</style>



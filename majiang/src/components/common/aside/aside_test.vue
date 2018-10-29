<template>
    <div class="sub-comp">
        <h3>特色测试</h3>
        <ul class="item">
            <li>
                <router-link to="/">INTP/INTJ测试</router-link>
            </li>
            <li>
                <router-link to="/">ENTP/ENFP测试</router-link>
            </li>
            <li>
                <router-link to="/">ESTP/ENTJ测试</router-link>
            </li>
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
    background-color: #f9fbf8;
    h3 {
        font-size:16px;
        margin-bottom:5px;
    }
    ul.item {
        li {
            margin-bottom:3px;
            a {
                color:#888;
            }
        }
    }
}
</style>



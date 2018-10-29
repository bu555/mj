<template>
    <div class="aside-comp">
        <mbtiComp v-if="current==='mbti'"></mbtiComp>
        <testComp v-if="current==='test'"></testComp>

    </div>
</template>
<script>
import mbtiComp from '@/components/common/aside/aside_mbti'
import testComp from '@/components/common/aside/aside_test'
export default {
    data(){
        return {
            current:''
        }
    },
    components:{
        mbtiComp,
        testComp,
    },
    methods:{
        init(){
            let path = this.$route.path
            if(/^\/mbti/.test(path)){
                console.log('mbti');
            }else if(/^\/example/.test(path)){
                console.log('example');
            }else if(/^\/forum/.test(path)){
                console.log('forum');
            }else if(/^\/test/.test(path)){
                this.current = 'test'
            }
        }
    },
    created(){
        this.init()
    }
}
</script>
<style lang="less">
.aside-comp{
    width:280px;
    margin:0 auto;
    @media screen and (max-width:992px){
        width:280px;

    }
}
</style>



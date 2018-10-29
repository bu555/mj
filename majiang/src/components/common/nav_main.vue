<template>
    <div class="nav-main">
        <NavMini class="nav-mini"></NavMini>
        <NavDefault class="nav-default"></NavDefault>
    </div>
</template>
<script>
import NavMini from '@/components/common/nav_main_mini'
import NavDefault from '@/components/common/nav_main_default'
export default {
    components:{
        NavMini,
        NavDefault
    },
    mounted(){
    }
}
</script>
<style lang="less">
.nav-main {
    .nav-mini {

    }
    .nav-default {
        display:none
    }
    @media screen and (max-width:768px) {
        .nav-mini {
            display:none;
        }
        .nav-default {
            display:block;
        } 
    }
}
</style>



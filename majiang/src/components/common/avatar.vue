<template>
    <div class="my-avatar">
        <router-link :to="'/info/'+UID" v-if="UID" >
        <img :src="src?src:'/static/img/logo_a.png'" alt="" :class="className">
        </router-link>
        <img v-else :src="src?src:'/static/img/logo_a.png'" alt="" :class="className">
    </div>
</template>
<script>
export default {
    data(){
        return{
            className:'',
            imgSrc:'',
            UID:''
        }
    },
    props:{
        size:{
            default: ''
        },
        src:{
            default: ''
        },
        uid:{
            default: ''
        },
        round:{
            default:false
        }
    },
    watch:{
        'uid':function(uid){
            // this.UID = uid
            this.init()
        },
        'src':function(src){
            // this.imgSrc = src
            this.init()
        },
        'size':function(size){
            this.init()
        },
        'round':function(round){
            this.init()
        },
    },
    methods:{
        init(){
            // switch(this.size){
            //     case 'mini':
            //     this.className = 'mini'
            //     break
            //     case 'small':
            //     this.className = 'small'
            //     break
            //     default:
            //     this.className = ''
            //     break
            // }
            this.className = this.size?this.size:''
            this.className = this.round?this.className+' round':this.className
            this.UID = this.uid
            this.imgSrc = this.src
        }
    },
    created(){
        this.init()
    }
}
</script>

<style lang="less" scoped>
    .my-avatar{
        display:inline-block;
        img {
            display:inline-block;
            width:98px;
            height:98px;
            border-radius:3%;
            border:1px solid #eee;
        }
        img.round {
            border-radius:50%;
        }
        img.big-x {
            width:125px;
            height:125px;
        }
        img.small-xxx {
            width:68px;
            height:68px;
        }
        img.small-xx {
            width:58px;
            height:58px;
        }
        img.small-x {
            width:48px;
            height:48px;
        }
        img.small {
            width:38px;
            height:38px;
        }
        img.mini {
            width:28px;
            height:28px;
        }
    }
</style>


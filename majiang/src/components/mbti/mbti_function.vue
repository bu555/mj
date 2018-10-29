<template>
<div class="func-8">
        <ul class="types-menu">
                <li v-for="(v,i) in $mbti.f8" :key="i" :class="'item '+($route.path.split('/')[2]===v?'active':'')" :style="'background-image:url(/static/img/'+v+'_btn.jpg)'">
                    <router-link :to="'/mbti/function/'+v">
                        {{v[0].toUpperCase()+v[1] }}
                    </router-link>
                </li>

        </ul>
        <div class="content editor-base-style" v-html="data.content">
        </div>
</div> 
</template>
<script>
import f8 from './f8'
export default {
    data(){
        return {
            type:'',
            loading:false,
            data:{}
        }
    },
    components:{
    },
    watch:{
        '$route.path':'getData'
    },
    methods:{
        getData(){
            this.type = this.$route.path.split('/')[3]
            // this.data.content = f8[this.type]
            // return 
            if(!this.type) return console.log('this type not default')
            // 获取数据
            this.loading = true
            this.$axios.getDocument({
                category:'func',
                key:this.type
            }).then(res=>{
                this.loading = false
                if(res.data.success){
                    this.data = res.data.data[0]
                }else{
                    this.data = {content:'null'}
                }
            }).catch(err=>{
                this.loading = false
            })
        }
    },
    mounted(){

    },
    created(){
        this.getData()
    },
    
};
</script>
<style lang="less">
.func-8 {
    position: relative;
    ul.types-menu {
            display:flex;
            flex-wrap:wrap;
            justify-content:space-between;
            .item {
                font-size:18px;
                flex:0 0 11%;
                height:38px;
                line-height: 38px;
                font-weight:700;
                color:#3e4652;
                border-color:#fff;
                text-shadow:0px 0px 2px #fff;
                box-shadow:1px 1px 5px #38414b;
                margin:3px;
                text-align: center;
                border-radius:2px;
                &:hover {
                    box-shadow:1px 3px 10px #38414b;
                }
                a {
                    display:block;
                    height:100%;
                }
            }
            .item.active {
                // box-shadow:1px 4px 10px #222;
                // text-shadow:1px 1px 1px #4b647b;

            }
    }
    .content {
        // padding:3%;
        padding-top:5%;
        background-color: #fff;
        img.func-img {
            display:block;
            max-width:400px;
            height:auto;
            margin:0px auto 15px;
        }
    }
    @media screen and (max-width:768px){
        }
    @media screen and (max-width:500px){
        ul.types-menu {
                .item {
                    flex:0 0 22%;
                }
        }
        .content {
            img.func-img {
                width:100%;
            }
        }
    }
}

</style>
    
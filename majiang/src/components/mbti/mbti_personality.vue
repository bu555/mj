<template>
<div class="personality">
        <ul class="types-menu">
                <li v-for="(v,i) in $mbti.types" :key="i" :class="'item '+($route.path.split('/')[3]===v?'active':'')">
                    <router-link :to="'/mbti/personality/'+v">
                        {{v.toUpperCase() }}
                    </router-link>
                </li>

        </ul>
        <div class="content editor-base-style" v-html="data.content">
            <!-- <img class="func-img" :src="'/static/img/'+id+'.jpg'" alt="">
            <div v-html="f8[id]"></div> -->
        </div>
</div> 
</template>
<script>
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
            if(!this.type) return console.log('this type not default')
            // 获取数据
            this.loading = true
            this.$axios.getDocument({
                category:'personality',
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
.personality {
    position: relative;
    ul.types-menu {
            display:flex;
            flex-wrap:wrap;
            justify-content:space-between;
            .item {
                font-size:17px;
                flex:0 0 11%;
                height:30px;
                line-height: 28px;
                border-radius:15px;
                border:1px solid rgba(14, 149, 157,0.6);
                margin:3px;
                text-align: center;
                &:hover {
                    box-shadow:0px 0px 2px #0e959d;
                    a {
                        // color:#05696f;
                    }
                }
                a {
                    color: rgba(14, 149, 157,0.86);
                    display:block;
                    height:100%;
                }
            }
            .item.active {
                background-color: rgba(14, 149, 157,0.99);
                box-shadow:0px 0px 2px #0e959d;
                a {
                    color:#fff;
                    font-weight:600;
                }

            }
    }
    .content {
        // padding:3%;
        padding-top:25px;
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
                margin:-3px;
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
    
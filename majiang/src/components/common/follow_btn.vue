<template>
    <div class="follow-ctrl-btn" style="padding-top:4px;">
        <span class="c3" v-if="loading"><i class="el-icon-loading"></i></span>
        <span class="c1" v-else-if="!follow" @click="followUser()"><i class="el-icon-plus"></i> 关注Ta</span>
        <span class="c2" v-else-if="follow" @click="followUser()">已关注</span>
        
    </div> 
</template>
<script>
export default {
    data(){
        return{
            loading:false,
            follow:false
        }
    },
    props:[
        'isFollow',
        'uuid'
    ],
    methods:{
        followUser(){
            this.loading = true
            this.$axios.followUser({
                uuid:this.uuid,  //关注的用户id
            }).then(res=>{
                this.loading = false
                if(res.data.success){
                    if(res.data.count==1){
                        this.follow = true
                    }else if(res.data.count==-1){
                        this.follow = false
                    }
                }
            }).catch(err=>{
                this.loading = false
            })
        }
    },
    created(){
        console.log('888',this.isFollow);
        this.follow = this.isFollow
    }
}
</script>

<style lang="less" scope>
    .follow-ctrl-btn {
        font-size:14px;
        &>span {
            text-align:center;
            display:inline-block;
            width:78px;
            height:30px;
            line-height:30px;
            border-radius:3px;
            cursor: pointer;
            background-color: #eee;
        }
        &>span.c1 {
            background-color: #70a9e5;
            color:#fff;


        }
        &>span.c2 {
            background-color: #bbb;
            color:#e5e5e5;

        }
        @media screen and (max-width:768px){
                font-size:14px;
                &>span {
                    width:68px;
                    height:26px;
                    line-height: 26px;
                }
        }
    }
</style>



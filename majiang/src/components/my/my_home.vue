<template>
  <div class="my-home">
        <div class="m-tab-b">
            <div :class="path.indexOf('/my/info')>-1?'active':''"><router-link to="/my/info">
                    <i class="fa fa-user-o"></i> 个人资料
                </router-link></div>
            <div :class="path.indexOf('/my/followers')>-1?'active':''"><router-link to="/my/followers">
                    <i class="el-icon-plus" style="margin:0 -1px 0 -2px"></i> 我关注<span>({{accountInfo.followers}})</span>
                </router-link></div>
            <div :class="path.indexOf('/my/following')>-1?'active':''"><router-link to="/my/following">
                    <i class="fa fa-plus-square-o "></i> 关注我<span>(2)</span>
                </router-link></div>
            <div :class="path.indexOf('/my/mark_article')>-1?'active':''"><router-link to="/my/mark_article">
                    <i class="el-icon-star-off" style="font-size:17px;margin-left:-2px"></i> 文章收藏<span>({{accountInfo.following}})</span>
                </router-link></div>
            <div :class="path.indexOf('/my/mark_example')>-1?'active':''"><router-link to="/my/mark_example">
                    <i class="el-icon-star-off" style="font-size:17px;margin-left:-2px"></i> 名人关注<span>({{accountInfo.following}})</span>
                </router-link></div>
            <div :class="path.indexOf('/my/test')>-1?'active':''"><router-link to="/my/test">
                    <i class="fa fa-file-text-o" style="margin:0 2px 0 1px"></i> 测试<span>({{accountInfo.test_record}})</span>
                </router-link></div>
            <div :class="path.indexOf('/my/publish')>-1?'active':''"><router-link to="/my/publish">
                    <i class="fa el-icon-edit"></i> 文章发表<span>({{accountInfo.my_article}})</span>
                </router-link></div>
            <div :class="path.indexOf('/my/comment')>-1?'active':''"><router-link to="/my/comment">
                    <i class="fa fa-edit"></i> 评论参与<span>({{accountInfo.my_comment}})</span>
                </router-link></div>
            <div :class="path.indexOf('/my/vote')>-1?'active':''"><router-link to="/my/vote">
                    <i class="fa fa-hand-paper-o"></i> 投票参与<span>({{accountInfo.vote_example}})</span>
                </router-link></div>
            <div :class="path.indexOf('/my/message')>-1?'active':''"><router-link to="/my/message">
                    <i class="fa fa-envelope-o"></i> 消息<span>({{accountInfo.my_message}})</span>
                </router-link></div>
            <!--<div><router-link to="">
                    <i class="fa fa-group "></i> 好友<span>(2)</span>
                </router-link></div>-->
        </div>
  </div>
</template>
<script>
export default {
    data(){
      return {
          accountInfo:{
              atten_example:0,
                followers:0,
                following:0,
                friends:0,
                likes_atricle:0,
                my_article:0,
                my_comment:0,
                my_message:0,
                test_record:0,
                vote_example:0,
          }
      }
    },
    computed:{
        path(){
            return this.$route.path
        }
    },
    methods:{
        getAccount(){
            // 获取账户信息
            this.loading = true
            this.$axios.getAccountInfo().then(res=>{
                this.loading = false
                if(res.data.success){
                    this.accountInfo = res.data.data;
                }
            }).catch(err=>{
                this.loading=false
            })
        },
    },
    created(){
        this.getAccount()
    }
}
</script>
<style lang="less">
.my-home {
    .m-tab-b {
        width:100%;
        padding:3px 0 70px;
        
        a {
            color:#444;
            display:block;
            padding:10px 15px;
            padding-left:7%;
            border-bottom:1px solid #f7f7f7;
            font-size:16px;
            &:hover {
            }
            &:visited {
                text-decoration: none;
            }
            &:link {
                text-decoration: none;
            }
            span {
                color:#909aae;
                font-size:13px;
                padding-left:5px;
            }
        }

    }
  @media screen and (max-width:525px) {
    padding:0px 0px 10px;
  }

// 大于768适配
  @media screen and (min-width:769px){
    border-bottom:1px solid #f5f5f5;
    margin-bottom:10px;
    .m-tab-b {
        max-width:970px;
        margin:0 auto;
        display:flex;
        padding:3px 0 0px;
        &>div {
            // flex:1;
            white-space:nowrap;
        }
        &>div.active a {
                color:#25959c;
                position: relative;
                // &:after {
                //     content:"";
                //     position:absolute;
                //     bottom:4px;
                //     left:0px;
                //     height:2px;
                //     width:100%;
                //     background-color: #55adb5;;
                // }
        }
        
        a {
            display:block;
            padding:10px 12px;
            // padding-left:7%;
            border-bottom:1px solid transparent;
            &:hover {
                // color:#25959c;
            }
            &:visited {
                text-decoration: none;
            }
            &:link {
                text-decoration: none;
            }
            span {
                display:none;
            }
            i {
                display:none;
            }
        }

    }
  }




}
</style>


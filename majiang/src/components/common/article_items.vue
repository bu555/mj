<template>
  <div class="article-items">
        <div class="article-preview">
            <router-link  :to="'/forum/'+items._id" class="title">{{items.title}}</router-link>
            <router-link  :to="'/forum/'+items._id" class="content">{{items.profile}}</router-link>
            <div class="a-info">
                    <!-- <img src="/static/img/si.jpg" alt=""> -->
                    <span class="author">{{items.r_name}}</span>
                    <span class="comments"><i class=" fa fa-comment" style="font-size:13px;position:relative;top:-1px"></i>{{' '+ (items.comment_count)}}</span>
                    <span class="replay-time" ><i class="fa fa-heart" style="font-size:12px;position:relative;top:0px"></i> {{' '+ items.likes}}</span>
                
            </div>
        </div>
        <router-link  :to="'/forum/'+items._id" class="img-preview" v-if="items.coverImage">
            <img :src="items.coverImage" alt="">
        </router-link>
  </div>
</template>
<script>
export default {
    props:[
        'data'
    ],
    computed:{
        items(){
            return this.data || {}
        }
    } 
}
</script>
<style lang="less" scoped>
.article-items {
    max-width:768px;
    display:flex;
    min-height:120px;
    overflow: hidden;
    border-bottom:1px solid #f1f1f1;
    padding: 8px 0;
    .article-preview {
        flex:1;
        a.title {
            font-size:16px;
            font-weight:600;
            line-height: 18px;
            margin-bottom:5px;
            display: -webkit-box;    
            -webkit-box-orient: vertical;    
            -webkit-line-clamp: 2;    
            overflow: hidden;
            word-wrap:break-word;
            white-space:normal; 
            word-break:break-all;

        }
        .content {
            display:block;
            height:50px;
            margin-bottom:5px;
            font-size:13px;
            color:#b4b4b4;
            display: -webkit-box;    
            -webkit-box-orient: vertical;    
            -webkit-line-clamp: 3; 
            overflow: hidden;
            word-wrap:break-word;
            white-space:normal; 
            word-break:break-all;
        }
        div.a-info {
            display:flex;
            justify-content: flex-start;
            align-items: center;
            padding-top:4px;
            span {
                font-size:13px;
                color:#ccc;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                height:18px;
                line-height: 18px;
                display:block;
            }
            span+span {
                margin-left:.8em;
            }
            span.author{
                max-width:125px;
            }
        }
    }
    .img-preview {
        flex:0 0 132px;
        height:92px;
        border-radius:4px;
        margin:5px 0 0 9px;
        overflow: hidden;
        img {
            width:100%;
            height:100%;
            object-fit: cover;
        }
    }
    
    @media screen and (max-width:500px){
        .img-preview {
            flex: 0 0 120px;
            height:88px;
            img {
            }
        } 
        .article-preview {
            h2 {
            }
            .content {
            }
            div.a-info {
                span.author{
                    max-width:100px;
                }
            }
            
        }
    }
    @media screen and (max-width:400px){
        .img-preview {
            flex: 0 0 105px;
            height:88px;
            img {
            }
        }   
    }
    
}
</style>



<template>
  <div class="my-like" v-loading="loading">
    <div class="content">
      <div v-if="data&&(data instanceof Array)&&data.length>0" class="items overflow-row-2" v-for="(v,i) in data" :key="i">
        <!-- <div class="my-type">文档</div> -->
        <i class="fa fa-book"></i>
        <router-link :to="'/forum/'+v._id" class="">
              {{v.title}}
        </router-link>
      </div>
      <p class="show-empty-data" v-if="data&&(data instanceof Array)&&data.length===0" >暂无数据哦("▔□▔)</p>
    </div>
    <div class="load-more" @click="loadMore" v-if="currentData.length==size">
      或许还有更多...
    </div>
  </div>
</template>
<script>
export default {
    data(){
      return {
        loading:false,
        data:null,
        myList:'',
        size:4,
        page:1,
        currentData:[]
      }
    },
    methods:{
        getArticle(){
            this.loading = true
            this.$axios.getMyLikes({page:this.page,size:this.size}).then(res=>{
                this.loading = false
                if(res.data.success){
                    let d = JSON.parse(JSON.stringify(res.data.data))
                    if(!this.data){
                      this.data = []
                    }
                    this.data = this.data.concat(d)   //  res.data.data
                    this.currentData = res.data.data
                }
            }).catch(err=>{
                this.loading = false
            })
        },
        loadMore(){
           this.page = this.page+1
           this.getArticle()
        }
    },
    created(){
        this.getArticle()
        this.$store.state.myTabName = '文章收藏'
    }
}
</script>
<style lang="less">
.my-like {
  margin-bottom:18px;
  padding:0 16px;
  min-height:270px;
  .content {

  }
  .items {
    // border-bottom:1px solid #fafafa;
    padding: 5px 0;
    padding-left:17px;
    position: relative;
    &>i {
      font-size:12px;
      color:#ccc;
      position:absolute;
      left:2px;
      top:11px;
    }
    &>a {
      // height:20px;
      padding:3px 0;
      text-align:left;
      font-size:15px;
      &:hover {
        color:#496ea3
      }
    }
    a:visited {
        text-decoration: none;
    }
  }
  .load-more {
    max-width:365px;
    margin:0 auto;
    text-align:center;
    padding:10px 0;
    cursor:pointer;
    color:#598dd3;
    &:hover {
      color:#456ea5;
    }
  }
  
  @media screen and (max-width:525px) {
  }
}
</style>


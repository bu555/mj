<template>
  <div class="my-publish" v-loading="loading">
    <div class="content">
        <div  v-if="data&&(data instanceof Array)&&data.length>0&&v" class="items" v-for="(v,i) in data" :key="i">
            <!-- <div class="my-type share" v-if="v.category==='share'">分享</div>
            <div class="my-type ask"  v-if="v.category==='ask'">问答</div>
            <div class="my-type good" v-if="v.good">精华</div> -->
            <div class="overflow-row-2">
                <router-link :to="'/forum/'+v._id">
                      {{v.title}}
                </router-link>
            </div>
            <div class="time">{{$moment(v.c_time).format("YYYY-MM-DD HH:mm:ss")}}</div>
            <div class="i-ctrl">
                <!--编辑-->
                <i class="fa fa-pencil-square-o  edit" @click="articleHandle('edit',v._id)"><em>编辑</em></i>
                <!--删除-->
                <i class="fa fa-trash-o del"  style="margin-left:5%" @click="articleHandle('del',v._id)"><em>删除</em></i>
            </div>
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
        size:8,
        page:1,
        currentData:[]
      }
    },
    methods:{
        getArticle(){
            this.loading = true
            this.$axios.getMyArticle({size:this.size,page:this.page,uid:this.$store.state.userInfo._id}).then(res=>{
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
        },
        articleHandle(type,aid){
            if(type==='edit'){
                this.$router.push({
                  path:'/forum/article/edit/'+aid
                })
            }else if(type==='del'){
                this.$confirm('此操作将永久删除此数据, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                    this.loading = true
                    this.$axios.deleteArticle({aid:aid}).then(res=>{
                        this.loading = false
                        if(res.data.success){
                              this.$message({
                                type: 'success',
                                message: '删除成功!'
                              });
                        }
                        for(var i=0;i<this.data.length;i++){
                           if(this.data[i]._id===aid){
                              this.data.splice(i,1)
                           }
                        }
                    }).catch(err=>{
                        this.loading = false
                    })
                }).catch(() => {  });
            }
        }
    },
    created(){
        this.getArticle()
        this.$store.state.myTabName = '文章发表'
    }
}
</script>
<style lang="less">
.my-publish {
  margin-bottom:18px;
  padding:0 16px;
    min-height:270px;
  .content {

  }
  .items {
      // display:flex;
      align-items:center;
      border-bottom:1px solid #f8f8f8;
      width:100%;
      position: relative;
      padding:7px 60px 25px 0;
      &>div{
        a {
          padding:0px 0;
          font-size:15px;
          overflow: hidden;
          span {
            width:100%;
            display:block;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
          &:hover {
            color:#496ea3
          }
        }
      }
      .time {
        color:#c5c5c5;
        font-size:13px;
        position: absolute;
        left:0px;
        bottom:7px;
      }
      .i-ctrl {
        position: absolute;
        right:0px;
        top:9px;
        display:flex;
        align-items: center;
        justify-content: space-between;
        width:58px;
        i {
          color:#ccc;
          cursor: pointer;
          width:22px;
          height:22px;
          line-height: 22px;
          text-align:center;
          font-size:20px;
          position: relative;
          &:hover {
            font-size:22px;
            em {
              display:block;
            }
          }
          em {
            display:none;
            position: absolute;
            top:22px;
            left:-6px;
            font-size:12px;
            width:32px;
          }
        }
        i.edit {
          &:hover {
            color:#4d9efc;
          }
        }
        i.del {
          &:hover {
            color:#f16a6e;
          }
        }
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
    // padding:0px 0px 10px;
    .items {
        .time {
          // flex:0 0 68px;
          // overflow:hidden;
          // white-space:nowrap;
          // margin:0 4px;
          // background-color: red;
        }
    }
  }
}
</style>


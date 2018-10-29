<template>
  <div class="my-mark-exa" v-loading="loading">
    <div class="content">

        <div  v-if="data&&(data instanceof Array)&&data.length>0" class="item" v-for="(v,i) in data" :key="i">
           <div class="photo">
              <router-link :to="'/example/'+v._id">
                  <img :src="v.img_url" alt="">
              </router-link>
           </div>
           <ul class="info">
              <li class="overflow-row-1">名字：{{v.name+v.name1}}</li>
              <li class="overflow-row-1">类型：{{v.type&&v.type.toUpperCase()}}</li>
              <li class="overflow-row-1">人气：{{v.total}}</li>
              <li class="overflow-row-2">简介：{{v.info}}</li>
           </ul>
        </div>
        <p class="show-empty-data" v-if="data&&(data instanceof Array)&&data.length===0" >暂无数据哦("▔□▔)</p>
    </div>
    <div class="load-more" @click="loadMore" v-if="currentData.length==pageSize">
      或许还有更多...
    </div>
  </div>
</template>
<script>
export default {
    data(){
      return {
        data:null,
        loading:false,
        currentData:'',
        pageSize:3,
        page:1,
        
      }
    },
    methods:{
      getMyMarkExample(){
            this.loading = true
            this.$axios.getMyMarkExample({size:this.pageSize,page:this.page}).then(res=>{
                this.loading = false
                if(res.data.success){
                    if(!this.data){
                      this.data = []
                    }
                    this.data = this.data.concat(res.data.data) 
                    this.currentData = res.data.data
                }
            }).catch(err=>{
                this.loading = false
            })
      },
      loadMore(){
          this.page = this.page+1
          this.getMyMarkExample()
      },
    },
    created(){
       this.getMyMarkExample()
       this.$store.state.myTabName = '名人关注'
    }
}
</script>
<style lang="less">
.my-mark-exa {
  margin-bottom:18px;
  padding:0 16px;
    min-height:270px;

  .content {
    font-size:15px;
    display:flex;
    justify-content: space-between;
    flex-wrap:wrap;
    .item {
        // flex:0 0 47.5%;
        display:flex;
        margin:4px 5px;
        background-color: #fafafa;
        padding:7px;
        border-radius:3px;
        border:1px solid  #eaeaea;
        .photo {
          flex:0 0 68px;
        }
       .photo img {
         display:block;
         width:75px;
         height:95px;
         object-fit: cover;
         border-radius:1px;
       }
       ul.info {
        //  width:210px;
         height:95px;
         font-size:14px;
         padding-left:9px;
         li{

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
  @media screen and (max-width:768px) {

  }
  
  @media screen and (max-width:525px) {
    .content {
      .item {
          flex:100%;
      }
    }
  }
}
</style>


<template>
  <div class="my-vote" v-loading="loading">
    <div class="content">

        <div class="item" v-for="(v,i) in data" :key="i">
           <div class="photo">
              <router-link :to="'/example/'+v.eid">
                  <img :src="v.img_url" alt="">
              </router-link>
           </div>
           <ul class="info">
              <li class="overflow-row-1-x">投票类型：<em>{{v.result&&v.result.toUpperCase()}}</em></li>
              <li class="overflow-row-1-x">投票日期：{{$moment(v.c_time).format("YYYY-MM-DD HH:mm")}}</li>
              <li class="overflow-row-1-x">名字：{{v.name+v.name1}}</li>
              <li class="overflow-row-1-x">最高票类型：<em>{{v.type.toUpperCase()}}</em></li>
              <!-- <li class="overflow-row-2">简介：{{v.info}}</li> -->
           </ul>
        </div>
        <p class="show-empty-data" v-if="data&&(data instanceof Array)&&data.length===0" >暂无数据哦("▔□▔)</p>
        <!-- <p v-if="data&&data.length===0" style="color:#ccc;text-align:center;font-size:15px">暂无数据哦("▔□▔)</p> -->
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
      getMyVote(){
            this.loading = true
            this.$axios.getMyVote({size:this.pageSize,page:this.page}).then(res=>{
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
          this.getMyVote()
      },
    },
    created(){
       this.getMyVote()
       this.$store.state.myTabName = '投票参与'
    }
}
</script>
<style lang="less">
.my-vote {
  margin-bottom:18px;
  padding:0 16px;
    min-height:270px;
  .content {
    font-size:15px;
    .item {
        width:100%;
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
         width:63px;
         height:74px;
         object-fit: cover;
         border-radius:1px;
       }
       ul.info {
         flex:1;
        //  width:350px;
         height:74px;
         font-size:12px;
         padding-left:5px;
         li{
           margin-bottom:3px;
           em {
             padding:0px 3px;
             background-color: #c7e188;
             border-radius:2px;
             color:#fff;
           }
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
  
  @media screen and (max-width:500px) {
    .content {
      flex-wrap:wrap;
      .item  {
        ul.info {
          // flex:0 0 197px;
          // width:197px;
        }
      }
    }
  }
}
</style>


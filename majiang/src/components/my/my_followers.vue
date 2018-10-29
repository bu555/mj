<template>
  <div class="my-follow" v-loading="loading">
    <div class="content">
      <div v-if="data&&(data instanceof Array)&&data.length>0" class="items" v-for="(v,i) in data" :key="i">
        <router-link :to="'/info/'+v._id">
            <!-- <div class="avatar">
              <img :src="v.avatar?$pathAvatar+v.avatar:'/static/img/logo_a.png'" alt="">
            </div> -->
            <Avatar :src="v.avatar" :uid="''" size="small" round="true"></Avatar>&nbsp;
            <div class="u-name overflow-row-1">
              <span class="r-name">{{v.r_name}}</span> <br/>
              <p class="profile overflow-row-2">{{v.profile}}</p>
            </div>
        </router-link>
        <!-- 关注按钮 -->
        <followBtn :isFollow="true" :uuid="v._id" class="btn-comp"></followBtn>
      </div>
    </div>
    <p class="show-empty-data" v-if="data&&(data instanceof Array)&&data.length===0" >暂无数据哦("▔□▔)</p>
    <div class="load-more" @click="loadMore" v-if="currentData.length==size">
      或许还有更多...
    </div>
    <!--<i class="el-icon-remove icon-remove" style="font-size:14px;"></i> 移除TA</el-button>-->
  </div>
</template>
<script>
import followBtn from '@/components/common/follow_btn'
export default {
    data(){
      return {
        loading:false,
        data:null,
        size:4,
        page:1,
        currentData:[]
      }
    },
    components:{
      followBtn
    },
    methods:{
        getUserList(){
            this.loading = true
            this.$axios.getMyFollowers({page:this.page,size:this.size}).then(res=>{
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
           this.getUserList()
        },
    },
    created(){
        this.getUserList()
        this.$store.state.myTabName = '我关注'
        
    }
}
</script>
<style lang="less">
.my-follow {
  min-height:270px;
  margin-bottom:18px;
  padding:0 16px;
  .content {

  }
  .items {
    display:flex;
    align-items:flex-start;
    border-bottom:1px solid #f8f8f8;
    padding:5px 0 2px;
    min-height:66px;
    &>a {
      display:flex;
      align-items:flex-start;
      flex:1;
      padding:2px 0;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      padding-right:3px;
      .u-name {
        font-size:15px;
        margin-left:4px;
        // position: relative;
        .profile {
          font-size:13px;
          color:#999;
          padding-right:1em;
          line-height: 16px;
        }
      }
    }
    .btn-comp {
      position:relative;
      top:2px;
    }
    a:visited {
        text-decoration: none;
    }
      &>span {
          font-size:14px;
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
          background-color: #409eff;
          color:#fff;
      }
      &>span.c2 {
          background-color: #acacac;
          color:#fff;
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


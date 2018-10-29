<template>
  <div class="my-comment-a" v-loading="loading">
    <!-- <div class="m-title" style="padding:0px 5px 10px;margin-bottom:5px;border-bottom:1px solid #cee1f5">
      <router-link to="/my">
      <i class="fa fa-reply" style="font-size:17px;margin-left:-2px;padding:5px 10px 5px 5px;color:#777"></i> 
      </router-link>
      <span style="padding:0 10px 0 2px;color:#ddd">|</span>
      <i class="fa fa-edit"></i> 评论<span>(2)</span>
    </div> -->
    <div class="c-tabs">
      <!--<div style="padding-right:0">分类：</div>-->
      <div :class="typeActive==='aid'?'active art':''" @click="typeActive='aid'">文档</div>
      <div >/</div>
      <div :class="typeActive==='eid'?'active exa':''" @click="typeActive='eid'">名人</div>
      <!-- <SwitchComp @getKey="(key)=>typeActive=key " :active="tabList[0]" :list="tabList"></SwitchComp> -->
    </div>
    <div class="c-main">
        <div class="content" v-if="listOk">
          <div v-if="typeActive==='aid'">
              <div class="aid-comment"  v-for="(v,i) in dataA" :key="i">
                    <div class="h5 overflow-row-1">
                      <em class="art">文章</em><router-link :to="{path:'/forum/'+v.aid,query:{index:i},hash:'mycomment'}"><span>{{v.title}}</span></router-link>
                    </div>
                    <div class="items"  v-if="i1<3" v-for="(v1,i1) in v.comment" :key="i1" >
                      <router-link to="">
                            <span class="overflow-row-1 max-set"> <i class="art"></i> {{v1.content}}</span>
                      </router-link>
                      <div class="time">{{$moment(v1.c_time).format("YYYY-MM-DD HH:mm:ss")}}</div>
                    </div>
                    <div class="p-more" v-if="v.comment.length>=3" >.......</div>
              </div>
          </div>
          <div v-if="typeActive==='eid'">
              <div class="eid-comment"   v-for="(v,i) in dataE" :key="i" :style="i==0?'border-top:1px solid #f8f8f8':''">
                    <router-link to="">
                    <div class="h5  overflow-row-1">
                       <em class="exa">名人</em><router-link :to="'/example/'+v.eid"><span>{{v.title}}</span></router-link>
                    </div>
                    </router-link>
                    <div class="items"  v-if="i1<3" v-for="(v1,i1) in v.comment" :key="i1">
                        <router-link to="">
                                <span class="overflow-row-1 max-set"><i class="exa"></i> {{v1.content}}</span>
                        </router-link>
                        <div class="time">{{$moment(v1.c_time).format("YYYY-MM-DD HH:mm:ss")}}</div>
                    </div>
                    <div class="p-more" v-if="v.comment.length>=3" >.......</div>
              </div>
          </div>
        <p class="show-empty-data" v-if="empty" >暂无数据哦("▔□▔)</p>
        </div>
        <div class="load-more" @click="loadMore" v-if="currentData.length==pageSize">
          或许还有更多...
        </div>
    </div>
  </div>
</template>
<script>
// import SwitchComp from '../common/switch'
export default {
    data(){
      return {
        loading:false,
        dataA:[],
        dataE:[],
        pageSize:2,
        pageA:1,
        pageE:1,
        currentData:[],
        eidCommentList:'',  //存放评论列表
        aidCommentList:'',  //存放评论列表  
        empty:false,
        typeActive:'aid',
        listOk:false,
        tabList:[
            {
                val:'文档',
                key:'aid'
            },
            {
                val:'名人',
                key:'eid'
            }
        ]
      }
    },
    components:{
    //   SwitchComp
    },
    watch:{
        'typeActive':function(){
            this.dataA=[]
            this.dataE=[]
            this.pageA=1
            this.pageE=1
            this.currentData=[]
            this.empty=false
            this.getMyComment()
        }
    },
    methods:{
        getMyCommentList(){
            this.loading=true
            this.$axios.getCommentList({}).then(res=>{
                this.loading = false
                if(res.data.success){
                    this.listOk = true
                    this.eidCommentList = res.data.data.eid?res.data.data.eid:''
                    this.aidCommentList = res.data.data.aid?res.data.data.aid:''
                    // 获取aidlist的评论
                    if(this.typeActive==='aid' && this.aidCommentList && (this.aidCommentList instanceof Array) && this.aidCommentList.length>0 ){
                        this.getMyComment()
                        this.empty = false
                        return
                    }
                    // 获取eidlist的评论
                    if(this.typeActive==='eid' && this.eidCommentList && (this.eidCommentList instanceof Array) && this.eidCommentList.length>0 ){
                        // this.getMyComment()
                        this.getMyComment()
                        this.empty = false
                        return
                    }
                    this.empty = true
                }
            }).catch(err=>{
                this.loading = false
            })
        },
        getMyComment(){
            if(this.typeActive==='aid'){
                if(this.aidCommentList<1){
                   this.empty = true
                   return;
                }
                let aid = this.aidCommentList.slice( (this.pageA-1)*this.pageSize,this.pageSize+(this.pageA-1)*this.pageSize )
                if(aid.length<1) {
                  this.currentData = []  //觸發加載更多隱藏
                  return
                }
                this.loading=true
                this.empty = false
                this.$axios.getMyCommentArt({aid:aid }).then(res=>{
                    this.loading = false
                    if(res.data.success){
                        let d = JSON.parse(JSON.stringify(res.data.data))
                        if(!d[0]){
                            this.currentData = []  //觸發加載更多隱藏
                            if(this.dataA.length<1){
                                this.empty = true
                            }
                        }else{
                            this.dataA = this.dataA.concat(d)   //  res.data.data
                            this.currentData = res.data.data
                            localStorage.setItem('dataA',JSON.stringify(this.dataA))
                        }
                    }
                }).catch(err=>{
                    this.loading = false
                })
            }else if(this.typeActive==='eid'){
                if(this.eidCommentList<1){
                   this.empty = true
                   return;
                }
                let eid = this.eidCommentList.slice( (this.pageE-1)*this.pageSize,this.pageSize+(this.pageE-1)*this.pageSize )
                if(eid.length<1) {
                  this.currentData = []  //觸發加載更多隱藏
                  return
                }
                this.empty = false
                this.$axios.getMyCommentExa({eid:eid }).then(res=>{
                    this.loading = false
                    if(res.data.success){
                        let d = JSON.parse(JSON.stringify(res.data.data))
                        if(!d[0]){
                            this.currentData = []  //觸發加載更多隱藏
                            if(this.dataE.length<1){
                                this.empty = true
                            }
                        }else{
                            this.dataE = this.dataE.concat(d)   //  res.data.data
                            this.currentData = res.data.data
                            localStorage.setItem('dataE',JSON.stringify(this.dataE))
                        }
                    }
                }).catch(err=>{
                    this.loading = false
                })
            }
        },
        loadMore(){
          if(this.typeActive==='aid'){
              this.pageA = this.pageA+1
              this.getMyComment()
          }else if(this.typeActive==='eid'){
              this.pageE = this.pageE+1
              this.getMyComment()
          }
        }
    },
    created(){
       this.getMyCommentList()
       this.$store.state.myTabName = '评论'
    }
}
</script>
<style lang="less">
.my-comment-a {
    width:100%;
    margin-bottom:18px;
    padding:0 16px;
    min-height:270px;
  .c-tabs {
    display:flex;
    padding-bottom:10px;
    &>div {
      font-size:15px;
      padding:5px 0px 0px;
      color:#aaa;
      margin-right:10px;
      cursor:pointer;
    }
    &>div.active.art {
      color:#488842;
      font-weight:600;
    }
    &>div.active.exa {
      color:#4c9bd2;
      font-weight:600;
    }

  }
  .c-main {
    padding-bottom:22px;
  }
  .aid-comment,.eid-comment {
    padding-bottom:8px;
    border-bottom:1px solid #f8f8f8;
    max-height:136px;
    overflow: hidden;
    position: relative;
     .h5 {
       font-size:15px;
       padding-top:2px;
       margin:4px 0;
       em {
           font-size:13px;
           color:#c1c1c1;
           padding:0px 2px;
           border-radius:3px;
           margin-right:3px;
        //    background-color: #c8c8c8;;
            border:1px solid #c7c7c7;
       }
    //    em.art {
    //        background-color: #488842;
    //    }
    //    em.exa {
    //        background-color: #4c9bd2;
    //    }
       &>a:hover {
         color:#496ea3
       }
     }
  }
  .content {
      .max-set {
          display:block;
          max-width:420px;
      }
  }
  .items, {
      display:flex;
      align-items:center;
    //   border-bottom:1px solid #fafafa;
      width:100%;
      &>a {
        flex:1;
        padding:0 ;
        height:16px;
        line-height:17px;
        font-size:15px;
        overflow: hidden;
        color:#333;
        span {
            font-size:13px;
            color:#b4b4b4;
            i {
                display:inline-block;
                border-radius:50%;
                width:4px;
                height:9px;
                margin-left:2px;
                background:#ddd;
            }
        }
        // &:hover {
        //   color:#496ea3
        // }
      }
      .time {
        color:#c5c5c5;
        font-size:12px;
        margin-left:5px;
      }
  }
  .p-more {
      color:#ccc;
      line-height: 9px;
      padding-left:10px;
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
    .content {
        .max-set {
            display:block;
            max-width:51vw;
        }
    }
  }
  @media screen and (max-width:525px) {
    // padding:0px 0px 10px;
    .items {
        .time {
          flex:0 0 63px;
          overflow:hidden;
          white-space:nowrap;
          // margin:0 4px;
          // background-color: red;
        }
    }
  }
}
</style>


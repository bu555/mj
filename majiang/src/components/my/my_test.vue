<template>
  <div class="my-test" v-loading="loading">
    <div class="content">
        <!-- <div class="items i1">
            <div class="">测试项目</div>
            <div class="">测试结果</div>
            <div class="">测试日期</div>
            <div class=""></div>
        </div>
        <div class="items i2" v-for="(v,i) in data" :key="i">
            <div class="overflow-row-1">{{v.category}}</div>
            <div class="overflow-row-1">{{v.type&&v.type.toUpperCase()}}</div>
            <div class="">
              <span class="date-pc">{{$moment(v.c_time).format("YYYY-MM-DD HH:mm:ss")}}</span>
              <span class="date-mob">{{$moment(v.c_time).format("YYYY-MM-DD")}}</span>
              
            </div>
            <div class="show-link">
              <router-link to="">
                查看详情
              </router-link>
            </div>
        </div> -->
        <div  v-if="data&&(data instanceof Array)&&data.length>0" class="item" v-for="(v,i) in data" :key="i">
           <div class="photo">
              <router-link :to="'/example/'+v.eid">
                  <h5>Mbti</h5>
              </router-link>
           </div>
           <ul class="info">
              <li class="overflow-row-1-x">测试项目：{{v.category.toUpperCase()}}</li>
              <li class="overflow-row-1-x">测试日期：{{$moment(v.c_time).format("YYYY-MM-DD HH:mm")}}</li>
              <li class="overflow-row-1-x">测试结果：{{v.type&&v.type.toUpperCase()}}</li>
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
      getMyTest(){
            this.loading = true
            this.$axios.getMyTest({size:this.pageSize,page:this.page}).then(res=>{
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
          this.getMyTest()
      },
    },
    created(){
       this.getMyTest()
       this.$store.state.myTabName = '测试'
    }
}
</script>
<style lang="less">
.my-test {
  margin-bottom:18px;
  padding:0 16px;
    min-height:270px;
  .content {
    font-size:15px;
    display:flex;
    justify-content: space-between;
    flex-wrap:wrap;
    .item {
        flex:0 0 47.5%;
        display:flex;
        margin:5px 0;
        background-color: #fafafa;
        padding:7px;
        border-radius:3px;
        border:1px solid  #eaeaea;
        .photo {
          flex:0 0 52px;
        }
       .photo h5 {
         display:block;
         width:82px;
         height:57px;
         line-height: 55px;
         object-fit: cover;
         border-radius:1px;
         background-color: #bdc3c7;
         text-align:center;
         color:#eaeaea;
         font-size:20px;
       }
       ul.info {
        //  width:210px;
         height:57px;
         font-size:14px;
         padding-left:8px;
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
  
  @media screen and (max-width:525px) {
    .content {
      .item {
          flex:100%;
      }
    }
  }
}
</style>


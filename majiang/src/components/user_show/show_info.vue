<template>
  <div class="show-info">
      <div class="item">
         <span class="first">昵称：</span>
         <span>{{userInfo.r_name}}</span>
      </div>
      <div class="item">
         <span class="first">性别：</span>
         <span v-if="userInfo.sex=='1'">男</span>
         <span v-if="userInfo.sex=='0'">女</span>
      </div>
      <div class="item">
         <span class="first">来自：</span>
         <span>{{userInfo.province}}</span>
      </div>
      <div class="item">
         <span class="first">城市：</span>
         <span>{{userInfo.city}}</span>
      </div>
      <div class="item">
         <span class="first">简介：</span>
         <span>{{userInfo.profile}}</span>
      </div>
  </div>
</template>
<script>

export default {
    data(){
      return {
  
      }
    },
    props:['userInfo'],
    watch:{
    },
    methods:{
    },
    created(){
    }
}
</script>
<style lang="less">
.show-info {
  // max-width:370px;
  padding:4%;
  padding-top:12px;
  padding-bottom:22px;
  .item {
      font-size:15px;
      display:flex;
      color:#484848;
      margin-bottom: 5px;
      .first {
         white-space: nowrap;
         color:#333;
      }
  }
}
</style>


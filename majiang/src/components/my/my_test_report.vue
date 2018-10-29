<template>
  <div class="my-test">
    <div class="m-title" style="padding:0px 5px 10px;margin-bottom:5px;border-bottom:1px solid #cee1f5">
      <router-link to="/my/test">
      <i class="fa fa-reply" style="font-size:17px;margin-left:-2px;padding:5px 10px 5px 5px;color:#777"></i> 
      </router-link>
      <span style="padding:0 10px 0 2px;color:#ddd">|</span>
      <i class="fa fa-file-text-o" style="margin:0 2px 0 1px"></i> 测试结果
    </div>
    <div class="content">
        测试项目：
    </div>
  </div>
</template>
<script>
export default {
    data(){
      return {
      }
    },
    methods:{
      onSubmit(){

      }
    }
}
</script>
<style lang="less">
.my-test {
  margin-bottom:18px;
  padding:0 16px;
  .content {
    font-size:15px;
  }
  
  @media screen and (max-width:525px) {
    .content {
    }
  }
}
</style>


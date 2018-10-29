<template>
  <div class="user-forget">
        <div class="m-step">
            <el-steps :align-center="true" :active="currentStep" finish-status="success">
                <el-step title="申请提交"></el-step>
                <el-step title="邮箱验证"></el-step>
                <el-step title="重置密码"></el-step>
                <el-step title="完成"></el-step>
            </el-steps>
        </div>
        <!--验证邮箱-->
        <UserVerify v-if="currentStep<3" @geCurrentStep="stepHandler"></UserVerify>
        <!--重新设置-->
        <UserReset  v-if="currentStep>3" @geCurrentStep="stepHandler"></UserReset>
  </div>
</template>
<script>
import UserVerify from './user_forget_verify'
import UserReset from './user_forget_reset'
export default {
  data() {
      return {
          currentStep:1
      }
  },
  components:{
      UserVerify,UserReset
  },
  methods:{
      stepHandler(step){
          this.currentStep = step
      }
  },
  created(){
      let q = this.$route.query
      if(q.step==2){
          this.currentStep = 2
      }else if(q.step==3 && q.pwd && q.uid ){
          this.currentStep = 3
      }else if(q.step==4){
          this.currentStep = 4
      }
  }

};
</script>
<style lang="less">
.user-forget {
    .m-step {
        max-width:520px;
        padding:42px 0px 0px;
        margin:0 auto;
        .el-step__head.is-success,.el-step__title.is-success {
            font-weight:700;
            color: #75a9e3;
        }
        .el-step__head.is-success {
            border-color: #75a9e3;
        }

        .el-step__head.is-process,.el-step__title.is-process {
            color: #c4c7cf;
        }
        .el-step__head.is-process {
            border-color: #c4c7cf;
        }
    }
    a,a:visited {
        color:#456ea5;
    }
    a:hover {
        color:#70a9e5;
    }
}
</style>




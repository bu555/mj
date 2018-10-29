<template>
  <div class="reset">
        <!--重设密码视图-->
        <div class="reset-box" v-if="currentStep==3"  v-loading="loading">
                <!--<div class="title">设置新密码</div>-->
                <form>
                    <div class="form-group">
                        <label for="exampleInputPassword">新密码</label>
                        <input v-model="password" type="password" class="form-control" id="exampleInputPassword" placeholder="新密码" @blur="verifyPassword()">
                        <div v-if="!passwordVerify" class="error-msg">请输入密码（6-16位，包含字母、数字和半角符号至少2种）</div>
                    </div>
                    <div class="form-group" style="margin-bottom:36px">
                        <label for="exampleInputPassword">密码确认</label>
                        <input v-model="password_" type="password" class="form-control" id="exampleInputPassword1" placeholder="新密码确认" @blur="verifyPassword_()">
                         <div class="error-msg" v-if="!password_Verify">两次输入的密码不一致</div>
                    </div>
                    <button @click="reset()" type="button" class="my-btn" style="width:100%">提 交</button>
                </form>

        </div>
        <!--密码设置成功后提示视图-->
        <div class="success-info" v-if="currentStep==4">
                <i class="el-icon-success" style="font-size:50px;color:#67c23a;margin-top:22px"></i><br/>
                <div style="margin-top:25px;margin-bottom:12px">
                    密码重置成功！
                </div>
                <div style="color:#808080;font-size:14px"> 
                    <span @click="goLogin()" style="color:#8db4e2;text-decoration:underline;cursor:pointer">
                        前往登录
                    </span>
                </div>
            <p></p>
        </div>
  </div>
</template>
<script>
import verify from "../../assets/verify"
export default {
  data() {
      return {
        password:'',
        password_:'',
        uid:'',
        pwd:'',
        passwordVerify:true,
        password_Verify:true,
        loading:false,
        currentStep:''
      }
  },
  mounted() {
  },
  methods: {
        callParent(step){
            this.$emit('geCurrentStep',step)
        },
        //   验证密码
        verifyPassword(){
            this.passwordVerify = verify.password(this.password)
        },
        //   验证再次输入的密码
        verifyPassword_(){
            if(verify.password(this.password)){
                this.password_Verify = this.password===this.password_ ? true:false
            }else{
                this.password_Verify =  false
            }
        },
        //重设密码提交
        reset() {
            if(this.loading) return;
            this.verifyPassword()
            this.verifyPassword_()
            if(!this.passwordVerify || !this.password_Verify) return;
            this.loading = true;
            this.$axios.resetPwd({
                password:this.password,
                uid:this.uid,
                pwd:this.pwd,
            }).then(res=>{
                this.loading = false;
                if(res.data.success){
                    this.$router.push({
                        query:{
                            step:'4'
                        }
                    })
                    this.currentStep = 4
                    this.callParent(4)
                }else{

                }
            }).catch(res=>{
                this.loading = false;
            })
        },
        goLogin(){
            this.$router.push({path:'/user/login'})
        }
    
  },
  created(){
      let q = this.$route.query
      if(q.uid && q.pwd && q.step==3){
          this.uid = this.$route.query.uid;
          this.pwd = this.$route.query.pwd;
          this.currentStep = 3
      }else if(q.step==4){
          this.currentStep = 4
      }
  }
};
</script>
<style lang="less">
.reset {
    margin:0 auto;
    max-width: 400px;
    .email-box,.reset-box {
        background-color: #fefefe;
        // border:1px solid #ddd;
        border-radius:3px 3px 2px 2px;
        margin:30px 4px;
        form {
            padding:20px 15% 32px;
            // background-color: rgba(89,142,210,.2);
        }
        .title {
                text-align: center;
                font-weight: 700;
                border:1px solid #456ea5;
                border-bottom:1px solid #bbb;
                background-color: #456ea5;
                padding: 11px 0;
                font-size:17px;
                margin:-1px -1px;
                color:#fff;
                border-radius:3px 3px 0  0;
        }
        
    }
    .success-info {
        text-align: center;
        padding-top:40px;
    }
    .form-group {
        position: relative;
        margin-bottom:8px;
        .error-msg {
            color:#f43232;
            line-height:15px;
            font-size:13px;
            padding-top:4px;
            i {
                color:#d62921;
            }
        }
        input {
            height: 35px;
            padding-left: 5px;
            width: 100%;
            margin-top:3px;
            font-size:15px;
        }
    }
    button.my-btn {
        font-size:16px; 
        padding:5px; 
        cursor:pointer;
        font-family: 'Microsoft YaHei';
        font-weight:700;
    }

}
</style>




<template>
  <div class="send-mail">
      <!--邮件发送视图-->
        <div class="email-box" v-if="!emailSuccess" v-loading="isSubmit">
                <!--<div class="title">找回密码</div>-->
                <form>
                    <div class="form-group" style="margin-bottom:30px">
                        <label for="exampleInputEmail1">邮箱</label>
                        <input v-model="name" type="email" class="form-control" id="exampleInputEmail1" placeholder="输入邮箱" @blur="verifyName()" spellcheck="false">
                        <div v-if="!nameVerify" class="error-msg">请输入正确的邮箱</div>
                    </div>
                    <!--<div class="form-group">
                        <label for="exampleInputPassword1">验证码</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="验证码">
                    </div>-->
                    <button @click="sendEmail()" type="button" class="my-btn" style="width:100%">提交验证</button>
                    <div style="text-align:center;padding-top:16px">
                        <div>
                            <span style="color:#aaa">或</span>
                            <router-link to="/user/login"><a>这里登录</a></router-link>
                        </div>
                    </div>
                </form>
        </div>
        <!--发送邮件成功视图-->
        <div class="success-info" v-if="emailSuccess">
            <i class="fa fa-envelope-o" style="font-size:55px;color:#555;margin-top:22px"></i><br/>
            <div style="margin-top:25px;margin-bottom:12px">
                邮件已发送至 {{emailName}}，请登录邮箱进行密码设置操作。
                <span style="font-size:22px;font-family:STHupo;font-style: italic;color:#2c3e50;text-shadow:1px 0 4px #666">
                    <!--{{count}}-->
                </span>
                <br>
                <br>
                <a href="https://email.163.com/" v-if="emailName.indexOf('@163.com')>-1">前往登录</a>
                <a href="https://mail.qq.com/" v-if="emailName.indexOf('@qq.com')>-1">前往登录</a>
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
        name:'',
        nameVerify:true,
        isSubmit:false,
        emailSuccess:false, //邮件发送成功
        emailName:'',
      }
  },
  mounted() {
  },
  methods: {
        callParent(step){
            this.$emit('geCurrentStep',step)
        },
        //   验证账号
        verifyName(){
            this.nameVerify = verify.email(this.name)
        },
        //邮件找回提交
        sendEmail() {
            if(this.isSubmit) return
            this.verifyName()
            if(!this.nameVerify) return
            this.isSubmit = true;
            this.$axios.emailRetrieve({
                email:this.name
            }).then(res=>{
                this.isSubmit = false;
                if(res.data.success){
                    this.emailSuccess = true;
                    this.emailName = res.data.email;
                    this.callParent(2)
                }else if(res.data.code==='-1'){
                    this.$message.error('此邮箱未注册！');
                }else{
                    this.$message.error('邮件发送失败！');
                }
            }).catch(res=>{
                this.isSubmit = false;
            })
        },
    
  },
  created(){
  }
};
</script>
<style lang="less">
.send-mail {
    margin:0 auto;
    max-width: 400px;
    .email-box,.reset-box {
        background-color: #fefefe;
        // border:1px solid #ddd;
        border-radius:3px 3px 2px 2px;
        margin:30px 4px;
        form {
            padding:22px 15% 32px;
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




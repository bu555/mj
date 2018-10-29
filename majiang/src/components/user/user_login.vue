<template>
  <div class="login">
      <div class="box"  v-loading="isSubmit">
            <!--<div class="title">用户登录</div>-->
            <div style="text-align:center;padding-top:15px">
                <i class="fa fa-user-circle" style="font-size:75px;color:#eee"></i>
            </div>
            <form>
                <div class="form-group">
                    <!--<label for="exampleInputEmail1">账号</label></br>-->
                    <input v-model="name" type="email" class="form-control" id="exampleInputEmail1" placeholder="邮箱" @blur="nameVerify?verifyName():''"  @input="!nameVerify?verifyName():''"  @keyup.enter="login()" spellcheck="false">
                    <div v-if="!nameVerify" class="error-msg">请输入正确的邮箱</div>
                </div>
                <div class="form-group" style="margin-bottom:26px">
                    <!--<label for="exampleInputPassword1">密码</label>-->
                    <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="密码" @blur="passwordVerify?verifyPassword():''" @input="!passwordVerify?verifyPassword():''"  @keyup.enter="login()" spellcheck="false">
                    <div v-if="!passwordVerify" class="error-msg">请输入密码</div>
                    <div v-if="is429" class="error-msg" style="padding-top:15px"><i class="el-icon-warning"></i> 尝试登录次数过多，请稍后再试！</div>
                    <div v-if="loginFaild" class="error-msg" style="padding-top:15px"><i class="el-icon-warning"></i> 账号或密码错误！</div>
                </div>
                <!--<div class="form-group">
                    <label for="exampleInputFile">File input</label>
                    <input type="file" id="exampleInputFile">
                    <p class="help-block">Example block-level help text here.</p>
                </div>-->
                <button @click="login()" type="button" class="my-btn" style="width:100%">登 录</button>
                <!--<el-button type="primary" @click="login()" style="width:100%;font-size:16px">登 录</el-button>-->
                <div style="text-align:center;padding-top:16px">
                    <div>
                        <router-link to="/user/register">注册账号</router-link>&nbsp;&nbsp;&nbsp;&nbsp;
                        <router-link to="/user/forget">找回密码</router-link>
                    </div>
                </div>
            </form>
        </div>
  </div>
</template>
<script>
import verify from "../../assets/verify"
export default {
  data() {
      return {
        name:'',
        password:'Aa222222',
        isSubmit:false,
        nameVerify:true,
        passwordVerify:true,
        is429:false, //登录次数过多 
        loginFaild:false, //账号或密码错误
      }
  },
  mounted() {
  },
  methods: {
        //   验证账号
        verifyName(){
            this.nameVerify = verify.email(this.name)
            this.loginFaild = false
            this.is429 = false
        },
        //   验证密码
        verifyPassword(){
            this.passwordVerify = verify.password(this.password)
            this.loginFaild = false
            this.is429 = false
        },
        //点击登录
        login() {
            if(this.isSubmit) return;
            this.verifyName()
            this.verifyPassword()
            if(!this.nameVerify || !this.passwordVerify) return;
            this.isSubmit = true;
            this.$axios.login({
                name:this.name,
                password:this.password
            }).then(res=>{
                this.isSubmit = false;
                if(res.data.success){
                    //用户信息存入本地，并更新vuex
                    localStorage.setItem('USER',JSON.stringify(res.data.user));
                    this.$store.commit('setUserInfo',res.data.user);
                    this.$message({
                        message: '登录成功！',
                        type: 'success',
                        duration:1500
                    });
                    if(this.$store.state.modalLogin){ //如果是模态框登录
                        this.$store.state.modalLogin = false 
                    }else{  //非模态登录
                        this.$router.push({path: '/my'})
                    }
                }else{
                    this.loginFaild = true
                }
            }).catch(err=>{ 
                if(err.response.status==429){
                    // 频繁登录
                    this.is429 = true
                }
                this.isSubmit = false;
            })
        }
    
  },
  created(){
  },
beforeRouteEnter (to, from, next) {
    localStorage.setItem('fromPath',from.fullPath)
    next()
},
  beforeRouteUpdate (to, from, next) {
      next()
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
      next()
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
};
</script>
<style lang="less">
.login {
    margin:0 auto;
    max-width: 400px;
    .box {
        background-color: #fefefe;
        // border:1px solid #ddd;
        border-radius:3px 3px 2px 2px;
        margin:30px 4px;
        form {
            padding:15px 15% 32px;;
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
    a,a:visited {
        color:#456ea5;
    }
    a:hover {
        color:#70a9e5;
    }

}
</style>




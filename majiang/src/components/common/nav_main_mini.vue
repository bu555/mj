<template>
    <div class="x-nav-mini">
        <div class="x-nav-inner">
            <ul class="menu">
                <li>
                    <router-link to="/">
                        <img src="/static/img/logo.png" alt="">
                    </router-link>
                </li>
                <li>
                    <router-link to="/mbti/theory">
                        <em>MBTI</em>
                    </router-link>
                </li>
                <li>
                    <router-link :to="'/test'">
                        测试
                    </router-link>
                </li>
                <li>
                    <router-link to="/example">
                        名人汇
                    </router-link>
                </li>
                <li>
                    <router-link to="/forum">
                        论坛
                    </router-link>
                </li>
            </ul>
            <!-- 移动 更多 登录或注册 -->
            <div class="login-reg">
                <div v-if="$store.state.userInfo" class="is-login">
                        <!-- <img class="avatar" :src="$store.state.userInfo.avatar?$pathAvatar+$store.state.userInfo.avatar:'/static/img/logo_a.png'" alt=""> -->
                        <router-link to="/my" class="a">
                        <Avatar :src="$store.state.userInfo.avatar" :uid="''" size="mini" round="true"></Avatar> 
                        <span class="role-name overflow-row-1">{{$store.state.userInfo.r_name}}</span>
                        </router-link>
                        <i class="el-icon-caret-bottom" @click="dropDown=!dropDown"></i>
                        <ul :class="(dropDown?'active':'')">
                            <li @click="$router.push({path:'/my'});dropDown=false"><i class="fa fa-paper-plane"></i> 个人中心</li>
                            <li @click="$store.state.loginOut=true;dropDown=false"><i class="fa fa-sign-out"></i> 退出</li>
                        </ul>
                </div>
                <div class="not-login" v-else>
                    <a @click="$store.state.modalLogin = true">
                        登录
                    </a>
                    <router-link to="/user/register">
                        注册
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Avatar from '@/components/common/avatar'
import Logo from '@/components/common/logo'
export default {
  data(){
      return {
        showMore:false,
        dropDown:false
      }
  },
  components: {
      Avatar,
      Logo
  },
  watch: {
  },
  methods: {

  },
  mounted() {
      document.addEventListener('click',(e)=>{
          if(e.target.tagName!=='I'){
              if(this.dropDown){
                  this.dropDown = false;
              }
          }
      })
  },
  created(){
  }
}
</script>

<style lang="less">
  .x-nav-mini{
      .x-nav-inner {
        //   max-width:970px;
        //   margin:0 auto;
          display:flex;
          justify-content:space-between;
          align-items: center;
          background-color: #545652;
          ul.menu {
              flex:0 0 60%;
              display:flex;
              justify-content:flex-start;
              li {
                    height:30px;
                    line-height:29px;
                  a {
                      font-size:14px;
                      padding:0 13px;
                      color:#ccc;
                      white-space:normal;
                      em {
                        font-size:15px; //英文大一号
                      }
                      &:hover {
                          text-shadow: 0 0 1px #fff;
                      }
                  }
                  img {
                      display:inline-block;
                      width:57px;
                      height:auto;
                      position:relative;
                      top:-2px;
                  }
              }
          }
          .login-reg {
              padding-right:14px;
              .is-login {
                    height:30px;
                    height:29px;
                    display:flex;
                    align-items: center;
                    position: relative;
                    a.a {
                        display:flex;
                        align-items: center;
                    }
                    .role-name {
                        margin-left:7px;
                        font-size:13px;
                        color:#ccc;
                        display:inline-block;
                        max-width:120px;
                        height: 30px;
                        line-height: 30px;
                        &:hover {
                            text-shadow: 0 0 1px #fff;
                        }
                    }
                    &>i {
                        color:#ddd;
                        font-size:12px;
                        margin-left:5px;
                        padding:4px;
                        cursor:pointer;
                    }
                    &>ul {
                        height:0px;
                        transition: all .2s;
                        font-size:14px;
                        position:absolute;
                        top:32px;
                        right:0px;
                        background-color: #fff;
                        overflow: hidden;
                        z-index:2;
                        li {
                            height:28px;
                            line-height:28px;
                            padding:0 8px;
                            white-space: nowrap;
                            cursor:pointer;
                            &:hover {
                                // background-color: #f6f6f6;
                                background-color: #575a55;
                                color:#eee;
                            }
                        }
                    }
                    &>ul.active {
                        height:68px;
                        padding:5px 0;
                        border:1px solid #e6e6e6;
                        box-shadow: 0 0 3px #545652;
                    }
              }
              .not-login {
                  font-size:13px;
                  a {
                    color:#ccc;
                      &:hover {
                          text-shadow: 0 0 1px #fff;
                      }
                  }
                  a+a {
                    margin-left:8px;
                  }
              }
          }
      }
      .my-avatar img.round.mini {
            border:1px solid #777;
            width:25px;
            height:25px;
            &:hover {
                border:none;
                box-shadow: 0 0 4px #fff inset;
            }
      }
  }
</style>

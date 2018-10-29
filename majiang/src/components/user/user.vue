<template>
  <div class="user">
        <!-- <NavDefault></NavDefault> -->
        <!-- <section></section> -->
        <section>
                <div class="logo">
                    <router-link to="/">
                        <img src="/static/img/logo.png" alt="">
                    </router-link>
                </div>
                <div class="user-tabs"> 
                    <div class="tab-list">
                        <div :class="$route.path.indexOf('/user/login')>-1?'active':''">
                            <router-link to="/user/login">登录</router-link>
                        </div>
                        <div :class="$route.path.indexOf('/user/register')>-1?'active':''">
                            <router-link to="/user/register">注册</router-link>
                        </div>
                        <div :class="$route.path.indexOf('/user/forget')>-1?'active':''" v-if="$route.path==='/user/forget'">
                            <router-link to="/user/forget">找回密码</router-link>
                        </div>
                    </div>
                </div>
                <div class="user-view">
                    <router-view></router-view>
                </div>
        </section>
  </div>
</template>
<script>
import NavDefault from '@/components/common/nav_main_default'
import verify from "../../assets/verify"
export default {
  data() {
      return {
      }
  },
  components:{
    NavDefault
  },
  mounted() {
  },
  created() {
      //从模态登录进入，关闭模态框
      this.$store.commit('setModalLogin',false);
  }
};
</script>
<style lang="less">
.user {
    // background-color: #e7e8eb;;
    // background:url("/static/img/bg_1.png");
    position: relative;
    min-height:100%;
    // background-color: #f1f1f1;
    section {
        // height:34px;
        // background-color: #586a7a;
        // margin-bottom:12px;
        max-width:768px;
        margin:0 auto;
        padding-left:250px;
        padding-top:40px;
        margin-bottom:70px;
        position: relative;
        .logo {
            position:absolute;
            left:15px;
            top:45px;
            img {
                display:block;
                height:42px;
            }
        }

    }
    .user-tabs {
        max-width:992px;
        margin:0 auto;
        padding-bottom:0;
        background: #fefefe;
        border-radius:18px 18px 0 0 ;
        overflow: hidden;
        border:1px solid #eee;
        border-bottom-color:transparent;
        .tab-list {
            display:flex;
            &>div {
                flex:1;
                text-align:center;
                background-color: #fcfcfc;;
                // border-radius:0 0 18px 18px;
                // border-bottom:1px solid #eee;
                a {
                    display:block;
                    cursor:pointer;
                    padding:17px 2px;
                    font-weight:600;
                    color:#e2e2e2;
                    font-size:18px;
                    border:1px solid #eee;
                    margin-left:-1px;
                    margin-top:-1px;
                    border-left:none;
                    border-right:none;
                }
            }
            &>div+div {
                // border-left:1px solid #eee;
                a {
                    margin-left:-1px;
                }
            }
            &>div:last-child {
                // border-left:1px solid #eee;
                a {
                    margin-right:-1px;
                }
            }
            &>div.active {
                // background-color: #fefefe;;
                border-bottom-color:transparent;
                a {
                    background-color: #fefefe;
                    border:1px solid #eee;
                    border-bottom-color:transparent;
                    color:#70a9e5;
                    border-radius:18px 18px 0 0 ;
                    
                }
            }
        }
    }
    .user-view {
        max-width:992px;
        min-height:400px;
        background-color: #fefefe;
        margin:0 auto;
        overflow: hidden;
        border:1px solid #eee;
        border-top:none;
        border-radius:0 0 10px 10px;
    }
    @media screen and (max-width:768px) {
        margin-left:15px;
        margin-right:15px;
        margin-bottom:22px;
        section {
            margin-bottom:0;
            padding-left:0;
            padding-top:88px;
            .logo {
                top:25px;
                left:15px;
            }
        }
        .user-tabs {
                border-top:1px solid #eee;
                .tab-list {
                    &>div {
                        // flex:0 0 33.3%
                        a {
                            padding:14px 2px;
                        }
                    }
                }
        }
        .user-view {
        }
    }

}
</style>




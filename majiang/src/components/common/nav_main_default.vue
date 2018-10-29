<template>
    <div  :class="'x-nav ' + (showMore?'mobile':'')">
        <div class="x-nav-inner">
            <div class="logo">
                <router-link to="/">
                    <img src="/static/img/logo.png" alt="">
                </router-link>
            </div>
            <div class="search">
                <span class="close-btn" @click="showMore=false">关闭</span>
                <div class="search-inner">
                    <input type="text" spellcheck="false">
                    <span class="search-btn" @click="showMore=false"><i class="el-icon-search"></i></span>
                </div>
            </div>
            <ul class="menu">
                <li>
                    <router-link to="/mbti/theory" style="color:#34a853">
                        <em>MBTI</em>
                        <!-- MBTI -->
                        <p>影院热映</p>
                    </router-link>
                </li>
                <li>
                    <router-link :to="'/test'" style="color:#ff9f09">
                        测试
                        <p>人格测试</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/example" style="color:#9f7860">
                        名人汇
                        <p>正在热播</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/forum" style="color:#4285f4">
                        论坛
                        <p>正在热播</p>
                    </router-link>
                </li>
                <!-- <li class="mb-768-show">
                    <router-link to="/forum?category=all&page=1" style="color:#2AB8CC">
                        帮助中心
                        <p>正在热播</p>
                    </router-link>
                </li> -->
                <!-- <li>
                    <router-link to="/about">
                        关于我们
                    </router-link>
                </li>
                <li>
                    <router-link to="/my">
                        个人中心
                    </router-link>
                </li> -->
                <li class="mb-more">
                    <a @click="showMore=true">
                        <i class="el-icon-menu"></i>
                    </a>
                </li>
            </ul>
            <!-- 移动 更多logo   -->
            <div class="mb-logo" v-if="!$store.state.userInfo">
                <router-link to="/">
                    <img src="/static/img/logo.png" alt="" style="display:inline-block;width:92px">
                </router-link>
            </div>
            <!-- 移动 更多 登录或注册 -->
            <div class="login-reg">
                <div v-if="$store.state.userInfo" class="is-login">
                        <!-- <img class="avatar" :src="$store.state.userInfo.avatar?$pathAvatar+$store.state.userInfo.avatar:'/static/img/logo_a.png'" alt=""> -->
                        <router-link to="/my" class="a">
                        <Avatar :src="$store.state.userInfo.avatar" :uid="''" size="small-xxx" round="true"></Avatar>
                        </router-link>
                        <div class="role-name overflow-row-1">
                            <router-link to="/my" class="a">
                                {{$store.state.userInfo.r_name}}
                            </router-link>
                        </div>
                        <ul>
                            <!-- <li @click="$router.push({path:'/my'})">个人主页</li> -->
                            <li @click="$store.state.loginOut = true">退出</li>
                        </ul>
                </div>
                <div class="not-login" v-else>
                    <router-link to="/user/login">
                        登录
                    </router-link>
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
        showMore:false
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
    
  },
  created(){
  }
}
</script>

<style lang="less">
  .x-nav {
      background-color: #fff;
      .x-nav-inner {
          max-width:970px;
          height:68px;
          margin:0 auto;
          display:flex;
          justify-content:space-between;
          align-items: center;
          .logo {
              flex: 0 0 150px;
              // background-color: #eee;
              img {
                  display:inline-block;
                  width:130px;
                  height:auto;
              }
          }
          .search {
              position: relative;
              padding-left:42px;
              flex:0 0 275px;;
              .search-inner {
                  height:30px;
                  display:flex;
                  align-items: center;
                  border:1px solid #ddd;
                  border-radius:3px;
                  padding-left:2px;
                  width:100%;
              }
              .close-btn {
                  display:none;
                  font-size:16px;
                  position:absolute;
                  left:0px;
                  top:2px;
                  color:#36495d;
              }
              input {
                  flex:1;
                  height:28px;
                  border:0;outline:none; //去除蓝色框
                  font-size:15px;
                  padding-left:5px;
                  color:#555;
                  background-color: transparent;
              }
              .search-btn {
                padding:2px 5px;
                cursor:pointer;
                margin-right:3px;
                color:#d5d5d5;
              }

          }
        //   菜单样式
          ul.menu {
              flex:0 0 50%;
              display:flex;
              justify-content:flex-end;
              li {
                  padding-left:20px;
                  line-height: 27px;;
                  a {
                      font-size:20px;
                      color:#ccc;
                      p {
                        display:none;
                        line-height: 16px;;
                      }
                      em {
                        font-size:22px; //英文大一号
                      }
                  }
              }
              li.mb-768-show {
                  display:none;
              }
              li.mb-more {
                display:none
              }
          }
          .login-reg {
            display:none;
          }
          .mb-logo {
            display:none;
          }
      }
  }
  @media screen and (max-width:992px){
    .x-nav {
        padding: 0 14px 0 10px;
        .x-nav-inner .search {
            display:none;
        }
    }
  }
  @media screen and (max-width:768px){
    .x-nav {
        // padding: 0 12px;
        border-bottom:1px solid #f3f3f3;
        .x-nav-inner {
            height:47px;
            .logo {
              flex: 1;
              img {
                  width:88px;
              }
            }
            .search {
                display:none;
            }
            ul.menu {
                flex:0 0 auto;
                li {
                padding-left:3.5vw;
                    a {
                      font-size:16px;
                      em {
                        font-size:17px; //英文大一号
                      }
                    }
                }
                li.mb-more {
                    display:flex;
                //   display:block;
                justify-content: center;
                  a {
                      font-size:20px;
                      padding-right:2px;
                      position:relative;
                      top:1px;
                  }
                }
            }
        }

    }
    // 移动端 点击查看更多
    .x-nav.mobile {
        padding: 0;
        .x-nav-inner {
            position:fixed;
            background-color: #fff;
            height:100%;
            width:100%;
            z-index:1002;
            display:block;
            .logo {
              display:none;
            }
            .search {
              display:block;
              border-bottom:1px solid #eee;
              width:100%;
              padding:12px;
              padding-right:15px;
              padding-left:48px + 15px;
              .search-inner {
                  height:30px;
                  display:flex;
                  align-items: center;
                  border:none;
                  border-radius:3px;
                  padding-left:2px;
                  background-color: #f2f2f2;
              }
              .close-btn {
                  display:block;
                  top:14px;
                  left:18px;
              }
              .search-btn {
                    color:#aeaeae;
              }
            }
            ul.menu {
              display:flex;
              flex-wrap:wrap;
              justify-content:flex-start;
              padding:25px 0;
                li {
                    flex:0 0 33%;
                    padding-left:0;
                    height:70px;
                    text-align: center;
                    a {
                      font-size:19px;
                      p {
                        display:block;
                        font-size:12px;
                        margin-top:2px;
                      }
                      em {
                        font-size:21px; //英文大一号
                      }
                    }
                }
                li.mb-768-show {
                    display:block;
                }
                li.mb-more {
                  display:none;
                }
            }
              .mb-logo {
                  display: block;
                  border-top:1px solid #f7f7f7;
                  text-align:center;
                  padding:12px 0;
              }
            .login-reg {
                  display: block;
                .is-login {
                    text-align: center;
                    margin:0 auto;
                    padding:12px 0;
                    border:1px solid #f7f7f7;
                    border-left:none;
                    border-right:none;
                    .role-name {
                        padding-top:7px;
                    }
                    ul {
                        width:60px;
                        margin:0 auto;
                        li {
                            display:inline-block;
                            color:#ccc;
                            font-size:13px;
                            margin:5px 0;
                        }
                    }
                }
                .not-login {
                    display:flex;
                    padding:12px 0;
                    border-bottom:1px solid #f7f7f7;
                    border-top:1px solid #f7f7f7;
                    text-align: center;
                    font-size:13px;
                    &>a {
                      flex:1;
                      color:#55c264;
                    }
                    &>a+a {
                      border-left:1px solid #f0f0f0;
                    }
                }
            }
        }
    }
    // 兼容5s

  }
    @media screen and (max-width:350px) {
        .x-nav {
            .x-nav-inner {
                .logo {
                }
                .search {
                }
                ul.menu {
                    li {
                        padding-left:8px;
                        // a {
                        // font-size:15px;
                        // em {
                        //     font-size:16px; //英文大一号
                        // }
                        // }
                    }
                    li.mb-more {
                    a {
                    }
                    }
                }
            }

        }       
        
    }
</style>

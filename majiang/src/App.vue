<template>
  <div class="root-app" v-if="showPage">
      <!-- <myNav v-if="$route.path.indexOf('/user/')===-1"></myNav> -->
      <router-view class="router-view"></router-view>
      <myFooter 
      v-if=" !( 
        /^\/user/.test($route.path)  ||
        /^\/admin/.test($route.path)  
        )"
      ></myFooter>
      <div v-if="$store.state.modalLogin">
        <loginModal></loginModal>
      </div>
  </div>
</template>

<script>
import navMain from './components/common/nav_main'
import myFooter from './components/common/footer'
import loginModal from '../src/components/user/user_login_modal'
// import copyHandler from './assets/copyHandler'
export default {
  name: 'App',
  data(){
      return {
        routerHeight:400,
        showPage:true
      }
  },
  components: {
    navMain,
    myFooter,
    loginModal
  },
  watch: {
    "$route.fullPath": "getMeta",
    // 通知退出
    "$store.state.loginOut":function(){
        if(this.$store.state.loginOut){
            this.loginOut()
        }
    },
    //通知模态框登录 或 退出模态框
    "$store.state.modalLogin":function(){
      if(this.$store.state.modalLogin){
          // 清除本地登录信息
          localStorage.setItem('USER','')
          this.$store.commit('setUserInfo','')
      }else{
        console.log('guan',this.$store.state.userInfo);
          if(!this.$store.state.userInfo && /^\/my/.test(this.$route.path) ){
            this.$router.push({
              path:'/'
            })
          }
      }
    }
  },
  metaInfo() {
    return {
      title: this.$store.state.meta.title ,
      meta: this.$store.state.meta.meta ,
      link: this.$store.state.meta.link 
    };
  },
  methods:{
    getMeta(){
      let meta = {
          title: this.$route.path,
          meta: [
            {
              name: "keywords",
              content: "MBTI,人格,INTJ"
            },
            {
              name: "description",
              content: "人格类型"   //200字节左右,60汉字左右
            },
          ],
          link: [
            {
              rel: "prefetch",
              href: "www.baidu.com"
            }
          ],
      }
      this.$store.commit("setMeta", meta);
    },
    loginOut(){
      this.$axios.delSession().then(res=>{
        
      })
      localStorage.setItem('USER','')
      this.$store.commit('setUserInfo','')
      this.$router.push({
        path:'/'
      })
      setTimeout(()=>{
        this.$store.state.loginOut = false
      },2000)
        // if(/^\/my/.test(this.$route.path)){
        //    this.$router.push({
        //      path:'/forum?category=all&page=1'
        //    })
        // }

        // this.$message({
        //     message: '你已退出！',
        //     type: 'info'
        // });
    },
    init(){
       if(localStorage.getItem('USER')){
          this.$store.commit('setUserInfo',JSON.parse(localStorage.getItem('USER')))
       }
    }
  },
  mounted(){
    // copyHandler()
    // $('.router-view').css('minHeight',this.routerHeight+'px');
  },
  created(){
    this.init()
    this.getMeta()
  }
}
</script>

<style lang="less">
    @font-face {
      font-family: 'DINRegular';
      src: url('/static/fonts/DIN-Regular.ttf');
    }
    // @import '../static/css/my-element.less'; 
    @import '../static/css/bu-button.css'; 
    @import '../static/css/bu-font.css'; 
    .root-app {
      // font-family:DINRegular;
      // background:url('/static/img/bg_1.png');
      // background:#f7f7f7;
      background:url('/static/img/bg2.png') repeat ;
          background: #fff;
      a {text-decoration:none;color:#333 }
      a:focus {color:#538dd5;text-decoration:none}  /*点击时状态 。*/
      a:active {color:#538dd5;text-decoration:none}  /*点击时状态 。*/
      a:link {color: #1a1a1a;text-decoration:none}   /*未访问时的状态 。*/
      a:visited {color: #1a1a1a;text-decoration:none} /* 已访问过的状态 。*/
      a:hover {color: #1a1a1a;text-decoration:none} 
      .router-view {
        overflow: hidden;
        // min-height:515px
      }
      font-size:16px;
      // 编辑器、文章容器样式重写
      .editor-base-style, .w-e-toolbar li.w-e-item {
          font-family: 'Microsoft YaHei';
          font-size:15px;
          color:rgba(33, 32, 36, 0.86);
          text-align: left;
          word-wrap:break-word;
          img {
            display:block;
            // width:100%;
            max-width:100%;
            margin:12px auto;
            border-radius:2px;
          }
          blockquote {
              display: block;
              border-left: 8px solid #d0e5f2;
              padding: 5px 10px;
              margin: 10px 0;
              line-height: 1.4;
              font-size: 100%;
              background-color: #f1f1f1;
          }
          p {
              margin:0 0 .6em;
              line-height: 1.6;
          }
          li{ display:list-item }
          ol{list-style-type: decimal }
          ol, ul{ margin-left: 40px }
          ul {
            li {
              position: relative;
              &:after {
                content:"";
                display:block;
                height:3px;
                width:3px;
                border-radius:50%;
                border:1px solid rgba(33, 32, 36, 0.86);
                // background-color: #888;
                position:absolute;
                top:.5em;
                left:-1em;
              }
            }
          }
          a {
            color:#4477cf;
            &:hover {
              color:#0e959d;
            }
          }
          span {
            font-size:.9em;
          }
          h1,h2,h3 {
            font-weight:600;
            line-height: 1.8;
            margin:0 0 .3em;
          }
          h1 {
            font-size:24px;
          }
          h2 {
            font-size:21px;
          }
          h3 {
            font-size:18px;
          }
          h4 {
            font-size:15px;
          }

      }
      @media screen and (max-width:768px){
         font-size:17px;
         .editor-base-style {
           font-size:17px;
         }
      }

      * {
        box-sizing: border-box;
      }
  }

  // 重写elementUI样式
      // 重写对话框
      .el-message-box {
          width:310px;
          border-radius:3px;
          @media screen and (max-width:500px) {
                width:80%;
          }
          .el-message-box__title span {
              display:none;
          }
      }
      .el-message-box__btns {
          text-align: center;
      }
      .el-button--small, .el-button--small.is-round {
          padding: 10px 25px;
          margin: 0 12px 4px;
      }
      .el-message-box__status {
          font-size: 18px!important;
          left: 24px;
          top:22px;
      }
      .el-message-box__message p {
          margin: 0;
          line-height: 19px;
      }
      //重写btn
      .el-button.el-button--default {
          color: #329ea5;
          border-color: #329ea5;
      }
      .el-button.el-button--default:active {
          color: #187d83;
          border-color: #187d83;
      }
      .el-button.el-button--default:hover {
          color: #25959c;
          border-color:#25959c;
      }
      .el-button.el-button--default:focus {
          color: #43afb6;
          border-color: #43afb6;
      }
      .el-button.el-button--primary,.el-button.el-button--primary.el-button--default{
          background: #329ea5;
          border-color: #329ea5;
          color:#fff;
          &:hover {
              background: #227e84;
              border-color: #227e84;
          }
      }
      .el-button.el-button--primary:active {  //按下时
          background-color: #187d83;
      }
      .el-button.el-button--primary:focus {  //按下之后
          background: #409da3;
          border-color: #409da3;
      }
      .el-input__inner:focus,.el-select .el-input__inner:focus {
          border:1px solid #9ebeca;
      }
      /*提示信息 样式*/
      .el-message {
          top: 82px;
          max-width:280px;
          min-height:100px;
          min-width:250px;
          display:flex;
          flex-wrap:wrap;
          i,p {
            flex:0 0 100%;
            margin:0 auto;
            text-align: center;
          }
          .el-message__closeBtn {
              position: absolute;
              top: 18px;
              right: 15px;
              cursor: pointer;
              font-size: 16px;
          }
          .el-message__icon {
              margin: 0 auto 12px;
              text-align:center;
              font-size:44px;
          }

      }
      .el-radio__label,
      .el-textarea__inner,
      .el-input__inner {
        font-size:15px;
      }
      .el-radio__input.is-checked .el-radio__inner {
          border-color: #54bbdf;
          background: #54bbdf;
      }
      .el-select .el-input.is-focus .el-input__inner {
          border-color: #54bbdf;
      }
      .el-select-dropdown__item.selected {
          color: #54bbdf;
      }
      .el-radio__input.is-checked+.el-radio__label {
          color: #54bbdf;
      }
      .el-form-item__label {
          font-size: 15px;
      }
      .el-form-item__content {
        font-size: 15px;
      }

      .el-input__inner,.el-textarea__inner,.el-select-dropdown__item span {
        //  font-family:DINRegular;
         font-family:'Microsoft YaHei';
      }
</style>


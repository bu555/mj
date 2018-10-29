<template>
    <div class="bu-alert" v-show="show">
        <div class="domain">
           <div class="inner">
                  <div class="a-header">
                     {{title}}
                  </div>
                  <div class="a-body">
                     <!--在引入 Element 时，可以传入一个全局配置对象。该对象目前支持 size 与 zIndex 字段。size 用于改变组件的默认尺寸，zIndex 设置弹框的初始 z-index（默认值：2000）。按照引入 Element 的方式，-->
                     {{message}}
                  </div>
                  <div class="a-footer">
                     <div class="confirm" @click="clickHandler(true)">{{confirmBtnTxt}}</div>
                     <div class="cancel" @click="clickHandler(false)">{{cancelBtnTxt}}</div>
                  </div>
           </div>
        </div>
    </div>
</template>
<script>
export default {
 data() {
  return {
  }
 },
 props: {
      show: {
        default: false
      },
      title: {
        default: '提示'
      },
      message: { // 内容
        default: 'hello!'
      },
      position: { // 提醒容器位置
        default: 'center'
      },
      confirmBtnTxt: {
        default: '确 定'
      },
      cancelBtnTxt: {
        default: '取 消'
      },
      confirm: {
         
      },
      showMask: { // 是否显示遮罩层
        default: true
      },
      time: { // 显示时间
        default: 3000
      },
      transition: { // 是否开启动画
        default: true
      }
 },
 mounted() { // 时间控制
    setTimeout(() => {
    //   this.show = false
    }, this.time)
 },
 methods:{
    clickHandler(status){
        return new Promise((resolve,reject)=>{
            this.show = false
            status ? resolve('confirm') : reject('cancle')
        })
    }
 },
 computed: {
    // translate() { // 根据props，生成相对应的动画
    //     if (!this.transition) {
    //       return ''
    //     } else {
    //       if (this.position === 'top') {
    //       return 'translate-top'
    //       } else if (this.position === 'middle') {
    //       return 'translate-middle'
    //       } else if (this.position === 'bottom') {
    //       return 'translate-bottom'
    //       }
    //     }
    // },
    // fadeIn() { // 同上
    //     if (!this.transition) {
    //       return ''
    //     } else {
    //       return 'fadeIn'
    //     }
    // }
 }
}
</script>
<style scoped>
    .bu-alert {
       color:#333;
       width:100%;
       height:100%;
       position:fixed;
       top:0;
       left:0;
       font-size:16px;
       background-color: rgba(0,0,0,.5);
       display:flex;
       flex-wrap:wrap;
       align-items:center;
       box-sizing:border-box;
    }
    .bu-alert .domain {
       position: absolute;
       top:50%;
       left:50%;
       transform:translate(-50%,-50%);
       width:420px;
    }
    .bu-alert .inner {
       border-radius:5px;
       background-color: #fefefe;
       width:100%;
       overflow: hidden;
    }
    .bu-alert .a-header {
        font-size:19px;
        /*font-weight:700;*/
        padding:12px 20px;
        border-bottom:1px solid #75a9e3;
        border-bottom:1px solid #e9e9e9;
    }
    .bu-alert .a-body {
        padding:20px;
        min-height:105px;
        max-height:250px;
        overflow:hidden;
    }
    .bu-alert .a-footer {
        display:flex;

    }
    .bu-alert .a-footer>div {
        height:50px;
        line-height: 50px;
        flex:1;
        text-align:center;
        border-top:1px solid #f2f2f2;
        cursor:pointer;
    } 
    .bu-alert .a-footer>div:hover {
        color:#000;
        background-color: #fafafa;
    }
    .bu-alert div.confirm {
        border-right:1px solid #f2f2f2;
    }
    @media screen and (max-width:500px) {
          .bu-alert .domain {
            width:100%;
            padding:8vw;
          }
    }
</style>


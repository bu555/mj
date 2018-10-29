<template>
  <div class="modal-login">
      <div class="main-box" id="my-modal">
            <div class="m-bar" id="m-bar"></div>
            <Login/>
            <div class="close"  @click="closedHandle"><i class="el-icon-close"></i></div>
      </div>
  </div>
</template>
<script>
import Login from './user_login'
export default {
    components:{
        Login
    },
    methods:{
        closedHandle(){
            this.$store.state.modalLogin = false
            this.$store.state.loginOut = false
        }
    },
    mounted(){
        // var oDiv=document.getElementById('my-modal');
        // var mBar=document.getElementById('m-bar');
		// var distX=0;
		// var distY=0;
		// mBar.onmousedown=function(ev){
		// 	var oEvent=ev||event;
		// 	distX=oEvent.clientX-oDiv.offsetLeft;   //获取边界到鼠标的距离
		// 	distY=oEvent.clientY-oDiv.offsetTop;
		// 	document.onmousemove=function(ev){
		// 		var oEvent=ev||event;
        //         if(oEvent.clientY<1){
        //             // console.log('jjjj');
        //             // document.onmousemove=null;
        //             // document.onmouseup=null;
        //             // return
        //             document.onmouseup()
        //         }
		// 		var x=oEvent.clientX-distX;
		// 		var y=oEvent.clientY-distY;
		// 		if(x<0){
		// 			x=0;
		// 		}
		// 		if(y<0){
		// 			y=0;
		// 		}
		// 		if(x>(document.documentElement.clientWidth-oDiv.offsetWidth))
		// 		{
		// 			x=document.documentElement.clientWidth-oDiv.offsetWidth;
		// 		}
		// 		oDiv.style.left=x+'px';    //根据鼠标位置相对定位，得到left，top值
		// 		oDiv.style.top=y+'px';
		// 	}
        //     document.onmouseup=function(){
        //         document.onmousemove=null; 
        //         document.onmouseup=null;
        //     }
		// }
    }
};
</script>
<style lang="less">
    .modal-login {
        position:fixed;
        top:0;
        left:0;
        z-index:9999;
        background-color: rgba(0,0,0,.5);
        width:100%;
        height:100%;
        .main-box {
            background-color: #f0f0f0;
            max-width:400px;
            // margin:100px auto 0;
            left:50%;
            top:10%;
            transform:translate(-50%);
            height:auto;
            border-radius:2px;
            position:relative;
            overflow: hidden;
            .m-bar {
                height:47px;
                background-color: #f0f0f0;
                cursor:move;
            }
            .demo-ruleForm.c-login {
                max-width: 370px;
            }
            .close {
                width: 28px;
                height: 28px;
                background-color: transparent;
                position: absolute;
                top: 9px;
                right: 15px;
                font-size: 22px;
                text-align: center;
                line-height: 28px;
                cursor: pointer;
                color:#999;
                &:hover {
                    color:#333;
                }
            }

        }
        .login .box {
            border-radius:0px;
            border:none;
            margin:0;
        }
        @media screen and (max-width:515px) {
            .main-box {
                background-color: #f5f5f5;
                max-width:340px;
            }
        }


    }

</style>




<template>
  <div class="my-info" v-loading="loading" v-if="infoForm">
    <el-form ref="form" :model="infoForm" label-width="80px" size="small">
      <el-form-item label="昵称" class="name-form">
        <el-input v-if="canModify" v-model="infoForm.r_name" @focus="notModifyHandler()" spellcheck=false></el-input>
        <div id="no-modify-name" v-else style="padding-left:14px">{{infoForm.r_name}}
        </div>
        <i @click="notModifyHandler()" @mouseenter="notModifyHandler()">!</i>
        <div class="info-msg" v-if="!nameVerify" style="color:red">要求为1~12位的中文、英文、数字、下划线</div>
        <div class="info-msg" v-if="showNotModify && nameVerify" :style="canModify?'':'top:21px'"><em class="el-icon-warning"></em> 提示：昵称180天内只允许修改一次</div>
      </el-form-item>
      <el-form-item label="来自" class="city">
        <el-select v-model="infoForm.province"  placeholder="省份" style="margin-right:1%" v-if="provinceList">
            <el-option
            v-for="(item,i) in provinceList"
            :key="i"
            :label="item.name"
            :value="item.name">
                <span style="float: left">{{item.name}}</span>
            </el-option>
        </el-select>
        <el-select v-model="infoForm.city" filterable placeholder="城市" style=""  v-if="cityList">
            <el-option
            v-for="(item,i) in cityList"
            :key="i"
            :label="item.n"
            :value="item.n">
                <span style="float: left">{{item.n}}</span>
            </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="infoForm.sex" size="medium">
          <el-radio label="1">男 <i class="fa fa-mars"></i> </el-radio>
          <el-radio label="0">女 <i class="fa fa-venus"></i></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="简介">
        <el-input type="textarea" :rows="3" v-model="infoForm.profile" spellcheck=false></el-input>
        <p style="height:25px;line-height:25px;text-align:right;color:#aaa">{{getProfileLen}}/70</p>
      </el-form-item>
      <el-form-item size="large" style="margin-top:-20px">
        <el-button v-if="edited" type="primary" @click="modifyUserInfo">保 存</el-button>
        <el-button v-else type="" disabled>保 存</el-button>
        <!--<el-button>取消</el-button>-->
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
    data(){
      return {
        infoForm:null,
        // infoForm:{
        //     r_name:'',
        //     city:'',
        //     birth:'',
        //     sex:'',
        //     profile:'',
        //     province:''
        // },
        loading:false,
        initData:'',
        edited:false,
        china:'', //中国省城数据
        hotCityList:'', //热门城市
        cityAll:'', //所有城市
        cityList:[], //按省提取的城市
        provinceList:[], //省份
        showNotModify:false,
        timeID:'',
        // profileLen:0,
        canModify:false, //是否能修改名字 >180天

      }
    },
    watch:{
      "$store.state.userInfo":"getUser",
      "infoForm" : {
          handler:function() {   //注：箭头函数，this指向全局
              if(JSON.stringify(this.infoForm)!==JSON.stringify(this.initData)){
                    this.edited = true
              }else{
                    this.edited = false
              }
          },
          deep: true    //深度监听
      },
      "infoForm.province":function(){
          if(this.infoForm.province!==this.initData.province){
              this.getCityByProvince()
              this.infoForm.city = this.cityList[0]?this.cityList[0].n :''
          }else if(this.infoForm.province===this.initData.province){
              this.getCityByProvince()
              this.infoForm.city = this.initData.city

          }
      }
    },
    computed:{
        getProfileLen(){
            let len = this.infoForm.profile.length
            if(len > 70){
                setTimeout(()=>{
                    this.infoForm.profile = this.infoForm.profile.substr(0,70)
                    len = 70
                },20)
            }
            return len
        },
        nameVerify(){
            return /^[\u4e00-\u9fa5A-Za-z0-9-_]{1,12}$/.test(this.infoForm.r_name)
        },
    },
    methods:{
        modifyUserInfo(){
            this.loading = true
            // 修改账户信息
            if(this.infoForm.r_name !=this.initData.r_name){
                this.infoForm.new_r_name = this.infoForm.r_name
            }
            delete this.infoForm.avatar
            this.$axios.modifyUserInfo(this.infoForm).then(res=>{
                this.loading = false
                if(res.data.success){
                    this.$message({
                        message: '修改成功！',
                        type: 'success'
                    });
                    this.$store.state.refUser ++
                }else if(res.data.message === '-1'){
                    this.$message({
                        message: '名字已重复',
                        type: 'warning',
                        showClose: true,
                    });
                }else if(res.data.message === '-2'){
                    this.$message({
                        message: '格式不允许，要求为1~12位的中文、英文、数字、下划线',
                        type: 'warning',
                        showClose: true,
                    });
                }
            }).catch(err=>{
                this.loading = false
            })
        },
        getChina(callback){
            this.$axios.getChina({}).then(res=>{
                this.loading = false
                if(res.data.success){
                    this.china = res.data.data
                    callback&&callback()
                }
            }).catch(err=>{
                this.loading = false
            })
        },
        notModifyHandler(){
            clearTimeout(this.timeID)
            this.showNotModify = true
            this.timeID = setTimeout(()=>{
                this.showNotModify = false
            },7555)
        },
        getCityByProvince(){
            for(let i=0;i<this.china.length;i++){
                if(this.china[i].n===this.infoForm.province){
                    this.cityList = this.china[i].s
                    return
                }
            }
        },
        getUser(){
            this.infoForm = JSON.parse(localStorage.getItem('USER'))
            console.log(this.infoForm);
            this.initData = JSON.parse(localStorage.getItem('USER'))
            this.canModify = false
            // 判断是否可以修改名字
            if(this.infoForm.m_time){
                if((Date.now()-this.infoForm.m_time)>1000*3600*24*180){
                    this.canModify = true
                }
            }else{ 
                this.canModify = true
            }
        },
        init(){
            // 获取省份
            this.china.forEach((v,i)=>{
                this.provinceList.push({name:v.n})
            })
            this.getUser()
            if(this.infoForm.province){
                this.getCityByProvince()
            }else{
                // this.cityList = this.china[0].s
            }
        }
    },
    created(){
        if(localStorage.getItem('CHINA')){
            this.china = JSON.parse(localStorage.getItem('CHINA'))
            this.getUser()
        }else{
            this.getChina(this.init)

        }
        this.$store.state.myTabName = '个人资料'
    }
}
</script>
<style lang="less">
.my-info {
  margin-bottom:18px;
  padding:0 16px;
  .name-form {
        position:relative;
        i {
            position:absolute;
            right:9px;
            top:9px;
            color:#fff;
            cursor: pointer;
            height:16px;
            width:16px;
            line-height: 16px;
            text-align: center;
            border-radius:50%;
            background-color: #f9d7a7;
            &:hover {
                background-color: #edad55;
            }
        }
        .info-msg {
            position:absolute;
            left:0px;
            top:28px;
            color:#ec9115;
            font-size:12px;
        }
  }
  .city .el-form-item__content {
      display:flex;
  }
  form {
    padding-top:15px;
    max-width:404px;
  }
  @media screen and (max-width:525px) {
      form {
        .el-form-item__label {
          width:45px !important;
        }
        .el-form-item__content {
          margin-left:45px !important;
        }
      }
  }
}
</style>


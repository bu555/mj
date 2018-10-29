import axios from 'axios';
import { Loading, Message,MessageBox } from 'element-ui'
import router from '../router/index'
import Vue from 'vue';
import store from '../store/store'

// var path = "http://192.168.1.106:7000/"; // dev

// let path = process.env.NODE_ENV === "development" ? "/apis" : ''
let path = process.env.NODE_ENV === "development" ? process.env.API_HOST : ''
// var path = "/"; //prod
var pathAPI = path+"/api"; 
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;
// axios.defaults.timeout = 7000;
// http请求拦截器
var loadinginstace
axios.interceptors.request.use(config => {
    // loadinginstace = Loading.service({ fullscreen: true })
    if (process.env.NODE_ENV === "development") {
        // if (config.data) {
        //     if(config.data.entries) { //排除formdata
        //         return config
        //     } 
        //     config.data = dataHandler(JSON.parse(JSON.stringify(config.data)))
    
        //   function dataHandler(d) {
        //     if (Object.prototype.toString.call(d) === '[object Object]') {
        //       for (let key in d) {
        //         if (typeof d[key] === "string") {
        //           if (/\/apis\/upload\//.test(d[key])) {
        //             d[key] = d[key].replace(/\/upload\//g, process.env.NODE+'/upload/')
        //           }
        //         } else {
        //           dataHandler(d[key])
        //         }
        //       }
        //     } else if (Object.prototype.toString.call(d) === '[object Array]') {
        //       d.forEach((v, i) => {
        //           dataHandler(v)
        //       })
        //     }
        //     return d
        //   }
        // }
    }
    return config
}, error => {
    // loadinginstace.close()
    Message.error({
    message: '加载超时'
    })
    return Promise.reject(error)
})
// http响应拦截器
axios.interceptors.response.use(data => {
    // loadinginstace.close()
    if(data.data.message==='noLogin' && data.data.code==='-5'){
        store.state.modalLogin = true
    }
    if (process.env.NODE_ENV === "development") {
        if (data.data) {
          data.data = dataHandler(JSON.parse(JSON.stringify(data.data)))
    
          function dataHandler(d) {
            if (Object.prototype.toString.call(d) === '[object Object]') {
              for (let key in d) {
                if (typeof d[key] === "string") {
                  if (/\/upload\//.test(d[key])) {
                    d[key] = d[key].replace(/\/upload\//g, process.env.API_HOST+'/upload/')
                  }
                } else {
                  dataHandler(d[key])
                }
              }
            } else if (Object.prototype.toString.call(d) === '[object Array]') {
              d.forEach((v, i) => {
                  dataHandler(v)
              })
            }
            return d
          }
        }
    }


    return data
}, error => {
    // loadinginstace.close()
    Message.error({
    message: '加载失败'
    })
    return Promise.reject(error)
})

// 参考：http://www.jb51.net/article/112147.htm


export default {
    //注册 {name:'',password:''}
    register(data){
        return axios.post(pathAPI+'/user/register',data);
    },
    //登录 {name:'',password}
    login(data){
        return axios.post(pathAPI+'/user/login',data);
    },
    //邮箱找回密码 {email:''}
    emailRetrieve(data){
        return axios.post(pathAPI+'/user/emailRetrieve',data);
    },
    //密码重设 {password:'new password',uid:'',pwd:''} 
    resetPwd(data){
        return axios.post(pathAPI+'/user/reset',data);
    },
    //用户登出 
    delSession(){
        return axios.post(pathAPI+'/user/delSession');
    },
    //查询用户信息（调试）
    search(){
        return axios.post(pathAPI+'/user/search');
    },
    //是否登录已失效
    isLogin(){
        return axios.post(pathAPI+'/user/isLogin');
    },
    //获取用户信息
    getUserInfo(data){
        return axios.get(pathAPI+'/user/getUserInfo',data);
    },
    //修改用户信息
    modifyUserInfo(data){
        return axios.post(pathAPI+'/user/modifyUserInfo',data);
    },
    //上传头像  
    uploadPhoto(data){
        return axios.post(pathAPI+'/user/uploadPhoto',data,{headers: {'Content-Type': 'multipart/form-data'}});
    },
    //检查email是否注册
    checkRegister(data){
        return axios.post(pathAPI+'/user/userInfoListShow',data);
    },

// example -------------------------------------
    //爬取数据添加example  （）
    addExample(data){
        return axios.post(pathAPI+'/example/addExample',data);
    },
    //获取example
    getExample(){
        return axios.post(pathAPI+'/example/getExample');
    },
    // //获取example
    // searchExample(data){
    //     return axios.post(pathAPI+'/example/searchExample',data);
    // },
    //投票
    goVote(data){
        return axios.post(pathAPI+'/example/goVote',data);
    },
    //精确查询  {name:(模糊),id:精确,type：（模糊））
    searchExample(data){
        return axios.post(pathAPI+'/example/searchExample',data);
    },
    // //模糊查询 name或type
    // fuzzyExample(data){
    //     return axios.post(pathAPI+'/example/fuzzyExample',data);
    // },
    //添加评论  {eid:'',result:'xxxx'}
    addComment(data){
        return axios.post(pathAPI+'/example/addComment',data);
    },
    //获取评论  {eid:''}
    getComment(data){
        return axios.post(pathAPI+'/example/getComment',data);
    },
    //评论点赞  {eid:''，cid:''}
    clickExampleCommentZan(data){
        return axios.post(pathAPI+'/example/clickCommentZan',data);
    },
    //获取example数据  {eid:''}
    getExampleById(data){
        return axios.get(pathAPI+'/example/getExampleById',data);
    },
    //喜欢、取消喜欢example  {eid:''}
    clickExampleLike(data){
        return axios.post(pathAPI+'/example/clickExampleLike',data);
    },
// Article----------------------------------------------
    // 發表文章 
    articlePublish(data){
        return axios.post(pathAPI+'/article/publish',data);
    },
    // 獲取文章（查詢主要信息） 
    getArticle(data){
        return axios.post(pathAPI+'/article/getArticle',data);
    },
    // 獲取文章（标题+内容） 
    getArticleById(data){
        return axios.post(pathAPI+'/article/getArticleById',data);
    },
    // aid獲取文章評論  options {aid:'必传',page:'必传',size:'必传'}
    getCommentByAid(data){
        return axios.post(pathAPI+'/article/getCommentByAid',data);
    },
    // {aid:'',,content:''} 文章评论 需登录
    articleAddComment(data){
        return axios.post(pathAPI+'/article/addComment',data);
    },
    // {aid:'',} like文章 需登录
    clickArticleLike(data){
        return axios.post(pathAPI+'/article/clickArticleLike',data);
    },
    // 文章点赞  input : {aid:'',uid:''} 需登录
    clickArticleZan(data){
        return axios.post(pathAPI+'/article/clickArticleZan',data);
    },
    // 对文章评论点赞  input : {aid:'',uid:'',cid:''} 需登录
    clickArticleCommentZan(data){
        return axios.post(pathAPI+'/article/clickCommentZan',data);
    },
    // 獲取多個文章主要信息  input : {aid:[aid1,aid2]} 
    getArticleInfoAll(data){
        return axios.post(pathAPI+'/article/getArticleInfoAll',data);
    },
    // 用户删除文章  input : {aid：‘’} 
    deleteArticle(data){
        return axios.post(pathAPI+'/article/deleteArticle',data);
    },


// My -------------------------------
    //获取AccountInfo  {'}
    getAccountInfo(data){
        return axios.get(pathAPI+'/account/getAccountInfo',data);
    },
    //获取用户的评论（处理过的）
    getCommentList(data){
        return axios.get(pathAPI+'/account/getCommentList',{params:data});
    },
    //获取用户的文章评论数据
    getMyCommentArt(data){
        return axios.post(pathAPI+'/account/getMyCommentArt',data);
    },
    //获取用户的名人评论数据
    getMyCommentExa(data){
        return axios.post(pathAPI+'/account/getMyCommentExa',data);
    },
    //获取用户的名人评论数据
    getUserInfoShow(data){
        return axios.get(pathAPI+'/account/getUserInfoShow',{params:data});
    },
    //关注/取消关注用户 options:{uid:'',uuid:'',status:'1'/'0'} 1关注 0取消关注
    followUser(data){
        return axios.post(pathAPI+'/account/followUser',data);
    },
    // 获取测试记录 多条
    getMyVote(data){
        return axios.get(pathAPI+'/account/getMyVote',{params:data});
    },
    // 获取测试记录 多条
    getMyTest(data){
        return axios.get(pathAPI+'/account/getMyTest',{params:data});
    },
    // 获取发表的文章 {page,size}
    getMyArticle(data){
        return axios.get(pathAPI+'/account/getMyArticle',{params:data});
    },
    // 获取关注的人物 {page,size}
    getMyMarkExample(data){
        return axios.get(pathAPI+'/account/getMyMarkExample',{params:data});
    },
    // 获取收藏的文章 {page,size}
    getMyLikes(data){
        return axios.get(pathAPI+'/account/getMyLikes',{params:data});
    },
    // 获取关注我的 {page,size}
    getMyFollowing(data){
        return axios.get(pathAPI+'/account/getMyFollowing',{params:data});
    },
    // 获取我关注的 {page,size}
    getMyFollowers(data){
        return axios.get(pathAPI+'/account/getMyFollowers',{params:data});
    },


// Test -----------------------------
    // 添加测试数据  {category:'',uip:'',res:'Object'}
    addTest(data){
        return axios.post(pathAPI+'/test/addTest',data);
    },
    // 添加测试数据  {category:'',uip:'',res:'Object'}
    getTestById(data){
        return axios.post(pathAPI+'/test/getTestById',data);
    },

// other --------------------
    // 获取中国省市
    getChina(data){
        return axios.get(pathAPI+'/other/getChina',{params:data});
    },
    // 上傳圖片
    uploadImage(data){
        return axios.post(pathAPI+'/other/uploadImage',data,{headers: {'Content-Type': 'multipart/form-data'}});
    },
    // 获取中国省市
    uploadNetworkImage(data){
        return axios.post(pathAPI+'/other/uploadNetworkImage',data);
    },
// admin --------------------
    // 设置、存储文档
    setDocument(data){
        return axios.post(pathAPI+'/admin/setDocument',data);
    },
    // 查询文档
    getDocument(data){
        return axios.post(pathAPI+'/admin/getDocument',data);
    },

}

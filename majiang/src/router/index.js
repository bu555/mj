import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)


import home from '@/components/home/home' 
import majiang from '@/components/game/majiang' 


const vueRouter = new Router({
  mode:'history',
  routes: [
    {path:'/index',redirect:'/'},
    // redirect:'pool/systemStts',
    //Home
    {
      path:'/',
      component:majiang,
      // children:[
      //    { path:'', component: majiang},
      // ]
    },


    // { path: '*',redirect:'/'}

 
  ],
});

vueRouter.afterEach((to,from,next)=>{
    // window.scrollTo(0,0)
})


// 登录状态管理逻辑：
// 1.session时间短（如：10分钟）：localStorage存储状态+时间，路由拦截时核对
// 2.session时间长（如：一个月）：localStorage存储状态，路由拦截时核对
// 判断是否需要登录权限 以及是否登录

// router.beforeEach((to, from, next) => {
//  if (to.matched.some(res => res.meta.requireAuth)) {// 判断是否需要登录权限
//  if (localStorage.getItem('username')) {// 判断是否登录
//   next()
//  } else {// 没登录则跳转到登录界面
//   next({
//   path: '/Register',
//   query: {redirect: to.fullPath}
//   })
//  }
//  } else {
//  next()
//  }

export default vueRouter;

// https://segmentfault.com/a/1190000011426274 vue的路由懒加载和组件的按需加载

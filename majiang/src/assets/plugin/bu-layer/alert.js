// 引入组件
import alertComponent from './alert.vue'
// 定义 Loading 对象
const Alert = {
    // install 是默认的方法。当外界在 use 这个组件的时候，就会调用本身的 install 方法，同时传一个 Vue 这个类的参数。
    install:function(Vue){
        // Vue.component('bu-alert',alertComponent)
        // Vue.component('bu-message',messageComponent)


        // 把组件插入body
        // 如果已经加入，则不再执行
        if(document.getElementsByClassName('bu-alert').length) return 
        let buTpl = Vue.extend(alertComponent) // 创建vue构造器
        // el：提供一个在页面上已存在的DOM元素作为Vue实例的挂载目标。可以是css选择器，也可以是HTMLElement实例。
        // 在实例挂载之后，可以通过$vm.$el访问。
        // 如果这个选项在实例化时有用到，实例将立即进入编译过程。否则，需要显示调用vm.$mount()手动开启编译(如下)
        // 提供的元素只能作为挂载点。所有的挂载元素会被vue生成的dom替换。因此不能挂载在顶级元素(html, body)上
        // let $vm = new toastTpl({
        //  el: document.createElement('div')
        // })
        let $vm = new buTpl() // 实例化vue实例
        let tpl = $vm.$mount().$el // 此处使用$mount来手动开启编译。用$el来访问元素，并插入到body中
        document.body.appendChild(tpl)  //添加编译后的html

        // Vue.prototype.$layer.alert = { // 在Vue的原型上添加实例方法，以全局调用
        // show(options) { // 控制toast显示的方法
        //     if (typeof options === 'string') { // 对参数进行判断
        //         $vm.text = options // 传入props
        //     }
        //     else if (typeof options === 'object') {
        //         Object.assign($vm, options) // 合并参数与实例
        //     }
        //     $vm.show = true // 显示toast
        // },
        // hide() { // 控制toast隐藏的方法
        //     $vm.show = false
        // }
        Vue.prototype.$layer.alert = function(options){
            if(options===false){
                $vm.show = false
                return
            }
            if(Object.prototype.toString.call(options)==='[object Object]'){
                Object.assign($vm, options) // 合并参数与实例
            }else{
                console.log('Params error!')
                return
            }
            $vm.show = true
            console.log($vm);
            return function(){

            }
        }
    }
}




// 导出
export default Alert
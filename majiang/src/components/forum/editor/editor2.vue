<template>
     <quill-editor 
      v-model="content" 
      ref="myQuillEditor" 
      :options="editorOption" 
      @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
      @change="onEditorChange($event)">
    </quill-editor>
</template> 
<script>
import Vue from 'vue'
import  VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css' 
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)
    export default{
            data(){
                return {
                    content:null,
                    editorOption:{
                        modules:{
                            toolbar:[
                                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                                ['blockquote', 'code-block']
                                // https://blog.csdn.net/div_ma/article/details/79536634
                            ]
                        }
                    }
                }
            },
            methods:{
            onEditorBlur(){//失去焦点事件
            },
            onEditorFocus(){//获得焦点事件
            },
            onEditorChange(){//内容改变事件
            }
        }
    }
</script>  
<style>
    .ql-container  {
        font-size:15px;
    }
</style>

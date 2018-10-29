<template>
<div class="admin-content-new">
  <el-form ref="form" label-width="82px">
      <el-form-item label="Category">
        <!-- <el-input v-model="form.category" spellcheck="false"></el-input> -->
            <el-select v-model="form.category" filterable placeholder="请选择" style="width:100%">
                <el-option
                v-for="(item,index) in categoryList"
                :key="index"
                :label="item"
                :value="item">
                </el-option>
            </el-select>
      </el-form-item>
  </el-form>
  <el-form ref="form" label-width="82px">
      <el-form-item label="Key">
        <!-- <el-input v-model="form.category" spellcheck="false"></el-input> -->
            <el-select v-model="form.key" filterable placeholder="请选择" style="width:100%">
                <el-option
                v-for="(item,index) in keyList"
                :key="index"
                :label="item"
                :value="item">
                </el-option>
            </el-select>
      </el-form-item>
  </el-form>
  <!-- <el-form ref="form" label-width="82px">
      <el-form-item label="Category">
        <el-input v-model="form.category" spellcheck="false"></el-input>
      </el-form-item>
  </el-form> -->
  <!-- <el-form ref="form" label-width="82px">
      <el-form-item label="Key">
        <el-input v-model="form.key" spellcheck="false"></el-input>
      </el-form-item>
  </el-form> -->
  <el-form ref="form" label-width="82px">
      <el-form-item label="标题">
        <el-input v-model="form.title" spellcheck="false"></el-input>
      </el-form-item>
  </el-form>
  <el-form ref="form" label-width="82px">
      <el-form-item label="內容">
        <wangEditor @changeContent="getContent" :articleContent="initData.content"></wangEditor>
      </el-form-item>
  </el-form>
  <el-button type="primary" @click="submit()">提 交</el-button>

</div>
</template>
<script>
import wangEditor from '@/components/forum/editor/wEditor'
export default {
    data() {
      return {
        form:{
          content:'',
          title:'',
          key:'',
          category:'personality'
        },
        initData:{
          content:''
        },
        loading:false,
        categoryList:[
            'personality',
            'func'
        ],
        id:''

      }
    },
    components:{
        wangEditor,
    },
    computed:{
        keyList(){
            if(this.form.category==='personality'){
                return this.$mbti.types
            }else if(this.form.category==='func'){
                return this.$mbti.f8
            }else{
                return []
            }
        }
    },
    methods:{
        getContent(c){
            this.form.content = c
        },
        submit(){
            let content = this.form.content
            if(process.env.NODE_ENV === "development"){
                // content = content.replace(new RegExp('^'+process.env.API_HOST+'/upload','g'),'/upload')
                content = content.replace(new RegExp(process.env.API_HOST,'g'),'')
            }
            this.loading = true
            this.$axios.setDocument({
                title:this.form.title.trim(),
                content:content,
                key:this.form.key,
                category:this.form.category,
                id:this.id
            }).then(res=>{
                this.loading = false
                if(res.data.success){
                    this.$message({
                        message: '操作成功！',
                        type: 'success',
                        duration:1000
                    });
                    this.$router.push({
                        path:'/admin/doc'
                    })
                }else{
                    this.$message({
                        message: res.data.message || '操作失败！',
                        type: 'error'
                    });
                }
            }).catch(err=>{
                this.loading = false
            })
        }

    },
    beforeMount(){
        // 编辑
        if(this.$route.path.indexOf('/doc/edit')>-1){
            let q = this.$route.query
            if(q.id&&q.category){
                this.id = q.id
                this.loading = true
                // 获取数据
                this.$axios.getDocument({
                    category:q.category,
                    id:q.id
                }).then(res=>{
                    this.loading = false
                    if(res.data.success){
                        // this.tableData = res.data.data;
                        this.form = res.data.data[0]
                        this.initData = JSON.parse(JSON.stringify(this.form))
                    }
                }).catch(err=>{
                    this.loading = false
                })
            }else{
                this.$router.replace({path:'/admin/doc/new'})
            }
        }
    }
}
</script>
<style lang="less">
.admin-content-new {
    form {
        max-width:860px;
    }
}
</style>



<template>
<div class="admin-doc">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="Date"
        width="180">
        <template slot-scope="scope">
          <span style="font-size:13px;">{{ $moment(scope.row.c_time).format('YYYY/MM/DD HH:mm:ss') }}</span><br>
          <!-- <span style="font-size:12px;line-height:15px">{{ $moment(scope.row.e_time).format('YYYY/MM/DD HH:mm:ss') }}</span> -->
        </template>
      </el-table-column>
      <!-- <el-table-column
        label="Modify Date"
        width="180">
        <template slot-scope="scope">
          <span style="">{{ $moment(scope.row.e_time).format('YYYY/MM/DD HH:mm:ss') }}</span>
        </template>
      </el-table-column> -->
      <el-table-column
        prop="category"
        label="Category"
        width="150">
      </el-table-column>
      <el-table-column
        prop="key"
        label="Key"
        width="120">
      </el-table-column>
      <el-table-column
        prop="title"
        label="Title"
        width="220">
      </el-table-column>
      <el-table-column
        label="Ctrl">
        <template slot-scope="scope">
            <!-- <router-link :to="'/admin/doc/edit/'+scope.row.id+'?category='+scope.row.category" style="display:inline-block;margin-right:5px"> -->
            <router-link :to="{ path:'/admin/doc/edit',query:{category:scope.row.category,id:scope.row.id} }" style="display:inline-block;margin-right:5px">
                <el-button type="primary" size="mini">修改</el-button>
            </router-link>
            <el-button type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
</div>
</template>
<script>
export default {
  data() {
    return {
        tableData: [
          // {
          //   date: '2016-05-02',
          //   name: '王小虎',
          //   address: '上海市普陀区金沙江路 1518 弄'
          // }
        ],

        loading:false,

    }
  },
  methods:{
      edit(row){
         console.log(row);
         window.docItem = row
         this.$router.push({path:'/admin/doc/edit'})
      },
      getDocument(category){
        return new Promise((resolve,reject)=>{
            this.loading = true
            this.$axios.getDocument({
                category:category
            }).then(res=>{
                this.loading = false
                if(res.data.success){
                    this.tableData = this.tableData.concat(res.data.data);
                    resolve()
                }
            }).catch(err=>{
                this.loading = false
            })
        })
      }
  },
  created(){
    this.getDocument('personality').then(res=>{
      this.getDocument('func')
    })
    // console.log('moment:',this.$moment(this.$moment(new Date()).utc().format()).format('YYYY-MM-DD HH:mm:ss')  );
  }
}
</script>
<style lang="less">
.admin-doc {

}
</style>
<style>
.admin-doc .el-table td, .admin-doc .el-table th {
    padding: 7px 0;
}

</style>




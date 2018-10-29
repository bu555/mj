<template>
<div class="admin">
    <el-container>
        <el-header>Header</el-header>
        <el-container style="max-width:1190px;margin:0 auto;width:100%;">
            <el-aside width="200px">
                <el-menu default-active="''" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="!isCollapse" >
                <el-submenu index="1">
                    <template slot="title">
                        <i class="fa fa-pencil-square" style="padding:0 5px;font-size:1.2em"></i>
                        <span slot="title">
                            文案
                        </span>
                    </template>
                    <ul class="drop-list">
                        <li :class="/^\/admin\/doc$/.test($route.path)?'active':''">
                            <router-link to="/admin/doc">文案列表</router-link>
                        </li>
                        <li :class="/^\/admin\/doc\//.test($route.path)?'active':''">
                            <router-link to="/admin/doc/new">文案编辑</router-link>
                        </li>
                    </ul>
                    <!-- <el-menu-item index="1-2">编辑器</el-menu-item> -->
                    <!-- <el-menu-item-group>
                        <el-menu-item index="1-1">编辑器</el-menu-item>
                        <el-menu-item index="1-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                        <el-menu-item index="1-3">选项3</el-menu-item>
                    </el-menu-item-group> -->
                </el-submenu>
                <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">导航二</span>
                </el-menu-item>
                <el-menu-item index="3" disabled>
                    <i class="el-icon-document"></i>
                    <span slot="title">导航三</span>
                </el-menu-item>
                <el-menu-item index="4">
                    <i class="el-icon-setting"></i>
                    <span slot="title">导航四</span>
                </el-menu-item>
                </el-menu>

            </el-aside>
            <el-main>
                <div style="padding:0 15px">
                    <router-view/>
                </div>
            </el-main>
        </el-container>
    </el-container>
</div>
</template>
<script>
export default {
    data() {
        return {
        isCollapse: true
        };
    },
    methods: {
        handleOpen(key, keyPath) {
        console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
        console.log(key, keyPath);
        }
    },
    created(){
        if('管理员权限'){

        }
        if(this.$route.path === '/admin'){
            this.$router.replace('/admin/doc')
        }
    }  
}
</script>
<style lang="less">
.admin {
    // max-width:1180px;
    // margin:0 auto;
    min-height:500px;
    font-size:14px;
    ul.drop-list {
        li {
            height:50px;
            line-height:50px;
            &:hover {
                background: #edf5ff;
            }
            a {
                display:block;
                height:50px;
                color:#333;
            }
        }
        li.active a {
            color:#ffd04b;
            color:#25a1bf;
        }
    }
}
  .el-header, .el-footer {
    background-color: #545c64;
    background-color: #fff;
    color: #333;
    text-align: center;
    line-height: 60px;
    margin-bottom:12px;
    border-bottom:1px solid #e6e6e6;
  }
  
  .el-aside {
    // background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    // background-color: #E9EEF3;
    background-color: #fff;
    color: #333;
    text-align: center;
    // line-height: 160px;
    padding-top:8px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .el-table--enable-row-transition .el-table__body td {
    text-align:left;
  }
</style>



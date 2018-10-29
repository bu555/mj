<template>
<div class="forum-list">
    <div style="min-height:470px">
        <ArticleItems v-for="(v,i) in list" :key="i" :data="v"></ArticleItems>
        <p v-if=" (list instanceof Array) && list.length===0" class="if-data-empty">暂无数据("▔□▔)</p>
    </div>
    <!--分页-->
    <div style="text-align:center;padding:15px 0 22px;">
        <el-pagination
        background
        :current-page="currentPage"
        :page-size ="size"
        :pager-count="5"
        @current-change="changePage"
        layout="prev, pager, next"
        :total="total">
        </el-pagination>
    </div>   
</div>
</template>
<script>
import ArticleItems from '@/components/common/article_items'
export default {
    data(){
        return {
            active:false,
            list:'',
            total:0,
            size:4,
            currentPage:0,
            loading:false,     

        }
    },
    components:{
        ArticleItems
    },
    watch:{
        "$route.query":function(){
            this.getArticle()
        }
    },
    methods:{
        // 获取文章 options {keyword:'',category:'ask',likes:'Number',good:boolean}
        getArticle(){
            this.loading = true
            let page = this.$route.query.page || '1'
            this.currentPage = Number(page)
            this.$axios.getArticle({
                category:this.$route.query.category || '', //''即获取全部
                page:page,
                good:this.$route.query.good || '',
                size:this.size,
                keyword:this.$route.query.s || '',
            }).then(res=>{
                this.loading = false
                if(res.data.success){
                    this.list = res.data.data
                    this.total = res.data.total
                }
            }).catch(err=>{
                this.loading = false
            })
        },
        changePage(p){
            let q = JSON.parse(JSON.stringify(this.$route.query))
            q.page = p
            this.$router.push({query:q} )
            // console.log(val);
        }

    },
    created(){
            this.getArticle()
    }
    
};
</script>
<style lang="less">
.forum-list {
}

</style>

    
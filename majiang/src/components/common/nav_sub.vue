<template>
    <div class="x-nav-sub" v-if="data">
        <div class="sub-nav-inner" :style="'max-width:'+(navList.maxWidth||970)+'px'">
            <router-link class="nav-title" v-html="format(navList.title && navList.title.value)" :to="navList.title && navList.title.link">
                
            </router-link>
            <!-- 搜索框 -->
            <div class="search" v-if="navList.search && Object.prototype.toString.call(navList.search) === '[object Object]'">
                <input type="text" spellcheck="false" v-model="searchVal" @input="inputHandler" @keyup.enter="submit" :placeholder="navList.search.placeholder">
                <span class="search-btn"><i class="el-icon-search"  @click="submit"></i></span>
            </div>
            <!-- 搜索框位置菜单 -->
            <ul class="nav-list in-top" v-else-if="navList.items && (navList.items instanceof Array)">
                <li v-for="(v,i) in navList.items" :key="i" :class="v.reg.test($route.fullPath)?'active':''">
                    <router-link :to="v.link" v-html="format(v.value)"></router-link>
                    <!-- <div class="active-flag"></div> -->
                </li>
            </ul>
        </div>
        <div class="bottom-nav" v-if="navList.search && navList.items">
            <ul :class="'nav-list in-bottom '">
                <li v-for="(v,i) in navList.items" :key="i" :class="v.reg.test($route.fullPath)?'active':''">
                    <router-link :to="v.link" v-html="format(v.value)"></router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            searchVal:'',
            innerWidth:null,
            prevKeyword:'',
            timer:null

        }
    },
    props:['data'],
    watch: {
        '$route.fullPath':function(){
            this.prevKeyword = '' //清空关键字记录
        },
        'searchVal':function(){
            clearTimeout(this.timer)
            if(!this.searchVal){
                this.timer = setTimeout(()=>{
                    console.log('清空输入框')
                    this.$emit('submitSearch',this.searchVal) //传空值
                },2500)
            }
        }
    },
    computed:{
        navList(){
            return this.data
        }
    },
    methods: {
        clickTitle(){
            // if(this.data.title && this.data.title.link){
            //     this.$router.push({
            //         path:this.data.title.link
            //     })
            // }else{
            //     this.$router.go(-1)
            // }
        },
        // 发送搜索值
        inputHandler(){
            this.$emit('inputSearch',this.searchVal)
            if(!this.searchVal){
                // console.log('清空输入框');
                // this.$emit('submitSearch',this.searchVal)
            }
        },
        format(str){
            if(typeof str ==='string'){
                return str.replace(/\w+/g,function(s){
                    return `<em>${s}</em>`
                })
            }else{
                return ''
            }
        },
        submit(){
            this.searchVal = this.searchVal.trim()
            if(this.searchVal){
                if(this.searchVal===this.prevKeyword) return
                this.$emit('submitSearch',this.searchVal)
                this.prevKeyword = this.searchVal
            }
        }
    },
    created(){
        
        //  console.log('goLink:',this.data.title.link || 'go-1');
    }
}
</script>

<style lang="less">
  .x-nav-sub{
    // background-color: #f0f6f3;;s
    background-color: #f0f3ef;
    .sub-nav-inner {
        max-width:970px;
        margin:0 auto;
        display:flex;
        justify-content: flex-start;
        align-items: flex-start;
        // height:70px;
        padding:22px 0;
        .nav-title {
            font-size:27px;
            font-weight:550;
            color:#0e959d;
            margin-right:1.8em;
            white-space: nowrap;
            cursor:pointer;
            em {
                font-size:28px;
            }
        }
        .search {
                height:32px;
                display:flex;
                align-items: center;
                border:1px solid #eee;
                border-radius:3px;
                padding-left:2px;
                width:290px;
                background-color: #fcfcfc;
                margin-top: 4px;
            input {
                flex:1;
                height:28px;
                border:0;outline:none; //去除蓝色框
                font-size:14px;
                padding-left:5px;
                color:#555;
                background-color: transparent;
                width:100%;
            }
            .search-btn {
                padding:2px 5px;
                cursor:pointer;
                margin-right:3px;
                color:#d5d5d5;
                &:hover {
                    text-shadow: 0 0 1px #545652;
                }
            }
        }
    }
    .bottom-nav {
        border-top:1px solid #e3e9e2;
        min-height:36px;
    }
    
    ul.nav-list.in-top {
        // 纵向排列list激活样式
        li {
            margin-right:1.5em;
            a {
                padding-bottom:2px;
            }
        }
        li.active {
            position: relative;
            a {
                // text-shadow: 0 0 1px #333;
                background-color: #1ca9b1;
                color:#fff;
            }
        }
        .active-flag {
            width:3px;
            height:3px;
            // background-color: #0e959d;
            border:1px solid #05696f;
            position:absolute;
            left:-6px;
            top:10px;
            border-radius:50%;
            &:after,&:before {
                content:"";
                display:block;
                position:absolute;
                left:-3px;
                top:-3px;
                width:5px;
                height:5px;
                border-radius:50%;
                border:1px solid #05696f;
            }
            // &:before {
            //     left:-5px;
            //     top:-5px;
            //     width:9px;
            //     height:9px;
            // }
        }
    }
    ul.nav-list {
        display:flex;
        justify-content: flex-start;
        align-items:center;
        min-height:36px;
        padding-top:3px;
        li {
            margin:3px 0;
            // margin-right:1.5em;
            a {
                font-size:16px;
                padding:0px 4px;;
                color:#0e959d;
                border-radius:3px;
                white-space:nowrap;
                em {
                    font-size:17px;
                }
            }
        }    
        li.active a {
            // font-weight:700;
            color:#05696f;
        }
        li+li {
            // padding-left:1.5em;
        }    
    }
    // 当在底部显示
    ul.nav-list.in-bottom {
        // min-height:38px;
        max-width:970px;
        margin:0 auto;
        align-items:center;
        padding-top:0px;        
        li {
            margin-right:1.2em;
            a {
                em {
                }
            }
            &:hover {
                a {
                    background-color: rgba(5,105,110,.15);
                    color:#0a8e96;
                }
            }
        } 
        li.active a {
            // text-shadow: 0 0 1px #333;
            background-color: #1ca9b1;
            color:#fff;
        } 
    }
    @media screen and (max-width:992px) {
        .sub-nav-inner,.bottom-nav {
            padding-left:16px;
            padding-right:16px;
        }
    }
    @media screen and (max-width:500px) {
        .sub-nav-inner,.bottom-nav {
            .nav-title {
                margin-right:1.5em;
            }
            .search { 
                width:100%;
            }
        }
        ul.nav-list.in-top {
            align-items:flex-start;
            flex-wrap:wrap;
            li {
                flex:0 0 100%;
                padding-left:0;
            }
        }
        ul.nav-list {
            display:flex;
            justify-content: flex-start;
            align-items:center;
            min-height:33px;
            padding-top:3px;
            li:first-child {
                margin-top:0;
            }
        }
    }
  }
</style>

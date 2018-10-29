<template>
    <div class="my-switch">
        <div class="my-switch-inner">
            <ul ref="sList">
                <li v-for="(v,i) in switchList" :key="i" @click="clickHandler(v.val,v.key,i)">{{v.val}}</li>
            </ul>
            <div class="cover" ref="sCover">{{activeKey}}</div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            activeKey:'',
            maxLength:0,
            itemWidth:0
        }
    },
    props:{
        active:{
            default:function(){
                return {
                        val:'热门',
                        key:'hot'
                    }
            }
        },
        list:{
            default:function(){
                return [
                    {
                        val:'热门',
                        key:'hot'
                    },
                    {
                        val:'时间',
                        key:'time'
                    }
                ]
            }
        }
    },
    watch:{
    },
    computed:{
        switchList(){
            if(this.list.length===2){
                return this.list
            }
        }
    },
    methods:{
        clickHandler(value,key,index){
            if(index===0){
                // this.$refs.sCover.style.right = '';
                // this.$refs.sCover.style.left = this.$refs.sCover.offsetWidth;
                this.$refs.sCover.style.left = 0;
            }else{
                // this.$refs.sCover.style.left = '';
                // this.$refs.sCover.style.right = this.$refs.sCover.offsetWidth;
                // this.$refs.sCover.style.right = 0;
                this.$refs.sCover.style.left = this.itemWidth +'px'
            }
            this.activeKey = value
            this.$emit('getKey',key)
        }
    },
    mounted(){
        this.itemWidth = (this.maxLength + 2) * 15
        this.$refs.sCover.style.width = this.itemWidth+'px'
        this.$refs.sList.children[0].style.width = this.itemWidth+'px'
        this.$refs.sList.children[1].style.width = this.itemWidth+'px'

        this.list.forEach((v,i)=>{
            if(this.active.key===v.key){
                this.clickHandler(v.val,v.key,i)
            }
        })
        
    },
    created(){
        if(this.list.length===2){
            this.maxLength = this.list[0].val.length>this.list[1].val.length?this.list[0].val.length:this.list[1].val.length
            this.activeKey = this.active.val
        }
    }
}
</script>

<style lang="less" scoped>
    @sHeight:26px;
    .my-switch{
        // box-shadow: 0 1px #ccc;
        // box-sizing: border-box;
        line-height: @sHeight;
        font-size:14px;
        // display:inline-block;
        border-radius:0 0 4px 4px;  
        overflow: hidden;
        border-bottom:1px solid #b7c2cd;
        padding:0;
        .my-switch-inner{
            display:inline-block;
        	color:#fff;
            border:1px solid #3d5160;
            border-bottom:1px solid #405464;
            background: #596879;
            box-shadow: 0 2px 7px #3a4e5d inset;
            border-radius:4px;   
            position: relative;
            color:#ccc;
            ul {
                list-style: none;
                height:@sHeight;
                display:flex;
                li {
                    height:@sHeight;
                    line-height: @sHeight;
                    padding:0px 12px;
                    text-align: center;
                    cursor:pointer;
                    &:hover {
                        color:#ddd;
                    }
                }
            }
            .cover {
                position:absolute;
                left:0px;
                top:0px;
                background: linear-gradient(#fff, #dcdcdc);
                height:@sHeight;
                line-height: @sHeight;
                transition-property: all;;
                transition-duration: .25s;
                border-radius:4px;
                padding:0 15px;
                color:#555;
                font-weight:600;
                &:after,&:before {
                    display:block;
                    content:"";
                    position:absolute;
                    height:13px;
                    width:1px;
                    background-color: #e5e5e5;
                    border-left:1px solid #fafafa;
                    border-right:1px solid #fafafa;
                    top:50%;
                    transform: translateY(-50%);
                    box-shadow: 0 0 1px #bdb6b6;
                    text-shadow: 0 0 9px #fff;
                    // left:3px;
                }
                &:after {
                    left:5px;
                }
                &:before {
                    right:5px;
                }
            }
        }

    }
</style>


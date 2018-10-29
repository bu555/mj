<template>
    <div class="table-board">
        <div class="play-box">
            <div class="user-ng" v-if="user.length<2"> {{user.length}}/4，等待中。。。</div>
        </div>
        <p v-for="(v,i) in user" :key="i">
            {{v.uid + v.name + ''}}
        </p>
        <div>
            <h4>da de pai</h4>
            <ul>
                <li v-for="(v,i) in dapai" :key="i" >
                    <!-- <img :src="'/static/img/'+v+'.gif'" alt="" > -->
                    {{v}}
                </li>
            </ul>
        </div>
        <div class="p1">
            <div class="p1-pai">
                <ul class="sort">
                    <!-- <li v-for="(v,i) in 11" :key="i" >
                        <img :src="'/static/img/s5.gif'" alt="" @click="daPai(v)">
                    </li> -->
                    <li v-for="(v,i) in pai" :key="i" >
                        <img :src="'/static/img/'+v+'.gif'" alt="" @click="daPai(v)">
                    </li>
                    <li style="margin-left:22px" v-if="mopai">
                        <!-- <img :src="'/static/img/s5.gif'" alt="" @click="daPai(v)"> -->
                        <img :src="'/static/img/'+ mopai +'.gif'" alt="" @click="daPai(mopai)">
                    </li>
                    <!-- <li class="open"></li> -->
                </ul>
                <!-- <ul class="sort">
                    <li v-for="(v,i) in pai" :key="i" >
                        <img :src="'/static/img/'+v+'.gif'" alt="" @click="daPai(v)">
                    </li>
                    <li class="mopai" >
                        <img :src="'/static/img/'+ mopai +'.gif'" alt="" @click="daPai(mopai)">
                    </li>
                    <li class="open"></li>
                </ul> -->

                <ul class="open" v-for="(v,i) in open" :key="i">
                    <li  v-for="(v1,i1) in v.pai" :key="i1" >
                        <img :src="'/static/img/'+v1+'.gif'" alt="" >
                    </li>
                </ul>

            </div>
            <div class="p1-ready" v-if="user.length>=2">
                    <span>1/4</span>
                    <el-button @click="isReady">准备好了</el-button>
            </div>
            <ul class="p1-action">
                <!-- <li>碰</li> -->
                <li v-for="(v,i) in action" :key="i">
                    <span v-if="v.actionType==='zimo'">自摸</span>
                    <span v-else-if="v.actionType==='peng'">碰</span>
                    <span v-else-if="v.actionType==='gang'">杠</span>
                    <span v-else-if="v.actionType==='qianggang'">抢杠</span>
                    <span v-else-if="v.actionType==='gonggang'">公杠</span>
                    <span v-else-if="v.actionType==='angang'">暗杠</span>
                </li>
            </ul>

        </div>
        <!-- <ul class="down other">
            <li v-for="(v,i) in paiList.slice(0,4)" :key="i">
                <img :src="'/static/img/'+v+'.gif'" alt="">
            </li>
        </ul> -->
    </div>
</template>

<script>
import Player from './player'
import io from 'socket.io-client'

export default {
    data(){
        return {
            paiList:[],
            p1:null,
            uid:'',
            player:{},
        }
    },
    watch:{
        'player':function(){
            console.log('player 变动');
        }
    },
    computed:{
        user(){
            return this.player.user || []
        },
        account(){
            return this.$store.state.account || {}
        },
        pai(){
            if(!this.player.pai) return []
            if(this.player.pai.length % 2 === 0){
                return this.runSortPai(this.player.pai.slice(0,this.player.pai.length-1))
            }else{
                return this.runSortPai(this.player.pai)
            }
        },
        mopai(){
            if(!this.player.pai) return []
            if(this.player.pai.length % 2 === 0){
                return this.player.pai[this.player.pai.length-1]
            }else{
                return ''
            }
        },
        dapai(){
            if(!this.player.dapai) return []
            return this.player.dapai
        },
        action(){
            return this.player.action
        },
        open(){
            return this.player.open
        },
    },
    methods:{
        xipai(){
            for(let j=0;j<4;j++){
                for(let i=1;i<=9;i++){
                    this.paiList.push('m'+i)
                    this.paiList.push('p'+i)
                    this.paiList.push('s'+i)
                }
                for(let i=1;i<=7;i++){
                    this.paiList.push('z'+i)
                }
            }
            Array.prototype.shuffle = function() {
            let m = this.length, i;
                while (m) {
                i = (Math.random() * m--) >>> 0;
                [this[m], this[i]] = [this[i], this[m]]
                }
                return this;
            }
            this.paiList = this.paiList.shuffle() 
            
        },
        random(lower, upper) {
            return Math.floor(Math.random() * (upper - lower)) + lower;
        },
        daPai(pai){
            console.log('pai:',pai);
            // mj.startAction({uid:uid,activeAction: {actionType: "da",actionPai: p,ctrl_uid:uid }})
            if(!pai) return console.log('pai not default');
            if(!this.player.active) return console.log('非active用户');
            let params = {
                uid:this.account.uid,
                activeAction:{
                    actionType: "da",
                    actionPai: pai,
                    ctrl_uid:this.account.uid
                }
            }
            this.socket.emit('room', {action:'pai',code:'a3',roomCode:'r555',uid:this.account.uid,data:params});
        },
        // 玩家准备OK
        isReady(){
            this.socket.emit('room', {action:'ready',roomCode:'r555',uid:this.account.uid});
        },    
        runSortPai(paiList){
            let m = []
            let p = []
            let s = []
            let z = []
            for(let i=0;i<paiList.length;i++){
                let type = paiList[i].substr(0,1)
                switch(type){
                    case 'm':
                    m.push(paiList[i])
                    break;
                    case 'p':
                    p.push(paiList[i])
                    break;
                    case 's':
                    s.push(paiList[i])
                    break;
                    case 'z':
                    z.push(paiList[i])
                    break;
                }
            }
            m = sortNum(m)
            p = sortNum(p)
            s = sortNum(s)
            z = sortNum(z)
            return  m.concat(p).concat(s).concat(z)
            function sortNum(list){
                for(let i=0;i<list.length-1;i++){
                    let temp
                    for(let j=0;j<list.length-i-1;j++){
                        if( list[j].substr(1) > list[j+1].substr(1) ){
                            temp = list[j]
                            list[j] = list[j+1]
                            list[j+1] = temp
                        }
                    }
                }
                return list
            }
        }
    },
    mounted(){        
        const config = {
            host:'localhost:7002', 
            params:{
                path: '',
                transports:['websocket', 'polling']
            }
        }
        this.socket = io(config.host, config.params);
        this.socket.on('connect', ()=>{
            console.log('socket.io is connected');
            // 请求进入room
            this.socket.emit('room', {action:'into',roomCode:'r555',uid:this.account.uid});

        });
        this.socket.on('sys', (data)=>{
            console.log(data);
        })
        // 监听房间
        this.socket.on('roomMessage', (data)=>{
            console.log(data);
            // 房间人数变动返回 (进入或退出均返回)
            if(data.action==='into'){
                // 返回给自己的
                if(data.uid){
                    console.log('self:',data);
                }else{
                    this.player = data.player
                    console.log('all:',data);
                }
            // 
            }else if(data.action==='ready'){
                if(data.status && data.status===1){
                    console.log('全部就绪！');
                    // this.socket.emit('room', {action:'pai',code:'a0',roomCode:'r555',uid:this.account.uid});
                    this.socket.emit('room', {action:'pai',code:'a1',roomCode:'r555',uid:this.account.uid});
                }
            }else if(data.action==='pai'){
                if(data.code==='a1'){
                    this.player = data.data
                     console.log('player:',this.player)
                     if(this.player.active){
                            this.socket.emit('room', {action:'pai',code:'a2',roomCode:'r555',uid:this.account.uid});
                            console.log('mo pai le');

                     }
                }else if(data.code==='a2'){
                    // mopai 后返回数据（当事者）
                    this.player = data.data
                }else if(data.code==='a3'){
                    // dapai 后返回数据
                    if(data.to==='all'){
                        if(data.data){
                            console.log('da de pai',data.data);
                            this.socket.emit('room', {action:'pai',code:'a4',roomCode:'r555',uid:this.account.uid});  //all获取check数据 非当事者
                        }else{
                            console.log('error:a3 数据返回异常');
                        }
                    }else if(data.to==='self'){   
                        this.player = data.data //self 获取check数据 当事者
                    }
                }else if(data.code==='a4'){
                    this.player = data.data //获得check后的数据
                    console.log('获得check后的数据',data.data);
                }
            }
        })
        this.socket.on('disconnect', function(){});      

    },
    created(){
        this.xipai()
        if(this.$route.query.s){
            this.$store.commit('setAccount',{uid:this.$route.query.s,name:'U'+this.$route.query.s})
        }else{
            this.$store.commit('setAccount',{uid:'u111',name:'U1'})
        }
    },
}
</script>
<style lang="less">
.table-board {
    max-width:768px;
    max-height:430px;
    min-height:430px;
    margin:22px auto;
    // background-color: #8ead23;
    position: relative;
    div.p1 {
        position: absolute;
        bottom:22px;
        left:0px;
        padding:0 22px;
        background-color: #ccc;
        div.p1-pai {
            display:flex;
            justify-content: space-between;
            ul.sort,ul.open {
                display:flex;
                justify-content: flex-start;
                align-items: flex-end;
                li>img {
                    display:block;;
                    width:100%;
                    height:auto;
                }
                li {
                    flex:0 0 47px;
                }
                li.status {
                    height:60px;
                    position:absolute;
                    top:-60px;
                    left:50%;
                    transform: translateX(-50%);
                }
        
            }
            ul.open {
                justify-content: flex-end;
                li {
                    flex:0 0 37px;
                }
            }

        }
        ul.p1-action {
            position:absolute;
            height:50px;
            top:-50px;
            left:50%;
            transform: translateX(-50%);
            display:flex;
            justify-content: center;
            background-color: #ddd;
            li {
                height:44px;
                width:44px;
                background-color: skyblue;
                border-radius:50%;
                text-align: center;
                line-height: 44px;
                margin:0 4px;
                cursor: pointer;
            }
        }
        div.p1-ready {
            position:absolute;
            height:100px;
            top:-100px;
            left:50%;
            transform: translateX(-50%);
        }

    }
}

</style>

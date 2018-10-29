
class Majiang {
    // quantity:4,player:[{name:'',uid:'',chip:20,zhuang:true}]
    constructor(player,quantity){
        this.quantity = quantity || 4
        this.pai = []
        this.player = player //[{uid:'',name:'',pai:[],open:[{pai: [],ctrl_uid: '',type: 'gang'}],dapai:[],action:[{actionType:'da','peng','gang','zimo',angang,qianggang,gonggang,ctrl_uid:'',actionPai:''}],,active:true,status:'mopai',zhuang:true,chip:10}] 
        this.log = {}
        this.currentActivePai = null // {ctrl_uid:'u22',pai:'m5',action:'da/peng/gang'}
        this.init()
    }
    init(){
        this.pai = this.xipai() 
        //发牌 
        for(let i=0;i<this.player.length;i++){
            this.player[i] = Object.assign(
                this.player[i],
                {
                    pai:this.pai.splice(0,13),
                    open:[],
                    dapai:[],
                    action:[],
                    active:this.player[i]['zhuang'],
                    // status:this.player[i]['zhuang']?'mopai':''
                }
            )
            
        }

    }
    getPalyer(uid){
        for(let i=0;i<this.player.length;i++){
            if(this.player[i].uid===uid ){
                return this.player[i]
            }
        }

    }
    // 摸牌
    moPai(uid){
        let success = false
        for(let i=0;i<this.player.length;i++){
            if(this.player[i].active && this.player[i].uid===uid ){
                this.player[i].pai.push(this.pai.shift()) //添加至最后
                success = true
            }
        }
        if(!success) console.log('非active或uid不匹配');
        return success
    }
    xipai(){
        let paiList = []
        for(let j=0;j<4;j++){
            for(let i=1;i<=9;i++){
                paiList.push('m'+i)
                paiList.push('p'+i)
                paiList.push('s'+i)
            }
            for(let i=1;i<=7;i++){
                paiList.push('z'+i)
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
        paiList = paiList.shuffle() 
        return paiList
    }
    // daPai无则为moPai
    check(uid,daPai){ 
        if(!uid) return console.log('无uid');
        let paiList = null
        let openList = []
        if(daPai){
            let nextActiveIndex = null
            for(let i=0;i<this.player.length;i++){
                if(this.player[i].uid !== uid ){ //非打出者
                    paiList = this.player[i].pai
                    openList = this.player[i].open
                    let action = runCheck(paiList,openList,daPai,uid)
                    this.player[i].action = action
                    if(action.length>0){
                        this.player[i].active = true
                    }else{
                        this.player[i].active = false
                    }
                }else{
                    // 打出者
                    // this.player[i].action = []
                    // this.player[i].active = false
                    // let index = this.player[i].pai.indexOf(daPai)
                    // this.player[i].pai.splice(index,1)
                    nextActiveIndex = i+1
                    nextActiveIndex = nextActiveIndex>(this.player.length-1) ? 0: nextActiveIndex
                }
            }
            let flag = false
            for(let i=0;i<this.player.length;i++){
                if(this.player[i].active){
                    flag = true
                    break
                }
            }
            if(!flag && typeof nextActiveIndex==='number'){
                this.player[nextActiveIndex].active = true
                this.moPai(this.player[nextActiveIndex].uid)  //没action,mopai后返回
            }
        }else{
            for(let i=0;i<this.player.length;i++){
                if(this.player[i].uid === uid ){
                    paiList = this.player[i].pai
                    openList = this.player[i].open
                    this.player[i].action = runCheck(paiList,openList,null,uid)
                }
            }

        }
        function runCheck(paiList,openList,daPai,uid){
            let act = {}
            let action = []
    
            for(let i=0;i<paiList.length;i++){
                if(act[paiList[i]]){
                    act[paiList[i]] += 1
                }else{
                    act[paiList[i]] = 1
                }
            }
            if(daPai&&uid){ 
                if(act[daPai]){
                    act[daPai]+=1
                    if(act[daPai]>=3){
                        action.push({
                            actionType:'peng',
                            actionPai:daPai,
                            ctrl_uid:uid
                        })
                    }
                    if(act[daPai]===4){
                        action.push({
                            actionType:'gang',
                            actionPai:daPai,
                            ctrl_uid:uid
                        })
                    }
                }
            }else{
                for(let k in act){
                    if(act[k]===4){                   
                        action.push({
                            actionType:'angang',
                            actionPai:k,
                            ctrl_uid:''
                        })
                    }
                }
                
                for(let i=0;i<openList.length;i++){
                    if(openList[i].actionType==='peng'){
                        let pengPai = openList[i].actionPai
                        if(paiList.indexOf(pengPai)>-1){                 
                            action.push({
                                actionType:'gonggang',
                                actionPai:pengPai,
                                ctrl_uid:''
                            })
                        }
                    }
                }
            }
            return action
        }
        
    }
    sortPai(uid){
        for(let i=0;i<this.player.length;i++){
            if(uid){
                if(this.player[i].active && this.player[i].uid===uid ){
                    this.player[i].pai = this.runSortPai(this.player[i].pai)
                }
            }else{
                this.player[i].pai = this.runSortPai(this.player[i].pai)
            }
        }
    }
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
    // {uid:'u22',activeAction: {actionPai: "m5",actionType: "peng",ctrl_uid:'u11'}}
    startAction({uid,activeAction}){
        console.log('uid:',uid);
        let index 
        for(let i=0;i<this.player.length;i++){
            if(this.player[i].uid === uid ){
                index = i
            }
        }
        if(typeof index !== 'number') return console.log('非法uid');
        if(!this.player[index].active) return console.log('非active uid');
        
        // action 合法性判断(dapai以外的action)
        if(activeAction.actionType!=='da'){
            let flag  = false
            this.player[index].action.forEach((v,i)=>{
                if( JSON.stringify(v)===JSON.stringify(activeAction) ){
                    flag = true
                }
            })
            if(!flag) return console.log('非法的action');
        }
        
        if(activeAction.actionType==='da'){
            let i_ = this.player[index].pai.indexOf(activeAction.actionPai)
            if(i_===-1) return console.log('无此pai')
            let dp = this.player[index].pai.splice(i_,1)
            this.player[index].dapai = this.player[index].dapai.concat(dp)
            this.player[index].pai = this.runSortPai(this.player[index].pai)
            this.player[index].action = []
            this.player[index].active = false
            
        }else if(activeAction.actionType==='peng' || activeAction.actionType==='gang'){
            let total = activeAction.actionType==='peng'? 2 : 3
            let openItem = {
                pai: null, //['','']
                ctrl_uid: activeAction.ctrl_uid,
                type: activeAction.actionType
            }
            openItem.pai = [activeAction.actionPai]
            for(let i=0;i<this.player[index].pai.length;i++ ){
                if( this.player[index].pai[i]===activeAction.actionPai && total>0){
                    let p = this.player[index].pai.splice(i,1)
                    openItem.pai = openItem.pai.concat(p)
                    total --
                    i--
                }
            }
            // if(total===0){
            //     if(activeAction.actionType==='peng'){
            //         console.log('openItem.length',openItem.pai.length)
            //         if(openItem.pai.length!==3) console.log('处理有错2');
            //     }else{
            //         console.log('openItem.length',openItem.pai.length)
            //         if(openItem.pai.length!==4) console.log('处理有错3');
            //     }
            // } else {
            //     return console.log('处理有错1')
            // }

            this.player[index].open.push(openItem)
        }else if(activeAction.actionType==='angang'){
            let total = 4
            let openItem = {
                pai: [],
                ctrl_uid: activeAction.ctrl_uid,
                type: activeAction.actionType
            }
            for(let i=0;i<this.player[index].pai.length;i++ ){
                if( this.player[index].pai[i]===activeAction.actionPai && total>0){
                    let p = this.player[index].pai.splice(i,1)
                    openItem.pai = openItem.pai.concat(p)
                    total --
                    i--
                }
            }
            this.player[index].open.push(openItem)
            this.player[index].pai.push(this.pai.pop())
        }



        this.currentActivePai = {
            ctrl_uid:uid,
            pai:activeAction.actionPai,
            action:activeAction.actionType
        } // {ctrl_uid:'u22',pai:'m5',action:'da/peng/gang'}
        
        return true
    }

}





module.exports = Majiang
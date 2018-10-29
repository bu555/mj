
class Majiang {
    // quantity:4,player:[{name:'',uid:'',chip:20,zhuang:true}]
    constructor(player,quantity){
        this.quantity = quantity || 4
        this.pai = []
        this.player = player //[{uid:'',name:'',pai:[],open:[],da:[],action:{actionType:'da','peng','gang','zimo',angang,qianggang,gonggang,ctrl_uid:'',actionPai:''},active:true,status:'mopai',zhuang:true,chip:10}]   
        this.log = {}
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
                    da:[],
                    action:[],
                    active:this.player[i]['zhuang'],
                    // status:this.player[i]['zhuang']?'mopai':''
                }
            )
            
        }

    }
    // 摸牌
    moPai(uid){
        for(let i=0;i<this.player.length;i++){
            if(this.player[i].active && this.player[i].uid===uid ){
                this.player[i].pai.push(this.pai.shift()) //添加至最后
            }
        }
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
        let paiList = null
        let openList = []
        if(daPai){
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
                    this.player[i].action = []
                    this.player[i].active = false
                    let index = this.player[i].pai.indexOf(daPai)
                    this.player[i].pai.splice(index,1)
                }
            }
        }else{
            for(let i=0;i<this.player.length;i++){
                if(this.player[i].uid === uid ){
                    paiList = this.player[i].pai
                    openList = this.player[i].open
                    this.player[i].action = runCheck(paiList,openList)
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
                            actionPai:k
                        })
                    }
                }
                
                for(let i=0;i<openList.length;i++){
                    if(openList[i].actionType==='peng'){
                        let pengPai = openList[i].actionPai
                        if(paiList.indexOf(pengPai)>-1){                 
                            action.push({
                                actionType:'gonggang',
                                actionPai:pengPai
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
            if(this.player[i].active && this.player[i].uid===uid ){
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
    // {activeAction: {actionPai: "m5",actionType: "peng",ctrl_uid:'u11'},uid:u22}
    startAction(uid,activeAction){
        let index 
        for(let i=0;i<this.player.length;i++){
            if(this.player[i].uid === uid ){
                index = i
            }
        }
        if(typeof index !== 'number') return console.log('非法uid');
        if(!this.player[index].active) return console.log('非active uid');
        
        
    }

}





// export default Majiang
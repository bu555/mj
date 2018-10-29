
class Player {
    constructor(name){
        this.name = name
        this.pai = []
        this.pai_ = []
        this.action = [] //zimo , gang , peng
    }
    // 摸牌
    addPai(paiList){
        console.log(this);
        this.pai = this.pai.concat(paiList)
    }
    // 理牌
    sortPai(){
        let paiList = this.pai
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
        this.pai =  m.concat(p).concat(s).concat(z)
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
    // 检查牌
    checkPai(pai,action='mo'){
        if(action==='mo'){
            // 碰 
            for(let i=0;i<this.pai.length;i++){
                if(this.pai[i]===pai){
                    this.action.push('angang')
                }
            }
        }
    }

}
export default Player
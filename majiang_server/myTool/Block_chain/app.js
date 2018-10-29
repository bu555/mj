// https://github.com/SavjeeTutorials/SavjeeCoin
// 全文分为三个部分：
// part1：实现一个基本的区块链
// part2：实现POW
// part3：交易与挖矿奖励

// const SHA256 = require("crypto-js/sha256");

const crypto = require('crypto');
const SHA256 = crypto.createHash('sha256');
const sha1 = crypto.createHash('sha1');
// hash.update('Hello, ');
// hash.update(', nodejs!');  //update装入需要加密的字符（可拼接）
// console.log(hash.digest('hex')); // 十六进制密文 7e1977739c748beac0c0fd14fd26a544
// 区块类
class Block {
                // 时间戳     交易数据      上区块hash
    constructor(timestamp, transactions, previousHash = '') {
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = transactions;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }
    calculateHash() {
        // return SHA256.update(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).digest('hex');
        // return require('crypto').createHash('sha256').update(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).digest('hex');
        return crypto.createHash('sha256').update(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).digest('hex');

    }
    // 增加 nonce的方法
    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("BLOCK MINED: " + this.hash);
    }

    // var userHash = hasher.update(socket.id).digest('base64');
    // var userHash = require('crypto').createHash('sha1').update(socket.id).digest('base64');
}
// 1.实现一个基本的区块链
// 在Blockchain类中将区块链接起来
class Blockchain{
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 5; //添加难度系数
        // 在区块产生之间存储交易的地方
        this.pendingTransactions = [];
        // 挖矿回报
        this.miningReward = 100;
    }
    // 创建初始区块链
    createGenesisBlock() {
        return new Block("01/01/2017", "Genesis block", "0");
    }
    // 获取链上最新的区块
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }
// 1
    // addBlock(newBlock) {
    //     newBlock.previousHash = this.getLatestBlock().hash;
    //     newBlock.hash = newBlock.calculateHash();
    //     this.chain.push(newBlock);
    // }
// 2
    // addBlock(newBlock) {
    //     newBlock.previousHash = this.getLatestBlock().hash;
    //     newBlock.mineBlock(this.difficulty); //创建区块时增加难度
    //     this.chain.push(newBlock);
    // }
// 3
    // 区块生成后增加交易
    createTransaction(transaction) {
        // 这里应该有一些校验!
        // 推入待处理交易数组
        this.pendingTransactions.push(transaction);
    }

    // 挖掘所有待交易的新区块，而且还会向采矿者发送奖励。
    minePendingTransactions(miningRewardAddress) {
        // 用所有待交易来创建新的区块并且开挖..
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.difficulty);
        // 将新挖的看矿加入到链上
        this.chain.push(block);
        // 重置待处理交易列表并且发送奖励
        this.pendingTransactions = [
                            // 甲方   乙方                 报酬
            new Transaction(null, miningRewardAddress, this.miningReward)   //挖矿成功，添加交易数据
        ];
    }
    // 地址余额
    getBalanceOfAddress(address){
        let balance = 0; // you start at zero!
        // 遍历每个区块以及每个区块内的交易
        for(const block of this.chain){
            for(const trans of block.transactions){
                // 如果地址是发起方 -> 减少余额
                if(trans.fromAddress === address){
                    balance -= trans.amount;
                }
                // 如果地址是接收方 -> 增加余额
                if(trans.toAddress === address){
                    balance += trans.amount;
                }
            }
        }
        return balance;
    }



    isChainValid() {
        for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            if (currentBlock.hash !== currentBlock.calculateHash()) {   //和
                return false;
            }
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

// 交易类
class Transaction{
                    // 甲方       乙方      金额
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}



// let savjeeCoin = new Blockchain();
// savjeeCoin.addBlock(new Block(1, "20/07/2017", { amount: 4 }));
// savjeeCoin.addBlock(new Block(2, "20/07/2017", { amount: 8 }));
// savjeeCoin.addBlock(new Block(3, "20/07/2017", { amount: 8 }));
// savjeeCoin.addBlock(new Block(4, "20/07/2017", { amount: 8 }));

// // 检查是否有效(将会返回true)
// console.log('Blockchain valid? ' + savjeeCoin.isChainValid());
// // 现在尝试操作变更数据
// savjeeCoin.chain[1].data = { amount: 100 };
// // 再次检查是否有效 (将会返回false)
// console.log("Blockchain valid? " + savjeeCoin.isChainValid());



let savjeeCoin = new Blockchain();
console.log('Creating some transactions...');
// 创建交易数据
savjeeCoin.createTransaction(new Transaction('address1', 'address2', 100));
savjeeCoin.createTransaction(new Transaction('address2', 'address1', 50));

console.log('Starting the miner...');
// 开始挖掘区块
savjeeCoin.minePendingTransactions('xaviers-address');

//查看地址余额
console.log('Balance of Xaviers address is', savjeeCoin.getBalanceOfAddress('xaviers-address'));
// 输出: 0
console.log('Starting the miner again!');
// 继续挖矿，挖出后交易记录计入区块中
savjeeCoin.minePendingTransactions("xaviers-address");
console.log('Balance of Xaviers address is', savjeeCoin.getBalanceOfAddress('xaviers-address'));
// 输出: 100
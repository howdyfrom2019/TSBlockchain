"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
class Block {
    constructor(index, previousHash, timestamp, data) {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        const { nonce, hash } = this.mine();
        this.nonce = nonce;
        this.hash = hash;
    }
    mine() {
        let hash;
        let nonce = 0;
        do {
            hash = this.calculateHash(++nonce);
        } while (hash.startsWith('00000') === false);
        hash = this.calculateHash(nonce);
        return { nonce, hash };
    }
    calculateHash(nonce) {
        const data = `${this.index}${this.previousHash}${this.timestamp}${this.data}${nonce}`;
        return crypto.createHash('sha256').update(data).digest('hex');
    }
}
class BlockChain {
    constructor() {
        this.chain = [];
        this.chain.push(new Block(0, '0', Date.now(), 'Genesis block'));
    }
    get latestBlock() {
        return this.chain[this.chain.length - 1];
    }
    addBlock(data) {
        const block = new Block(this.latestBlock.index + 1, this.latestBlock.hash, Date.now(), data);
        this.chain.push(block);
    }
}
console.log('최초 블록 생성중....');
const blockchain = new BlockChain();
console.log('#1 블록 채굴중...');
blockchain.addBlock('First Block');
console.log('#2 블록 채굴중...');
blockchain.addBlock('Second Block');
console.log(JSON.stringify(blockchain, null, 2));
//# sourceMappingURL=blockWork.js.map
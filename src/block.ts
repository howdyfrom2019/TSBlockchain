import * as crypto from 'crypto';

class Block {
    readonly hash: string;
    constructor(
        readonly index: number,
        readonly previousHash: string,
        readonly timestamp: number,
        readonly data: string,
    ) {
        this.hash = this.calculateHash();
    }

    private calculateHash(): string {
        const data = this.index + this.previousHash + this.timestamp + this.data;
        return crypto.createHash('sha256').update(data).digest('hex');
    }
};

class BlockChain {
    private readonly chain: Block[] = [];
    private get latestBlock(): Block {
        return this.chain[this.chain.length - 1];
    }
    constructor() {
        this.chain.push(
            new Block(0, '0', Date.now(), 'Genesis block')
        );
    }
    addBlock(data:string): void {
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
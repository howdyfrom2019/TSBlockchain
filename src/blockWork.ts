import * as crypto from 'crypto';

interface MineType {
    nonce: number;
    hash: string;
}

class Block {
    readonly nonce: number;
    readonly hash: string;
    constructor(
        readonly index: number,
        readonly previousHash: string,
        readonly timestamp: number,
        readonly data: string,
    ) {
        const { nonce, hash } = this.mine();
        this.nonce = nonce;
        this.hash = hash;
    }

    private mine(): MineType {
        let hash: string;
        let nonce = 0;

        do {
            hash = this.calculateHash(++nonce);
        } while (hash.startsWith('00000') === false);
        hash = this.calculateHash(nonce);

        return {nonce, hash};
    }

    private calculateHash(nonce: number): string {
        const data = `${this.index}${this.previousHash}${this.timestamp}${this.data}${nonce}`;
        return crypto.createHash('sha256').update(data).digest('hex');
    }
}

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
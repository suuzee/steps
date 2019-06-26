// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import { Game } from './Game';
import { Player } from './Player';
import { Block } from './Block';

const {ccclass, property} = cc._decorator;

@ccclass
export class Stage extends cc.Component {

    @property(cc.Integer)
    private stepDistance: number = 200;
    @property(cc.Integer)
    private jumpHeight: number = 100;
    @property(cc.Float)
    private jumpDuration: number = 0.3;

    @property(Player)
    private player: Player = null;

    @property(cc.Prefab)
    private blockPrefab: cc.Prefab = null;

    private lastBlock = true;
    private lastBlockX = 0;
    private blockList: Array<Block>;


    private game: Game = null;

    public init (game: Game) {
        this.game = game;
        this.player.init(this.stepDistance, this.jumpHeight, this.jumpDuration);

        this.blockList = [];
        this.addBlock(cc.v2(0, 0));
        for (let i = 0; i < 5; i ++) {
            this.randomAddBlock();
        }
    }

    public playerJump(step: number) {
        if (this.player.canJump) {
            this.player.jump(step);
            this.moveStage(step);
            let isDead = !this.hasBlock(this.player.index);

            if (isDead) {
                cc.log('die');
                this.game.overGame();
            } else {
                this.game.addScore(step === 1 ? 1 : 3);
            }
        }
    }

    private moveStage (step: number) {
        let moveAction = cc.moveBy(this.jumpDuration, cc.v2(-this.stepDistance * step, 0));
        this.node.runAction(moveAction);
        for (let i = 0; i < step; i ++) {
            this.randomAddBlock();
        }
    }

    private randomAddBlock () {
        if (!this.lastBlock || Math.random() > 0.5) {
            this.addBlock(cc.v2(this.lastBlockX + this.stepDistance, 0));
        } else {
            this.addBlank();
        }

        this.lastBlockX = this.lastBlockX + this.stepDistance;
    }

    private addBlock (position: cc.Vec2) {
        let blockNode = cc.instantiate(this.blockPrefab);
        this.node.addChild(blockNode);
        blockNode.position = position;
        this.blockList.push(blockNode.getComponent(Block));
        this.lastBlock = true;
    }

    private addBlank () {
        this.blockList.push(null);
        this.lastBlock = false;
    }

    private hasBlock (index: number): boolean {
        return this.blockList[index] !== null;
    }

}

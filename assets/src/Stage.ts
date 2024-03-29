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
    private fallHeight: number = 500;
    @property(cc.Float)
    private fallDuration: number = 0.3;
    @property(cc.Float)
    private initStayDuration: number = 2;
    @property(cc.Float)
    private minStayDuration: number = 0.3;
    @property(cc.Float)
    private speed: number = 0.1;
    private stayDuration: number;
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
        this.stayDuration = this.initStayDuration;
        this.player.init(this.stepDistance, this.jumpHeight, this.jumpDuration, this.fallDuration, this.fallHeight);

        this.blockList = [];
        this.addBlock(cc.v2(0, 0));
        for (let i = 0; i < 5; i ++) {
            this.randomAddBlock();
        }
    }

    public addSpeed () {
        this.stayDuration -= this.speed;
        if (this.stayDuration <= this.minStayDuration) {
            this.stayDuration = this.minStayDuration;
        }
        cc.log(this.stayDuration);
    }

    public playerJump(step: number) {
        if (this.player.canJump) {
            this.player.jump(step);
            this.moveStage(step);
            let isDead = !this.hasBlock(this.player.index);

            if (isDead) {
                cc.log('die');
                this.scheduleOnce(() => {
                    this.player.die();
                    this.game.overGame();
                }, this.jumpDuration);
            } else {
                let blockIndex = this.player.index;
                this.blockList[blockIndex].init(this.fallDuration, this.fallHeight, this.stayDuration, () => {
                    if (this.player.index === blockIndex) {
                        this.player.die();
                        this.game.overGame();
                    }
                });
                this.game.addScore(step === 1 ? 1 : 3);
            }

            if (this.player.index % 10 === 0) {
                this.addSpeed();
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

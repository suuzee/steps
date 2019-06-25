// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import { Stage } from './Stage';

const {ccclass, property} = cc._decorator;

@ccclass
export class Game extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(Stage)
    private stage: Stage = null;
    @property(cc.Label)
    private scoreLabel: cc.Label = null;

    private score: number = 0;

    protected start () {
        this.startGame();
    }

    public addScore (n: number) {
        this.score += n;
        this.scoreLabel.string = this.score + '';
    }

    public startGame () {
        this.score = 0;
        this.scoreLabel.string = '0';
        this.stage.init(this);
    }

    public overGame () {
        cc.log('game over');
    }

    public restartGame () {
        cc.director.loadScene('game');
    }

    public returnMenu () {
        cc.director.loadScene('menu');
    }

    private onBtnOne () {
        this.stage.playerJump(1);
    }

    private onBtnTwo () {
        this.stage.playerJump(2);
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    // update (dt) {}
}

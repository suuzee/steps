// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import { Game } from "./Game";

const { ccclass, property } = cc._decorator;

@ccclass
export class OverPanel extends cc.Component {

    @property(cc.Label)
    private scoreLabel: cc.Label = null;

    private game: Game;

    public init(game: Game) {
        this.game = game;
    }

    private onBtnRestart() {
        this.game.restartGame();
    }

    private onBtnReturnMenu() {
        this.game.returnMenu();
    }

    public show(score: number) {
        this.node.active = true;
        this.scoreLabel.string = score + '';
    }

    public hide() {
        this.node.active = false;
    }

}
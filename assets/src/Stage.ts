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

const {ccclass, property} = cc._decorator;

@ccclass
export class Stage extends cc.Component {

    @property(Player)
    private player: Player = null;
    
    private game: Game = null;

    public init (game: Game) {
        this.game = game;
    }

    public playerJump(step: number) {
        this.player.jump(step);
    }

}

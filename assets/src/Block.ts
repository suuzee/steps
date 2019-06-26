// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass} = cc._decorator;

@ccclass
export class Block extends cc.Component {

    public init (fallDuration: number, fallHeight: number, destoryTime: number, destoryCb: Function) {
        this.scheduleOnce(() => {
            let fallAction = cc.moveBy(fallDuration, cc.v2(0, -fallHeight));
            this.node.runAction(fallAction);
            destoryCb();
        }, destoryTime);
    }
}

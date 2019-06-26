// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export class Player extends cc.Component {

    private stepDistance: number;
    private jumpHeight: number;
    private jumpDuration: number;
    public canJump: boolean;
    public index: number;

    public init (stepDistance: number, jumpHeight: number, jumpDuration: number) {
        this.stepDistance = stepDistance;
        this.jumpHeight = jumpHeight;
        this.jumpDuration = jumpDuration;
        this.canJump = true;
    }

    public jump (step: number) {
        this.canJump = false;
        this.index += step;
        
        let jumpAction = cc.jumpBy(this.jumpDuration, cc.v2(step * this.stepDistance, 0), this.jumpHeight, 1);
        let finishAction = cc.callFunc(() => {
            this.canJump = true;
        });

        this.node.runAction(cc.sequence(jumpAction, finishAction));
        cc.log(`我跳了${step}步`);
    }

    public die () {
        cc.log('我死了')
    }

}

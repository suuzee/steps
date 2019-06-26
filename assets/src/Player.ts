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

    @property({
        type: cc.AudioClip
    })
    private oneStepAudio: cc.AudioClip = null;
    @property({
        type: cc.AudioClip
    })
    private twoStepAudio: cc.AudioClip = null;
    @property({
        type: cc.AudioClip
    })
    private dieAudio: cc.AudioClip = null;

    private stepDistance: number;
    private jumpHeight: number;
    private jumpDuration: number;
    private fallDuration: number;
    private fallHeight: number;
    public canJump: boolean;
    public index: number;

    public init (stepDistance: number, jumpHeight: number, jumpDuration: number, fallDuration: number, fallHeight: number) {
        this.stepDistance = stepDistance;
        this.jumpHeight = jumpHeight;
        this.jumpDuration = jumpDuration;
        this.fallDuration = fallDuration;
        this.fallHeight = fallHeight;
        this.canJump = true;
        this.index = 0;
    }

    public jump (step: number) {
        this.canJump = false;
        this.index += step;
        
        let jumpAction = cc.jumpBy(this.jumpDuration, cc.v2(step * this.stepDistance, 0), this.jumpHeight, 1);
        let finishAction = cc.callFunc(() => {
            this.canJump = true;
        });

        this.node.runAction(cc.sequence(jumpAction, finishAction));

        if (step === 1) {
            cc.audioEngine.play(this.oneStepAudio, false, 1);
        } else if (step === 2) {
            cc.audioEngine.play(this.twoStepAudio, false, 1);
        }

        cc.log(`我跳了${step}步`);
    }

    public die () {
        this.canJump = false;
        let dieAction = cc.moveBy(this.fallDuration, cc.v2(0, -this.fallHeight));
        this.node.runAction(dieAction);

        cc.audioEngine.play(this.dieAudio, false, 1);
        cc.log('我死了');
    }

}

import { AnimationClip, Animator, GameObject, Vector3, WaitForSeconds } from 'UnityEngine';
import { Button } from 'UnityEngine.UI'
import { ZepetoCharacter, ZepetoPlayers } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class ChairSitButton extends ZepetoScriptBehaviour {
    public btnUI: Button;
    public Chair: GameObject;
    private Players: ZepetoCharacter;
    public sitClip: AnimationClip;
    public ChairHeight: float;
    public ChairX: float;
    public ChairZ: float;
    public ChairSitRotate: float;
    public isSit: boolean;

    OnTriggerEnter(collider: GameObject) {
        this.Players = collider.gameObject.GetComponent<ZepetoCharacter>();

        // 1. collider 객체의 hash 값과 clientStarter시 생성된 hash 값(어딘가 변수에 저장)이 같은지 비교
        // 2. collider 객체의 태그가 player인지 판단
        // 3. 1,2조건을 만족하면 collider객체의 Getcomponent<Animator>().SetTrigger("Sit"); Sit 동작으로 전환
        if (collider.tag == "Player") {
            this.btnUI.onClick.RemoveAllListeners();
            this.btnUI.onClick.AddListener(() => {
                console.log("isSit = " + this.isSit);
                new WaitForSeconds(0.001);
                if (!this.isSit) { //앉아있지 않다면
                    this.StartCoroutine(this.SendPlayer(this.Players)); //플레이어를 의자 위에
                    console.log("move to char");
                    this.Players.SetGesture(this.sitClip);
                    console.log('btnUI onClick');
                    this.isSit = true; //앉아있다.
                }
                    else {
                    this.Players.CancelGesture();
                    this.isSit = false; //앉아있지 않다.
                }
            });
        }
    }

    *SendPlayer(collider) {
        //this.Players.characterController.enabled = false;
        collider.transform.position = new Vector3(this.Chair.transform.position.x + this.ChairX, this.Chair.transform.position.y + this.ChairHeight, this.Chair.transform.position.z + this.ChairZ);
        collider.transform.localEulerAngles = new Vector3(0, this.Chair.transform.rotation.y - this.ChairSitRotate, 0);
        //this.Players.characterController.enabled = true;
        yield new WaitForSeconds(0.001);
    }

}
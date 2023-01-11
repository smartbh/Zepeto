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

        // 1. collider ��ü�� hash ���� clientStarter�� ������ hash ��(��� ������ ����)�� ������ ��
        // 2. collider ��ü�� �±װ� player���� �Ǵ�
        // 3. 1,2������ �����ϸ� collider��ü�� Getcomponent<Animator>().SetTrigger("Sit"); Sit �������� ��ȯ
        if (collider.tag == "Player") {
            this.btnUI.onClick.RemoveAllListeners();
            this.btnUI.onClick.AddListener(() => {
                console.log("isSit = " + this.isSit);
                new WaitForSeconds(0.001);
                if (!this.isSit) { //�ɾ����� �ʴٸ�
                    this.StartCoroutine(this.SendPlayer(this.Players)); //�÷��̾ ���� ����
                    console.log("move to char");
                    this.Players.SetGesture(this.sitClip);
                    console.log('btnUI onClick');
                    this.isSit = true; //�ɾ��ִ�.
                }
                    else {
                    this.Players.CancelGesture();
                    this.isSit = false; //�ɾ����� �ʴ�.
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
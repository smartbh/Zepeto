import { Canvas, GameObject } from 'UnityEngine'
import { Button } from 'UnityEngine.UI';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class DestroyCanvas extends ZepetoScriptBehaviour {

    public targetCanv: Canvas;
    public btnUI: Button;

    OnTriggerEnter(collider) {
        if (collider.tag == "Player") {
            this.btnUI.onClick.AddListener(() => {
                GameObject.Destroy(this.targetCanv);
            })
        }
    }

}
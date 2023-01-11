import { Canvas } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class SitOnChairUi extends ZepetoScriptBehaviour {
    public canvas: Canvas;


    OnTriggerEnter(collider) {
        if (collider.tag == "Player") {
            this.canvas.gameObject.SetActive(true);
            console.log("sit soon");
        }

    }

    OnTriggerExit(collider) {
        if (collider.tag == "Player") {
            this.canvas.gameObject.SetActive(false);
            console.log("good bye");
        }
    }

}
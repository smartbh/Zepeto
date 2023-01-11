import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Camera, Canvas, GameObject, WaitForSeconds } from 'UnityEngine';

export default class GetCamera extends ZepetoScriptBehaviour {

    public canv: Canvas
    private PlayerCam: Camera;

    OnTriggerEnter(collider) {
        if (collider.tag == "Player") {
            console.log("Success!!");
            this.StartCoroutine(this.getCameraFunc());
        }
    }

    *getCameraFunc() {
        yield new WaitForSeconds(0.1);

        this.PlayerCam = GameObject.Find('CameraParent').GetComponentInChildren<Camera>();
        this.canv.worldCamera = this.PlayerCam;

        console.log("Camera worked!!");

    }


}
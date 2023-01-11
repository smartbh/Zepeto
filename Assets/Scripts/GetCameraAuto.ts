import { Camera, Canvas, GameObject, WaitForSeconds } from 'UnityEngine'
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'


export default class GetCameraAuto extends ZepetoScriptBehaviour {
    public canvas: Canvas;
    private playerCam: Camera;

    Start() {
        new WaitForSeconds(0.5);
        this.playerCam = GameObject.Find('CameraParent').GetComponentInChildren<Camera>();
        this.canvas.worldCamera = this.playerCam;
    }

}
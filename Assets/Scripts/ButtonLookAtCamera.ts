import { Camera, GameObject } from 'UnityEngine'
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class ButtonLookAtCamera extends ZepetoScriptBehaviour {
    private ZepetoCam: Camera;

    Start() {
        this.ZepetoCam = GameObject.Find('CameraParent').GetComponentInChildren<Camera>();
    }

    Update() {
        this.transform.LookAt(this.ZepetoCam.transform);
    }
}
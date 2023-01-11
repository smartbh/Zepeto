import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Button } from 'UnityEngine.UI'
import { Camera, Canvas, GameObject } from 'UnityEngine';

export default class FirstCanvasButton extends ZepetoScriptBehaviour {

    public buttonUI1: Button;
    public startCanvas: Canvas;

    Start() {
        this.buttonUI1.onClick.AddListener(() => {
            this.startCanvas.worldCamera = GameObject.Find('CameraParent').GetComponentInChildren<Camera>();
            console.log("Button Worked!");
        });
    }

}
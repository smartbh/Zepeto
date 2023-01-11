import { Canvas } from 'UnityEngine';
import { Button } from 'UnityEngine.UI';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class CanvasExit extends ZepetoScriptBehaviour {
    public btnUI: Button;
    public canv: Canvas;

    Start() {
        this.btnUI.onClick.AddListener(() => {
            this.canv.gameObject.SetActive(false);
        });
    }

}
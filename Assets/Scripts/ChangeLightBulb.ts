import { Material, Renderer, WaitForSeconds } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'


export default class ChangeLightBulb extends ZepetoScriptBehaviour {
    public LightBulbMats: Material[];
    public sec: float;
    private rend: Renderer;
    private changeNum: int;

    Start() {
        this.rend = this.GetComponent<Renderer>();
        this.rend.sharedMaterial = this.LightBulbMats[0];
        this.changeNum = 0;
        this.sec = 0.5;
        this.StartCoroutine(this.changeLightBulbMaterial());
    }



    *changeLightBulbMaterial() {
        while (true) {
            if (this.changeNum == 0) { //맨처음 색깔일시
                yield new WaitForSeconds(this.sec);
                this.rend.material = this.LightBulbMats[1]; //다음색으로
                this.changeNum = 1; //changeNum을 바꿔주기
            }
            else {//다음 색깔일시
                yield new WaitForSeconds(this.sec);
                this.rend.material = this.LightBulbMats[0]; //다시 원본색으로
                this.changeNum = 0; //changeNum을 다시 원래로
            }
        //무한 반복
        }

    }
}
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
            if (this.changeNum == 0) { //��ó�� �����Ͻ�
                yield new WaitForSeconds(this.sec);
                this.rend.material = this.LightBulbMats[1]; //����������
                this.changeNum = 1; //changeNum�� �ٲ��ֱ�
            }
            else {//���� �����Ͻ�
                yield new WaitForSeconds(this.sec);
                this.rend.material = this.LightBulbMats[0]; //�ٽ� ����������
                this.changeNum = 0; //changeNum�� �ٽ� ������
            }
        //���� �ݺ�
        }

    }
}
import * as UnityEngine from "UnityEngine";
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class TeleportToEgloo extends ZepetoScriptBehaviour {

    OnTriggerEnter(collider) {
        if(collider.tag == "Player")
            this.StartCoroutine(this.SendPlayer(collider));
    }

    *SendPlayer(collider) {
        collider.transform.localEulerAngles = new UnityEngine.Vector3(0, -180, 0);
        for (var i = 0; i < 6; i++) {
            collider.transform.position = new UnityEngine.Vector3(-48.61982, -24.12749, 87);

            yield new UnityEngine.WaitForSeconds(0.001);
        }
    }
}
import * as UnityEngine from "UnityEngine";
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class TeleportToEgloo extends ZepetoScriptBehaviour {

    OnTriggerEnter(collider) {
        if (collider.tag == "Player")
            this.StartCoroutine(this.SendPlayer(collider));
    }

    *SendPlayer(collider) {
        for (var i = 0; i < 6; i++) {
            collider.transform.position = new UnityEngine.Vector3(80,0,8)

            yield new UnityEngine.WaitForSeconds(0.001);
        }
    }
}
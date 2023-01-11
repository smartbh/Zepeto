import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { SpawnInfo, ZepetoPlayer, ZepetoPlayers } from 'ZEPETO.Character.Controller'
import * as UnityEngine from "UnityEngine";

export default class CharacterControllerSample extends ZepetoScriptBehaviour {
    //public myPlayer: ZepetoPlayers;

    Start() {    
        ZepetoPlayers.instance.CreatePlayerWithZepetoId("", "[ZEPETO_ID]", new SpawnInfo(), true);

        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {
            const myPlayer = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer;
            myPlayer.character.Teleport(new UnityEngine.Vector3(80, 0, 8), UnityEngine.Quaternion.Euler(0, 0, 0));
            //myPlayer.character.Teleport(new UnityEngine.Vector3(-48.61982, -23.78, 75.54381), UnityEngine.Quaternion.Euler(0, 0, 0));
            myPlayer.character.gameObject.name = "MyPlayer";
            myPlayer.character.tag = "Player";
            console.log(myPlayer.id);
    
            //let _player = ZepetoPlayers.instance.LocalPlayer;
        });
    }
}
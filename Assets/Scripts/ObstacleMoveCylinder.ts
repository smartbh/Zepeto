import { GameObject, Space, Time, Vector3 } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class ObstacleMoveCylinder extends ZepetoScriptBehaviour {
    public obstacle: GameObject;
    public speed: float;
    public MaxHeight: float;
    public MinHeight: float;
    private direction: int;

    Start() {
        this.direction = 1;
    }

    Update() {
        if (this.obstacle.transform.localPosition.y < this.MinHeight) {
            this.direction = 1;
        }
        else if (this.obstacle.transform.localPosition.y > this.MaxHeight) {
            this.direction = -1;
        }

        this.obstacle.transform.Translate(0, 1 * this.speed * Time.deltaTime * this.direction, 0, Space.World);

    }

}
import { Sandbox, SandboxOptions, SandboxPlayer } from "ZEPETO.Multiplay";
import { DataStorage } from "ZEPETO.Multiplay.DataStorage";
import { Player, Transform, Vector3 } from "ZEPETO.Multiplay.Schema";

export default class extends Sandbox {

    constructor() {
        super();
    }

    onCreate(options: SandboxOptions) {

        // Room ��ü�� ������ �� ȣ��˴ϴ�.
        // Room ��ü�� ���³� ������ �ʱ�ȭ�� ó�� �Ѵ�.

        this.onMessage("onChangedTransform", (client, message) => {
            const player = this.state.players.get(client.sessionId);

            const transform = new Transform();
            transform.position = new Vector3();
            transform.position.x = message.position.x;
            transform.position.y = message.position.y;
            transform.position.z = message.position.z;

            transform.rotation = new Vector3();
            transform.rotation.x = message.rotation.x;
            transform.rotation.y = message.rotation.y;
            transform.rotation.z = message.rotation.z;

            player.transform = transform;
        });

        this.onMessage("onChangedState", (client, message) => {
            const player = this.state.players.get(client.sessionId);
            player.state = message.state;
        });
    }

    async onJoin(client: SandboxPlayer) {

        // schemas.json ���� ������ player ��ü�� ���� �� �ʱⰪ ����.
        console.log(`[OnJoin] sessionId : ${client.sessionId}, HashCode : ${client.hashCode}, userId : ${client.userId}`)

        const player = new Player();
        player.sessionId = client.sessionId;

        if (client.hashCode) {
            player.zepetoHash = client.hashCode;
        }
        if (client.userId) {
            player.zepetoUserId = client.userId;
        }

        // [DataStorage] ������ Player�� DataStorage Load
        const storage: DataStorage = client.loadDataStorage();

        let visit_cnt = await storage.get("VisitCount") as number;
        if (visit_cnt == null) visit_cnt = 0;

        console.log(`[OnJoin] ${client.sessionId}'s visiting count : ${visit_cnt}`)

        // [DataStorage] Player�� �湮 Ƚ���� �����Ѵ��� Storage Save
        await storage.set("VisitCount", ++visit_cnt);

        // client ��ü�� ���� Ű���� sessionId �� ����ؼ� Player ��ü�� ����.
        // set ���� �߰��� player ��ü�� ���� ������ Ŭ���̾�Ʈ������ players ��ü�� add_OnAdd �̺�Ʈ�� �߰��Ͽ� Ȯ�� �� �� ����.
        this.state.players.set(client.sessionId, player);
    }

    onTick(deltaTime: number): void {
        //  �������� ������ Ÿ�Ӹ��� �ݺ������� ȣ��Ǹ� deltaTime �� �̿��Ͽ� ������ interval �̺�Ʈ�� ������ �� ����.
    }

    async onLeave(client: SandboxPlayer, consented?: boolean) {

        // allowReconnection ������ ���� ���ܿ� ���� connection ���� ó������ �� �� ������ �⺻ ���̵忡���� ��� ����.
        // delete �� player ��ü�� ���� ������ Ŭ���̾�Ʈ������ players ��ü�� add_OnRemove �̺�Ʈ�� �߰��Ͽ� Ȯ�� �� �� ����.
        this.state.players.delete(client.sessionId);
    }
}
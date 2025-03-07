import Player from "./role_player.js";

export default class Police extends Player {
    constructor(name) {
        super(name, "경찰", 1, false);
    }

    // ✅ 경찰의 능력: 특정 플레이어의 정체 조사
    investigate(player) {
        console.log(`${this.name}이(가) ${player.name}을(를) 조사한 결과: ${player.isMafiaTeam ? "마피아" : "시민"}입니다.`);
        return player.isMafiaTeam;
    }
}

import Player from "./role_player.js";

export default class Doctor extends Player {
    constructor(name) {
        super(name, "의사", 1, false);
    }

    // ✅ 의사의 능력: 특정 플레이어를 치료하여 생명력 유지
    heal(player) {
        player.setLife(1);
        console.log(`${this.name}이(가) ${player.name}을(를) 치료했습니다.`);
    }
}

import Player from "./role_player.js";

export default class Mafia extends Player {
    constructor(name) {
        super(name, "마피아", 1, true);
    }

    // ✅ 마피아의 능력: 특정 플레이어를 공격
    attack(player) {
        player.setLife(player.getLife()-1);
        console.log(`${this.name}이(가) ${player.name}을(를) 제거했습니다.`);
    }
}

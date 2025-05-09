import { useEffect, useState } from "react";
import useGameStore from "../store/useGameStore";
import useDatabaseRead from "./useDatabaseRead";
import useDatabaseWrite from "./useDataBaseWrite";

const useAllPlayersReady = ()=>{
    const {roomId, myName} = useGameStore();
    const {data, loading} = useDatabaseRead(`rooms/${roomId}`, true);
    const { updateData } = useDatabaseWrite();
    const [isAllReady, setIsAllReady] = useState(false);
    const player = data?.players.find(player => player.name === myName);
    const playerIndex = data?.players.findIndex(player => player.name === myName);

    useEffect(() => {
        if (!data?.players) return;

        // 모든 플레이어가 특정 조건을 완료했는지 체크
        const allReady = data?.players.every(player => player?.isReady);
        setIsAllReady(allReady);

        // 모든 플레이어가 완료했으면 자동으로 다음 단계로 넘어감
        if (allReady) {
            console.log(data?.gameState?.currentPhase)
            updateData(`rooms/${roomId}/gameState`, { currentPhase: getNextPhase(data?.gameState?.currentPhase), isActiveTimer: true });
            data?.players.map(()=>{updateData(`rooms/${roomId}/players/${playerIndex}`, {isReady: false})});
        }
    }, [data?.players]);

    const getNextPhase = (currentPhase) => {
        switch (currentPhase) {
            case "assignRole": return "day";  // 역할 배정 → 낮 (투표)
            case "day": return "voting";          // 낮 → 투표
            case "voting": return "executionVoting";        // 투표 → 밤 (마피아 행동)
            case "executionVoting": return "resultVoting";
            case "resultVoting": return "night";
            case "night": return "resultNight";           // 밤 → 낮 (반복)
        }
    };

    const markPlayerReady = () => {
        updateData(`rooms/${roomId}/players/${playerIndex}`, { isReady : !player.isReady });
    };

    return { markPlayerReady };
}

export default useAllPlayersReady;
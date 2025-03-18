import { useEffect, useState } from "react";
import useGameStore from "../store/useGameStore";
import useDatabaseRead from "./useDatabaseRead";
import useDatabaseWrite from "./useDataBaseWrite";
import { refFromURL } from "firebase/database";

const useGameTimer = (time) => {
    const { roomId, myName } = useGameStore();
    const { data, loading } = useDatabaseRead(`rooms/${roomId}`, true);
    const [timeLeft, setTimeLeft] = useState(time);
    const { updateData } = useDatabaseWrite();

    useEffect(() => {
        console.log(data);
        // if (myName != data?.host) return; // ✅ 조건을 useEffect 내부에서 처리
        if(myName != '1') return;
        if (data?.gameState?.currentPhase != "day") return;
        updateData(`rooms/${roomId}/gameState`, { timeLeft });

        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 0) {
                    clearInterval(timer); // ✅ 시간이 0이 되면 타이머 정지
                    // ✅ Firestore 업데이트에 약간의 지연을 줌
                    setTimeout(() => {
                        updateData(`rooms/${roomId}/gameState`, { currentPhase: "voting", timeLeft: 0, mostSelectedPlayer: null });
                    }, 1000);   
                    return 0;
                }
                updateData(`rooms/${roomId}/gameState`, { timeLeft: prevTime - 1 });

                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, roomId]);

    return;
}

export default useGameTimer;
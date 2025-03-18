import { useEffect, useState} from "react";
import useDatabaseRead from "../hooks/useDatabaseRead";
import useGameStore from "../store/useGameStore";
import useDatabaseWrite from "../hooks/useDataBaseWrite";
import useInterval from "../hooks/useInterval";

const GameTimer = () => {
    const { roomId, myName, initialTime } = useGameStore();
    const { data, loading } = useDatabaseRead(`rooms/${roomId}`, true);
    const { updateData } = useDatabaseWrite();
    const [delay, setDelay] = useState(1000);
    const [timeLeft, setTimeLeft] = useState(10);

    useInterval(()=>{
        if(!data?.gameState?.isActiveTimer || myName!=data?.host) return;

        setTimeLeft(prev => prev-1);
        updateData(`rooms/${roomId}/gameState`, {timeLeft: timeLeft});
        if(timeLeft<=0){
            updateData(`rooms/${roomId}/gameState`, {isActiveTimer: false, currentPhase: 'voting'}); 
            setDelay(null);
        }   
    }, delay);
}


export default GameTimer;
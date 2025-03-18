import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/styles";
import useGameStore from "../store/useGameStore";
import useDatabaseRead from "../hooks/useDatabaseRead";
import useDatabaseWrite from "../hooks/useDataBaseWrite";
import useAllPlayersReady from "../hooks/useAllPlayersReady";

const VotingScreen = () => {
    const { roomId, myName, myIndex, numPlayers } = useGameStore();
    const { data, loading } = useDatabaseRead(`rooms/${roomId}`, true);
    const { updateData } = useDatabaseWrite();
    // const [votes, setVotes] = useState(new Array(data?.players.length).fill(0));
    const { markPlayerReady } = useAllPlayersReady();

    useEffect(()=>{
        updateData(`rooms/${roomId}/gameState`, {votes: new Array(numPlayers).fill(0)})
    }, [])

    const findMostVotedPlayer = () => {
        // const maxVotes = Math.max(...data?.gameState?.votes);

        // // 최다 득표자 찾기 (동점일 경우 가장 먼저 나온 플레이어 반환)
        // const mostVotedPlayer = data?.players[votes.indexOf(maxVotes)?.name];

        // return mostVotedPlayer;
    }


    return (
        <View>
            <Text>투표 하세요.</Text>
            {data?.gameState?.currentPhase == 'voting' ? data?.players
                ?.filter(player => player?.life)
                .map((player, index) => (
                    <TouchableOpacity onPress={() => {
                        markPlayerReady();
                        //(나중에) isReady == true 일때만 selectedPlayer 업데이트 해야함
                        updateData(`rooms/${roomId}/players/${myIndex}`, { selectedPlayer: index });
                        const newVotes = data?.gameState?.votes;
                        newVotes[index] += 1;
                        updateData(`rooms/${roomId}/gameState`, {votes: newVotes});
                    
                        console.log(`보트스: ${newVotes}`);
                    }}>
                        <Text>{player.name}</Text>
                    </TouchableOpacity>
                )) :
                <View>
                    <Text> {findMostVotedPlayer()}를 처형하겠습니까? </Text>
                    <TouchableOpacity onPress={() => {
                        setIsKilled(true);
                        updateData(`rooms/${roomId}/gameState`, { currentPhase: 'night' })
                    }}>
                        <Text> 찬성 </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        setIsKilled(false);
                        updateData(`rooms/${roomId}/gameState`, { currentPhase: 'night' })
                    }}>
                        <Text> 반대 </Text>
                    </TouchableOpacity>
                </View>
            }
        </View>

    )
}

export default VotingScreen;
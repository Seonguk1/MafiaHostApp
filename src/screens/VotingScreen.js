import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/styles";
import useGameStore from "../store/useGameStore";
import useDatabaseRead from "../hooks/useDatabaseRead";
import useDatabaseWrite from "../hooks/useDataBaseWrite";
import useAllPlayersReady from "../hooks/useAllPlayersReady";
import PlayerSelection from "../components/PlayerSelection";

const VotingScreen = () => {
    const { roomId, myName, myIndex, numPlayers } = useGameStore();
    const { data, loading } = useDatabaseRead(`rooms/${roomId}`, true);
    const { updateData } = useDatabaseWrite();
    const { markPlayerReady } = useAllPlayersReady();
    const currentStage = data?.gameState?.currentStage;
    // useEffect(() => {
    //     console.log('보트스크린 ')
    //     if(!data?.gameState?.currentStage) return;
    //     updateData(`rooms/${roomId}/gameState/stages/${data?.gameState?.currentStage}/voting`,
    //         {
    //             votes: new Array(numPlayers).fill(0), 
    //             executionVotes: [0, 0],
    //             isSkipped: false,
    //             mostVotedPlayer: null,
    //             executionVotes: [0, 0],
    //             votingResult: null,
    //         })
    // }, [data?.gameState?.currentStage])

    useEffect(() => {
        
        if (!data?.gameState?.stages[currentStage]?.voting?.votes) return;
        const maxVotes = Math.max(...data?.gameState?.stages[currentStage]?.voting?.votes)
        const mostVotedPlayer = data?.players[data?.gameState?.stages[currentStage]?.voting?.votes.indexOf(maxVotes)];
        updateData(`rooms/${roomId}/gameState/stages/${currentStage}/voting`, { mostVotedPlayer: mostVotedPlayer.name })
    }, [data?.gameState?.stages[currentStage]?.voting?.votes])

    useEffect(() => {
        if (data?.gameState?.currentPhase != 'resultVoting') return;

        const mostVotedPlayerIndex = data?.players.findIndex(player => player.name == data?.gameState?.stages[data?.gameState?.currentStage]?.voting?.mostVotedPlayer)

        if (data?.gameState?.stages[data?.gameState?.currentStage]?.voting?.executionVotes[0] > data?.gameState?.stages[data?.gameState?.currentStage]?.voting?.executionVotes[1]) {
            updateData(`rooms/${roomId}/players/${mostVotedPlayerIndex}`, { life: 0 });
        }

        setTimeout(() => {
            updateData(`rooms/${roomId}/gameState`, { currentPhase: 'night' });
        }, 3000)
    }, [data?.gameState?.currentPhase])


    return (
        <View>
            <Text>투표 하세요.</Text>
            {data?.gameState?.currentPhase == 'voting' &&
                <View>
                    <PlayerSelection></PlayerSelection>
                    <TouchableOpacity onPress={() => {
                        // 수정해야댐 
                        updateData(`rooms/${roomId}/gameState`, { currentPhase: 'night' })
                    }}>
                        <Text> 건너뛰기 </Text>
                    </TouchableOpacity>
                </View>
            }
            {data?.gameState?.currentPhase == 'executionVoting' &&
                <View>
                    <Text> {data?.gameState?.stages[data?.gameState?.currentStage]?.voting?.mostVotedPlayer}를 처형하겠습니까? </Text>
                    <TouchableOpacity onPress={() => {
                        markPlayerReady();
                        const newExecutionVotes = data?.gameState?.stages[data?.gameState?.currentStage]?.voting?.executionVotes;
                        newExecutionVotes[0] += 1;
                        updateData(`rooms/${roomId}/gameState/stages/${data?.gameState?.currentStage}/voting`, { executionVotes: newExecutionVotes })
                    }}>
                        <Text> 찬성 </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        markPlayerReady();
                        const newExecutionVotes = data?.gameState?.stages[data?.gameState?.currentStage]?.voting?.executionVotes;
                        newExecutionVotes[1] += 1;
                        updateData(`rooms/${roomId}/gameState/stages/${data?.gameState?.currentStage}/voting`, { executionVotes: newExecutionVotes })
                    }}>
                        <Text> 반대 </Text>
                    </TouchableOpacity>
                </View>
            }
            {data?.gameState?.currentPhase == 'resultVoting' &&
                <View>
                    <Text>
                        {data?.gameState?.stages[data?.gameState?.currentStage]?.voting?.executionVotes[0] > data?.gameState?.stages[data?.gameState?.currentStage]?.voting?.executionVotes[1] ?
                            `${data?.gameState?.stages[data?.gameState?.currentStage]?.voting?.mostVotedPlayer}가 처형되었습니다.` :
                            `${data?.gameState?.stages[data?.gameState?.currentStage]?.voting?.mostVotedPlayer}가 처형되지 않았습니다.`
                        }
                    </Text>
                </View>
            }
        </View>

    )
}

export default VotingScreen;
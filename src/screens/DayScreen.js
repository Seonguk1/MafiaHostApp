import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/styles";
import useDatabaseRead from "../hooks/useDatabaseRead";
import useDatabaseWrite from "../hooks/useDataBaseWrite";
import useGameStore from "../store/useGameStore";


const DAY_TIME = 0.1 * 60;
const TIME_REDUCTION = 30;

const DayScreen = () => {
    const { roomId, numPlayers } = useGameStore();
    const { data, loading } = useDatabaseRead(`rooms/${roomId}`, true);
    const { updateData } = useDatabaseWrite();

    useEffect(() => {
        console.log('게임 시작 셋팅')
        const newStages = data?.gameState?.stages || [];
        newStages.push(
            {
                voting: {
                    votes: new Array(numPlayers).fill(0),
                    votingSelections: new Array(numPlayers).fill(-1),
                    isSkipped: false,
                    mostVotedPlayer: '',
                    executionVotes: [0, 0],
                    votingResult: '',
                }
                ,

                night: {
                    nightSelections: new Array(numPlayers).fill(-1),
                    selectedMafia: -1,
                    selectedPolice: [],
                    selectedDoctor: -1,
                    isSaved: false,
                }
            }
        );
        updateData(`rooms/${roomId}/gameState`, { stages: newStages });
    }, [])

    const handleReduceTime = () => {
        // setTimeLeft(prevTime => Math.max(prevTime - TIME_REDUCTION, 0)); // 최소 0초까지 감소
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <View>
            <Text> {data?.gameState?.currentStage + 1}번째 낮 </Text>
            <Text> 대화를 통해 마피아를 찾으세요! </Text>
            <Text>투표까지 남은 시간 : {formatTime(data?.gameState?.timeLeft)}</Text>
            <TouchableOpacity onPress={handleReduceTime}>
                <Text>시간 단축하기</Text>
            </TouchableOpacity>
        </View>

    )
}

export default DayScreen;
import React, {useState, useEffect} from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/styles";
import useDatabaseRead from "../hooks/useDatabaseRead";
import useDatabaseWrite from "../hooks/useDataBaseWrite";
import useGameStore from "../store/useGameStore";


const DAY_TIME = 0.1 * 60;
const TIME_REDUCTION = 30;

const DayScreen = () => {
    const { roomId } = useGameStore();
    const {data, loading} = useDatabaseRead(`rooms/${roomId}`, true);
    const { updateData } = useDatabaseWrite();
    // useGameTimer(DAY_TIME); 

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
            <Text> 첫 번째 낮 </Text>
            <Text> 대화를 통해 마피아를 찾으세요! </Text>
            <Text>투표까지 남은 시간 : {formatTime(data?.gameState?.timeLeft)}</Text>
            <TouchableOpacity onPress={handleReduceTime}>
                <Text>시간 단축하기</Text>
            </TouchableOpacity>
        </View>

    )
}

export default DayScreen;
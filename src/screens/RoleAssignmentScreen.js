import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/styles";
import useDatabaseRead from "../hooks/useDatabaseRead";
import useDatabaseWrite from "../hooks/useDataBaseWrite";
import useGameStore from "../store/useGameStore";
import useAllPlayersReady from "../hooks/useAllPlayersReady";

const RoleAssignmentScreen = () => {
    const { roomId, myName,myIndex, setMyIndex, setMyRole, setNumPlayers } = useGameStore();
    const { data, loading } = useDatabaseRead(`rooms/${roomId}`, true);
    const {updateData} = useDatabaseWrite();
    const {markPlayerReady} = useAllPlayersReady();

    useEffect(()=>{
        const myIndex = data?.players.findIndex(player => player.name === myName);
        setMyIndex(myIndex);
        setMyRole(data?.players[myIndex].role);
        setNumPlayers(data?.players?.length);
        
    }, [data?.players?.length])

    return (
        <View>  
            <Text>당신의 역할</Text>
            <Text>{data?.players[myIndex]?.role}</Text>
            <TouchableOpacity onPress={markPlayerReady}>
                <Text>{data?.players[myIndex]?.isReady ? '취소' : '확인'}</Text>
            </TouchableOpacity>
        </View>

    )
}

export default RoleAssignmentScreen;
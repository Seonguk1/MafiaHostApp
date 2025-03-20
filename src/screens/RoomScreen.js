import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/styles";
import useDatabaseRead from "../hooks/useDatabaseRead";
import useDatabaseWrite from "../hooks/useDataBaseWrite";
import useGameStore from "../store/useGameStore";
import { useNavigation } from "@react-navigation/native";

const RoomScreen = () => {
    const navigation = useNavigation();
    const { roomId, myName } = useGameStore();
    const { data, loading } = useDatabaseRead(`rooms/${roomId}`, true);
    const {updateData} = useDatabaseWrite();
    const roles = data?.roles;
    console.log(roles)

    const isRoomFull = () => {
        return data.players.length == Object.values(roles).reduce((sum, val) => sum + val, 0);
    }

    const gameStart = ()=>{
        if (!isRoomFull()) {
            Alert.alert('플레이어 수에 맞게 방을 설정하세요.');
            return;
        }

        const shuffle = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        };
        const mixedRoles = [];
        for (let i = 0; i < data.players.length; i++) {
            for (let j = 0; j < Object.values(roles)[i]; j++) {
                mixedRoles.push(Object.keys(roles)[i]);
            }
        }
        shuffle(mixedRoles);
        for (let i = 0; i < data.players.length; i++) {
            updateData(`rooms/${roomId}/players/${i}`,{role: mixedRoles[i], isReady: false});
        }
        updateData(`rooms/${roomId}/gameState`, {
            currentPhase: 'assignRole', 
            currentStage : 0,
            timeLeft: 0,
            stages: [],
        });
    }

    return (
        <View>
            <Text>{data?.players?.join(", ")}</Text>
            {/* <FlatList
                data={data?.players}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={{ margin: 10, borderBottomWidth: 1, borderBottomColor: 'white' }}>
                        <Text style={styles.label}>{item.name}</Text>
                    </View>
                )}
                ListEmptyComponent={<Text>아직 플레이어가 없습니다.</Text>}
            /> */}
            {myName == data?.host && <View>
            <TouchableOpacity onPress={()=>{navigation.navigate('SettingsScreen')}}>
                <Text>방 설정</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={gameStart}>
                <Text>게임 시작</Text>
            </TouchableOpacity>
            </View>}
        </View>

    )
}

export default RoomScreen;
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/styles";
import useGameStore from "../store/useGameStore";
import useDatabaseWrite from "../hooks/useDataBaseWrite";
// import { ref, set } from "firebase/database";
// import { database } from "../firebase/firebaseConfig";

const CreateRoomScreen = () => {
    const { myName, setMyName,roomId, setRoomId } = useGameStore();
    const [tempMyName, setTempMyName] = useState('');
    const [tempRoomId, setTempRoomId] = useState('');
    const navigation = useNavigation();
    const { setData } = useDatabaseWrite();

    const createRoom = () => {
        setMyName(tempMyName);
        setRoomId(tempRoomId);
        setData(`rooms/${tempRoomId}`, {
            host: tempMyName,
            players: [{ name: tempMyName, life: 1 }],
            gameState: {currentPhase: "waiting", isActiveTimer: false},
        })
        navigation.navigate('RoomScreen');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>게임 방 만들기</Text>
            <TextInput
                style={styles.input}
                placeholder="방 코드 입력"
                value={tempRoomId}
                onChangeText={setTempRoomId}
            />
            <TextInput
                style={styles.input}
                placeholder="방장 이름 입력"
                value={tempMyName}
                onChangeText={setTempMyName}
            />
            <TouchableOpacity style={styles.button} onPress={createRoom}>
                <Text style={styles.buttonText}>방 만들기</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default CreateRoomScreen;
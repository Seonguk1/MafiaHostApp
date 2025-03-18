import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/styles";
import useGameStore from "../store/useGameStore";
import useDatabaseWrite from "../hooks/useDataBaseWrite";
import useDatabaseRead from "../hooks/useDatabaseRead";
import { useNavigation } from "@react-navigation/native";

const JoinRoomScreen = () => {
    const navigation = useNavigation();
    const { myName, setMyName, } = useGameStore();
    const { roomId, setRoomId } = useGameStore();
    const [tempMyName, setTempMyName] = useState('');
    const [tempRoomId, setTempRoomId] = useState('');
    const { updateData } = useDatabaseWrite();
    const { data, loading } = useDatabaseRead(`rooms/${tempRoomId}`, true);

    const joinRoom = () => {
        if (!tempRoomId) {
            console.log('방 코드를 입력해주세요.');
            Alert.alert('방 코드를 입력해주세요.');
            return;
        }
        if (!tempMyName) {
            console.log('닉네임을 입력해주세요.');
            Alert.alert('닉네임을 입력해주세요.');
            return;
        }
        if (!data) {
            console.log('방을 찾을 수 없습니다.');
            Alert.alert('방을 찾을 수 없습니다.');
            return;
        }

        setMyName(tempMyName);
        setRoomId(tempRoomId);
        const playersData = data.players;
        updateData(`rooms/${tempRoomId}`, {
            players: [...playersData, { name: tempMyName, life: 1 }],
        });
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>방 참가하기</Text>
            <TextInput
                style={styles.input}
                placeholder="방 코드 입력"
                value={tempRoomId}
                onChangeText={setTempRoomId}
            />
            <TextInput
                style={styles.input}
                placeholder="닉네임 입력"
                value={tempMyName}
                onChangeText={setTempMyName}
            />
            <TouchableOpacity style={styles.button} onPress={joinRoom}>
                <Text style={styles.buttonText}>참가하기</Text>
            </TouchableOpacity>
        </View>

    )
}

export default JoinRoomScreen;
import React, {useState} from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView, Alert} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/styles";
import useGameStore from "../store/useGameStore";
import useDatabaseWrite from "../hooks/useDataBaseWrite";
import useDatabaseRead from "../hooks/useDatabaseRead";

const SettingsScreen = () => {
    const navigation = useNavigation();
    const {roomId} = useGameStore();
    const {data, loading} = useDatabaseRead(`rooms/${roomId}`, true);
    const {updateData} = useDatabaseWrite();
    const [tempRoles, setTempRoles] = useState(data?.roles);
    const [tempPlayersNum, setTempPlayersNum] = useState(Object.values(tempRoles).reduce((sum,val)=>sum+val,0));
    
    const changePlayersNum = (num) => {
        const newNum = tempPlayersNum + num;
        if (newNum >= 3) setTempPlayersNum(newNum);
    };

    const changeRolesNum = (role, num) => {
        const rolesNum = Object.values(tempRoles).reduce((acc, value) => acc + value, 0);
        const newNum = tempRoles[role] + num;
        if ((role === "마피아" ? newNum >= 1 : newNum >= 0) &&
            (num === -1 || rolesNum + 1 <= tempPlayersNum)) {
            setTempRoles({ ...tempRoles, [role]: newNum });
        }
    }

    const goHome = () => {
        const rolesNum = Object.values(tempRoles).reduce((acc, value) => acc + value, 0);
        if (tempPlayersNum === rolesNum) {  
            updateData(`rooms/${roomId}`, {roles: tempRoles});
            navigation.goBack();
        } else {
            console.log("플레이어 수와 직업 수가 맞지 않습니다.");
            Alert.alert("플레이어 수와 직업 수가 맞지 않습니다.");
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
            <Text style={styles.title}>게임 설정</Text>

            <View style={styles.row}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.label}>플레이어 수 :</Text>
                </View>
                <View style={{ ...styles.row, flex: 1 }}>
                    <TouchableOpacity style={styles.button} onPress={() => changePlayersNum(-1)}>
                        <Text style={styles.buttonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.label}>{tempPlayersNum}</Text>
                    <TouchableOpacity style={styles.button} onPress={() => changePlayersNum(1)}>
                        <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {Object.keys(tempRoles).map((role) => (
                <View style={styles.row} key={role}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.label}>{role} :</Text>
                    </View>
                    <View style={{ ...styles.row, flex: 1 }}>
                        <TouchableOpacity style={styles.button} onPress={() => changeRolesNum(role, -1)}>
                            <Text style={styles.buttonText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.label}>{tempRoles[role]}</Text>
                        <TouchableOpacity style={styles.button} onPress={() => changeRolesNum(role, 1)}>
                            <Text style={styles.buttonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
            <TouchableOpacity style={styles.button} onPress={goHome}>
                <Text style={styles.buttonText}>저장 후 돌아가기</Text>
            </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>

    )
}

export default SettingsScreen;
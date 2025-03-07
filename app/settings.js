import React, { useState } from 'react';
import { GlobalStyles as styles } from './styles/globalStyles';
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useRouter } from 'expo-router';
import { useGameStore } from './store/useGameStore';
import Mafia from './roles/role_mafia';
import Police from './roles/role_police';
import Doctor from './roles/role_doctor';

const Settings = () => {
    const router = useRouter();
    const {roles, setRoles} = useGameStore();
    const [tempRoles, setTempRoles] = useState(roles);
    const [tempPlayersNum, setTempPlayersNum] = useState(Object.values(roles).reduce((sum,val)=>sum+val,0));
    
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
            setRoles(tempRoles);
            router.back();
        } else {
            Alert.alert("플레이어 수와 직업 수가 맞지 않습니다.");
        }
    }

    return (
        <View style={styles.container}>
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
        </View>

    )
}

export default Settings;
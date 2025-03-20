import React, { useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView, Alert} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/styles";
import useGameStore from "../store/useGameStore";
import useDatabaseRead from "../hooks/useDatabaseRead";
import MafiaScreen from "./RoleScreens/MafiaScreen";
import PoliceScreen from "./RoleScreens/PoliceScreen";
import useDatabaseWrite from "../hooks/useDataBaseWrite";

const NightScreen = ()=>{
    const {roomId, myIndex, myRole} = useGameStore();
    const {data, loading} = useDatabaseRead(`rooms/${roomId}`, true);
    const {updateData} = useDatabaseWrite();

    useEffect(()=>{
        if(data?.gameState?.currentPhase != 'resultNight') return;
        const currentStage = data?.gameState?.currentStage;
        const selectedMafia = data?.gameState?.stages[currentStage]?.night?.selectedMafia;
        const selectedDoctor = data?.gameState?.stages[currentStage]?.night?.selectedDoctor;
        if(selectedMafia) updateData(`rooms/${roomId}/players/${selectedMafia}`, {life: data?.players[selectedMafia]?.life - 1});       
        if(selectedDoctor) updateData(`rooms/${roomId}/players/${selectedMafia}`, {life: data?.players[selectedMafia]?.life + 1});        
    }, [data?.gameState?.currentPhase])

    switch(myRole){
        case '마피아':
            return(
                <MafiaScreen></MafiaScreen>
            )
        case '경찰':
            return(
                <PoliceScreen></PoliceScreen>
            )
    }
}

export default NightScreen;
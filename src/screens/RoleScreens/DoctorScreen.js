import { View, Text } from "react-native";
import useGameStore from "../../store/useGameStore";
import useDatabaseRead from "../../hooks/useDatabaseRead";
import useDatabaseWrite from "../../hooks/useDataBaseWrite";
import PlayerSelection from "../../components/PlayerSelection";

const DoctorScreen = () => {
    const { roomId, myName } = useGameStore();
    const { data, loading } = useDatabaseRead(`rooms/${roomId}`, true);
    const { updateData } = useDatabaseWrite();

    

    return (
        <View>
            <Text> 살릴 플레이어를 선택하세요. </Text>
            <Text> {data?.gameState?.selectedDoctor ? `선택된 플레이어 : ${data?.players[data?.gameState?.selectedDoctor].name}` : '아직 선택된 플레이어가 없습니다.'} </Text>
            <PlayerSelection></PlayerSelection>   
        </View>
    )
}

export default DoctorScreen;
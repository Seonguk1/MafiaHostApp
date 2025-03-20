import { View, Text } from "react-native";
import useGameStore from "../../store/useGameStore";
import useDatabaseRead from "../../hooks/useDatabaseRead";
import useDatabaseWrite from "../../hooks/useDataBaseWrite";
import PlayerSelection from "../../components/PlayerSelection";

const MafiaScreen = () => {
    const { roomId, myName } = useGameStore();
    const { data, loading } = useDatabaseRead(`rooms/${roomId}`, true);
    const { updateData } = useDatabaseWrite();

    

    return (
        <View>
            <Text> 죽일 플레이어를 선택하세요. </Text>
            <Text> {data?.gameState?.selectedMafia ? `선택된 플레이어 : ${data?.players[data?.gameState?.selectedMafia].name}` : '아직 선택된 플레이어가 없습니다.'} </Text>
            <PlayerSelection></PlayerSelection>   
        </View>
    )
}

export default MafiaScreen;
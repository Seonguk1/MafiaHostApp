import { View, Text, TouchableOpacity } from "react-native";
import PlayerSelection from "../../components/PlayerSelection";
import useAllPlayersReady from "../../hooks/useAllPlayersReady";
import useGameStore from "../../store/useGameStore";
import useDatabaseRead from "../../hooks/useDatabaseRead";
import useDatabaseWrite from "../../hooks/useDataBaseWrite";


const PoliceScreen = () => {
    const { roomId, myIndex } = useGameStore();
    const { data, loading } = useDatabaseRead(`rooms/${roomId}`, true);
    const { updateData } = useDatabaseWrite();

    const { markPlayerReady } = useAllPlayersReady();

    return (
        <View>
            {!data?.players[myIndex].isReady ?
                <View>
                    <Text> 조사할 플레이어를 선택하세요. </Text>
                    <PlayerSelection></PlayerSelection>
                    {/* <TouchableOpacity onPress={() => {
                        markPlayerReady();
                        const selectedPlayer = data?.players[data?.players[myIndex]?.selectedPolice];
                        const isMafia = selectedPlayer?.role === '마피아';
                        const resultMessage = selectedPlayer
                            ? `${selectedPlayer.name}은 ${isMafia ? '마피아가 맞습니다.' : '마피아가 아닙니다.'}`
                            : '';
                    }}>
                        <Text> 선택 </Text>
                    </TouchableOpacity> */}
                </View>
                :
                <View>
                    <Text>
                        {data?.players[data?.players[myIndex]?.selectedPolice]?.role == '마피아' ?
                            `${data?.players[data?.players[myIndex]?.selectedPolice]?.name}은 마피아가 맞습니다.` :
                            `${data?.players[data?.players[myIndex]?.selectedPolice]?.name}은 마피아가 아닙니다.`
                        }
                    </Text>
                </View>
            }
        </View>
    )
}

export default PoliceScreen;
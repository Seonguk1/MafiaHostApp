import { View, Text, TouchableOpacity } from "react-native";
import useGameStore from "../store/useGameStore";
import useDatabaseRead from "../hooks/useDatabaseRead";
import useDatabaseWrite from "../hooks/useDataBaseWrite";
import useAllPlayersReady from "../hooks/useAllPlayersReady";

const PlayerSelection = () => {
    const { roomId, myName, myIndex, myRole } = useGameStore();
    const { data, loading } = useDatabaseRead(`rooms/${roomId}`, true);
    const { updateData } = useDatabaseWrite();
    const { markPlayerReady } = useAllPlayersReady();

    const selectPlayer = (index) => {
        const currentStage = data?.gameState?.currentStage;
        if (data?.gameState?.currentPhase == 'voting') {
            const newVotingSelections = data?.gameState?.stages[currentStage]?.voting?.votingSelections;
            newVotingSelections[myIndex] = index;
            const newVotes = data?.gameState?.stages[currentStage]?.voting?.votes;
            newVotes[index] += 1;
            updateData(`rooms/${roomId}/gameState/stages/${currentStage}/voting`, { votingSelections: newVotingSelections, votes: newVotes });
        }
        if (data?.gameState?.currentPhase == 'night') {
            switch (myRole) {
                case '마피아':
                    updateData(`rooms/${roomId}/gameState/Stages/${currentStage}/night`, { selectedMafia: index })
                    break;
                case '경찰':
                    // const newSelectedPolice = data?.gameState?.stages[currentStage]?.night?.selectedPolice;
                    // newSelectedPolice[]
                    updateData(`rooms/${roomId}/gameState/Stages/${currentStage}/night/selectedPolice`, { [myIndex]: index })
            }
        }
    }

    return (
        <View>
            {data?.players
                .filter(player => player.name != myName && player.life)
                .map((player, index) => (
                    <TouchableOpacity onPress={() => {
                        markPlayerReady();
                        const selectedPlayerIndex = data?.players.findIndex(_player => _player.name == player.name);
                        selectPlayer(selectedPlayerIndex);
                    }}>
                        <Text>{player.name}</Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    )
}

export default PlayerSelection;
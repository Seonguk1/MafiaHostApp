import { useNavigation } from "@react-navigation/native";
import useDatabaseRead from "../hooks/useDatabaseRead";
import useGameStore from "../store/useGameStore";

const GameFlow = () => {
    const { roomId, setInitialTime } = useGameStore();
    const { data, loading } = useDatabaseRead(`rooms/${roomId}/gameState/currentPhase`, true);
    const navigation = useNavigation();

    if (!roomId || !data) return;
    switch (data) {
        case 'waiting':
            navigation.navigate('RoomScreen');
            break;
        case 'assignRole':
            navigation.navigate('RoleAssignmentScreen');
            break;
        case 'day':
            navigation.navigate('DayScreen');
            break;
        case 'voting':
            navigation.navigate('VotingScreen');
            break;
        case 'night':
            navigation.navigate('NightScreen');
            break;
    }

    return null;
}

export default GameFlow;

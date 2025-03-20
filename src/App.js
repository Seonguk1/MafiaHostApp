import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import CreateRoomScreen from './screens/CreateRoomScreen';
import JoinRoomScreen from './screens/JoinRoomScreen';
import RoomScreen from './screens/RoomScreen';
import SettingsScreen from './screens/SettingsScreen';
import RoleAssignmentScreen from './screens/RoleAssignmentScreen';
import DayScreen from './screens/DayScreen';
import VotingScreen from './screens/VotingScreen';
import NightScreen from './screens/NightScreen';
import ResultScreen from './screens/ResultScreen';
import GameFlow from './navigation/GameFlow';
import GameTimer from './utils/GameTimer';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <GameFlow />
      <GameTimer />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="CreateRoomScreen" component={CreateRoomScreen} />
        <Stack.Screen name="JoinRoomScreen" component={JoinRoomScreen} />
        <Stack.Screen name="RoomScreen" component={RoomScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="RoleAssignmentScreen" component={RoleAssignmentScreen} />
        <Stack.Screen name="DayScreen" component={DayScreen} />
        <Stack.Screen name="VotingScreen" component={VotingScreen} />
        <Stack.Screen name="NightScreen" component={NightScreen} />
        <Stack.Screen name="ResultScreen" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

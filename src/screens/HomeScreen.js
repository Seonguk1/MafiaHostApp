import React from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView, Alert} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/styles";

const HomeScreen = ()=>{
	const navigation = useNavigation();

    // return(
    //     <SafeAreaView style={styles.container}>
	// 		<Text style={styles.title}>마피아 호스트</Text>

	// 		<TouchableOpacity style={styles.button} onPress={() => navigation.navigate("SettingsScreen")}>
	// 			<Text style={styles.buttonText}>설정</Text>
	// 		</TouchableOpacity>

	// 		<TouchableOpacity style={styles.button} onPress={() => navigation.navigate("CreateRoomScreen")}>
	// 			<Text style={styles.buttonText}>방 만들기</Text>
	// 		</TouchableOpacity>
	// 		<TouchableOpacity style={styles.button} onPress={() => navigation.navigate("JoinRoomScreen")}>
	// 			<Text style={styles.buttonText}>참가하기</Text>
	// 		</TouchableOpacity>
	// 	</SafeAreaView>
    // )

	return(
		<SafeAreaView style={{flex:1, backgroundColor: "skyblue" }}>
			<Text>마피아 호스트</Text>

			<TouchableOpacity onPress={() => navigation.navigate("SettingsScreen")}>
				<Text>설정</Text>
			</TouchableOpacity>

			<TouchableOpacity onPress={() => navigation.navigate("CreateRoomScreen")}>
				<Text>방 만들기</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigation.navigate("JoinRoomScreen")}>
				<Text>참가하기</Text>
			</TouchableOpacity>
		</SafeAreaView>
	)
}

export default HomeScreen;
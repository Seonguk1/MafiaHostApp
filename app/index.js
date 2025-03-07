import React, { useEffect } from "react";
import { activateKeepAwakeAsync } from 'expo-keep-awake'
import { View, Text, TouchableOpacity, Dimensions, PixelRatio } from "react-native";
import { useRouter } from 'expo-router';
import { useGameStore } from "./store/useGameStore";
import { GlobalStyles as styles } from "./styles/globalStyles";
import Mafia from './roles/role_mafia';
import Police from './roles/role_police';
import Doctor from './roles/role_doctor';

const { width, height } = Dimensions.get('window');
const scaleFont = (size) => size * PixelRatio.getFontScale();
const scaleSize = (size) => (width / 375) * size;

const Index = () => {
	const { setPlayers, roles } = useGameStore();
	useEffect(() => {
		activateKeepAwakeAsync();
	}, []);
	const router = useRouter();

	const mixRoles = ()=>{
		const players = [];
		const rolesNum = Object.values(roles).reduce((sum, val)=>sum+val, 0);

		for (let i = 0; i < rolesNum; i++) {
			for (let j = 0; j < Object.values(roles)[i]; j++) {
				let newRole;
				switch (Object.keys(roles)[i]) {
					case '마피아':
						newRole = new Mafia();
						break;
					case '경찰':
						newRole = new Police();
						break;
					case '의사':
						newRole = new Doctor();
						break;
				}
				players.push(newRole);
			}
		}
		players.sort(() => Math.random() - 0.5);

		for (let i = 0; i < players.length; i++) {
			players[i].name = `플레이어${i + 1}`; /// 임시
		}
		setPlayers(players);
	}
	
	const gameStart = () => {
		mixRoles();
	}


	return (
		<View style={styles.container}>
			<Text style={styles.title}>마피아 호스트</Text>

			<TouchableOpacity style={styles.button} onPress={() => router.push('/settings')}>
				<Text style={styles.buttonText}>설정</Text>
			</TouchableOpacity>

			<TouchableOpacity style={{ ...styles.button, marginTop: scaleSize(30) }} onPress={gameStart}>
				<Text style={styles.buttonText}>게임 시작</Text>
			</TouchableOpacity>
		</View>
	)
}
export default Index;
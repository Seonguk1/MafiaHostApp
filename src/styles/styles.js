import { StyleSheet, Dimensions, PixelRatio } from 'react-native';
import Fonts from './fonts';
const scaleFont = (size) => size * PixelRatio.getFontScale();
const scaleSize = (size) => (width / 375) * size; // 375px 기준 (iPhone 11 Pro)
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    // backgroundColor: "#1a1a1a",
  },
  title: {
    fontFamily: Fonts.Montserrat.Bold,
    fontSize: scaleFont(35),
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: scaleSize(30),
  },
  subtitle: {
    fontSize: scaleFont(20),
    color: "#ccc",
    marginBottom: scaleSize(15),
    textAlign: "center",
  },
  label: {
    fontFamily: Fonts.Inter.Regular,
    fontSize: scaleFont(20),
    color: '#fff',
  },
  button: {
    paddingVertical: scaleSize(10),
    paddingHorizontal: scaleSize(20),
    borderRadius: scaleSize(5),
    minWidth: scaleSize(40),
    backgroundColor: "#4CAF50",
    textTransform: 'uppercase',
    margin: scaleSize(10),
  },
  buttonText: {
    fontFamily: Fonts.Roboto.Medium,
    color: "#fff",
    fontSize: scaleFont(18),
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    width: "80%",
    marginVertical: scaleSize(10),
},
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: "#333",
    color: "#fff",
    fontSize: scaleFont(16),
    padding: scaleSize(10),
    margin: scaleSize(15),
    borderRadius: scaleSize(5),
},
});

export default styles;
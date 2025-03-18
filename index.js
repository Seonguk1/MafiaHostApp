import { AppRegistry, Platform } from 'react-native';
import App from './src/App'; // 기존 코드 그대로 사용!
import { name as appName } from './app.json';

if (Platform.OS === 'web') {
  import('react-dom/client').then(ReactDOM => {
    const root = document.getElementById('root') || document.createElement('div');
    document.body.appendChild(root);
    ReactDOM.createRoot(root).render(<App />);
  });
} else {
  AppRegistry.registerComponent(appName, () => App);
}
  
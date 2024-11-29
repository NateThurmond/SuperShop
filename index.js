import {AppRegistry} from 'react-native';
import App from './App'; // This should be your App component
import {name as appName} from './app.json'; // Ensure this matches your app's name

AppRegistry.registerComponent(appName, () => App); // Register the main component

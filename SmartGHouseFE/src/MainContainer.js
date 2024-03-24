import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// import { NavigationContainer } from "@react-navigation/native"
// import { createNativeStackNavigator } from "@react-navigation/native-stack"

import styles from './styles/styles';
// import HomeScreen from "./src/screens/HomeScreen"
// import ManageScreen from "./src/screens/ManageScreen"

// const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      
      <Text>Eureka</Text>

      <StatusBar style="auto" />
      
    </View>
  );
}

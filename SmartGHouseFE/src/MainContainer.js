import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserScreen from "./screens/AuthenScreen";
import NavigatorScreen from "./NavigatorScreen";

const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UserScreen">
        {/* <Stack.Screen name="UserScreen" component={UserScreen} options={{ headerShown: false }} /> */}
        <Stack.Screen name="HomeScreen" component={NavigatorScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import * as React from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './styles/styles';

import HomeScreen from "./screens/HomeScreen";
import ManageScreen from "./screens/ManageScreen";
import CalendarScreen from "./screens/CalendarScreen";
import HistoryScreen from "./screens/HistoryScreen";
import UserScreen from "./screens/UserScreen";

const homeName = 'Home';
const manageName = 'Manage';
const calendarName = 'Calendar';
const historyName = 'History';
const userName = 'User';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName={homeName}
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;
              let rn = route.name

              if (rn === homeName) {
                iconName = focused ? 'home' : 'home-outline';
              } else if (rn === manageName) {
                iconName = focused ? 'construct' : 'construct-outline';
              } else if (rn === calendarName) {
                iconName = focused ? 'calendar' : 'calendar-outline';
              } else if (rn === historyName) {
                iconName = focused ? 'list-circle' : 'list-circle-outline';
              } else if (rn === userName) {
                iconName = focused ? 'person-circle' : 'person-circle-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
              activeTintColor: '#3CAF58',
              inactiveTintColor: 'grey',
              labelStyle: { paddingBottom: 5, fontSize: 10 },
            }}
          >

            <Tab.Screen name={homeName} component={HomeScreen} />
            <Tab.Screen name={manageName} component={ManageScreen} />
            <Tab.Screen name={calendarName} component={CalendarScreen} />
            <Tab.Screen name={historyName} component={HistoryScreen} />
            <Tab.Screen name={userName} component={UserScreen} />

          </Tab.Navigator>
      </NavigationContainer>
  );
}

// const contStyles = StyleSheet.create({
//   baseCont: {
//     backgroundColor: 'blue',
//     padding: 30,
//   },
// });

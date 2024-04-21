import * as React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Ionicons from 'react-native-vector-icons/Ionicons';
import AccountScreen from './screens/AccountScreen';
import HomeScreen from "./screens/HomeScreen";
import ManageScreen from "./screens/ManageScreen";
import CalendarScreen from "./screens/CalendarScreen";
import HistoryScreen from "./screens/HistoryScreen";
import {path} from "../src/utils/constants"



const Tab = createBottomTabNavigator();

export default function App() {
  return (
        <Tab.Navigator
          initialRouteName={path.HOME}
          screenOptions={({ route }) => (
          {
            tabBarStyle: {
              backgroundColor: '#EFF9F1',
              height: 80,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              position: 'absolute',
              // elevation: 5,
              // shadowColor: 'black',
              // shadowOffset: {
              //   width: 0,
              //   height: 10,
              // },
              // shadowOpacity: 1,
            },
            tabBarActiveTintColor: '#3CAF58',
            tabBarInactiveTintColor: 'grey',
            tabBarLabelStyle: { paddingBottom: 8, fontSize: 12 },
            tabBarIcon: ({focused, color, size}) => {
              let iconName;
              let rn = route.name

              if (rn === path.HOME) {
                iconName = focused ? 'home' : 'home-outline';
              } else if (rn === path.MANAGE) {
                iconName = focused ? 'construct' : 'construct-outline';
              } else if (rn === path.CALENDAR) {
                iconName = focused ? 'calendar' : 'calendar-outline';
              } else if (rn === path.HISTORY) {
                iconName = focused ? 'list-circle' : 'list-circle-outline';
              } else if (rn === path.USER) {
                iconName = focused ? 'person-circle' : 'person-circle-outline';
              }

              return <Ionicons name={iconName} size={20} color={color} />
            },
          })}

        >
            <Tab.Screen name={path.HOME} component={HomeScreen} options={{ headerShown: false }} />
            <Tab.Screen name={path.MANAGE} component={ManageScreen} options={{ headerShown: false }}/>
            <Tab.Screen name={path.CALENDAR} component={CalendarScreen} options={{ headerShown: false }}/>
            <Tab.Screen name={path.HISTORY} component={HistoryScreen} options={{ headerShown: false }}/>
            <Tab.Screen name={path.USER} component={AccountScreen} options={{ headerShown: false }}/>
          </Tab.Navigator>
  
  );
}
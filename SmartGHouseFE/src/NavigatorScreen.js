import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import AccountScreen from "./screens/AccountScreen";
import HomeControl from "./screens/HomeControl";
import ManageScreen from "./screens/ManageScreen";
import CalendarScreen from "./screens/Calendar/CalendarScreen";
import CalendarControl from "./screens/CalendarControl";
import HistoryScreen from "./screens/HistoryScreen";
import AuthOptionScreen from "./screens/Authen/AuthOptionScreen";
import { path } from "../src/utils/constants";
import { useState, useEffect } from "react";
import {
  getAllSchedule,
  getUserFromStorage,
  getDeviceByScheduleId,
  toggleDevice,
} from "./services/userService";

const Tab = createBottomTabNavigator();

export default function App() {
  const [activeDevice_id, setActiveDevice_id] = useState(null);
  useEffect(() => {
    const checkStartTime = async () => {
      const user = await getUserFromStorage();
      if (!user) {
        navigator.navigate("AuthenScreen");
      }
      const now = new Date();

      const options = { day: "2-digit", month: "2-digit", year: "numeric" };
      const today = now
        .toLocaleDateString("en-GB", options)
        .split("/")
        .join("-");
      const currentTime = now.getHours() * 60 + now.getMinutes();
      const response = await getAllSchedule(user.id);
      const schedules = response.data;
      let isActive = false;
      if (schedules && schedules.length > 0) {
        schedules.forEach(async (schedule) => {
          if (schedule.date === today) {
            const startTime = schedule.start_time.split(":");
            const startMinutes =
              parseInt(startTime[0]) * 60 + parseInt(startTime[1]);
            const endTime = schedule.end_time.split(":");
            const endMinutes = parseInt(endTime[0]) * 60 + parseInt(endTime[1]);
            if (currentTime >= startMinutes && currentTime < endMinutes) {
              console.log("Device is active");
              isActive = true;
              const responseDevice = await getDeviceByScheduleId(schedule.id);
              if (responseDevice.data.length > 0) {
                // console.log("Turning on device");
                await toggleDevice(user.id, responseDevice.data[0].id, 1);
              }
            } else {
              const responseDevice = await getDeviceByScheduleId(schedule.id);
              if (responseDevice.data.length > 0) {
                // console.log("Turning off device");
                await toggleDevice(user.id, responseDevice.data[0].id, 0);
              }
            }
          }
        });
      }
    };
    // checkStartTime();
    const interval = setInterval(checkStartTime, 60000); // Check every minute
  }, []);

  return (
    <Tab.Navigator
      initialRouteName={path.HOME}
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: "#f5f3f3",
          height: 60,
          // borderTopLeftRadius: 30,
          // borderTopRightRadius: 30,
          position: "absolute",
          // elevation: 5,
          // shadowColor: 'black',
          // shadowOffset: {
          //   width: 0,
          //   height: 10,
          // },
          // shadowOpacity: 1,
        },
        tabBarActiveTintColor: "#0a5962",
        tabBarInactiveTintColor: "grey",
        tabBarLabelStyle: { paddingBottom: 8, fontSize: 12 },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === path.HOMECONTROL) {
            iconName = focused ? "home" : "home-outline";
          } else if (rn === path.MANAGE) {
            iconName = focused ? "construct" : "construct-outline";
          } else if (rn === /*"CalendarControl"*/ path.CALENDAR) {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (rn === path.HISTORY) {
            iconName = focused ? "list-circle" : "list-circle-outline";
          } else if (rn === path.USER) {
            iconName = focused ? "person-circle" : "person-circle-outline";
          }

          return <Ionicons name={iconName} size={20} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name={path.HOMECONTROL}
        component={HomeControl}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name={path.MANAGE}
        component={ManageScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        // name={"CalendarControl"}
        name={path.CALENDAR}
        component={CalendarControl}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name={path.HISTORY}
        component={HistoryScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name={path.USER}
        component={AccountScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

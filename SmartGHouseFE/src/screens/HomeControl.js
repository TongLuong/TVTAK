import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./Home/HomeScreen";
import ThresholdScreen from "./Home/ThresholdScreen";
import ChartScreen from "./Home/ChartScreen";
import DeviceAddition from "./Home/DeviceAddition";
import DeviceList from "./Home/DeviceList";
import { path } from "../utils/constants";
const Stack = createStackNavigator();

export default function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={path.HOME}
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={path.CHART}
        component={ChartScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={path.THRESHOLD}
        component={ThresholdScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"DeviceAddtion"}
        component={DeviceAddition}
        options={{ title: "Thêm thiết bị" }}
      />
      <Stack.Screen
        name={"DeviceList"}
        component={DeviceList}
        options={{ title: "Danh sách thiết bị" }}
      />
    </Stack.Navigator>
  );
}

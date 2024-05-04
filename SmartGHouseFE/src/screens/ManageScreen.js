import { createStackNavigator } from "@react-navigation/stack";
import FuncOptionScreen from "./Manage/FuncOptionScreen";
import MethodOptionScreen from "./Manage/MethodOptionScreen";
import ManualLightScreen from "./Manage/ManualLightScreen";
import ManualWaterScreen from "./Manage/ManualWaterScreen";
import AutoScreen from "./Manage/AutoScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FuncOp"
        component={FuncOptionScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Methodop"
        component={MethodOptionScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Manuallight" component={ManualLightScreen} />
      <Stack.Screen name="Manualwater" component={ManualWaterScreen} />
      <Stack.Screen name="Auto" component={AutoScreen} />
    </Stack.Navigator>
  );
}

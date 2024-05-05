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
        options={{ title: "Chọn phương thức điều khiển" }}
      />
      <Stack.Screen name="Manuallight" component={ManualLightScreen} options={{ title: "Thủ công" }}/>
      <Stack.Screen name="Manualwater" component={ManualWaterScreen} options={{ title: "Thủ công" }}/>
      <Stack.Screen name="Auto" component={AutoScreen} options={{ title: "Đặt lịch biểu tự động" }}/>
    </Stack.Navigator>
  );
}

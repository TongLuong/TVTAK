import { createStackNavigator } from "@react-navigation/stack";
import FuncOptionScreen from "./Manage/FuncOptionScreen";
import MethodOptionScreen from "./Manage/MethodOptionScreen";
import ManualLightScreen from "./Manage/ManualLightScreen";
import ManualWaterScreen from "./Manage/ManualWaterScreen";
import AutoScreen from "./Manage/AutoScreen";
import SelectScreen from "./Manage/SelectScreen";
import DeviceList from "./Home/DeviceList";

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
      <Stack.Screen name="SelectScreen" component={SelectScreen} options={{ }} />
      <Stack.Screen name="DeviceList" component={DeviceList} options={{ title: "Danh sách thiết bị"}} />
    </Stack.Navigator>
  );
}

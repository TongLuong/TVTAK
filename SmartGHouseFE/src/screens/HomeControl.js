import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./Home/HomeScreen";
import ChartScreen from "./Home/ChartScreen";
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
      {/* <Stack.Screen
        name={path.CHART}
        component={ChartScreen}
        options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
  );
}

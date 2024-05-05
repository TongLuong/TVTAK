import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./Authen/LoginScreen";
import SignupScreen from "./Authen/SignUpScreen";
import AuthopScreen from "./Authen/AuthOptionScreen";
import ForgetPass1Screen from "./Authen/ForgetPass1Screen";
import ForgetPass2Screen from "./Authen/ForgetPass2Screen";
import { path } from "../utils/constants";

const Stack = createStackNavigator();

export default function AuthenScreen() {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name={path.AUTHEN} component={AuthopScreen} options={{ headerShown: false }} /> */}
      <Stack.Screen
        name={path.LOGIN}
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={path.FORGET1} component={ForgetPass1Screen} />
      <Stack.Screen name={path.FORGET2} component={ForgetPass2Screen} />
      <Stack.Screen
        name={path.SIGNUP}
        component={SignupScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

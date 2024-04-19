import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen'
import SignupScreen from './SignUpScreen'
import AuthopScreen from './AuthOptionScreen'
import AccountScreen from './AccountScreen'
import ForgetPass1Screen from './ForgetPass1Screen'
import ForgetPass2Screen from './ForgetPass2Screen'

const Stack = createStackNavigator();

export default function App() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="User" component={AuthopScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Forget pass 1" component={ForgetPass1Screen}/>
        <Stack.Screen name="Forget pass 2" component={ForgetPass2Screen}/>
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Account" component={AccountScreen} />
      </Stack.Navigator>
    );
  }
